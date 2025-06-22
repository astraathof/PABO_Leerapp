import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

// Simple PDF text extraction function using a different approach
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Convert buffer to string and try to extract readable text
    const pdfString = buffer.toString('binary')
    
    // Look for text content between stream markers
    const textMatches = pdfString.match(/stream\s*(.*?)\s*endstream/gs)
    let extractedText = ''
    
    if (textMatches) {
      textMatches.forEach(match => {
        // Remove stream markers and try to extract readable text
        const content = match.replace(/^stream\s*/, '').replace(/\s*endstream$/, '')
        // Look for readable text patterns
        const readableText = content.match(/[a-zA-Z\s]{3,}/g)
        if (readableText) {
          extractedText += readableText.join(' ') + ' '
        }
      })
    }
    
    // If no text found with stream method, try alternative approach
    if (!extractedText.trim()) {
      // Look for text objects in PDF
      const textObjects = pdfString.match(/\(([^)]+)\)/g)
      if (textObjects) {
        extractedText = textObjects
          .map(match => match.replace(/[()]/g, ''))
          .filter(text => text.length > 2 && /[a-zA-Z]/.test(text))
          .join(' ')
      }
    }
    
    // If still no text, try to find any readable content
    if (!extractedText.trim()) {
      const allText = pdfString.match(/[a-zA-Z][a-zA-Z\s]{10,}/g)
      if (allText) {
        extractedText = allText.join(' ')
      }
    }
    
    // Clean up the extracted text
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\.,!?;:()\-]/g, '')
      .trim()
    
    // If we got some text, return it, otherwise return a descriptive placeholder
    if (extractedText && extractedText.length > 50) {
      return extractedText
    } else {
      // Return a more helpful placeholder that can still be analyzed
      return `PDF Document: ${extractedText || 'Tekstextractie beperkt beschikbaar'}

Dit PDF document is succesvol geüpload en kan worden gebruikt in de AI-chat. 
Hoewel de automatische tekstextractie beperkt is, kun je de AI vertellen wat voor document dit is 
en wat de belangrijkste inhoud is, zodat de AI je kan helpen met relevante vragen en analyse.

Tip: Beschrijf kort wat er in dit document staat (bijvoorbeeld: "Dit is ons schoolplan met onze visie en missie" 
of "Dit bevat ons veiligheidsbeleid en procedures") en de AI zal je helpen met gerichte vragen.`
    }
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Kon PDF niet verwerken')
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

    const buffer = Buffer.from(await file.arrayBuffer())
    let extractedText = ''
    let documentType = ''

    // Bepaal bestandstype en extraheer tekst
    if (file.name.toLowerCase().endsWith('.pdf')) {
      extractedText = await extractTextFromPDF(buffer)
      documentType = 'PDF'
    } else if (file.name.toLowerCase().endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer })
      extractedText = result.value
      documentType = 'Word'
    } else if (file.name.toLowerCase().endsWith('.txt')) {
      extractedText = buffer.toString('utf-8')
      documentType = 'Tekst'
    } else {
      return NextResponse.json(
        { error: 'Bestandstype niet ondersteund. Gebruik PDF, DOCX of TXT.' },
        { status: 400 }
      )
    }

    // Analyseer document type op basis van inhoud en bestandsnaam
    const content = extractedText.toLowerCase()
    const fileName = file.name.toLowerCase()
    let detectedDocumentType = 'Algemeen document'
    
    // Eerst proberen op basis van inhoud
    if (content.includes('schoolplan') || content.includes('schoolgids') || content.includes('visie') || content.includes('missie')) {
      detectedDocumentType = 'Schoolplan/Schoolgids'
    } else if (content.includes('kerndoel') || content.includes('leerlijn') || content.includes('curriculum')) {
      detectedDocumentType = 'Curriculum document'
    } else if (content.includes('observatie') || content.includes('lesobservatie') || content.includes('feedback')) {
      detectedDocumentType = 'Observatie/Evaluatie document'
    } else if (content.includes('cito') || content.includes('lvs') || content.includes('resultaten')) {
      detectedDocumentType = 'Resultaten/Data document'
    } else if (content.includes('burgerschap') || content.includes('sociale veiligheid')) {
      detectedDocumentType = 'Burgerschap document'
    } else if (content.includes('jaarplan') || content.includes('werkplan')) {
      detectedDocumentType = 'Jaarplan document'
    } else if (content.includes('beleid') || content.includes('protocol')) {
      detectedDocumentType = 'Beleidsdocument'
    } 
    // Als inhoud niet duidelijk is, proberen op basis van bestandsnaam
    else if (fileName.includes('schoolplan') || fileName.includes('schoolgids')) {
      detectedDocumentType = 'Schoolplan/Schoolgids'
    } else if (fileName.includes('jaarplan') || fileName.includes('werkplan')) {
      detectedDocumentType = 'Jaarplan document'
    } else if (fileName.includes('beleid') || fileName.includes('protocol')) {
      detectedDocumentType = 'Beleidsdocument'
    } else if (fileName.includes('curriculum') || fileName.includes('kerndoel')) {
      detectedDocumentType = 'Curriculum document'
    } else if (fileName.includes('cito') || fileName.includes('resultaten')) {
      detectedDocumentType = 'Resultaten/Data document'
    } else if (fileName.includes('observatie') || fileName.includes('evaluatie')) {
      detectedDocumentType = 'Observatie/Evaluatie document'
    } else if (fileName.includes('burgerschap') || fileName.includes('veiligheid')) {
      detectedDocumentType = 'Burgerschap document'
    } else if (fileName.includes('edi') || fileName.includes('kijkwijzer')) {
      detectedDocumentType = 'EDI/Diversiteit document'
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileName: file.name,
      fileType: documentType,
      detectedType: detectedDocumentType,
      wordCount: extractedText.split(/\s+/).length
    })

  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verwerken van het document' },
      { status: 500 }
    )
  }
}