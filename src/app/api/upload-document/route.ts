import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// COMPLETELY REWRITTEN PDF extraction using Gemini Vision
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    console.log('📖 Starting PDF text extraction with Gemini Vision...')
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    // Convert PDF buffer to base64
    const base64PDF = buffer.toString('base64')
    
    const pdfPart = {
      inlineData: {
        data: base64PDF,
        mimeType: 'application/pdf'
      }
    }

    const prompt = `Analyseer dit PDF-document en extraheer alle tekst die je kunt lezen. 

Dit is waarschijnlijk een schooldocument. Geef een gestructureerde output met:

1. **DOCUMENT TYPE**: Wat voor soort document dit is (schoolplan, beleid, protocol, etc.)
2. **HOOFDINHOUD**: Alle belangrijke tekst die je kunt lezen
3. **KERNPUNTEN**: De belangrijkste onderwerpen en doelen
4. **PROCEDURES**: Eventuele procedures, stappen of richtlijnen
5. **CONTACTINFO**: Namen, functies, data die relevant zijn

Extraheer ALLE leesbare tekst, ook uit tabellen, lijsten en voetnoten. Geef de output in het Nederlands.`

    const result = await model.generateContent([prompt, pdfPart])
    const response = await result.response
    const extractedText = response.text()

    console.log('✅ PDF text extraction completed successfully with Gemini Vision')

    return `PDF DOCUMENT - VOLLEDIGE TEKSTEXTRACTIE

=== GEMINI VISION ANALYSE ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Gemini Vision AI (Volledige inhoud)
Geschikt voor: Volledige AI-analyse van alle PDF-inhoud

Dit document kan worden gebruikt voor:
- Inhoudelijke analyse van alle tekst
- Beleidsdiscussies gebaseerd op werkelijke inhoud
- Praktijkanalyse met concrete voorbeelden
- Theoriekoppeling aan echte schoolsituaties`

  } catch (error) {
    console.error('PDF extraction error:', error)
    
    // Fallback: Try basic text extraction
    try {
      console.log('🔄 Trying fallback PDF extraction...')
      const pdfString = buffer.toString('binary')
      
      // Extract text patterns
      const textPatterns = [
        /\(([^)]{10,})\)/g,  // Text in parentheses
        /[A-Za-z]{3,}(?:\s+[A-Za-z]{2,}){2,}/g,  // Word sequences
        /\b[A-Z][a-z]+(?:\s+[a-z]+)*\b/g  // Sentences
      ]
      
      let extractedText = ''
      textPatterns.forEach(pattern => {
        const matches = pdfString.match(pattern) || []
        extractedText += matches.slice(0, 20).join(' ') + ' '
      })
      
      if (extractedText.length > 100) {
        return `PDF DOCUMENT - TEKSTEXTRACTIE

=== GEËXTRAHEERDE INHOUD ===
${extractedText.substring(0, 2000)}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Basis tekstextractie
Geschikt voor: Beperkte AI-analyse

Dit document bevat schoolinformatie die kan worden besproken.`
      }
    } catch (fallbackError) {
      console.error('Fallback PDF extraction also failed:', fallbackError)
    }
    
    return `PDF DOCUMENT - BESCHIKBAAR VOOR ANALYSE

Dit PDF-document is geüpload maar de automatische tekstextractie is niet volledig gelukt.

=== MOGELIJKE OORZAKEN ===
• Het PDF bevat gescande afbeeldingen in plaats van tekst
• Het document is beveiligd tegen tekstextractie
• De PDF-structuur is complex

=== WAT KUN JE DOEN ===
• Upload het document als afbeelding (JPG/PNG) voor betere tekstherkenning
• Converteer het PDF naar Word-formaat en upload opnieuw
• Gebruik de AI-chat om specifieke vragen te stellen over dit document

De AI kan nog steeds helpen met algemene vragen over dit type document.`
  }
}

// Extract text from images using Gemini Vision
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

Dit is waarschijnlijk een schooldocument. Geef een gestructureerde output met:

1. **DOCUMENT TYPE**: Wat voor soort document dit lijkt te zijn
2. **ALLE ZICHTBARE TEKST**: Letterlijk alle tekst die je kunt lezen, inclusief:
   - Hoofdteksten en titels
   - Lijsten en opsommingen
   - Tabellen en schema's
   - Voetnoten en bijschriften
   - Namen, data, contactgegevens
3. **HOOFDONDERWERPEN**: Welke onderwijsthema's worden behandeld
4. **BELANGRIJKE INFORMATIE**: Kernpunten, doelen, procedures
5. **STRUCTUUR**: Hoe het document is opgebouwd

Lees ALLES wat zichtbaar is, ook kleine tekst. Geef de output in het Nederlands.`

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const extractedText = response.text()

    console.log('✅ Image text extraction completed successfully')

    return `AFBEELDING DOCUMENT - VOLLEDIGE TEKSTEXTRACTIE

=== GEMINI VISION ANALYSE ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: Afbeelding (${mimeType})
Extractie: Gemini Vision AI (Volledige OCR)
Geschikt voor: Volledige AI-analyse van visuele documenten

Dit document kan worden gebruikt voor:
- Analyse van alle zichtbare tekst en inhoud
- Bespreking van beleidsdocumenten in afbeeldingsvorm
- Evaluatie van formulieren en procedures
- Koppeling tussen visuele informatie en onderwijstheorie`

  } catch (error) {
    console.error('Image text extraction error:', error)
    return `AFBEELDING DOCUMENT - BESCHIKBAAR VOOR ANALYSE

Deze afbeelding is geüpload maar de automatische tekstextractie is niet gelukt.

=== MOGELIJKE OORZAKEN ===
• De afbeelding is onduidelijk of van lage kwaliteit
• Er staat weinig of geen tekst in de afbeelding
• De API-service is tijdelijk niet beschikbaar

=== WAT KUN JE DOEN ===
• Probeer een scherpere afbeelding te uploaden
• Zorg dat de tekst goed leesbaar is
• Upload het document in een ander formaat (PDF, Word)

De AI kan nog steeds helpen met vragen over dit type document.`
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
    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      console.log('📖 Processing PDF with Gemini Vision...')
      extractedText = await extractTextFromPDF(buffer)
      documentType = 'PDF'
    } else if (file.name.toLowerCase().endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
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
    } else if (file.name.toLowerCase().endsWith('.txt') || file.type === 'text/plain') {
      console.log('📝 Processing TXT...')
      extractedText = buffer.toString('utf-8') || 'Tekstbestand inhoud beschikbaar'
      documentType = 'Tekst'
      
      if (extractedText.length > 20) {
        extractedText += `\n\n=== DOCUMENT INFO ===\nBestandstype: Platte tekst\nExtractie: Volledig\nGeschikt voor: Volledige AI-analyse`
      }
    } else if (file.type.startsWith('image/')) {
      console.log('🖼️ Processing Image with Gemini Vision...')
      // Handle image files
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
    } else if (fileName.includes('gedrag') || fileName.includes('protocol') || content.includes('gedragsprotocol') || content.includes('gedrag')) {
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