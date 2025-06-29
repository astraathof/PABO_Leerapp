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

    const { documentText, documentType, analysisType, module } = await request.json()

    if (!documentText) {
      return NextResponse.json(
        { error: 'Document tekst is vereist' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Create focused analysis prompt with neutral language
    const analysisPrompt = `Je bent een ervaren onderwijsprofessional. Analyseer deze schooldocumenten voor de module "${module}".

SCHOOLDOCUMENTEN:
${documentText}

Geef een beknopte analyse (max 250 woorden) met deze structuur:

Documenten ontvangen
Benoem kort welke documenten je hebt geanalyseerd.

Pluspunten t.o.v. module doelen
Identificeer 2-3 sterke punten die aansluiten bij de module "${module}".

Ontwikkelkansen
Benoem 2-3 concrete verbeterpunten gerelateerd aan de module.

Openingsvraag
Stel een concrete vraag gebaseerd op de documenten en module.

VEREISTEN:
- Spreek de gebruiker aan als "je"
- Wees specifiek en praktisch
- Verwijs naar aspecten uit de documenten
- Houd het beknopt en to-the-point
- Focus op de koppeling tussen documenten en module doelen
- Schrijf op B1 niveau (eenvoudig Nederlands)
- Vermijd overbodige leestekens zoals **`

    console.log('🤖 Starting AI document analysis...')

    const result = await model.generateContent(analysisPrompt)
    const response = await result.response
    const analysis = response.text()

    console.log('✅ AI analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis: analysis,
      analysisType: analysisType
    })

  } catch (error) {
    console.error('Document analysis error:', error)
    
    // Return a structured fallback response
    const fallbackAnalysis = `Documenten ontvangen
Je hebt schooldocumenten geüpload die relevant zijn voor de module "${module}".

Pluspunten t.o.v. module doelen
• Je documenten bieden concrete schoolcontext voor praktijkgerichte leerervaring
• Ze maken het mogelijk om theorie direct te koppelen aan jullie specifieke situatie
• Er is materiaal beschikbaar om realistische verbeteringen te identificeren

Ontwikkelkansen
• We kunnen samen onderzoeken hoe jullie huidige aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen praktische verbanden leggen tussen theorie en jullie schoolsituatie

Openingsvraag
Welk specifiek aspect van je schooldocumenten wil je als eerste bespreken in relatie tot de module "${module}"?`

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      analysisType: 'fallback'
    })
  }
}