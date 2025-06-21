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

    let analysisPrompt = ''

    switch (analysisType) {
      case 'schoolplan-analyse':
        analysisPrompt = `
Analyseer dit schoolplan/schoolgids document als PABO-expert. Geef een gestructureerde analyse:

DOCUMENT TYPE: ${documentType}
MODULE CONTEXT: ${module}

ANALYSEER OP:
1. **Visie & Missie**: Wat is de kernvisie van de school? Hoe concreet is deze?
2. **Onderwijskundige Uitgangspunten**: Welke didactische principes hanteert de school?
3. **Kwaliteitszorg**: Hoe monitort de school resultaten en verbetert het onderwijs?
4. **Burgerschap & Sociale Veiligheid**: Hoe wordt dit vormgegeven?
5. **Differentiatie & Zorg**: Welke aanpak heeft de school voor verschillende leerlingen?
6. **Leiderschap & Organisatie**: Hoe is de school georganiseerd?

GEEF VOOR ELKE CATEGORIE:
- Wat staat er letterlijk in het document?
- Wat betekent dit in de praktijk?
- Welke PABO-competenties zijn hier relevant?
- Concrete vragen voor reflectie

DOCUMENT TEKST:
${documentText.substring(0, 8000)}
`
        break

      case 'curriculum-koppeling':
        analysisPrompt = `
Analyseer dit document vanuit curriculum perspectief voor PABO-studenten:

DOCUMENT TYPE: ${documentType}
MODULE: ${module}

ZOEK NAAR EN ANALYSEER:
1. **Kerndoelen**: Welke van de 58 kerndoelen worden genoemd?
2. **Leerlijnen**: Hoe worden leerlijnen uitgewerkt?
3. **Jaarplanning**: Hoe is het curriculum over het jaar verdeeld?
4. **Vakintegratie**: Hoe worden vakken gekoppeld?
5. **21e-eeuwse Vaardigheden**: Welke moderne vaardigheden worden genoemd?

KOPPEL AAN PABO-THEORIE:
- Welke theoretische concepten herken je?
- Hoe sluit dit aan bij wat je geleerd hebt?
- Wat zou je anders doen en waarom?

DOCUMENT TEKST:
${documentText.substring(0, 8000)}
`
        break

      case 'praktijk-reflectie':
        analysisPrompt = `
Help deze PABO-student reflecteren op dit schooldocument:

DOCUMENT TYPE: ${documentType}
MODULE: ${module}

REFLECTIEVRAGEN:
1. **Herkenning**: Wat herken je uit je eigen schoolervaring?
2. **Theorie-Praktijk**: Welke PABO-theorie zie je terug in dit document?
3. **Kritische Blik**: Wat zou je willen verbeteren of anders doen?
4. **Eigen Ontwikkeling**: Wat leer je hiervan voor je eigen praktijk?
5. **Vervolgstappen**: Welke vragen roept dit bij je op?

SOCRATISCHE BENADERING:
- Stel open vragen die tot nadenken aanzetten
- Help verbanden leggen tussen theorie en praktijk
- Moedig kritisch denken aan
- Laat de student zelf conclusies trekken

DOCUMENT TEKST:
${documentText.substring(0, 8000)}
`
        break

      default:
        analysisPrompt = `
Geef een algemene analyse van dit document voor PABO-studenten:

DOCUMENT TYPE: ${documentType}

ANALYSEER:
1. Hoofdthema's en kernpunten
2. Relevantie voor onderwijspraktijk
3. Koppeling aan PABO-competenties
4. Praktische toepassingsmogelijkheden
5. Reflectievragen voor studenten

DOCUMENT TEKST:
${documentText.substring(0, 8000)}
`
    }

    const result = await model.generateContent(analysisPrompt)
    const response = await result.response
    const analysis = response.text()

    return NextResponse.json({
      success: true,
      analysis: analysis,
      analysisType: analysisType
    })

  } catch (error) {
    console.error('Document analysis error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het analyseren van het document' },
      { status: 500 }
    )
  }
}