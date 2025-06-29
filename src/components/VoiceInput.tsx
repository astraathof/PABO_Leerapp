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
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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
            setTranscript('') // Clear after sending
          }
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          if (event.error === 'not-allowed') {
            setErrorMessage('Microfoon toegang geweigerd. Controleer je browser instellingen.')
          } else if (event.error === 'network') {
            setErrorMessage('Netwerkprobleem. Controleer je internetverbinding.')
          } else {
            setErrorMessage(`Fout: ${event.error}`)
          }
          
          // Auto-stop on error
          if (isListening) {
            onToggleListening()
          }
        }

        recognition.onend = () => {
          if (isListening) {
            try {
              recognition.start() // Restart if still supposed to be listening
            } catch (error) {
              console.error('Failed to restart recognition:', error)
            }
          }
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          console.error('Failed to stop recognition:', error)
        }
      }
    }
  }, [isListening, onTranscript, onToggleListening])

  useEffect(() => {
    if (recognitionRef.current) {
      if (isListening && !disabled) {
        try {
          recognitionRef.current.start()
          setErrorMessage(null)
        } catch (error) {
          console.error('Failed to start speech recognition:', error)
          setErrorMessage('Kon spraakherkenning niet starten. Probeer de pagina te verversen.')
          onToggleListening() // Turn off listening state
        }
      } else {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          console.error('Failed to stop speech recognition:', error)
        }
        setTranscript('')
      }
    }
  }, [isListening, disabled, onToggleListening])

  if (!isSupported) {
    return (
      <div className="flex items-center space-x-2 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <span className="text-yellow-600 text-lg">⚠️</span>
        <span className="text-sm text-yellow-700">
          Spraakherkenning wordt niet ondersteund in deze browser. Probeer Chrome of Edge.
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggleListening}
        disabled={disabled}
        className={`p-3 rounded-full transition-all flex items-center justify-center shadow-lg ${
          isListening
            ? 'bg-red-500 text-white animate-pulse scale-110'
            : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isListening ? 'Stop opname' : 'Start spraakherkenning'}
        aria-label={isListening ? 'Stop spraakherkenning' : 'Start spraakherkenning'}
      >
        <span className="text-xl">{isListening ? '🛑' : '🎤'}</span>
      </button>
      
      <div className="flex-1">
        {isListening && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-600 font-medium">Luisteren...</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        
        {transcript && (
          <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
            <p className="text-sm text-blue-800">
              🎙️ "{transcript}"
            </p>
          </div>
        )}
        
        {errorMessage && (
          <div className="bg-red-50 rounded-lg p-2 border border-red-200">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}
        
        {!isListening && !transcript && !errorMessage && !disabled && (
          <span className="text-sm text-gray-500">Klik op de microfoon om te spreken</span>
        )}
      </div>
    </div>
  )
}