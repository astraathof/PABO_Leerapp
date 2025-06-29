import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check if GEMINI_API_KEY is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured')
      return NextResponse.json(
        { 
          error: 'GEMINI_API_KEY niet geconfigureerd',
          details: 'De Gemini API key is niet ingesteld. Voeg GEMINI_API_KEY toe aan je environment variables.',
          type: 'configuration_error'
        },
        { status: 500 }
      )
    }

    const { documents, module, analysisType } = await request.json()

    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return NextResponse.json(
        { error: 'Geen documenten gevonden voor analyse' },
        { status: 400 }
      )
    }

    if (!module) {
      return NextResponse.json(
        { error: 'Module naam is vereist' },
        { status: 400 }
      )
    }

    console.log(`🔍 Starting quickscan for ${documents.length} documents and module: ${module}`)

    // Initialize GoogleGenerativeAI after API key validation
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Prepare document content with truncation to prevent token limits
    const documentTexts = documents.map(doc => {
      let content = doc.text || ''
      
      // Truncate to prevent token limit issues (max 2000 chars per document)
      if (content.length > 2000) {
        content = content.substring(0, 2000) + '...'
      }
      
      return `**DOCUMENT: ${doc.fileName}** (${doc.detectedType || 'Onbekend type'})

**INHOUD:**
${content}

**EINDE DOCUMENT**`
    }).join('\n\n')

    // Create focused analysis prompt
    const analysisPrompt = `Je bent een ervaren PABO-docent. Analyseer deze schooldocumenten voor de module "${module}".

SCHOOLDOCUMENTEN:
${documentTexts}

Geef een BEKNOPTE analyse (max 250 woorden) met deze structuur:

**📚 Documenten ontvangen**
Benoem kort welke documenten je hebt geanalyseerd.

**💪 Sterke punten t.o.v. module doelen**
Identificeer 2-3 sterke punten die aansluiten bij de module "${module}".

**🔧 Ontwikkelkansen**
Benoem 2-3 concrete verbeterpunten gerelateerd aan de module.

**🎯 Aanbeveling**
Geef een concrete aanbeveling voor de eerste stap.

**❓ Openingsvraag voor Chatbot**
Stel een concrete vraag gebaseerd op de documenten en module.

VEREISTEN:
- Spreek de gebruiker aan als "je"
- Wees specifiek en praktisch
- Verwijs naar aspecten uit de documenten
- Houd het beknopt en to-the-point
- Focus op de koppeling tussen documenten en module doelen`

    console.log('🤖 Starting AI document analysis...')

    const result = await model.generateContent(analysisPrompt)
    const response = await result.response
    const analysis = response.text()

    console.log('✅ AI analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis: analysis,
      analysisType: analysisType || 'module-quickscan',
      documentsAnalyzed: documents.length,
      module: module
    })

  } catch (error) {
    console.error('Module quickscan error:', error)
    
    // Check for specific API key errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
        return NextResponse.json({
          error: 'Ongeldige Gemini API key',
          details: 'De Gemini API key is ongeldig. Controleer je API key in de environment variables.',
          type: 'api_key_error'
        }, { status: 401 })
      }
      
      if (error.message.includes('QUOTA_EXCEEDED')) {
        return NextResponse.json({
          error: 'API quota overschreden',
          details: 'Je hebt je Gemini API quota overschreden. Probeer het later opnieuw.',
          type: 'quota_error'
        }, { status: 429 })
      }
    }
    
    // Return a structured fallback response
    const fallbackAnalysis = `**📚 Documenten ontvangen**
Je hebt ${documents?.length || 0} schooldocument(en) geüpload die relevant zijn voor de module "${module}".

**💪 Sterke punten t.o.v. module doelen**
• Je documenten bieden concrete schoolcontext voor praktijkgerichte leerervaring
• Ze maken het mogelijk om theorie direct te koppelen aan jullie specifieke situatie
• Er is materiaal beschikbaar om realistische verbeteringen te identificeren

**🔧 Ontwikkelkansen**
• We kunnen samen onderzoeken hoe jullie huidige aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen praktische verbanden leggen tussen PABO-theorie en jullie schoolsituatie

**🎯 Aanbeveling**
Start met het bespreken van één specifiek document dat het meest relevant is voor de module "${module}".

**❓ Openingsvraag voor Chatbot**
Welk specifiek aspect van je schooldocumenten wil je als eerste bespreken in relatie tot de module "${module}"?`

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      analysisType: 'fallback',
      error: 'AI analyse niet beschikbaar, fallback gebruikt',
      documentsAnalyzed: documents?.length || 0,
      module: module
    })
  }
}