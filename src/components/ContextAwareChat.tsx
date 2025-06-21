'use client'

import { useState, useRef, useEffect } from 'react'
import VoiceInput from './VoiceInput'
import RealTimeFeedback from './RealTimeFeedback'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  context?: {
    documents?: string[]
    previousTopics?: string[]
    userLevel?: string
  }
}

interface ContextAwareChatProps {
  module: string
  context: string
  studentLevel: string
  availableDocuments: any[]
  selectedDocuments: string[]
}

export default function ContextAwareChat({ 
  module, 
  context, 
  studentLevel, 
  availableDocuments, 
  selectedDocuments 
}: ContextAwareChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage
    if (!textToSend.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
      context: {
        documents: selectedDocuments,
        previousTopics: conversationContext,
        userLevel: studentLevel
      }
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Prepare enhanced context with conversation history
      const recentMessages = messages.slice(-5) // Last 5 messages for context
      const conversationHistory = recentMessages.map(msg => 
        `${msg.role}: ${msg.content}`
      ).join('\n')

      let enhancedContext = context
      
      if (selectedDocuments.length > 0) {
        const selectedDocs = availableDocuments.filter(doc => selectedDocuments.includes(doc.id))
        enhancedContext += `\n\nSCHOOLDOCUMENTEN CONTEXT:\n${selectedDocs.map(doc => 
          `${doc.fileName} (${doc.detectedType}):\n${doc.text.substring(0, 2000)}...`
        ).join('\n\n')}`
      }

      if (conversationHistory) {
        enhancedContext += `\n\nGESPREKSGESCHIEDENIS:\n${conversationHistory}`
      }

      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          context: enhancedContext,
          module: module,
          studentLevel: studentLevel,
          conversationHistory: conversationContext
        }),
      })

      if (!response.ok) {
        throw new Error('Er is een fout opgetreden')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      let fullResponse = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                fullResponse += parsed.content
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessage.id 
                    ? { ...msg, content: fullResponse }
                    : msg
                ))
              }
            } catch (e) {
              // Ignore parsing errors for partial chunks
            }
          }
        }
      }

      // Update conversation context
      const topics = extractTopics(textToSend, fullResponse)
      setConversationContext(prev => [...prev, ...topics].slice(-10)) // Keep last 10 topics

    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, er is een fout opgetreden. Probeer het opnieuw.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const extractTopics = (userMessage: string, assistantResponse: string): string[] => {
    const topics: string[] = []
    const text = (userMessage + ' ' + assistantResponse).toLowerCase()
    
    // Extract key educational topics
    const educationalKeywords = [
      'differentiatie', 'scaffolding', 'kerndoelen', 'leerlijn', 'sel', 'burgerschap',
      'observatie', 'feedback', 'data', 'cito', 'lvs', 'schoolplan', 'visie', 'missie'
    ]
    
    educationalKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        topics.push(keyword)
      }
    })
    
    return topics
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(prev => prev + ' ' + transcript)
  }

  const handleSuggestion = (suggestion: string) => {
    // Extract the actual suggestion text (remove emoji and "Probeer...")
    const cleanSuggestion = suggestion.replace(/^[^\w]*/, '').replace(/^(Probeer|Kun je|Overweeg|Wat).*?:?\s*/, '')
    setInputMessage(prev => prev + ' ' + cleanSuggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-4">
      {/* Context Indicators */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-blue-800">🧠 Context-Aware AI Assistant</h4>
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              📚 {selectedDocuments.length} docs
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
              🎯 {conversationContext.length} topics
            </span>
          </div>
        </div>
        
        {conversationContext.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-sm text-blue-600 mr-2">Gespreksonderwerpen:</span>
            {conversationContext.slice(-5).map((topic, index) => (
              <span key={index} className="px-2 py-1 bg-white text-blue-700 rounded-full text-xs border border-blue-200">
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-lg border border-gray-200 h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🤖</div>
            <p>Start een gesprek met je AI-mentor!</p>
            <p className="text-sm mt-1">Gebruik spraak, typ of kies een snelle actie hieronder.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <div className="flex items-center justify-between mt-2">
                <p className={`text-xs ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
                {message.context && (
                  <div className="flex space-x-1">
                    {message.context.documents && message.context.documents.length > 0 && (
                      <span className="text-xs opacity-75">📚</span>
                    )}
                    {message.context.previousTopics && message.context.previousTopics.length > 0 && (
                      <span className="text-xs opacity-75">🧠</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Input */}
      <VoiceInput
        onTranscript={handleVoiceTranscript}
        isListening={isListening}
        onToggleListening={() => setIsListening(!isListening)}
        disabled={isLoading}
      />

      {/* Chat Input with Real-time Feedback */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
        <div className="flex space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Typ je vraag, gebruik spraak, of kies een snelle actie..."
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>

        {/* Real-time Feedback */}
        <RealTimeFeedback
          inputText={inputMessage}
          onSuggestion={handleSuggestion}
        />
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>💡 Tip: Gebruik spraak voor hands-free interactie</span>
          <span>{inputMessage.length}/1000</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">🚀 Snelle acties:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            "Leg dit uit met een voorbeeld",
            "Hoe pas ik dit toe in de praktijk?",
            "Wat zijn de volgende stappen?",
            "Koppel dit aan mijn schooldocumenten",
            "Geef me een reflectievraag",
            "Wat zegt de theorie hierover?",
            "Hoe observeer ik dit bij leerlingen?",
            "Maak dit concreet voor mijn groep"
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => sendMessage(action)}
              disabled={isLoading}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}