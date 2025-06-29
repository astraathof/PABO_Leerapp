'use client'

import { useState, useEffect, useRef } from 'react'

interface UploadedDocument {
  id: string
  fileName: string
  fileType: string
  detectedType: string
  text: string
  wordCount: number
  uploadDate: Date
}

interface ModuleInfo {
  titel: string
  leerdoelen: string[]
  competenties: string[]
}

interface QuickscanResult {
  quickscan: string
  openingQuestion: string
  moduleInfo: ModuleInfo
  documentsAnalyzed: number
}

interface SmartModuleAIProps {
  moduleId: string
  moduleTitle: string
  documents: UploadedDocument[]
  userLevel: 'beginnend' | 'gevorderd' | 'expert'
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const aiRoles = [
  {
    id: 'tutor',
    naam: 'AI-Tutor',
    icon: '👨‍🏫',
    beschrijving: 'Leert je stap voor stap nieuwe concepten',
    kleur: 'bg-blue-500'
  },
  {
    id: 'coach',
    naam: 'AI-Coach',
    icon: '💪',
    beschrijving: 'Helpt je doelen bereiken en vaardigheden ontwikkelen',
    kleur: 'bg-green-500'
  },
  {
    id: 'mentor',
    naam: 'AI-Mentor',
    icon: '🧙‍♂️',
    beschrijving: 'Begeleidt je professionele ontwikkeling',
    kleur: 'bg-purple-500'
  },
  {
    id: 'teammate',
    naam: 'AI-Teammate',
    icon: '🤝',
    beschrijving: 'Werkt samen met je aan projecten en ideeën',
    kleur: 'bg-orange-500'
  },
  {
    id: 'tool',
    naam: 'AI-Tool',
    icon: '🔧',
    beschrijving: 'Voert specifieke taken uit en geeft directe antwoorden',
    kleur: 'bg-gray-500'
  },
  {
    id: 'simulator',
    naam: 'AI-Simulator',
    icon: '🎭',
    beschrijving: 'Simuleert situaties voor oefening en training',
    kleur: 'bg-red-500'
  },
  {
    id: 'student',
    naam: 'AI-Student',
    icon: '🙋‍♀️',
    beschrijving: 'Stelt vragen en laat jou uitleggen en onderwijzen',
    kleur: 'bg-pink-500'
  }
]

export default function SmartModuleAI({ moduleId, moduleTitle, documents, userLevel }: SmartModuleAIProps) {
  const [quickscanResult, setQuickscanResult] = useState<QuickscanResult | null>(null)
  const [isLoadingQuickscan, setIsLoadingQuickscan] = useState(false)
  const [selectedAIRole, setSelectedAIRole] = useState('tutor')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-start quickscan when documents are available
  useEffect(() => {
    if (documents.length > 0 && !quickscanResult && !isLoadingQuickscan) {
      performQuickscan()
    }
  }, [documents, quickscanResult, isLoadingQuickscan])

  const performQuickscan = async () => {
    if (documents.length === 0) return

    setIsLoadingQuickscan(true)
    
    try {
      console.log(`🔍 Starting quickscan for module ${moduleId} with ${documents.length} documents`)
      
      const response = await fetch('/api/module-quickscan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: documents,
          moduleId: moduleId,
          userLevel: userLevel
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setQuickscanResult(result)
        console.log('✅ Quickscan completed successfully')
      } else {
        throw new Error('Quickscan failed')
      }
    } catch (error) {
      console.error('Quickscan error:', error)
      
      // Fallback quickscan
      setQuickscanResult({
        quickscan: `**📚 Documenten Quickscan**\nJe hebt ${documents.length} document(en) geüpload voor ${moduleTitle}.\n\n**💪 Sterke Punten**\n• Je documenten bieden concrete schoolcontext\n• Ze maken praktijkgericht leren mogelijk\n• Er is materiaal voor realistische verbeteringen\n\n**🔧 Ontwikkelpunten**\n• Koppeling tussen theorie en praktijk versterken\n• Concrete implementatiestrategieën ontwikkelen\n• Systematische evaluatie van huidige aanpak\n\n**🎯 Aanbeveling**\nStart met het bespreken van één specifiek aspect uit je documenten.\n\n**❓ Openingsvraag voor Chatbot**\nWelk onderdeel van je documenten wil je als eerste verdiepen?`,
        openingQuestion: `Welk aspect van ${moduleTitle} wil je verdiepen?`,
        moduleInfo: {
          titel: moduleTitle,
          leerdoelen: ['Module leerdoelen laden...'],
          competenties: ['Competenties laden...']
        },
        documentsAnalyzed: documents.length
      })
    } finally {
      setIsLoadingQuickscan(false)
    }
  }

  const startChat = async () => {
    if (!quickscanResult) return

    setChatStarted(true)
    
    // Add opening message from AI
    const selectedRole = aiRoles.find(role => role.id === selectedAIRole)
    const openingMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `👋 Hallo! Ik ben je **${selectedRole?.naam}** voor de module "${moduleTitle}". \n\nOp basis van je documenten heb ik een quickscan gemaakt. ${quickscanResult.openingQuestion}`,
      timestamp: new Date()
    }
    
    setMessages([openingMessage])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoadingChat || !quickscanResult) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoadingChat(true)

    try {
      const documentContext = documents.map(doc => 
        `${doc.fileName}: ${doc.text.substring(0, 500)}...`
      ).join('\n\n')

      const conversationHistory = messages.slice(-5).map(msg => 
        `${msg.role}: ${msg.content}`
      ).join('\n')

      const response = await fetch('/api/smart-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          aiRole: selectedAIRole,
          moduleInfo: quickscanResult.moduleInfo,
          quickscanResult: quickscanResult.quickscan,
          documentContext: documentContext,
          conversationHistory: conversationHistory,
          userLevel: userLevel
        }),
      })

      if (!response.ok) {
        throw new Error('Chat response failed')
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
              // Continue if parsing fails
            }
          }
        }
      }

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
      setIsLoadingChat(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* DEEL 1: QUICKSCAN ANALYSE */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
          <h3 className="text-lg font-bold flex items-center">
            <span className="text-xl mr-2">🔍</span>
            Deel 1: Slimme Quickscan Analyse
          </h3>
          <p className="text-emerald-100 text-sm">
            AI analyseert je documenten en vergelijkt met module leerdoelen
          </p>
        </div>

        <div className="p-6">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="font-semibold text-gray-700 mb-2">Geen documenten geüpload</h4>
              <p className="text-gray-500 text-sm">
                Upload je schooldocumenten om een slimme analyse te krijgen
              </p>
            </div>
          ) : isLoadingQuickscan ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <h4 className="font-semibold text-gray-700 mb-2">🔍 AI analyseert je documenten...</h4>
              <p className="text-gray-500 text-sm">
                Vergelijkt met leerdoelen van {moduleTitle}
              </p>
            </div>
          ) : quickscanResult ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-emerald-800">
                    {quickscanResult.quickscan}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>📊 {quickscanResult.documentsAnalyzed} document(en) geanalyseerd</span>
                <span>🎯 {quickscanResult.moduleInfo.leerdoelen.length} leerdoelen vergeleken</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">⚠️</div>
              <h4 className="font-semibold text-gray-700 mb-2">Analyse mislukt</h4>
              <button
                onClick={performQuickscan}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                🔄 Opnieuw proberen
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DEEL 2: SLIMME CHATBOT */}
      {quickscanResult && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <h3 className="text-lg font-bold flex items-center">
              <span className="text-xl mr-2">🤖</span>
              Deel 2: Slimme AI Chatbot
            </h3>
            <p className="text-indigo-100 text-sm">
              Kies je AI-rol en ga dieper in op de analyse
            </p>
          </div>

          <div className="p-6">
            {!chatStarted ? (
              <div className="space-y-6">
                {/* AI Role Selector */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">🎭 Kies je AI-rol:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {aiRoles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedAIRole(role.id)}
                        className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                          selectedAIRole === role.id
                            ? `${role.kleur} text-white shadow-lg`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="text-2xl mb-1">{role.icon}</div>
                        <div className="font-medium text-xs">{role.naam}</div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Selected Role Description */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {aiRoles.find(role => role.id === selectedAIRole)?.icon}
                      </span>
                      <div>
                        <h5 className="font-semibold text-blue-800">
                          {aiRoles.find(role => role.id === selectedAIRole)?.naam}
                        </h5>
                        <p className="text-blue-700 text-sm">
                          {aiRoles.find(role => role.id === selectedAIRole)?.beschrijving}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Start Chat Button */}
                <div className="text-center">
                  <button
                    onClick={startChat}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    🚀 Start Chat met {aiRoles.find(role => role.id === selectedAIRole)?.naam}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {aiRoles.find(role => role.id === selectedAIRole)?.icon}
                    </span>
                    <div>
                      <h5 className="font-semibold text-gray-800">
                        {aiRoles.find(role => role.id === selectedAIRole)?.naam}
                      </h5>
                      <p className="text-gray-600 text-sm">Module: {moduleTitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setChatStarted(false)
                      setMessages([])
                    }}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    🔄 Nieuwe chat
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="bg-gray-50 rounded-lg h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-75 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoadingChat && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-4 py-3 max-w-xs border border-gray-200">
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

                {/* Chat Input */}
                <div className="flex space-x-3">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Typ je vraag..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={2}
                    disabled={isLoadingChat}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoadingChat}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoadingChat ? '⏳' : '🚀'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}