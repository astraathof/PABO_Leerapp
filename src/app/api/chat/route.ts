import { GoogleGenerativeAI, GenerateContentResult } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'GEMINI_API_KEY niet geconfigureerd',
          details: 'Voeg GEMINI_API_KEY toe aan je environment variables.'
        },
        { status: 500 }
      )
    }

    // Validate API key format
    if (!process.env.GEMINI_API_KEY.startsWith('AIza')) {
      return NextResponse.json(
        { 
          error: 'Ongeldige GEMINI_API_KEY format',
          details: 'De Gemini API key moet beginnen met "AIza". Controleer je API key.'
        },
        { status: 401 }
      )
    }

    const { message, context, module, studentLevel } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Bericht is vereist' },
        { status: 400 }
      )
    }

    // Initialize Gemini with proper error handling
    let model
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    } catch (initError) {
      console.error('❌ Failed to initialize Gemini:', initError)
      return NextResponse.json(
        { 
          error: 'Gemini initialisatie gefaald',
          details: 'Kan geen verbinding maken met Gemini API. Controleer je API key.'
        },
        { status: 500 }
      )
    }

    // Socratische begeleiding prompt met neutrale taal
    const systemPrompt = `Je bent een ervaren onderwijsprofessional die gebruikers begeleidt met de socratische methode. 

JOUW ROL:
- Stel vragen die gebruikers laten nadenken in plaats van directe antwoorden te geven
- Help gebruikers zelf tot inzichten te komen
- Geef hints en voorbeelden uit de onderwijspraktijk
- Moedig aan tot reflectie en kritisch denken
- Wees geduldig en ondersteunend
- Spreek de gebruiker aan als "je" of "jij"

CONTEXT:
Module: ${module || 'Algemeen'}
Gebruiker niveau: ${studentLevel || 'Beginnend'}
Context: ${context || 'Geen specifieke context'}

SOCRATISCHE PRINCIPES:
1. Stel open vragen die beginnen met "Wat denk je...", "Hoe zou je...", "Waarom is..."
2. Bouw voort op gebruiker antwoorden met vervolgvragen
3. Help gebruikers verbanden leggen tussen theorie en praktijk
4. Gebruik concrete voorbeelden uit het basisonderwijs
5. Laat gebruikers hun eigen conclusies trekken

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

    // Make the API call with proper error handling
    let result: GenerateContentResult
    try {
      // Add timeout handling
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Gemini API timeout after 30 seconds')), 30000)
      })

      const apiPromise = model.generateContent(fullPrompt)
      result = await Promise.race([apiPromise, timeoutPromise]) as GenerateContentResult
      
    } catch (apiError) {
      console.error('❌ Gemini API call failed:', apiError)
      
      // Specific error handling
      if (apiError instanceof Error) {
        if (apiError.message?.includes('timeout')) {
          return NextResponse.json({
            error: 'Gemini API timeout',
            details: 'De verwerking duurde te lang. Probeer een kortere vraag.',
            type: 'timeout_error'
          }, { status: 408 })
        }
        
        if (apiError.message?.includes('quota') || apiError.message?.includes('QUOTA_EXCEEDED')) {
          return NextResponse.json({
            error: 'API quota overschreden',
            details: 'Je hebt je Gemini API quota overschreden. Probeer het later opnieuw.',
            type: 'quota_error'
          }, { status: 429 })
        }
        
        if (apiError.message?.includes('API_KEY_INVALID') || apiError.message?.includes('401')) {
          return NextResponse.json({
            error: 'Ongeldige Gemini API key',
            details: 'De Gemini API key is ongeldig. Controleer je API key.',
            type: 'api_key_error'
          }, { status: 401 })
        }
      }
      
      // Generic API error
      return NextResponse.json(
        { error: 'Er is een fout opgetreden bij het verwerken van je vraag' },
        { status: 500 }
      )
    }

    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      response: text,
      success: true 
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden bij het verwerken van je vraag',
        details: error instanceof Error ? error.message : 'Onbekende fout'
      },
      { status: 500 }
    )
  }
}