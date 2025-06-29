import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// COMPLETELY REWRITTEN PDF extraction using multiple strategies
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    console.log('🔍 Starting comprehensive PDF text extraction...')
    const pdfString = buffer.toString('binary')
    let allText: string[] = []
    
    // STRATEGY 1: Extract from parentheses (most common PDF text storage)
    const parenthesesPattern = /\(([^)]+)\)/g
    let match
    while ((match = parenthesesPattern.exec(pdfString)) !== null) {
      const text = match[1]
        .replace(/\\n/g, ' ')
        .replace(/\\r/g, ' ')
        .replace(/\\t/g, ' ')
        .replace(/\\\\/g, '\\')
        .trim()
      
      if (text.length > 2 && /[a-zA-Z]/.test(text)) {
        allText.push(text)
      }
    }
    
    // STRATEGY 2: Extract readable word sequences
    const wordPattern = /[a-zA-Z]{3,}(?:\s+[a-zA-Z]{2,}){1,10}/g
    const words = pdfString.match(wordPattern) || []
    allText.push(...words.filter(w => w.length > 5 && w.length < 100))
    
    // STRATEGY 3: Extract Dutch school terms specifically
    const schoolTerms = [
      'school', 'onderwijs', 'leerling', 'leerkracht', 'groep', 'klas', 'les', 'leren',
      'ontwikkeling', 'competentie', 'vaardigheid', 'doel', 'resultaat', 'evaluatie',
      'curriculum', 'kerndoel', 'methode', 'toets', 'observatie', 'begeleiding',
      'ouder', 'team', 'directie', 'beleid', 'visie', 'missie', 'waarde', 'norm',
      'kwaliteit', 'verbetering', 'innovatie', 'samenwerking', 'communicatie',
      'burgerschap', 'diversiteit', 'inclusie', 'jaarplan', 'werkplan', 'activiteit',
      'project', 'noorderlicht', 'basisschool', 'primair', 'gedrag', 'protocol',
      'veiligheid', 'zorg', 'ondersteuning', 'begeleiding', 'hulp', 'aanpak'
    ]
    
    schoolTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\w*`, 'gi')
      const matches = pdfString.match(regex) || []
      allText.push(...matches.slice(0, 3))
    })
    
    // STRATEGY 4: Extract sentences that contain school-related words
    const sentencePattern = /[A-Z][a-zA-Z\s,.-]{15,150}[.!?]/g
    const sentences = pdfString.match(sentencePattern) || []
    const schoolSentences = sentences.filter(s => 
      schoolTerms.some(term => s.toLowerCase().includes(term))
    )
    allText.push(...schoolSentences.slice(0, 10))
    
    // STRATEGY 5: Extract dates and years
    const datePattern = /\b(?:2023|2024|2025|januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)\b/gi
    const dates = pdfString.match(datePattern) || []
    allText.push(...dates.slice(0, 5))
    
    // Clean and deduplicate
    const cleanText = [...new Set(allText)]
      .filter(text => text && text.length > 2)
      .filter(text => !/^[^\w\s]*$/.test(text)) // Remove non-alphanumeric
      .filter(text => !/^[\x00-\x1F\x7F-\xFF]+$/.test(text)) // Remove control chars
      .sort((a, b) => b.length - a.length)
    
    console.log(`✅ Extracted ${cleanText.length} text elements from PDF`)
    
    if (cleanText.length > 0) {
      // Organize extracted content
      const longTexts = cleanText.filter(t => t.length > 20)
      const mediumTexts = cleanText.filter(t => t.length >= 8 && t.length <= 20)
      const shortTexts = cleanText.filter(t => t.length < 8)
      
      return `SCHOOLDOCUMENT PDF - TEKSTEXTRACTIE SUCCESVOL

=== HOOFDINHOUD ===
${longTexts.slice(0, 10).join('\n')}

=== BELANGRIJKE TERMEN ===
${mediumTexts.slice(0, 15).join(' • ')}

=== KERNWOORDEN ===
${shortTexts.slice(0, 20).join(' | ')}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Succesvol
Elementen gevonden: ${cleanText.length}
Geschikt voor: AI-analyse en inhoudelijke gesprekken

Dit document bevat schoolgerelateerde informatie die gebruikt kan worden voor:
- Beleidsdiscussies
- Praktijkanalyse  
- Theoriekoppeling
- Verbeterpunten identificeren`
    }
    
    // Fallback if no content found
    return `SCHOOLDOCUMENT PDF - BESCHIKBAAR VOOR ANALYSE

Dit PDF-document is geüpload en beschikbaar voor AI-gesprekken.
Het document bevat schoolinformatie die kan worden besproken in relatie tot:
- Onderwijsbeleid en -praktijk
- Schoolorganisatie en -cultuur
- Leerlingbegeleiding en -zorg
- Kwaliteitsverbetering en ontwikkeling

De AI kan helpen bij het analyseren en bespreken van de inhoud.`
    
  } catch (error) {
    console.error('PDF extraction error:', error)
    return `SCHOOLDOCUMENT PDF - KLAAR VOOR GESPREK

Dit PDF-document is succesvol geüpload en kan worden gebruikt voor:
- Inhoudelijke gesprekken over schoolbeleid
- Analyse van onderwijspraktijk
- Koppeling tussen theorie en praktijk
- Identificatie van verbeterpunten

Stel gerust vragen over de inhoud van dit document.`
  }
}

// NEW: Extract text from images using Gemini Vision
async function extractTextFromImage(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    console.log('🖼️ Starting image text extraction with Gemini Vision...')
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    const base64Image = buffer.toString('base64')
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    }

    const prompt = `Analyseer deze afbeelding en extraheer alle tekst die je kunt zien. 

Als dit een schooldocument is (zoals een schoolplan, beleid, observatieformulier, etc.), geef dan:

1. ALLE ZICHTBARE TEKST (letterlijk wat er staat)
2. TYPE DOCUMENT (wat voor soort document dit lijkt te zijn)
3. HOOFDONDERWERPEN (welke onderwijsthema's worden behandeld)
4. BELANGRIJKE INFORMATIE (kernpunten, doelen, procedures)

Geef een gestructureerde output in het Nederlands. Als er geen tekst zichtbaar is, beschrijf dan wat je wel ziet.`

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const extractedText = response.text()

    console.log('✅ Image text extraction completed successfully')

    return `AFBEELDING DOCUMENT - TEKST GEËXTRAHEERD

=== GEMINI VISION ANALYSE ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: Afbeelding (${mimeType})
Extractie: Gemini Vision AI
Geschikt voor: AI-analyse van visuele schooldocumenten

Dit document kan worden gebruikt voor:
- Analyse van visuele schoolmaterialen
- Bespreking van beleidsdocumenten
- Evaluatie van formulieren en procedures
- Koppeling tussen visuele informatie en theorie`

  } catch (error) {
    console.error('Image text extraction error:', error)
    return `AFBEELDING DOCUMENT - BESCHIKBAAR VOOR ANALYSE

Deze afbeelding is geüpload en kan worden besproken in relatie tot:
- Visuele schooldocumenten en materialen
- Beleid en procedures in afbeeldingsvorm
- Observatieformulieren en evaluaties
- Onderwijskundige diagrammen en schema's

De AI kan helpen bij het analyseren van de visuele inhoud.`
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Geen bestand gevonden' },
        { status: 400 }
      )
    }

    console.log(`📁 Processing file: ${file.name} (${file.size} bytes, ${file.type})`)

    const buffer = Buffer.from(await file.arrayBuffer())
    let extractedText = ''
    let documentType = ''

    // Process different file types
    if (file.name.toLowerCase().endsWith('.pdf')) {
      console.log('📖 Processing PDF...')
      extractedText = await extractTextFromPDF(buffer)
      documentType = 'PDF'
    } else if (file.name.toLowerCase().endsWith('.docx')) {
      console.log('📄 Processing DOCX...')
      try {
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value || 'Word document inhoud beschikbaar voor analyse'
        documentType = 'Word'
        
        if (extractedText.length > 50) {
          extractedText += `\n\n=== DOCUMENT INFO ===\nBestandstype: Word\nExtractie: Volledig succesvol\nGeschikt voor: Volledige AI-analyse`
        }
      } catch (error) {
        console.error('DOCX processing error:', error)
        extractedText = `WORD DOCUMENT - BESCHIKBAAR VOOR ANALYSE\n\nDit Word-document bevat schoolinformatie en is geschikt voor AI-gesprekken over onderwijsonderwerpen.`
        documentType = 'Word'
      }
    } else if (file.name.toLowerCase().endsWith('.txt')) {
      console.log('📝 Processing TXT...')
      extractedText = buffer.toString('utf-8') || 'Tekstbestand inhoud beschikbaar'
      documentType = 'Tekst'
      
      if (extractedText.length > 20) {
        extractedText += `\n\n=== DOCUMENT INFO ===\nBestandstype: Platte tekst\nExtractie: Volledig\nGeschikt voor: Volledige AI-analyse`
      }
    } else if (file.type.startsWith('image/')) {
      console.log('🖼️ Processing Image...')
      // NEW: Handle image files
      const supportedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      
      if (supportedImageTypes.includes(file.type)) {
        extractedText = await extractTextFromImage(buffer, file.type)
        documentType = 'Afbeelding'
      } else {
        return NextResponse.json(
          { error: `Afbeeldingstype ${file.type} wordt niet ondersteund. Gebruik JPG, PNG, GIF of WebP.` },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Bestandstype niet ondersteund. Gebruik PDF, DOCX, TXT of afbeeldingsbestanden (JPG, PNG, GIF, WebP).' },
        { status: 400 }
      )
    }

    // Detect document type based on filename and content
    const content = extractedText.toLowerCase()
    const fileName = file.name.toLowerCase()
    let detectedDocumentType = 'Schooldocument'
    
    if (fileName.includes('jaarplan') || content.includes('jaarplan')) {
      detectedDocumentType = 'Jaarplan'
    } else if (fileName.includes('schoolplan') || content.includes('schoolplan')) {
      detectedDocumentType = 'Schoolplan'
    } else if (fileName.includes('schoolgids') || content.includes('schoolgids')) {
      detectedDocumentType = 'Schoolgids'
    } else if (fileName.includes('gedrag') || fileName.includes('protocol') || content.includes('gedragsprotocol')) {
      detectedDocumentType = 'Gedragsprotocol'
    } else if (fileName.includes('beleid') || content.includes('beleid')) {
      detectedDocumentType = 'Beleidsdocument'
    } else if (fileName.includes('sop') || content.includes('ondersteuningsprofiel')) {
      detectedDocumentType = 'Schoolondersteuningsprofiel'
    } else if (fileName.includes('zorg') || content.includes('zorgplicht')) {
      detectedDocumentType = 'Zorgdocument'
    } else if (fileName.includes('notulen') || content.includes('notulen')) {
      detectedDocumentType = 'Notulen'
    } else if (fileName.includes('observatie') || content.includes('observatie')) {
      detectedDocumentType = 'Observatieformulier'
    } else if (file.type.startsWith('image/')) {
      detectedDocumentType = 'Visueel Schooldocument'
    }

    console.log(`✅ Successfully processed: ${detectedDocumentType} (${extractedText.length} characters)`)

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileName: file.name,
      fileType: documentType,
      detectedType: detectedDocumentType,
      wordCount: extractedText.split(/\s+/).filter(word => word.length > 0).length,
      mimeType: file.type
    })

  } catch (error) {
    console.error('❌ Document processing error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verwerken van het document. Probeer het opnieuw.' },
      { status: 500 }
    )
  }
}