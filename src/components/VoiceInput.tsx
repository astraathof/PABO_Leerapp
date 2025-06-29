'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

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
  const isInitializedRef = useRef(false)

  // Use useCallback to prevent stale closures
  const handleResult = useCallback((event: any) => {
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
  }, [onTranscript])

  const handleError = useCallback((event: any) => {
    console.error('Speech recognition error:', event.error)
    
    // Don't show error message for 'aborted' as it's usually intentional
    if (event.error === 'aborted') {
      return
    }
    
    if (event.error === 'not-allowed') {
      setErrorMessage('Microfoon toegang geweigerd. Controleer je browser instellingen.')
    } else if (event.error === 'network') {
      setErrorMessage('Netwerkprobleem. Controleer je internetverbinding.')
    } else {
      setErrorMessage(`Fout: ${event.error}`)
    }
    
    // Auto-stop on error (except for aborted)
    if (isListening && event.error !== 'aborted') {
      onToggleListening()
    }
  }, [isListening, onToggleListening])

  const handleEnd = useCallback(() => {
    // Only restart if we're still supposed to be listening and not disabled
    if (isListening && !disabled && recognitionRef.current) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Failed to restart recognition:', error)
      }
    }
  }, [isListening, disabled])

  // Initialize speech recognition only once
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitializedRef.current) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        
        const recognition = recognitionRef.current
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'nl-NL'

        // Set up event handlers
        recognition.onresult = handleResult
        recognition.onerror = handleError
        recognition.onend = handleEnd

        isInitializedRef.current = true
      }
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current && isInitializedRef.current) {
        try {
          recognitionRef.current.stop()
          recognitionRef.current.onresult = null
          recognitionRef.current.onerror = null
          recognitionRef.current.onend = null
        } catch (error) {
          console.error('Failed to cleanup recognition:', error)
        }
      }
    }
  }, [handleResult, handleError, handleEnd])

  // Handle start/stop based on isListening state
  useEffect(() => {
    if (recognitionRef.current && isInitializedRef.current) {
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
          // Ignore errors when stopping as it might already be stopped
          console.log('Recognition stop error (likely already stopped):', error)
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