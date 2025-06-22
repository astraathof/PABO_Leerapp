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
  initialQuestion?: string
}

export default function ContextAwareChat({ 
  module, 
  context, 
  studentLevel, 
  availableDocuments, 
  selectedDocuments,
  initialQuestion 
}: ContextAwareChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const [hasAskedInitialQuestion, setHasAskedInitialQuestion] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add welcome message and initial question when documents are selected
  useEffect(() => {
    if (selectedDocuments.length > 0 && messages.length === 0) {
      const selectedDocs = availableDocuments.filter(doc => selectedDocuments.includes(doc.id))
      const welcomeMessage: ChatMessage = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: `🎉 **Geweldig! Ik heb toegang tot ${selectedDocuments.length} van jouw schooldocumenten:**

${selectedDocs.map(doc => `📄 **${doc.fileName}** (${doc.detectedType})`).join('\n')}

Nu kan ik **gepersonaliseerde begeleiding** geven op basis van jouw specifieke schoolsituatie! 

💡 **Wat kun je me vragen?**
• "Wat staat er in ons schoolplan over [onderwerp]?"
• "Hoe kan ik de visie van onze school toepassen in mijn lessen?"
• "Vergelijk onze aanpak met de theorie die ik geleerd heb"
• "Geef concrete voorbeelden uit onze schoolcontext"

🎙️ **Tip:** Gebruik spraakherkenning door op de microfoon te klikken voor hands-free chatten!`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      
      // Add initial question if provided from analysis
      if (initialQuestion && !hasAskedInitialQuestion) {
        setTimeout(() => {
          const questionMessage: ChatMessage = {
            id: 'initial-question-' + Date.now(),
            role: 'assistant',
            content: `🤔 **${initialQuestion}**`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, questionMessage])
          setHasAskedInitialQuestion(true)
        }, 1500)
      }
    } else if (selectedDocuments.length === 0 && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome-no-docs-' + Date.now(),
        role: 'assistant',
        content: `👋 **Welkom bij je AI-mentor!** Ik ben hier om je te helpen met je PABO-studie.

🤔 **Hoe kan ik je helpen?**
• Stel vragen over onderwijstheorie
• Vraag om praktijkvoorbeelden
• Bespreek uitdagingen in de klas
• Reflecteer op je leerervaringen

💡 **Tip:** Voor nog betere begeleiding kun je je schooldocumenten uploaden via het documentenpaneel bovenaan. Dan kan ik specifiek advies geven op basis van jouw schoolsituatie!

🎙️ **Gebruik spraak:** Klik op de microfoon voor hands-free chatten!`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [selectedDocuments, availableDocuments, messages.length, initialQuestion, hasAskedInitialQuestion])

  // Listen for custom sendMessage events from quick action buttons
  useEffect(() => {
    const handleSendMessage = (event: any) => {
      if (event.detail) {
        sendMessage(event.detail)
      }
    }

    window.addEventListener('sendMessage', handleSendMessage)
    return () => window.removeEventListener('sendMessage', handleSendMessage)
  }, [])

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
      const recentMessages = messages.slice(-5)
      const conversationHistory = recentMessages.map(msg => 
        `${msg.role}: ${msg.content}`
      ).join('\n')

      let enhancedContext = context
      
      if (selectedDocuments.length > 0) {
        const selectedDocs = availableDocuments.filter(doc => selectedDocuments.includes(doc.id))
        enhancedContext += `\n\n=== SCHOOLDOCUMENTEN CONTEXT ===\n`
        enhancedContext += `De gebruiker heeft ${selectedDocs.length} schooldocument(en) geüpload die ZEER BELANGRIJK zijn voor gepersonaliseerde antwoorden:\n\n`
        
        selectedDocs.forEach(doc => {
          enhancedContext += `DOCUMENT: ${doc.fileName} (${doc.detectedType})\n`
          enhancedContext += `VOLLEDIGE INHOUD:\n${doc.text}\n\n`
        })
        
        enhancedContext += `=== EINDE SCHOOLDOCUMENTEN ===\n\n`
        enhancedContext += `KRITIEKE INSTRUCTIE: Gebruik deze schooldocumenten ALTIJD om specifieke, gepersonaliseerde antwoorden te geven. Verwijs naar concrete passages uit de documenten en help de gebruiker verbanden te leggen tussen theorie en hun specifieke schoolsituatie. Citeer letterlijk uit de documenten waar relevant. Spreek de gebruiker aan als "je" of "jij".`
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
        const errorData = await response.json().catch(() => ({}))
        
        if (response.status === 500 && errorData.error?.includes('GEMINI_API_KEY')) {
          throw new Error('🔑 **API Key Configuratie Probleem**\n\nDe Gemini API key is niet correct geconfigureerd. Dit is nodig voor de AI-functionaliteit.\n\n**Voor ontwikkelaars:**\n• Controleer of GEMINI_API_KEY is ingesteld in je environment variables\n• Verkrijg een API key via: https://makersuite.google.com/app/apikey\n• Herstart de applicatie na het instellen van de key')
        }
        
        throw new Error(`Server error: ${response.status} - ${errorData.error || 'Onbekende fout'}`)
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
              } else if (parsed.error) {
                throw new Error(parsed.error)
              }
            } catch (e) {
              if (data.includes('"error"')) {
                try {
                  const errorObj = JSON.parse(data)
                  if (errorObj.error) {
                    throw new Error(errorObj.error)
                  }
                } catch (parseError) {
                  // Continue if we can't parse the error
                }
              }
            }
          }
        }
      }

      // Update conversation context
      const topics = extractTopics(textToSend, fullResponse)
      setConversationContext(prev => [...prev, ...topics].slice(-10))

    } catch (error) {
      console.error('Chat error:', error)
      
      let errorMessage = 'Sorry, er is een fout opgetreden. Probeer het opnieuw.'
      
      if (error instanceof Error) {
        if (error.message.includes('API Key Configuratie')) {
          errorMessage = error.message
        } else if (error.message.includes('GEMINI_API_KEY')) {
          errorMessage = '🔑 **API Configuratie Vereist**\n\nDe Gemini API key is niet ingesteld. Neem contact op met de beheerder om dit op te lossen.\n\n**Tijdelijke oplossing:** Probeer de pagina te verversen en opnieuw te proberen.'
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = '🌐 **Verbindingsprobleem**\n\nKan geen verbinding maken met de AI-service. Controleer je internetverbinding en probeer het opnieuw.'
        } else if (error.message.includes('Server error: 500')) {
          errorMessage = '⚙️ **Server Configuratie Probleem**\n\nEr is een probleem met de server configuratie. Dit is meestal een API key probleem. Neem contact op met de beheerder.'
        }
      }
      
      const errorChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorChatMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const extractTopics = (userMessage: string, assistantResponse: string): string[] => {
    const topics: string[] = []
    const text = (userMessage + ' ' + assistantResponse).toLowerCase()
    
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
        
        {selectedDocuments.length > 0 && (
          <div className="mb-3">
            <span className="text-sm text-blue-600 mr-2 font-medium">📄 Actieve documenten:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {availableDocuments
                .filter(doc => selectedDocuments.includes(doc.id))
                .map((doc, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs border border-green-200">
                  {doc.fileName}
                </span>
              ))}
            </div>
          </div>
        )}
        
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
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
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
            placeholder={selectedDocuments.length > 0 ? 
              "Stel een vraag over je schooldocumenten..." : 
              "Typ je vraag over PABO-onderwerpen..."
            }
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
    </div>
  )
}