'use client'

import { useState, useRef, useEffect } from 'react'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  isListening: boolean
  onToggleListening: () => void
  disabled?: boolean
}

export default function VoiceInput({ onTranscript, isListening, onToggleListening, disabled }: VoiceInputProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        
        const recognition = recognitionRef.current
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'nl-NL'

        recognition.onresult = (event: any) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript + interimTranscript)
          
          if (finalTranscript) {
            onTranscript(finalTranscript)
          }
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
        }

        recognition.onend = () => {
          if (isListening) {
            recognition.start() // Restart if still supposed to be listening
          }
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening, onTranscript])

  useEffect(() => {
    if (recognitionRef.current) {
      if (isListening && !disabled) {
        recognitionRef.current.start()
      } else {
        recognitionRef.current.stop()
        setTranscript('')
      }
    }
  }, [isListening, disabled])

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500 text-center p-2">
        🎤 Spraakherkenning niet ondersteund in deze browser
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggleListening}
        disabled={disabled}
        className={`p-3 rounded-full transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isListening ? 'Stop opname' : 'Start spraakherkenning'}
      >
        {isListening ? '🛑' : '🎤'}
      </button>
      
      {transcript && (
        <div className="flex-1 bg-blue-50 rounded-lg p-2 border border-blue-200">
          <p className="text-sm text-blue-800">
            🎙️ "{transcript}"
          </p>
        </div>
      )}
    </div>
  )
}