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
  mimeType?: string
}

interface SmartModuleAIProps {
  moduleTitle: string
  moduleId: string
  documents: UploadedDocument[]
  userLevel: 'beginnend' | 'gevorderd' | 'expert'
}

interface QuickscanResult {
  success: boolean
  analysis: string
  analysisType: string
  documentsAnalyzed: number
  module: string
  error?: string
  type?: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function SmartModuleAI({ moduleTitle, moduleId, documents, userLevel }: SmartModuleAIProps) {
  const [quickscanResult, setQuickscanResult] = useState<QuickscanResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiPersonality, setAiPersonality] = useState<'tutor' | 'coach' | 'mentor' | 'teammate' | 'tool' | 'simulator' | 'student'>('mentor')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (documents.length > 0) {
      performQuickscan()
    }
  }, [documents, moduleTitle])

  const performQuickscan = async () => {
    if (documents.length === 0) return

    setIsAnalyzing(true)
    setError(null)
    
    try {
      console.log(`🔍 Starting quickscan for ${documents.length} documents and module: ${moduleTitle}`)
      
      const response = await fetch('/api/module-quickscan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: documents,
          module: moduleTitle,
          analysisType: 'module-quickscan'
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.type === 'configuration_error') {
          throw new Error(`⚙️ Configuratie Probleem: ${result.details}`)
        } else if (result.type === 'api_key_error') {
          throw new Error(`🔑 API Key Probleem: ${result.details}`)
        } else if (result.type === 'quota_error') {
          throw new Error(`📊 Quota Probleem: ${result.details}`)
        } else {
          throw new Error(result.error || `Server error: ${response.status}`)
        }
      }

      console.log('✅ Quickscan completed successfully')
      setQuickscanResult(result)
      
    } catch (error) {
      console.error('Quickscan error:', error)
      setError(error instanceof Error ? error.message : 'Er is een onbekende fout opgetreden')
      
      setQuickscanResult({
        success: false,
        analysis: `**⚠️ Analyse niet beschikbaar**

Er is een probleem opgetreden bij het analyseren van je documenten. 

**📚 Documenten beschikbaar**
Je hebt ${documents.length} document(en) geüpload die we kunnen bespreken.

**💡 Wat kun je doen?**
• Start een gesprek over je documenten
• Stel specifieke vragen over de module "${moduleTitle}"
• Gebruik de AI-begeleiding voor praktische tips

**🤖 AI-begeleiding beschikbaar**
Ook zonder automatische analyse kan de AI je helpen met vragen over je documenten en de module.`,
        analysisType: 'error-fallback',
        documentsAnalyzed: documents.length,
        module: moduleTitle,
        error: 'Analyse niet beschikbaar'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const startChat = () => {
    setShowChat(true)
    
    // Extract opening question from quickscan
    let openingQuestion = `Hoe kan ik je helpen met de module "${moduleTitle}"?`
    
    if (quickscanResult?.analysis) {
      const questionMatch = quickscanResult.analysis.match(/\*\*❓.*?\*\*\s*(.+?)(?:\n|$)/i) ||
                           quickscanResult.analysis.match(/Openingsvraag.*?:\s*(.+?)(?:\n|$)/i)
      
      if (questionMatch) {
        openingQuestion = questionMatch[1].trim()
      }
    }

    // Create welcome message based on AI personality
    const personalityIntro = getPersonalityIntro(aiPersonality)
    
    const welcomeMessage: ChatMessage = {
      id: 'welcome-' + Date.now(),
      role: 'assistant',
      content: `${personalityIntro}

**📋 Quickscan samenvatting:**
${quickscanResult?.analysis ? quickscanResult.analysis.split('**❓')[0] : 'Je documenten zijn beschikbaar voor bespreking.'}

**🤔 ${openingQuestion}**`,
      timestamp: new Date()
    }

    setMessages([welcomeMessage])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

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
      const response = await fetch('/api/smart-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          aiRole: aiPersonality,
          moduleInfo: {
            titel: moduleTitle,
            leerdoelen: getModuleLeerdoelen(moduleId),
            competenties: getModuleCompetenties(moduleId)
          },
          quickscanResult: quickscanResult?.analysis || '',
          documentContext: documents.map(doc => `${doc.fileName}: ${doc.text.substring(0, 500)}...`).join('\n\n'),
          conversationHistory: messages.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n'),
          userLevel: userLevel
        }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
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
              // Continue if we can't parse
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
      setIsLoading(false)
    }
  }

  const getPersonalityDescription = (personality: string) => {
    switch (personality) {
      case 'tutor': return 'Gestructureerde begeleiding met duidelijke uitleg'
      case 'coach': return 'Motiverende ondersteuning en doelgerichte feedback'
      case 'mentor': return 'Wijze begeleiding met persoonlijke ontwikkeling'
      case 'teammate': return 'Samenwerking op gelijk niveau'
      case 'tool': return 'Directe, praktische antwoorden en oplossingen'
      case 'simulator': return 'Rollenspel en scenario-gebaseerde oefening'
      case 'student': return 'Leren door samen vragen te stellen'
      default: return 'Persoonlijke AI-begeleiding'
    }
  }

  const getPersonalityIcon = (personality: string) => {
    switch (personality) {
      case 'tutor': return '👨‍🏫'
      case 'coach': return '💪'
      case 'mentor': return '🧙‍♂️'
      case 'teammate': return '🤝'
      case 'tool': return '🔧'
      case 'simulator': return '🎭'
      case 'student': return '🎓'
      default: return '🤖'
    }
  }

  const getPersonalityIntro = (personality: string) => {
    switch (personality) {
      case 'tutor': return `👨‍🏫 **Hallo! Ik ben je AI-Tutor voor ${moduleTitle}**\n\nIk ga je stap voor stap begeleiden door de leerstof. Laten we samen de concepten ontdekken!`
      case 'coach': return `💪 **Hey! Ik ben je AI-Coach voor ${moduleTitle}**\n\nIk help je je doelen te bereiken en je vaardigheden te ontwikkelen. Laten we aan de slag gaan!`
      case 'mentor': return `🧙‍♂️ **Welkom! Ik ben je AI-Mentor voor ${moduleTitle}**\n\nIk begeleid je professionele ontwikkeling met wijsheid en ervaring. Laten we samen reflecteren.`
      case 'teammate': return `🤝 **Hi! Ik ben je AI-Teammate voor ${moduleTitle}**\n\nLaten we samenwerken aan je leerproces. Ik sta naast je, niet boven je!`
      case 'tool': return `🔧 **AI-Tool voor ${moduleTitle} geactiveerd**\n\nIk geef je directe, praktische antwoorden en oplossingen. Wat heb je nodig?`
      case 'simulator': return `🎭 **Welkom in de ${moduleTitle} Simulator**\n\nIk creëer realistische scenario's waarin je kunt oefenen. Klaar voor de uitdaging?`
      case 'student': return `🎓 **Hoi! Ik ben je AI-Student voor ${moduleTitle}**\n\nIk stel vragen zodat jij kunt uitleggen en onderwijzen. Maak mij wijzer!`
      default: return `🤖 **AI-Begeleider voor ${moduleTitle}**\n\nIk help je met al je vragen over deze module.`
    }
  }

  const getModuleLeerdoelen = (moduleId: string): string[] => {
    // Hier zou je normaal gesproken de leerdoelen ophalen uit een database of API
    // Voor nu gebruiken we hardcoded leerdoelen per module
    switch (moduleId) {
      case 'module1':
        return [
          'Alle 58 kerndoelen beheersen',
          'Kerndoelen vertalen naar lesdoelen',
          'Progressie monitoren per groep',
          'Curriculum mapping toepassen'
        ]
      case 'module2':
        return [
          'Ontwikkelingsstadia herkennen',
          'Theorie koppelen aan praktijk',
          'Leeftijdsadequaat onderwijs geven',
          'Individuele verschillen begrijpen'
        ]
      default:
        return ['Leerdoelen voor deze module']
    }
  }

  const getModuleCompetenties = (moduleId: string): string[] => {
    // Hier zou je normaal gesproken de competenties ophalen uit een database of API
    // Voor nu gebruiken we hardcoded competenties per module
    switch (moduleId) {
      case 'module1':
        return [
          'Vakinhoudelijke bekwaamheid',
          'Didactische bekwaamheid',
          'Organisatorische bekwaamheid'
        ]
      case 'module2':
        return [
          'Pedagogische bekwaamheid',
          'Interpersoonlijke bekwaamheid',
          'Reflectieve bekwaamheid'
        ]
      default:
        return ['Competenties voor deze module']
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (documents.length === 0) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="text-lg font-semibold text-orange-800 mb-2">Geen documenten geüpload</h3>
        <p className="text-orange-700 text-sm">
          Upload je schooldocumenten om slimme AI-analyse en begeleiding te krijgen voor de module "{moduleTitle}"
        </p>
      </div>
    )
  }

  if (showChat) {
    return (
      <div className="space-y-4">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                {getPersonalityIcon(aiPersonality)} {aiPersonality.charAt(0).toUpperCase() + aiPersonality.slice(1)} Chat
              </h3>
              <p className="text-blue-100 text-sm">
                Module: {moduleTitle} • {documents.length} document(en) • {userLevel}
              </p>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
            >
              🔙 Terug
            </button>
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
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs mt-2 opacity-75">
                  {message.timestamp.toLocaleTimeString()}
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

        {/* Chat Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Stel je vraag aan je ${aiPersonality}...`}
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
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
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Part 1: Quickscan Analysis */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">📊 Deel 1: Slimme Quickscan Analyse</h3>
            <p className="text-emerald-100">AI analyseert je documenten en vergelijkt met module leerdoelen</p>
          </div>
          {documents.length > 0 && (
            <button
              onClick={performQuickscan}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? '🔄 Analyseren...' : '🔄 Heranalyse'}
            </button>
          )}
        </div>

        {/* Analysis Status */}
        {isAnalyzing ? (
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-white font-medium">🔍 AI analyseert je documenten...</span>
            </div>
            <p className="text-emerald-100 text-sm">
              Vergelijking met leerdoelen van "{moduleTitle}" en identificatie van sterke punten en ontwikkelkansen
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-20 rounded-lg p-4 border border-red-300">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-red-100 font-medium">❌ Analyse Probleem</span>
            </div>
            <p className="text-red-100 text-sm mb-3">{error}</p>
            <div className="bg-white bg-opacity-20 rounded p-3">
              <p className="text-white text-sm">
                <strong>💡 Oplossing:</strong> Controleer of de GEMINI_API_KEY correct is ingesteld in je environment variables. 
                Voor lokale ontwikkeling: voeg toe aan .env.local. Voor deployment: configureer in je hosting platform.
              </p>
            </div>
          </div>
        ) : quickscanResult ? (
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-white font-medium">
                {quickscanResult.success ? '✅ Analyse voltooid!' : '⚠️ Beperkte analyse'}
              </span>
              <span className="text-emerald-100 text-sm">
                ({quickscanResult.documentsAnalyzed} document(en))
              </span>
            </div>
            {quickscanResult.error && (
              <p className="text-emerald-100 text-sm mb-2">
                ⚠️ {quickscanResult.error}
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-white text-sm">🔄 Klaar voor analyse van {documents.length} document(en)...</p>
          </div>
        )}
      </div>

      {/* Quickscan Results */}
      {quickscanResult && (
        <div className="bg-white rounded-lg p-6 border-l-4 border-emerald-500 shadow-lg">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-xl mr-2">📋</span>
            Quickscan Resultaten: {moduleTitle}
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700">
            <div className="whitespace-pre-wrap">{quickscanResult.analysis}</div>
          </div>
          {quickscanResult.analysisType === 'fallback' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                💡 <strong>Opmerking:</strong> Dit is een standaard analyse omdat de AI-service tijdelijk niet beschikbaar is. 
                De chatbot kan je nog steeds helpen met vragen over je documenten.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Part 2: AI Chatbot Configuration */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🤖 Deel 2: Slimme Chatbot per Module</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Personality Selector */}
          <div>
            <h4 className="font-semibold mb-3">Kies je AI-begeleider:</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'tutor', label: 'AI-Tutor' },
                { id: 'coach', label: 'AI-Coach' },
                { id: 'mentor', label: 'AI-Mentor' },
                { id: 'teammate', label: 'AI-Teammate' },
                { id: 'tool', label: 'AI-Tool' },
                { id: 'simulator', label: 'AI-Simulator' },
                { id: 'student', label: 'AI-Student' }
              ].map((personality) => (
                <button
                  key={personality.id}
                  onClick={() => setAiPersonality(personality.id as any)}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    aiPersonality === personality.id
                      ? 'bg-white text-blue-600 font-semibold'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                  }`}
                >
                  {getPersonalityIcon(personality.id)} {personality.label}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Personality Info */}
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">
              {getPersonalityIcon(aiPersonality)} {aiPersonality.charAt(0).toUpperCase() + aiPersonality.slice(1)}
            </h4>
            <p className="text-blue-100 text-sm">
              {getPersonalityDescription(aiPersonality)}
            </p>
          </div>
        </div>

        {/* Start Chat Button */}
        <div className="mt-6 text-center">
          <button
            onClick={startChat}
            disabled={!quickscanResult}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Start Slimme Chat
          </button>
          {!quickscanResult && (
            <p className="text-blue-100 text-sm mt-2">
              Wacht tot de quickscan voltooid is...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}