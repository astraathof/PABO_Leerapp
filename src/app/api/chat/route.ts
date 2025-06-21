import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY niet geconfigureerd' },
        { status: 500 }
      )
    }

    const { message, context, module, studentLevel } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Bericht is vereist' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Socratische begeleiding prompt
    const systemPrompt = `Je bent een ervaren PABO-docent die studenten begeleidt met de socratische methode. 

JOUW ROL:
- Stel vragen die studenten laten nadenken in plaats van directe antwoorden te geven
- Help studenten zelf tot inzichten te komen
- Geef hints en voorbeelden uit de onderwijspraktijk
- Moedig aan tot reflectie en kritisch denken
- Wees geduldig en ondersteunend

CONTEXT:
Module: ${module || 'Algemeen'}
Student niveau: ${studentLevel || 'Beginnend'}
Context: ${context || 'Geen specifieke context'}

SOCRATISCHE PRINCIPES:
1. Stel open vragen die beginnen met "Wat denk je...", "Hoe zou je...", "Waarom is..."
2. Bouw voort op studentantwoorden met vervolgvragen
3. Help studenten verbanden leggen tussen theorie en praktijk
4. Gebruik concrete voorbeelden uit het basisonderwijs
5. Laat studenten hun eigen conclusies trekken

STIJL:
- Vriendelijk en bemoedigend
- Gebruik Nederlandse onderwijsterminologie
- Geef praktische voorbeelden
- Hou antwoorden beknopt (max 150 woorden)
- Eindig vaak met een vraag om door te denken

Reageer nu op de student:`

    const fullPrompt = `${systemPrompt}\n\nStudent: ${message}`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      response: text,
      success: true 
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verwerken van je vraag' },
      { status: 500 }
    )
  }
}