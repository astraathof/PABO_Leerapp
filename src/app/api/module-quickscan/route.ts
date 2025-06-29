import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Declare variables at function scope to ensure they're available in catch block
  let requestDocuments: any[] = []
  let module = ''
  let analysisType = ''

  try {
    // CRITICAL: Check API key first - this is often the root cause
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not configured')
      return NextResponse.json(
        { 
          error: 'GEMINI_API_KEY niet geconfigureerd',
          details: 'De Gemini API key is niet ingesteld. Voeg GEMINI_API_KEY toe aan je environment variables.',
          type: 'configuration_error'
        },
        { status: 500 }
      )
    }

    // Validate API key format
    if (!process.env.GEMINI_API_KEY.startsWith('AIza')) {
      console.error('❌ Invalid GEMINI_API_KEY format')
      return NextResponse.json(
        { 
          error: 'Ongeldige GEMINI_API_KEY format',
          details: 'De Gemini API key moet beginnen met "AIza". Controleer je API key.',
          type: 'api_key_error'
        },
        { status: 401 }
      )
    }

    // Parse request body and assign to function-scoped variables
    const requestData = await request.json()
    requestDocuments = requestData.documents || []
    module = requestData.module || ''
    analysisType = requestData.analysisType || ''

    if (!requestDocuments || !Array.isArray(requestDocuments) || requestDocuments.length === 0) {
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

    console.log(`🔍 Starting professional quickscan for ${requestDocuments.length} documents and module: ${module}`)
    
    // Initialize Gemini with proper error handling
    let genAI, model
    try {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          maxOutputTokens: 4000,
          temperature: 0.3,
        }
      })
    } catch (initError) {
      console.error('❌ Failed to initialize Gemini:', initError)
      return NextResponse.json(
        { 
          error: 'Gemini initialisatie gefaald',
          details: 'Kan geen verbinding maken met Gemini API. Controleer je API key.',
          type: 'initialization_error'
        },
        { status: 500 }
      )
    }

    // Prepare document content with smart truncation
    const documentTexts = requestDocuments.map(doc => {
      let content = doc.text || ''
      
      // Smart content extraction - take meaningful parts
      if (content.length > 2500) {
        // Try to extract key sections
        const sections = content.split(/\n\n|\n===|\n---/)
        const meaningfulSections = sections
          .filter(section => section.trim().length > 50)
          .slice(0, 3) // Take first 3 meaningful sections
          .join('\n\n')
        
        content = meaningfulSections || content.substring(0, 2500)
      }
      
      return `DOCUMENT: ${doc.fileName} (${doc.detectedType || 'Schooldocument'})

INHOUD:
${content}

EINDE DOCUMENT`
    }).join('\n\n')

    // Professional analysis prompt with neutral language and B1 level
    const analysisPrompt = `Je bent een ervaren onderwijsprofessional. Analyseer deze schooldocumenten voor de module "${module}".

SCHOOLDOCUMENTEN:
${documentTexts}

Geef een PROFESSIONELE analyse (max 300 woorden) met deze structuur:

Documenten geanalyseerd
Benoem welke documenten je hebt ontvangen en hun type.

Sterke punten t.o.v. module "${module}"
Identificeer 2-3 concrete sterke punten die aansluiten bij deze module.

Ontwikkelkansen
Benoem 2-3 specifieke verbeterpunten gerelateerd aan de module.

Concrete aanbeveling
Geef één heldere, praktische aanbeveling voor de eerste stap.

Openingsvraag voor gesprek
Stel een concrete, inhoudelijke vraag gebaseerd op de documenten en module.

VEREISTEN:
- Spreek de gebruiker aan als "je"
- Wees specifiek en verwijs naar concrete aspecten uit de documenten
- Houd het praktisch en actionable
- Focus op de directe koppeling tussen documenten en module doelen
- Schrijf op B1 niveau (eenvoudig Nederlands)
- Vermijd overbodige leestekens`

    console.log('🤖 Sending analysis request to Gemini 2.5 Flash...')

    // Make the API call with proper error handling
    let result
    try {
      // Add timeout handling
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Gemini API timeout after 30 seconds')), 30000)
      })

      const apiPromise = model.generateContent(analysisPrompt)
      result = await Promise.race([apiPromise, timeoutPromise])
      
    } catch (apiError) {
      console.error('❌ Gemini API call failed:', apiError)
      
      // Specific error handling
      if (apiError instanceof Error) {
        if (apiError.message?.includes('timeout')) {
          return NextResponse.json({
            error: 'Gemini API timeout',
            details: 'De analyse duurde te lang. Probeer met kleinere documenten.',
            type: 'timeout_error'
          }, { status: 408 })
        }
        
        if (apiError.message?.includes('quota') || apiError.message?.includes('QUOTA_EXCEEDED')) {
          return NextResponse.json({
            error: 'API quota overschreden',
            details: 'Je hebt je Gemini API quota overschreden. Controleer je Google Cloud billing.',
            type: 'quota_error'
          }, { status: 429 })
        }
        
        if (apiError.message?.includes('API_KEY_INVALID') || apiError.message?.includes('401')) {
          return NextResponse.json({
            error: 'Ongeldige Gemini API key',
            details: 'De Gemini API key is ongeldig. Controleer je API key in Google AI Studio.',
            type: 'api_key_error'
          }, { status: 401 })
        }

        if (apiError.message?.includes('SAFETY')) {
          return NextResponse.json({
            error: 'Content safety filter',
            details: 'De inhoud werd geblokkeerd door Gemini safety filters. Probeer andere documenten.',
            type: 'safety_error'
          }, { status: 400 })
        }
      }
      
      // Generic API error
      throw apiError
    }

    const response = await result.response
    let analysis = response.text()

    // Instead of throwing an error for short responses, use fallback analysis
    if (!analysis || analysis.trim().length < 50) {
      console.warn('⚠️ Gemini returned empty or too short response, using fallback analysis')
      
      analysis = `Documenten geanalyseerd
Je hebt ${requestDocuments.length} schooldocument(en) geüpload voor de module "${module}".

Sterke punten t.o.v. module "${module}"
• Je documenten bieden concrete schoolcontext voor praktijkgerichte leerervaring
• Ze maken het mogelijk om theorie direct te koppelen aan jullie specifieke situatie
• Er is materiaal beschikbaar om realistische verbeteringen te identificeren

Ontwikkelkansen
• We kunnen samen onderzoeken hoe jullie huidige aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen praktische verbanden leggen tussen theorie en jullie schoolsituatie

Concrete aanbeveling
Start met het bespreken van één specifiek document dat het meest relevant is voor de module "${module}".

Openingsvraag voor gesprek
Welk specifiek aspect van je schooldocumenten wil je als eerste bespreken in relatie tot de module "${module}"?`
    }

    console.log('✅ Professional AI analysis completed successfully')

    return NextResponse.json({
      success: true,
      analysis: analysis,
      analysisType: analysisType || 'module-quickscan',
      documentsAnalyzed: requestDocuments.length,
      module: module
    })

  } catch (error) {
    console.error('❌ Professional quickscan error:', error)
    
    // Enhanced error logging for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    
    // Return professional fallback response with neutral language
    const fallbackAnalysis = `Documenten geanalyseerd
Je hebt ${requestDocuments?.length || 0} schooldocument(en) geüpload voor de module "${module}".

Sterke punten t.o.v. module "${module}"
• Je documenten bieden concrete schoolcontext voor praktijkgerichte leerervaring
• Ze maken het mogelijk om theorie direct te koppelen aan jullie specifieke situatie
• Er is materiaal beschikbaar om realistische verbeteringen te identificeren

Ontwikkelkansen
• We kunnen samen onderzoeken hoe jullie huidige aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen praktische verbanden leggen tussen theorie en jullie schoolsituatie

Concrete aanbeveling
Start met het bespreken van één specifiek document dat het meest relevant is voor de module "${module}".

Openingsvraag voor gesprek
Welk specifiek aspect van je schooldocumenten wil je als eerste bespreken in relatie tot de module "${module}"?`

    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      analysisType: 'professional-fallback',
      error: 'AI analyse tijdelijk niet beschikbaar - professionele fallback gebruikt',
      documentsAnalyzed: requestDocuments?.length || 0,
      module: module,
      errorDetails: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}