import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Module-specifieke leerdoelen en competenties
const moduleLeerdoelen = {
  'module1': {
    titel: 'Curriculum & Kerndoelen',
    leerdoelen: [
      'Alle 58 kerndoelen beheersen en kunnen toepassen',
      'Kerndoelen vertalen naar concrete lesdoelen',
      'Curriculum mapping effectief inzetten',
      'Progressie monitoren per groep',
      'Doorlopende leerlijnen waarborgen'
    ],
    competenties: ['Vakdidactiek', 'Curriculum ontwikkeling', 'Leerlijnen', 'Toetsing']
  },
  'module2': {
    titel: 'Ontwikkelingspsychologie',
    leerdoelen: [
      'Ontwikkelingsstadia herkennen en toepassen',
      'Theorie koppelen aan onderwijspraktijk',
      'Leeftijdsadequaat onderwijs vormgeven',
      'Individuele verschillen begrijpen',
      'Ontwikkelingsgerichte observatie uitvoeren'
    ],
    competenties: ['Pedagogiek', 'Ontwikkelingspsychologie', 'Observatie', 'Differentiatie']
  },
  'module3': {
    titel: 'SEL & Klassenmanagement',
    leerdoelen: [
      'SEL-methodieken vergelijken en implementeren',
      'Positief klassenklimaat creëren',
      'Sociale vaardigheden ontwikkelen',
      'Conflicten constructief oplossen',
      'Emotionele veiligheid waarborgen'
    ],
    competenties: ['Klassenmanagement', 'SEL', 'Sociale vaardigheden', 'Conflicthantering']
  },
  'module4': {
    titel: 'Differentiatie & Inclusie',
    leerdoelen: [
      'Differentiatie strategieën toepassen',
      'Inclusief onderwijs vormgeven',
      'Adaptief onderwijs implementeren',
      'Alle leerlingen laten slagen',
      'Ondersteuningsbehoeften herkennen'
    ],
    competenties: ['Inclusief onderwijs', 'Differentiatie', 'Adaptief onderwijs', 'Ondersteuning']
  },
  'module5': {
    titel: 'Data & Evaluatie',
    leerdoelen: [
      'Data interpreteren en gebruiken',
      'Formatieve evaluatie toepassen',
      'Evidence-based werken',
      'Leerresultaten systematisch verbeteren',
      'Toetsing en beoordeling optimaliseren'
    ],
    competenties: ['Data-analyse', 'Evaluatie', 'Toetsing', 'Evidence-based practice']
  },
  'module6': {
    titel: '21e-eeuwse Vaardigheden',
    leerdoelen: [
      '21e-eeuwse vaardigheden integreren',
      'Design thinking toepassen',
      'Digitale geletterdheid ontwikkelen',
      'Innovatief onderwijs vormgeven',
      'Computational thinking stimuleren'
    ],
    competenties: ['21e-eeuwse vaardigheden', 'Design thinking', 'Digitale geletterdheid', 'Innovatie']
  },
  'module7': {
    titel: 'Schoolleiderschap',
    leerdoelen: [
      'Pedagogisch leiderschap ontwikkelen',
      'Veranderprocessen leiden',
      'Teamontwikkeling faciliteren',
      'Schoolcultuur vormgeven',
      'Strategisch denken en handelen'
    ],
    competenties: ['Leiderschap', 'Verandermanagement', 'Teamontwikkeling', 'Strategisch denken']
  },
  'module8': {
    titel: 'Burgerschap & Diversiteit',
    leerdoelen: [
      'Burgerschapsonderwijs vormgeven',
      'Democratische waarden overdragen',
      'Diversiteit waarderen en benutten',
      'Sociale cohesie bevorderen',
      'Interculturele competentie ontwikkelen'
    ],
    competenties: ['Burgerschap', 'Diversiteit', 'Interculturele competentie', 'Democratie']
  },
  'module9': {
    titel: 'Cito & Monitoring',
    leerdoelen: [
      'Cito A-E en I-V niveaus beheersen',
      'Monitoring groep 1-8 organiseren',
      'Coördinatorrollen effectief invullen',
      'Data-gedreven schoolverbetering',
      'Interventies plannen en evalueren'
    ],
    competenties: ['Cito-monitoring', 'Data-analyse', 'Coördinatie', 'Interventies']
  },
  'module10': {
    titel: 'Inspectie Onderzoekskader',
    leerdoelen: [
      'Alle 5 inspectiestandaarden beheersen',
      'Zelfevaluatie systematisch uitvoeren',
      'Inspectiebezoek professioneel voorbereiden',
      'Kwaliteitszorg cyclisch organiseren',
      'Verbeterplannen opstellen en monitoren'
    ],
    competenties: ['Kwaliteitszorg', 'Inspectie', 'Zelfevaluatie', 'Schoolontwikkeling']
  },
  'module11': {
    titel: 'MR & WMS',
    leerdoelen: [
      'Alle MR-rechten en -plichten beheersen',
      'WMS-procedures correct toepassen',
      'Effectief samenwerken met MR',
      'Geschillen voorkomen en oplossen',
      'Borgingsmechanismen implementeren'
    ],
    competenties: ['Medezeggenschap', 'WMS', 'Samenwerking', 'Juridische kennis']
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY niet geconfigureerd' },
        { status: 500 }
      )
    }

    const { documents, moduleId, userLevel } = await request.json()

    if (!documents || documents.length === 0) {
      return NextResponse.json(
        { error: 'Geen documenten gevonden voor analyse' },
        { status: 400 }
      )
    }

    const moduleInfo = moduleLeerdoelen[moduleId as keyof typeof moduleLeerdoelen]
    if (!moduleInfo) {
      return NextResponse.json(
        { error: 'Onbekende module' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Prepare document content
    const documentContent = documents.map((doc: any) => 
      `**${doc.fileName}** (${doc.detectedType})\n${doc.text.substring(0, 2000)}`
    ).join('\n\n')

    const quickscanPrompt = `Je bent een ervaren PABO-docent die een quickscan uitvoert van schooldocumenten.

**MODULE:** ${moduleInfo.titel}

**MODULE LEERDOELEN:**
${moduleInfo.leerdoelen.map((doel, i) => `${i + 1}. ${doel}`).join('\n')}

**COMPETENTIES:**
${moduleInfo.competenties.join(', ')}

**SCHOOLDOCUMENTEN:**
${documentContent}

**OPDRACHT:**
Maak een beknopte quickscan (max 200 woorden) met deze exacte structuur:

**📚 Documenten Quickscan**
[Benoem kort welke documenten je hebt ontvangen]

**💪 Sterke Punten (t.o.v. module leerdoelen)**
• [Punt 1 - specifiek gekoppeld aan leerdoel]
• [Punt 2 - specifiek gekoppeld aan leerdoel]
• [Punt 3 - specifiek gekoppeld aan leerdoel]

**🔧 Ontwikkelpunten**
• [Punt 1 - concrete verbetering]
• [Punt 2 - concrete verbetering]
• [Punt 3 - concrete verbetering]

**🎯 Aanbeveling**
[Eén concrete actie voor de gebruiker]

**❓ Openingsvraag voor Chatbot**
[Formuleer een inhoudelijke vraag die voortbouwt op de analyse en past bij de module]

VEREISTEN:
- Wees specifiek en verwijs naar documentinhoud
- Koppel alles aan de module leerdoelen
- Houd het beknopt en praktisch
- Spreek de gebruiker aan als "je"
- Gebruik Nederlandse onderwijsterminologie`

    console.log('🔍 Starting module quickscan...')

    const result = await model.generateContent(quickscanPrompt)
    const response = await result.response
    const quickscanResult = response.text()

    // Extract opening question for chatbot
    const questionMatch = quickscanResult.match(/\*\*❓.*?\*\*\s*(.+?)(?:\n|$)/i)
    const openingQuestion = questionMatch ? questionMatch[1].trim() : 
      `Welk aspect van je ${moduleInfo.titel.toLowerCase()} wil je als eerste verdiepen?`

    console.log('✅ Module quickscan completed successfully')

    return NextResponse.json({
      success: true,
      quickscan: quickscanResult,
      openingQuestion: openingQuestion,
      moduleInfo: moduleInfo,
      documentsAnalyzed: documents.length
    })

  } catch (error) {
    console.error('Module quickscan error:', error)
    
    // Fallback response
    const moduleInfo = moduleLeerdoelen[request.json().then(data => data.moduleId) as keyof typeof moduleLeerdoelen] || moduleLeerdoelen['module1']
    
    const fallbackQuickscan = `**📚 Documenten Quickscan**
Je hebt schooldocumenten geüpload die relevant zijn voor ${moduleInfo?.titel}.

**💪 Sterke Punten (t.o.v. module leerdoelen)**
• Je documenten bieden concrete schoolcontext voor praktijkgericht leren
• Ze maken het mogelijk om theorie direct te koppelen aan jullie specifieke situatie
• Er is materiaal beschikbaar om realistische verbeteringen te identificeren

**🔧 Ontwikkelpunten**
• We kunnen samen onderzoeken hoe jullie huidige aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen praktische verbanden leggen tussen theorie en jullie schoolsituatie

**🎯 Aanbeveling**
Start met het bespreken van één specifiek aspect uit je documenten dat je wilt verbeteren.

**❓ Openingsvraag voor Chatbot**
Welk onderdeel van je schooldocumenten wil je als eerste bespreken in relatie tot ${moduleInfo?.titel}?`

    return NextResponse.json({
      success: true,
      quickscan: fallbackQuickscan,
      openingQuestion: `Welk aspect van ${moduleInfo?.titel} wil je verdiepen?`,
      moduleInfo: moduleInfo,
      documentsAnalyzed: 0,
      fallback: true
    })
  }
}