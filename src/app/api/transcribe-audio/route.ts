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

    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'Geen audio bestand gevonden' },
        { status: 400 }
      )
    }

    // Check file size (25MB limit for inline data)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Audio bestand te groot. Maximaal 25MB toegestaan.' },
        { status: 400 }
      )
    }

    // Convert audio file to base64
    const arrayBuffer = await audioFile.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString('base64')

    // Determine MIME type
    const mimeType = audioFile.type || 'audio/wav'

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const audioPart = {
      inlineData: {
        data: base64Audio,
        mimeType: mimeType
      }
    }

    const prompt = "Transcribeer deze audio naar Nederlandse tekst. Geef alleen de getranscribeerde tekst terug, zonder extra commentaar."

    const result = await model.generateContent([prompt, audioPart])
    const response = await result.response
    const transcription = response.text()

    return NextResponse.json({
      success: true,
      transcription: transcription.trim(),
      fileName: audioFile.name,
      fileSize: audioFile.size,
      mimeType: mimeType
    })

  } catch (error) {
    console.error('Audio transcription error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het transcriberen van de audio' },
      { status: 500 }
    )
  }
}