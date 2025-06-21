'use client'

import { useState, useRef, useEffect } from 'react'

interface Opdracht {
  titel: string
  beschrijving: string
  type: 'reflectie' | 'analyse' | 'ontwerp' | 'toepassing'
  startVraag: string
  context: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UploadedDocument {
  id: string
  fileName: string
  fileType: string
  detectedType: string
  text: string
  wordCount: number
  uploadDate: Date
}

interface SocraticChatBotProps {
  module: string
  opdrachten: Opdracht[]
}

export default function SocraticChatBot({ module, opdrachten }: SocraticChatBotProps) {
  const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [studentLevel, setStudentLevel] = useState<'beginnend' | 'gevorderd' | 'expert'>('beginnend')
  const [availableDocuments, setAvailableDocuments] = useState<UploadedDocument[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [useDocuments, setUseDocuments] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load documents from localStorage
  useEffect(() => {
    const savedDocs = localStorage.getItem('pabo-documents')
    if (savedDocs) {
      const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
        ...doc,
        uploadDate: new Date(doc.uploadDate)
      }))
      setAvailableDocuments(parsedDocs)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startOpdracht = (opdracht: Opdracht) => {
    setSelectedOpdracht(opdracht)
    
    let welcomeMessage = `Welkom bij de opdracht "${opdracht.titel}"! 

${opdracht.beschrijving}

Ik ga je begeleiden met de socratische methode - dat betekent dat ik je vooral vragen ga stellen om je zelf tot inzichten te laten komen.`

    if (useDocuments && selectedDocuments.length > 0) {
      const selectedDocs = availableDocuments.filter(doc => selectedDocuments.includes(doc.id))
      welcomeMessage += `\n\n📄 Ik ga je helpen deze opdracht te koppelen aan jouw schooldocumenten:\n${selectedDocs.map(doc => `• ${doc.fileName} (${doc.detectedType})`).join('\n')}`
    }

    welcomeMessage += `\n\n${opdracht.startVraag}`

    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }
    ])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !selectedOpdracht) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Prepare context with selected documents
      let contextWithDocuments = selectedOpdracht.context
      
      if (useDocuments && selectedDocuments.length > 0) {
        const selectedDocs = availableDocuments.filter(doc => selectedDocuments.includes(doc.id))
        contextWithDocuments += `\n\nSCHOOLDOCUMENTEN CONTEXT:\n${selectedDocs.map(doc => 
          `${doc.fileName} (${doc.detectedType}):\n${doc.text.substring(0, 2000)}...`
        ).join('\n\n')}`
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: contextWithDocuments,
          module: module,
          studentLevel: studentLevel
        }),
      })

      if (!response.ok) {
        throw new Error('Er is een fout opgetreden')
      }

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setSelectedOpdracht(null)
    setMessages([])
    setInputMessage('')
    setSelectedDocuments([])
    setUseDocuments(false)
  }

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  if (!selectedOpdracht) {
    return (
      <div className="space-y-6">
        {/* Student Level Selector */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">🎯 Stel je niveau in</h3>
          <div className="flex space-x-3">
            {[
              { id: 'beginnend', label: '🌱 Beginnend', desc: 'Eerste jaar PABO' },
              { id: 'gevorderd', label: '🌿 Gevorderd', desc: 'Tweede/derde jaar' },
              { id: 'expert', label: '🌳 Expert', desc: 'Vierde jaar/ervaren' }
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => setStudentLevel(level.id as any)}
                className={`flex-1 p-3 rounded-lg text-center transition-all ${
                  studentLevel === level.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-xs opacity-80">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Document Integration */}
        {availableDocuments.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-800">📚 Gebruik je schooldocumenten</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useDocuments}
                  onChange={(e) => setUseDocuments(e.target.checked)}
                  className="rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-green-700 text-sm">Activeer document-integratie</span>
              </label>
            </div>
            
            {useDocuments && (
              <div className="space-y-2">
                <p className="text-green-700 text-sm mb-3">
                  Selecteer documenten die je wilt gebruiken in de AI-begeleiding:
                </p>
                <div className="grid gap-2 max-h-40 overflow-y-auto">
                  {availableDocuments.map((doc) => (
                    <label key={doc.id} className="flex items-center space-x-2 p-2 bg-white rounded border border-green-200 hover:bg-green-25 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => toggleDocumentSelection(doc.id)}
                        className="rounded border-green-300 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">📄</span>
                          <span className="font-medium text-green-800 text-sm truncate">{doc.fileName}</span>
                        </div>
                        <div className="text-xs text-green-600">{doc.detectedType} • {doc.wordCount.toLocaleString()} woorden</div>
                      </div>
                    </label>
                  ))}
                </div>
                {selectedDocuments.length > 0 && (
                  <div className="mt-2 p-2 bg-green-100 rounded text-sm text-green-700">
                    ✅ {selectedDocuments.length} document(en) geselecteerd voor AI-begeleiding
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Opdracht Selector */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🛠️ Kies een interactieve opdracht</h3>
          <div className="grid gap-4">
            {opdrachten.map((opdracht, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-gray-50"
                onClick={() => startOpdracht(opdracht)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{opdracht.titel}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    opdracht.type === 'reflectie' ? 'bg-purple-100 text-purple-800' :
                    opdracht.type === 'analyse' ? 'bg-blue-100 text-blue-800' :
                    opdracht.type === 'ontwerp' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {opdracht.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{opdracht.beschrijving}</p>
                <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-700 mb-1">🤔 Startvraag:</p>
                  <p className="text-blue-800 italic">"{opdracht.startVraag}"</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">🤖</span>
                    <span>AI-begeleiding met socratische methode</span>
                  </div>
                  {useDocuments && selectedDocuments.length > 0 && (
                    <div className="flex items-center text-sm text-green-600">
                      <span className="mr-2">📚</span>
                      <span>{selectedDocuments.length} document(en) geïntegreerd</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">🧠 Wat is socratische begeleiding?</h3>
          <p className="text-purple-700 text-sm mb-3">
            In plaats van directe antwoorden te geven, stel ik je vragen die je helpen zelf tot inzichten te komen. 
            Dit bevordert dieper begrip en kritisch denken.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-purple-700">Vragen die je laten nadenken</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-purple-700">Praktijkvoorbeelden uit onderwijs</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-purple-700">Verbanden tussen theorie en praktijk</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✓</span>
              <span className="text-purple-700">Koppeling aan jouw schooldocumenten</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">🤖 AI Socratische Begeleiding</h3>
            <p className="text-blue-100 text-sm">Opdracht: {selectedOpdracht.titel}</p>
            {useDocuments && selectedDocuments.length > 0 && (
              <p className="text-blue-100 text-xs">📚 Met {selectedDocuments.length} schooldocument(en)</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              studentLevel === 'beginnend' ? 'bg-green-500' :
              studentLevel === 'gevorderd' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {studentLevel === 'beginnend' ? '🌱' : studentLevel === 'gevorderd' ? '🌿' : '🌳'} {studentLevel}
            </span>
            <button
              onClick={resetChat}
              className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
            >
              Nieuwe opdracht
            </button>
          </div>
        </div>
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
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
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

      {/* Chat Input */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Typ je antwoord of vraag hier... (Enter om te verzenden)"
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>💡 Tip: Wees specifiek in je antwoorden voor betere begeleiding</span>
          <span>{inputMessage.length}/500</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">🚀 Snelle acties:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Ik begrijp het niet helemaal...",
            "Kun je een voorbeeld geven?",
            "Hoe pas ik dit toe in de praktijk?",
            "Wat zijn de volgende stappen?"
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(action)}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}