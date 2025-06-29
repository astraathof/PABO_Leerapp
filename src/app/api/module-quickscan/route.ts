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

    const { documents, module, analysisType } = await request.json()

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { error: 'Geen documenten gevonden voor analyse' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Prepare document content for analysis with text truncation to prevent token limit issues
    const documentContent = documents.map((doc: any) => {
      // Truncate document text to prevent token limit issues (max 2000 characters per document)
      const truncatedText = doc.text.length > 2000 
        ? doc.text.substring(0, 2000) + '...[tekst ingekort]'
        : doc.text

      return `**DOCUMENT: ${doc.fileName}** (${doc.detectedType})
      
**INHOUD:**
${truncatedText}

**EINDE DOCUMENT**`
    }).join('\n\n')

    // Create analysis prompt based on module
    const analysisPrompt = `Je bent een ervaren PABO-docent die schooldocumenten analyseert voor de module "${module}".

SCHOOLDOCUMENTEN:
${documentContent}

Geef een BEKNOPTE quickscan analyse (max 200 woorden) met deze structuur:

**📚 Documenten Quickscan**
Benoem kort welke documenten je hebt geanalyseerd.

**💪 Sterke Punten**
Identificeer 2-3 sterke punten die aansluiten bij de module "${module}".

**🔧 Ontwikkelpunten**
Benoem 2-3 concrete verbeterpunten gerelateerd aan de module.

**❓ Openingsvraag voor Chatbot**
Stel een concrete vraag gebaseerd op de documenten en module.

VEREISTEN:
- Spreek de gebruiker aan als "je"
- Wees specifiek en praktisch
- Verwijs naar aspecten uit de documenten
- Houd het beknopt en to-the-point
- Focus op de koppeling tussen documenten en module doelen`

    console.log('🤖 Starting module quickscan analysis...')

    const result = await model.generateContent(analysisPrompt)
    const response = await result.response
    const analysis = response.text()

    console.log('✅ Module quickscan completed successfully')

    // Extract the opening question for the chatbot
    const questionMatch = analysis.match(/\*\*❓.*?\*\*\s*(.+?)(?:\n|$)/i) ||
                         analysis.match(/Openingsvraag.*?:\s*(.+?)(?:\n|$)/i)
    
    const openingQuestion = questionMatch ? questionMatch[1].trim() : 
      `Welk aspect van je documenten wil je als eerste bespreken voor de module "${module}"?`

    return NextResponse.json({
      success: true,
      analysis: analysis,
      openingQuestion: openingQuestion,
      module: module,
      documentCount: documents.length
    })

  } catch (error) {
    console.error('Module quickscan error:', error)
    
    // Return a structured fallback response
    const fallbackAnalysis = `**📚 Documenten Quickscan**
Je hebt ${documents?.length || 0} schooldocument(en) geüpload voor de module "${module}".

**💪 Sterke Punten**
• Je documenten bieden concrete schoolcontext voor praktijkgerichte leerervaring
• Ze maken het mogelijk om theorie direct te koppelen aan jullie specifieke situatie
• Er is materiaal beschikbaar om realistische verbeteringen te identificeren

**🔧 Ontwikkelpunten**
• We kunnen samen onderzoeken hoe jullie huidige aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen praktische verbanden leggen tussen theorie en jullie schoolsituatie

**❓ Openingsvraag voor Chatbot**
Welk specifiek aspect van je schooldocumenten wil je als eerste bespreken in relatie tot de module "${module}"?`

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      openingQuestion: `Welk aspect van je schooldocumenten is het meest relevant voor de module "${module}"?`,
      module: module,
      documentCount: documents?.length || 0,
      fallback: true
    })
  }
}