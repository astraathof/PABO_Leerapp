'use client'

import { useState, useEffect } from 'react'

interface RealTimeFeedbackProps {
  inputText: string
  onSuggestion: (suggestion: string) => void
}

export default function RealTimeFeedback({ inputText, onSuggestion }: RealTimeFeedbackProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (inputText.length > 20) {
      const timeoutId = setTimeout(() => {
        analyzeInput(inputText)
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timeoutId)
    } else {
      setSuggestions([])
    }
  }, [inputText])

  const analyzeInput = async (text: string) => {
    setIsAnalyzing(true)
    
    try {
      // Analyze input for common patterns and provide suggestions
      const suggestions = generateSuggestions(text)
      setSuggestions(suggestions)
    } catch (error) {
      console.error('Real-time analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateSuggestions = (text: string): string[] => {
    const suggestions: string[] = []
    const lowerText = text.toLowerCase()

    // Check for incomplete thoughts
    if (lowerText.includes('ik denk') && !lowerText.includes('omdat')) {
      suggestions.push('💡 Probeer je gedachte te onderbouwen met "omdat..."')
    }

    // Check for vague statements
    if (lowerText.includes('het is moeilijk') || lowerText.includes('het is lastig')) {
      suggestions.push('🎯 Kun je specifieker zijn? Wat precies is moeilijk?')
    }

    // Check for missing examples
    if (lowerText.includes('theorie') && !lowerText.includes('bijvoorbeeld')) {
      suggestions.push('📚 Overweeg een praktijkvoorbeeld toe te voegen')
    }

    // Check for reflection opportunities
    if (lowerText.includes('ervaring') && !lowerText.includes('geleerd')) {
      suggestions.push('🤔 Wat heb je van deze ervaring geleerd?')
    }

    // Check for missing connections
    if (lowerText.includes('school') && !lowerText.includes('leerling')) {
      suggestions.push('👥 Hoe beïnvloedt dit de leerlingen?')
    }

    // Encourage deeper thinking
    if (text.split(' ').length < 10) {
      suggestions.push('💭 Probeer je antwoord wat uitgebreider te maken')
    }

    return suggestions.slice(0, 2) // Max 2 suggestions
  }

  if (suggestions.length === 0 && !isAnalyzing) {
    return null
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-yellow-600">💡</span>
        <span className="text-sm font-medium text-yellow-800">
          {isAnalyzing ? 'Analyseren...' : 'Real-time suggesties:'}
        </span>
      </div>
      
      {isAnalyzing ? (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      ) : (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestion(suggestion)}
              className="block w-full text-left text-sm text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100 p-2 rounded transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}