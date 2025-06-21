import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import pdf from 'pdf-parse'

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
      const data = await pdf(buffer)
      extractedText = data.text
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