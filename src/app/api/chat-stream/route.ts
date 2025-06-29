import { GoogleGenerativeAI, GenerateContentStreamResult } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'GEMINI_API_KEY niet geconfigureerd',
          details: 'Voeg GEMINI_API_KEY toe aan je environment variables.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate API key format
    if (!process.env.GEMINI_API_KEY.startsWith('AIza')) {
      return new Response(
        JSON.stringify({ 
          error: 'Ongeldige GEMINI_API_KEY format',
          details: 'De Gemini API key moet beginnen met "AIza". Controleer je API key.'
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { message, context, module, studentLevel, conversationHistory } = await request.json()

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Bericht is vereist' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Gemini with proper error handling
    let model
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    } catch (initError) {
      console.error('❌ Failed to initialize Gemini:', initError)
      return new Response(
        JSON.stringify({ 
          error: 'Gemini initialisatie gefaald',
          details: 'Kan geen verbinding maken met Gemini API. Controleer je API key.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Enhanced socratic guidance prompt with neutral language
    const systemPrompt = `Je bent een ervaren onderwijsprofessional die gebruikers begeleidt met de socratische methode. 

JOUW ROL:
- Stel vragen die gebruikers laten nadenken in plaats van directe antwoorden te geven
- Help gebruikers zelf tot inzichten te komen
- Geef hints en voorbeelden uit de onderwijspraktijk
- Moedig aan tot reflectie en kritisch denken
- Wees geduldig en ondersteunend
- Gebruik de gespreksgeschiedenis om voort te bouwen op eerdere onderwerpen
- Spreek de gebruiker aan als "je" of "jij"

CONTEXT:
Module: ${module || 'Algemeen'}
Gebruiker niveau: ${studentLevel || 'Beginnend'}
Context: ${context || 'Geen specifieke context'}
Gespreksonderwerpen tot nu toe: ${conversationHistory?.join(', ') || 'Geen eerdere onderwerpen'}

SOCRATISCHE PRINCIPES:
1. Stel open vragen die beginnen met "Wat denk je...", "Hoe zou je...", "Waarom is..."
2. Bouw voort op gebruiker antwoorden met vervolgvragen
3. Help gebruikers verbanden leggen tussen theorie en praktijk
4. Gebruik concrete voorbeelden uit het basisonderwijs
5. Laat gebruikers hun eigen conclusies trekken
6. Verwijs naar eerdere gespreksonderwerpen waar relevant

CONTEXT-BEWUSTZIJN:
- Als er schooldocumenten zijn geüpload, verwijs daar specifiek naar
- Bouw voort op eerdere onderwerpen in het gesprek
- Pas je niveau aan op basis van de gebruiker responses
- Maak verbindingen tussen verschillende modules

STIJL:
- Vriendelijk en bemoedigend
- Gebruik Nederlandse onderwijsterminologie
- Geef praktische voorbeelden
- Hou antwoorden beknopt (max 150 woorden)
- Eindig vaak met een vraag om door te denken
- Schrijf op B1 niveau (eenvoudig Nederlands)
- Vermijd overbodige leestekens zoals **

Reageer nu op de gebruiker:`

    const fullPrompt = `${systemPrompt}\n\nGebruiker: ${message}`

    // Create a streaming response with proper error handling
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Add timeout handling
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Gemini API timeout after 30 seconds')), 30000)
          })

          const apiPromise = model.generateContentStream(fullPrompt)
          
          let result: GenerateContentStreamResult
          try {
            result = await Promise.race([apiPromise, timeoutPromise]) as GenerateContentStreamResult
          } catch (streamError) {
            console.error('Streaming error:', streamError)
            const errorMessage = streamError instanceof Error ? streamError.message : 'Onbekende streaming fout'
            const errorData = JSON.stringify({ 
              error: `Er is een fout opgetreden bij het streamen: ${errorMessage}`,
              fallbackResponse: `Ik wil je graag helpen, maar er is momenteel een technisch probleem met de AI-service. Probeer het later nog eens of stel een andere vraag.`
            })
            controller.enqueue(new TextEncoder().encode(`data: ${errorData}\n\n`))
            controller.close()
            return
          }
          
          for await (const chunk of result.stream) {
            const chunkText = chunk.text()
            if (chunkText) {
              const data = JSON.stringify({ content: chunkText })
              controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
            }
          }
          
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          const errorData = JSON.stringify({ 
            error: 'Er is een fout opgetreden bij het streamen',
            fallbackResponse: `Ik wil je graag helpen, maar er is momenteel een technisch probleem. Probeer het later nog eens of stel een andere vraag.`
          })
          controller.enqueue(new TextEncoder().encode(`data: ${errorData}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('AI Chat stream error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Er is een fout opgetreden bij het verwerken van je vraag',
        details: error instanceof Error ? error.message : 'Onbekende fout'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}