import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

// Remove PDF.js completely for now to fix uploads
// We'll implement a simpler text extraction or use a different approach

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
      // For now, return a placeholder for PDF files until we fix PDF.js
      extractedText = `[PDF Document: ${file.name}]

Dit is een PDF document dat is geüpload. De volledige tekstextractie wordt momenteel geoptimaliseerd.

Voor nu kun je dit document gebruiken in de AI-chat door te beschrijven wat erin staat, en de AI zal je helpen met vragen en analyse op basis van je beschrijving.

Bestandsnaam: ${file.name}
Bestandsgrootte: ${Math.round(file.size / 1024)} KB
Upload datum: ${new Date().toLocaleDateString('nl-NL')}

Je kunt dit document gebruiken door in de chat te vertellen wat voor soort document dit is (bijvoorbeeld: "Dit is ons schoolplan" of "Dit is ons veiligheidsbeleid") en de AI zal je helpen met relevante vragen en analyse.`
      
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

    // Analyseer document type op basis van inhoud
    const content = extractedText.toLowerCase()
    let detectedDocumentType = 'Algemeen document'
    
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
    } else if (file.name.toLowerCase().includes('pdf')) {
      // For PDF files, try to detect type from filename
      if (file.name.toLowerCase().includes('schoolplan')) {
        detectedDocumentType = 'Schoolplan/Schoolgids'
      } else if (file.name.toLowerCase().includes('beleid')) {
        detectedDocumentType = 'Beleidsdocument'
      } else if (file.name.toLowerCase().includes('jaarplan')) {
        detectedDocumentType = 'Jaarplan document'
      } else {
        detectedDocumentType = 'PDF Document'
      }
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