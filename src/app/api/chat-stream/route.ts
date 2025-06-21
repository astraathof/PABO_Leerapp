import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY niet geconfigureerd' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { message, context, module, studentLevel, conversationHistory } = await request.json()

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Bericht is vereist' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Enhanced socratic guidance prompt with context awareness
    const systemPrompt = `Je bent een ervaren PABO-docent die studenten begeleidt met de socratische methode. 

JOUW ROL:
- Stel vragen die studenten laten nadenken in plaats van directe antwoorden te geven
- Help studenten zelf tot inzichten te komen
- Geef hints en voorbeelden uit de onderwijspraktijk
- Moedig aan tot reflectie en kritisch denken
- Wees geduldig en ondersteunend
- Gebruik de gespreksgeschiedenis om voort te bouwen op eerdere onderwerpen

CONTEXT:
Module: ${module || 'Algemeen'}
Student niveau: ${studentLevel || 'Beginnend'}
Context: ${context || 'Geen specifieke context'}
Gespreksonderwerpen tot nu toe: ${conversationHistory?.join(', ') || 'Geen eerdere onderwerpen'}

SOCRATISCHE PRINCIPES:
1. Stel open vragen die beginnen met "Wat denk je...", "Hoe zou je...", "Waarom is..."
2. Bouw voort op studentantwoorden met vervolgvragen
3. Help studenten verbanden leggen tussen theorie en praktijk
4. Gebruik concrete voorbeelden uit het basisonderwijs
5. Laat studenten hun eigen conclusies trekken
6. Verwijs naar eerdere gespreksonderwerpen waar relevant

CONTEXT-BEWUSTZIJN:
- Als er schooldocumenten zijn geüpload, verwijs daar specifiek naar
- Bouw voort op eerdere onderwerpen in het gesprek
- Pas je niveau aan op basis van de student responses
- Maak verbindingen tussen verschillende modules

STIJL:
- Vriendelijk en bemoedigend
- Gebruik Nederlandse onderwijsterminologie
- Geef praktische voorbeelden
- Hou antwoorden beknopt (max 150 woorden)
- Eindig vaak met een vraag om door te denken

Reageer nu op de student:`

    const fullPrompt = `${systemPrompt}\n\nStudent: ${message}`

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await model.generateContentStream(fullPrompt)
          
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
          const errorData = JSON.stringify({ error: 'Er is een fout opgetreden bij het streamen' })
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
      JSON.stringify({ error: 'Er is een fout opgetreden bij het verwerken van je vraag' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}