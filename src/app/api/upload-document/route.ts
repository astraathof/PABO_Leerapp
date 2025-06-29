import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Enhanced PDF extraction with timeout handling and optimization
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    console.log('📖 Starting PDF text extraction with Gemini Vision...')
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    // Check file size and reject if too large (>5MB for better performance)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (buffer.length > maxSize) {
      console.log(`⚠️ PDF too large (${buffer.length} bytes), using fallback extraction`)
      return await fallbackPDFExtraction(buffer)
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        maxOutputTokens: 4000, // Limit output to prevent timeouts
      }
    })
    
    // Convert PDF buffer to base64
    const base64PDF = buffer.toString('base64')
    
    const pdfPart = {
      inlineData: {
        data: base64PDF,
        mimeType: 'application/pdf'
      }
    }

    // Simplified prompt to reduce processing time
    const prompt = `Extraheer de belangrijkste tekst uit dit PDF-document. Geef een beknopte samenvatting met:

1. DOCUMENT TYPE: Wat voor document dit is
2. HOOFDINHOUD: Belangrijkste tekst (max 500 woorden)
3. KERNPUNTEN: 3-5 belangrijkste onderwerpen

Houd het beknopt en focus op de essentie.`

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('PDF processing timeout')), 15000) // 15 second timeout
    })

    // Race between API call and timeout
    const apiPromise = model.generateContent([prompt, pdfPart])
    
    const result = await Promise.race([apiPromise, timeoutPromise])
    const response = await (result as any).response
    const extractedText = response.text()

    console.log('✅ PDF text extraction completed successfully with Gemini Vision')

    return `PDF DOCUMENT - TEKSTEXTRACTIE

=== DOCUMENT ANALYSE ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Gemini Vision AI (Geoptimaliseerd)
Geschikt voor: AI-analyse van PDF-inhoud

Dit document kan worden gebruikt voor onderwijsgesprekken en analyse.`

  } catch (error) {
    console.error('PDF extraction error:', error)
    
    // Use fallback extraction
    return await fallbackPDFExtraction(buffer)
  }
}

// Fallback PDF extraction method
async function fallbackPDFExtraction(buffer: Buffer): Promise<string> {
  try {
    console.log('🔄 Using fallback PDF extraction...')
    const pdfString = buffer.toString('binary')
    
    // Extract text patterns with improved regex
    const textPatterns = [
      /\(([^)]{10,100})\)/g,  // Text in parentheses (limited length)
      /[A-Za-z]{3,}(?:\s+[A-Za-z]{2,}){1,5}/g,  // Word sequences (limited)
      /\b[A-Z][a-z]+(?:\s+[a-z]+){0,3}\b/g  // Sentences (limited)
    ]
    
    let extractedText = ''
    textPatterns.forEach(pattern => {
      const matches = pdfString.match(pattern) || []
      extractedText += matches.slice(0, 10).join(' ') + ' ' // Limit matches
    })
    
    // Clean up extracted text
    extractedText = extractedText
      .replace(/[^\w\s\.\,\!\?\-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    if (extractedText.length > 50) {
      return `PDF DOCUMENT - BASIS TEKSTEXTRACTIE

=== GEËXTRAHEERDE INHOUD ===
${extractedText.substring(0, 1000)}${extractedText.length > 1000 ? '...' : ''}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Basis tekstextractie (fallback)
Geschikt voor: Beperkte AI-analyse

Dit document bevat schoolinformatie die kan worden besproken.`
    }
  } catch (fallbackError) {
    console.error('Fallback PDF extraction failed:', fallbackError)
  }
  
  return `PDF DOCUMENT - BESCHIKBAAR VOOR ANALYSE

Dit PDF-document is geüpload maar de automatische tekstextractie heeft een time-out gehad.

=== MOGELIJKE OORZAKEN ===
• Het PDF-bestand is te groot of complex voor snelle verwerking
• De AI-service heeft meer tijd nodig dan beschikbaar
• Het document bevat veel afbeeldingen of complexe opmaak

=== WAT KUN JE DOEN ===
• Probeer een kleiner PDF-bestand (onder 5MB)
• Converteer het PDF naar Word-formaat en upload opnieuw
• Upload het document als afbeelding (JPG/PNG) voor betere tekstherkenning
• Gebruik de AI-chat om specifieke vragen te stellen over dit type document

De AI kan nog steeds helpen met algemene vragen over dit type document.`
}

// Extract text from images using Gemini Vision with timeout handling
async function extractTextFromImage(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    console.log('🖼️ Starting image text extraction with Gemini Vision...')
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    // Check file size (limit to 4MB for images)
    const maxSize = 4 * 1024 * 1024 // 4MB
    if (buffer.length > maxSize) {
      return `AFBEELDING TE GROOT - BESCHIKBAAR VOOR ANALYSE

Deze afbeelding (${Math.round(buffer.length / 1024 / 1024)}MB) is te groot voor automatische tekstextractie.

=== WAT KUN JE DOEN ===
• Verklein de afbeelding tot onder 4MB
• Upload het document in een ander formaat (PDF, Word)
• Gebruik de AI-chat om vragen te stellen over dit type document`
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        maxOutputTokens: 3000, // Limit output
      }
    })
    
    const base64Image = buffer.toString('base64')
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    }

    // Simplified prompt for faster processing
    const prompt = `Lees alle tekst in deze afbeelding en geef een samenvatting:

1. DOCUMENT TYPE: Wat voor document dit is
2. BELANGRIJKSTE TEKST: Alle leesbare tekst (beknopt)
3. HOOFDONDERWERPEN: Belangrijkste thema's

Houd het beknopt en focus op de essentie.`

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Image processing timeout')), 12000) // 12 second timeout
    })

    const apiPromise = model.generateContent([prompt, imagePart])
    const result = await Promise.race([apiPromise, timeoutPromise])
    const response = await (result as any).response
    const extractedText = response.text()

    console.log('✅ Image text extraction completed successfully')

    return `AFBEELDING DOCUMENT - TEKSTEXTRACTIE

=== GEMINI VISION ANALYSE ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: Afbeelding (${mimeType})
Extractie: Gemini Vision AI (Geoptimaliseerd)
Geschikt voor: AI-analyse van visuele documenten

Dit document kan worden gebruikt voor onderwijsgesprekken.`

  } catch (error) {
    console.error('Image text extraction error:', error)
    return `AFBEELDING DOCUMENT - BESCHIKBAAR VOOR ANALYSE

Deze afbeelding is geüpload maar de automatische tekstextractie heeft een time-out gehad.

=== MOGELIJKE OORZAKEN ===
• De afbeelding is te complex voor snelle verwerking
• De AI-service heeft meer tijd nodig dan beschikbaar
• De afbeelding bevat veel tekst of complexe opmaak

=== WAT KUN JE DOEN ===
• Probeer een kleinere of scherpere afbeelding
• Upload het document in een ander formaat (PDF, Word)
• Gebruik de AI-chat om vragen te stellen over dit type document

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
      console.log('📖 Processing PDF with optimized extraction...')
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
      console.log('🖼️ Processing Image with optimized extraction...')
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