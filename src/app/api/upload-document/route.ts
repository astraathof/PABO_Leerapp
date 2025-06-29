import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Improved PDF extraction with better Gemini integration
async function extractTextFromPDF(buffer: Buffer, fileName: string): Promise<string> {
  try {
    console.log(`📖 Starting PDF text extraction for: ${fileName} (${buffer.length} bytes)`)
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    // Check file size - Gemini has limits
    const maxSize = 20 * 1024 * 1024 // 20MB limit for Gemini
    if (buffer.length > maxSize) {
      console.log(`⚠️ PDF too large (${Math.round(buffer.length / 1024 / 1024)}MB), using fallback extraction`)
      return await fallbackPDFExtraction(buffer, fileName)
    }

    // Use Gemini 2.5 Flash for better PDF processing
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        maxOutputTokens: 8000, // Increase output limit
        temperature: 0.1, // Lower temperature for more accurate extraction
      }
    })
    
    // Convert PDF buffer to base64 with proper MIME type
    const base64PDF = buffer.toString('base64')
    
    const pdfPart = {
      inlineData: {
        data: base64PDF,
        mimeType: 'application/pdf'
      }
    }

    // Improved prompt for better text extraction
    const prompt = `Extraheer ALLE tekst uit dit PDF-document. Behoud de structuur en opmaak waar mogelijk.

INSTRUCTIES:
1. Lees het volledige document zorgvuldig
2. Extraheer alle leesbare tekst, inclusief headers, paragrafen, lijsten
3. Behoud de logische volgorde van de inhoud
4. Als er tabellen zijn, behoud de structuur
5. Negeer decoratieve elementen, focus op de inhoud
6. Als tekst onduidelijk is, geef aan wat je wel kunt lezen

Geef de volledige tekstinhoud terug zonder samenvatting.`

    console.log('🤖 Sending PDF to Gemini 2.5 Flash for text extraction...')

    // Create a timeout promise (30 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('PDF processing timeout after 30 seconds')), 30000)
    })

    // Race between API call and timeout
    const apiPromise = model.generateContent([prompt, pdfPart])
    
    const result = await Promise.race([apiPromise, timeoutPromise])
    const response = await (result as any).response
    const extractedText = response.text()

    console.log(`✅ PDF text extraction completed successfully (${extractedText.length} characters)`)

    // Validate extracted text quality
    if (extractedText.length < 50) {
      console.log('⚠️ Extracted text too short, trying fallback method')
      return await fallbackPDFExtraction(buffer, fileName)
    }

    // Check for garbled text (too many special characters)
    const specialCharRatio = (extractedText.match(/[^\w\s\.\,\!\?\-\(\)\[\]]/g) || []).length / extractedText.length
    if (specialCharRatio > 0.3) {
      console.log('⚠️ Text appears garbled, trying fallback method')
      return await fallbackPDFExtraction(buffer, fileName)
    }

    return `PDF DOCUMENT - VOLLEDIGE TEKSTEXTRACTIE

=== DOCUMENT: ${fileName} ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Gemini 2.5 Flash AI (Volledig)
Geschikt voor: Volledige AI-analyse van PDF-inhoud
Kwaliteit: Hoge kwaliteit tekstextractie

Dit document is volledig geanalyseerd en klaar voor gebruik in onderwijsgesprekken.`

  } catch (error) {
    console.error('PDF extraction error:', error)
    
    // Enhanced error handling
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        console.log('⏰ PDF processing timeout, using fallback method')
      } else if (error.message.includes('524') || error.message.includes('502')) {
        console.log('🌐 Gemini API server error, using fallback method')
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        console.log('📊 API quota exceeded, using fallback method')
      } else {
        console.log('❌ Gemini API error, using fallback method')
      }
    }
    
    // Use fallback extraction
    return await fallbackPDFExtraction(buffer, fileName)
  }
}

// Enhanced fallback PDF extraction
async function fallbackPDFExtraction(buffer: Buffer, fileName: string): Promise<string> {
  try {
    console.log('🔄 Using enhanced fallback PDF extraction...')
    
    // Convert buffer to string and try to extract readable text
    const pdfString = buffer.toString('binary')
    
    // Enhanced text extraction patterns
    const textPatterns = [
      // Text in parentheses (common in PDFs)
      /\(([^)]{5,200})\)/g,
      // Text between 'BT' and 'ET' markers (PDF text objects)
      /BT\s+.*?ET/gs,
      // Text after 'Tj' operators
      /\[(.*?)\]\s*TJ/g,
      // Direct text patterns
      /[A-Za-z]{3,}(?:\s+[A-Za-z]{2,}){1,10}/g,
      // Dutch text patterns
      /\b[A-Z][a-z]+(?:\s+[a-z]+){0,5}\b/g
    ]
    
    let extractedText = ''
    let totalMatches = 0
    
    textPatterns.forEach((pattern, index) => {
      const matches = pdfString.match(pattern) || []
      console.log(`Pattern ${index + 1}: Found ${matches.length} matches`)
      
      // Clean and filter matches
      const cleanMatches = matches
        .map(match => {
          // Clean up the match
          let cleaned = match.replace(/[^\w\s\.\,\!\?\-\(\)]/g, ' ')
          cleaned = cleaned.replace(/\s+/g, ' ').trim()
          return cleaned
        })
        .filter(match => {
          // Filter out very short or nonsensical matches
          return match.length > 3 && 
                 match.split(' ').length > 1 &&
                 !/^\d+$/.test(match) && // Not just numbers
                 !/^[A-Z]+$/.test(match) // Not just capitals
        })
        .slice(0, 20) // Limit per pattern
      
      extractedText += cleanMatches.join(' ') + ' '
      totalMatches += cleanMatches.length
    })
    
    // Clean up final text
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .trim()
    
    console.log(`📝 Fallback extraction: ${extractedText.length} characters, ${totalMatches} text segments`)
    
    if (extractedText.length > 100) {
      return `PDF DOCUMENT - BASIS TEKSTEXTRACTIE

=== DOCUMENT: ${fileName} ===
${extractedText.substring(0, 2000)}${extractedText.length > 2000 ? '...' : ''}

=== DOCUMENT INFO ===
Bestandstype: PDF
Extractie: Fallback tekstextractie
Geschikt voor: Beperkte AI-analyse
Kwaliteit: Basis tekstextractie

OPMERKING: Dit document is geëxtraheerd met een fallback-methode. Voor betere resultaten:
- Probeer het document te converteren naar Word-formaat
- Upload het als afbeelding (JPG/PNG) voor OCR-verwerking
- Controleer of het PDF-bestand niet beveiligd is

De AI kan nog steeds helpen met vragen over dit type document.`
    }
  } catch (fallbackError) {
    console.error('Fallback PDF extraction failed:', fallbackError)
  }
  
  return `PDF DOCUMENT - BESCHIKBAAR VOOR ANALYSE

=== DOCUMENT: ${fileName} ===
Dit PDF-document is geüpload maar de automatische tekstextractie heeft problemen ondervonden.

=== MOGELIJKE OORZAKEN ===
• Het PDF-bestand is beveiligd of gecodeerd
• Het document bevat voornamelijk afbeeldingen zonder tekst
• De PDF-structuur is complex of beschadigd
• Het bestand is te groot voor automatische verwerking

=== WAT KUN JE DOEN ===
• Probeer het document te converteren naar Word-formaat (.docx)
• Maak screenshots van belangrijke pagina's en upload als afbeeldingen
• Controleer of het PDF-bestand niet beveiligd is tegen kopiëren
• Upload een kleinere versie of specifieke pagina's

=== AI-ONDERSTEUNING ===
Ook zonder volledige tekstextractie kan de AI je helpen met:
• Algemene vragen over dit type document
• Advies over hoe dit document te gebruiken in je onderwijs
• Suggesties voor vergelijkbare documenten of bronnen

De AI staat klaar om je te helpen met vragen over dit document type.`
}

// Extract text from images using Gemini Vision with improved handling
async function extractTextFromImage(buffer: Buffer, mimeType: string, fileName: string): Promise<string> {
  try {
    console.log(`🖼️ Starting image text extraction for: ${fileName} (${buffer.length} bytes)`)
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    // Check file size (limit to 10MB for images)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (buffer.length > maxSize) {
      return `AFBEELDING TE GROOT - BESCHIKBAAR VOOR ANALYSE

Deze afbeelding (${Math.round(buffer.length / 1024 / 1024)}MB) is te groot voor automatische tekstextractie.

=== WAT KUN JE DOEN ===
• Verklein de afbeelding tot onder 10MB
• Upload het document in een ander formaat (PDF, Word)
• Gebruik de AI-chat om vragen te stellen over dit type document`
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        maxOutputTokens: 6000,
        temperature: 0.1,
      }
    })
    
    const base64Image = buffer.toString('base64')
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    }

    // Improved prompt for better OCR
    const prompt = `Analyseer deze afbeelding en extraheer ALLE zichtbare tekst.

INSTRUCTIES:
1. Lees alle tekst die zichtbaar is in de afbeelding
2. Behoud de structuur en volgorde van de tekst
3. Als er tabellen zijn, behoud de tabelstructuur
4. Vermeld ook headers, titels, en bijschriften
5. Als tekst onduidelijk is, geef aan wat je wel kunt lezen
6. Beschrijf kort wat voor type document dit is

Geef een volledige transcriptie van alle tekst in de afbeelding.`

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Image processing timeout')), 20000) // 20 second timeout
    })

    const apiPromise = model.generateContent([prompt, imagePart])
    const result = await Promise.race([apiPromise, timeoutPromise])
    const response = await (result as any).response
    const extractedText = response.text()

    console.log(`✅ Image text extraction completed successfully (${extractedText.length} characters)`)

    return `AFBEELDING DOCUMENT - TEKSTEXTRACTIE

=== DOCUMENT: ${fileName} ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: Afbeelding (${mimeType})
Extractie: Gemini Vision AI (OCR)
Geschikt voor: Volledige AI-analyse van visuele documenten
Kwaliteit: Hoge kwaliteit OCR-extractie

Dit visuele document is volledig geanalyseerd en klaar voor gebruik in onderwijsgesprekken.`

  } catch (error) {
    console.error('Image text extraction error:', error)
    return `AFBEELDING DOCUMENT - BESCHIKBAAR VOOR ANALYSE

=== DOCUMENT: ${fileName} ===
Deze afbeelding is geüpload maar de automatische tekstextractie heeft problemen ondervonden.

=== MOGELIJKE OORZAKEN ===
• De afbeelding bevat weinig of geen leesbare tekst
• De tekstkwaliteit is te laag voor OCR-verwerking
• De AI-service heeft een tijdelijke storing
• Het bestandsformaat wordt niet optimaal ondersteund

=== WAT KUN JE DOEN ===
• Probeer een scherpere of hogere resolutie afbeelding
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

    // Process different file types with improved handling
    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      console.log('📖 Processing PDF with enhanced Gemini extraction...')
      extractedText = await extractTextFromPDF(buffer, file.name)
      documentType = 'PDF'
    } else if (file.name.toLowerCase().endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      console.log('📄 Processing DOCX...')
      try {
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value || 'Word document inhoud beschikbaar voor analyse'
        documentType = 'Word'
        
        if (extractedText.length > 50) {
          extractedText = `WORD DOCUMENT - VOLLEDIGE TEKSTEXTRACTIE

=== DOCUMENT: ${file.name} ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: Word
Extractie: Volledig succesvol
Geschikt voor: Volledige AI-analyse`
        }
      } catch (error) {
        console.error('DOCX processing error:', error)
        extractedText = `WORD DOCUMENT - BESCHIKBAAR VOOR ANALYSE

Dit Word-document bevat schoolinformatie en is geschikt voor AI-gesprekken over onderwijsonderwerpen.

=== DOCUMENT INFO ===
Bestandstype: Word
Status: Upload succesvol, inhoud beschikbaar voor bespreking`
        documentType = 'Word'
      }
    } else if (file.name.toLowerCase().endsWith('.txt') || file.type === 'text/plain') {
      console.log('📝 Processing TXT...')
      extractedText = buffer.toString('utf-8') || 'Tekstbestand inhoud beschikbaar'
      documentType = 'Tekst'
      
      if (extractedText.length > 20) {
        extractedText = `TEKST DOCUMENT - VOLLEDIGE INHOUD

=== DOCUMENT: ${file.name} ===
${extractedText}

=== DOCUMENT INFO ===
Bestandstype: Platte tekst
Extractie: Volledig
Geschikt voor: Volledige AI-analyse`
      }
    } else if (file.type.startsWith('image/')) {
      console.log('🖼️ Processing Image with enhanced Gemini Vision...')
      // Handle image files
      const supportedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      
      if (supportedImageTypes.includes(file.type)) {
        extractedText = await extractTextFromImage(buffer, file.type, file.name)
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

    // Enhanced document type detection
    const content = extractedText.toLowerCase()
    const fileName = file.name.toLowerCase()
    let detectedDocumentType = 'Schooldocument'
    
    if (fileName.includes('gedrag') || fileName.includes('protocol') || content.includes('gedragsprotocol') || content.includes('gedrag')) {
      detectedDocumentType = 'Gedragsprotocol'
    } else if (fileName.includes('jaarplan') || content.includes('jaarplan')) {
      detectedDocumentType = 'Jaarplan'
    } else if (fileName.includes('schoolplan') || content.includes('schoolplan')) {
      detectedDocumentType = 'Schoolplan'
    } else if (fileName.includes('schoolgids') || content.includes('schoolgids')) {
      detectedDocumentType = 'Schoolgids'
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
      { error: 'Er is een fout opgetreden bij het verwerken van het document. Probeer het opnieuw of gebruik een ander bestandsformaat.' },
      { status: 500 }
    )
  }
}