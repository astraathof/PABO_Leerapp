'use client'

import { useState, useEffect, useRef } from 'react'
import VoiceInput from './VoiceInput'

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
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [analysisVisible, setAnalysisVisible] = useState(true)
  const [selectedPersonalityInfo, setSelectedPersonalityInfo] = useState<{
    description: string;
    icon: string;
  } | null>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (documents.length > 0) {
      performQuickscan()
    }
    
    // Set initial personality info
    setSelectedPersonalityInfo({
      description: getPersonalityDescription('mentor'),
      icon: getPersonalityIcon('mentor')
    })
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }))
        
        if (response.status === 500 && errorData.error?.includes('GEMINI_API_KEY')) {
          throw new Error('🔑 API Key Configuratie Probleem\n\nDe Gemini API key is niet correct geconfigureerd. Dit is nodig voor de AI-functionaliteit.\n\nVoor ontwikkelaars:\n• Controleer of GEMINI_API_KEY is ingesteld in je environment variables\n• Verkrijg een API key via: https://makersuite.google.com/app/apikey\n• Herstart de applicatie na het instellen van de key')
        }
        
        throw new Error(`Server error: ${response.status} - ${errorData.error || 'Onbekende fout'}`)
      }

      const result = await response.json()
      console.log('✅ Quickscan completed successfully')
      setQuickscanResult(result)
      
      // Dispatch event to notify parent component
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('quickscanCompleted', { 
          detail: { result } 
        })
        window.dispatchEvent(event)
      }
      
    } catch (error) {
      console.error('Quickscan error:', error)
      setError(error instanceof Error ? error.message : 'Er is een onbekende fout opgetreden')
      
      // Create fallback result instead of failing completely
      setQuickscanResult({
        success: false,
        analysis: `Analyse niet beschikbaar

Er is een probleem opgetreden bij het analyseren van je documenten. 

Documenten beschikbaar
Je hebt ${documents.length} document(en) geüpload die we kunnen bespreken.

Wat kun je doen?
• Start een gesprek over je documenten
• Stel specifieke vragen over de module "${moduleTitle}"
• Gebruik de AI-begeleiding voor praktische tips

AI-begeleiding beschikbaar
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
      const questionMatch = quickscanResult.analysis.match(/Openingsvraag(?:.*?):\s*(.+?)(?:\n|$)/i)
      
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

${openingQuestion}`,
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
    setIsListening(false) // Stop listening when sending message

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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Server error: ${response.status} - ${errorData.error || 'Unknown error'}`)
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
                // Handle error in stream
                if (parsed.fallbackResponse) {
                  fullResponse = parsed.fallbackResponse
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantMessage.id 
                      ? { ...msg, content: fullResponse }
                      : msg
                  ))
                } else {
                  throw new Error(parsed.error)
                }
              }
            } catch (e) {
              // Continue if we can't parse
              console.log('Error parsing stream chunk:', e)
            }
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error && error.message.includes('API Key') 
          ? '🔑 API Key Probleem\n\nEr is een probleem met de Gemini API key. Controleer of deze correct is ingesteld in je environment variables.'
          : 'Sorry, er is een fout opgetreden. Probeer het opnieuw of stel een andere vraag.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(prev => prev + (prev ? ' ' : '') + transcript)
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
      case 'tutor': return `👨‍🏫 Hallo! Ik ben je AI-Tutor voor ${moduleTitle}\n\nIk ga je stap voor stap begeleiden door de leerstof. Laten we samen de concepten ontdekken!`
      case 'coach': return `💪 Hey! Ik ben je AI-Coach voor ${moduleTitle}\n\nIk help je je doelen te bereiken en je vaardigheden te ontwikkelen. Laten we aan de slag gaan!`
      case 'mentor': return `🧙‍♂️ Welkom! Ik ben je AI-Mentor voor ${moduleTitle}\n\nIk begeleid je professionele ontwikkeling met wijsheid en ervaring. Laten we samen reflecteren.`
      case 'teammate': return `🤝 Hi! Ik ben je AI-Teammate voor ${moduleTitle}\n\nLaten we samenwerken aan je leerproces. Ik sta naast je, niet boven je!`
      case 'tool': return `🔧 AI-Tool voor ${moduleTitle} geactiveerd\n\nIk geef je directe, praktische antwoorden en oplossingen. Wat heb je nodig?`
      case 'simulator': return `🎭 Welkom in de ${moduleTitle} Simulator\n\nIk creëer realistische scenario's waarin je kunt oefenen. Klaar voor de uitdaging?`
      case 'student': return `🎓 Hoi! Ik ben je AI-Student voor ${moduleTitle}\n\nIk stel vragen zodat jij kunt uitleggen en onderwijzen. Maak mij wijzer!`
      default: return `🤖 AI-Begeleider voor ${moduleTitle}\n\nIk help je met al je vragen over deze module.`
    }
  }

  const getModuleLeerdoelen = (moduleId: string): string[] => {
    switch (moduleId) {
      case 'module1':
        return [
          'Alle 58 kerndoelen kennen en begrijpen',
          'Kerndoelen vertalen naar concrete lesdoelen',
          'Progressie monitoren per groep',
          'Curriculum mapping toepassen'
        ]
      case 'module2':
        return [
          'Ontwikkelingsstadia herkennen en begrijpen',
          'Theorie koppelen aan onderwijspraktijk',
          'Leeftijdsadequaat onderwijs vormgeven',
          'Individuele verschillen in ontwikkeling begrijpen'
        ]
      case 'module3':
        return [
          'SEL-competenties begrijpen en ontwikkelen',
          'Positief klassenklimaat creëren',
          'Gedragsmanagement strategieën toepassen',
          'Sociale vaardigheden stimuleren'
        ]
      case 'module4':
        return [
          'Differentiatie strategieën toepassen',
          'Inclusief onderwijs vormgeven',
          'Adaptief onderwijs implementeren',
          'Individuele leerbehoeften herkennen'
        ]
      case 'module5':
        return [
          'Data verzamelen en analyseren',
          'Evaluatie-instrumenten inzetten',
          'Formatieve en summatieve evaluatie',
          'Data-gedreven beslissingen nemen'
        ]
      case 'module6':
        return [
          '21e-eeuwse vaardigheden herkennen',
          'Kritisch denken stimuleren',
          'Creativiteit en innovatie bevorderen',
          'Digitale geletterdheid ontwikkelen'
        ]
      case 'module7':
        return [
          'Leiderschapsstijlen begrijpen',
          'Teamontwikkeling faciliteren',
          'Verandermanagement toepassen',
          'Visie en strategie ontwikkelen'
        ]
      case 'module8':
        return [
          'Burgerschapscompetenties ontwikkelen',
          'Diversiteit waarderen en benutten',
          'Interculturele competentie opbouwen',
          'Democratische waarden overdragen'
        ]
      case 'module9':
        return [
          'Cito-systeem volledig begrijpen',
          'A-E en I-V niveaus interpreteren',
          'Monitoring strategieën toepassen',
          'Data gebruiken voor interventies'
        ]
      case 'module10':
        return [
          'Onderzoekskader 2021 beheersen',
          'Inspectie voorbereiding organiseren',
          'Kwaliteitszorg implementeren',
          'Zelfevaluatie uitvoeren'
        ]
      case 'module11':
        return [
          'WMS wetgeving begrijpen',
          'MR-taken en bevoegdheden kennen',
          'Participatie organiseren',
          'Democratische processen faciliteren'
        ]
      default:
        return ['Leerdoelen voor deze module worden geladen...']
    }
  }

  const getModuleCompetenties = (moduleId: string): string[] => {
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
      case 'module3':
        return [
          'Pedagogische bekwaamheid',
          'Interpersoonlijke bekwaamheid',
          'Communicatieve bekwaamheid'
        ]
      case 'module4':
        return [
          'Didactische bekwaamheid',
          'Pedagogische bekwaamheid',
          'Organisatorische bekwaamheid'
        ]
      case 'module5':
        return [
          'Analytische bekwaamheid',
          'Reflectieve bekwaamheid',
          'Organisatorische bekwaamheid'
        ]
      case 'module6':
        return [
          'Innovatieve bekwaamheid',
          'Didactische bekwaamheid',
          'Technologische bekwaamheid'
        ]
      case 'module7':
        return [
          'Leiderschapsbekwaamheid',
          'Communicatieve bekwaamheid',
          'Organisatorische bekwaamheid'
        ]
      case 'module8':
        return [
          'Interculturele bekwaamheid',
          'Pedagogische bekwaamheid',
          'Communicatieve bekwaamheid'
        ]
      case 'module9':
        return [
          'Analytische bekwaamheid',
          'Didactische bekwaamheid',
          'Organisatorische bekwaamheid'
        ]
      case 'module10':
        return [
          'Kwaliteitsbekwaamheid',
          'Organisatorische bekwaamheid',
          'Reflectieve bekwaamheid'
        ]
      case 'module11':
        return [
          'Juridische bekwaamheid',
          'Communicatieve bekwaamheid',
          'Organisatorische bekwaamheid'
        ]
      default:
        return ['Competenties voor deze module worden geladen...']
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handlePersonalityChange = (personality: 'tutor' | 'coach' | 'mentor' | 'teammate' | 'tool' | 'simulator' | 'student') => {
    setAiPersonality(personality)
    setSelectedPersonalityInfo({
      description: getPersonalityDescription(personality),
      icon: getPersonalityIcon(personality)
    })
  }

  if (documents.length === 0) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="text-lg font-semibold text-orange-800 mb-2">Geen documenten geüpload</h3>
        <p className="text-orange-700 text-sm mb-4">
          Upload je schooldocumenten om slimme AI-analyse en begeleiding te krijgen voor de module "{moduleTitle}"
        </p>
        <button
          onClick={() => window.location.href = '/documenten'}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Documenten uploaden
        </button>
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAnalysisVisible(!analysisVisible)}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                {analysisVisible ? '🔍 Verberg analyse' : '🔍 Toon analyse'}
              </button>
              <button
                onClick={() => setShowChat(false)}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                🔙 Terug
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Results - Now toggleable */}
        {analysisVisible && quickscanResult && (
          <div className="bg-white rounded-lg p-6 border-l-4 border-emerald-500 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <span className="text-xl mr-2">📋</span>
                Quickscan Resultaten: {moduleTitle}
              </h4>
              <button
                onClick={() => setAnalysisVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <div className="whitespace-pre-wrap">{quickscanResult.analysis}</div>
            </div>
            {quickscanResult.analysisType === 'fallback' && (
              <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  💡 Opmerking: Dit is een standaard analyse omdat de AI-service tijdelijk niet beschikbaar is. 
                  De chatbot kan je nog steeds helpen met vragen over je documenten.
                </p>
              </div>
            )}
          </div>
        )}

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

        {/* Voice Input */}
        <VoiceInput
          onTranscript={handleVoiceTranscript}
          isListening={isListening}
          onToggleListening={() => setIsListening(!isListening)}
          disabled={isLoading}
        />

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
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            💡 Tip: Gebruik de microfoon voor hands-free chatten
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Part 1: Quickscan Analysis */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
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
              title="Voer een nieuwe analyse uit"
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
                💡 Opmerking: Dit is een standaard analyse omdat de AI-service tijdelijk niet beschikbaar is. 
                De chatbot kan je nog steeds helpen met vragen over je documenten.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Module Info Card */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Over deze module</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">🎯 Leerdoelen:</h4>
            <ul className="space-y-1">
              {getModuleLeerdoelen(moduleId).map((doel, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{doel}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">💪 Competenties:</h4>
            <ul className="space-y-1">
              {getModuleCompetenties(moduleId).map((competentie, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{competentie}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>💡 Tip:</strong> Gebruik de AI-chatbot om vragen te stellen over hoe je deze module kunt toepassen in jouw specifieke schoolsituatie.
          </p>
        </div>
      </div>

      {/* Part 2: AI Chatbot Configuration */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-4">🤖 Deel 2: Slimme Chatbot per Module</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* AI Personality Selector */}
          <div>
            <h4 className="font-semibold mb-3">Kies je AI-begeleider:</h4>
            <div className="grid grid-cols-7 gap-2">
              {[
                { id: 'tutor', label: 'AI-Tutor', tooltip: 'Stap-voor-stap uitleg en begeleiding' },
                { id: 'coach', label: 'AI-Coach', tooltip: 'Motiverende ondersteuning en feedback' },
                { id: 'mentor', label: 'AI-Mentor', tooltip: 'Wijze begeleiding en reflectie' },
                { id: 'teammate', label: 'AI-Teammate', tooltip: 'Samenwerking op gelijk niveau' },
                { id: 'tool', label: 'AI-Tool', tooltip: 'Directe, praktische antwoorden' },
                { id: 'simulator', label: 'AI-Simulator', tooltip: 'Rollenspel en scenario-oefening' },
                { id: 'student', label: 'AI-Student', tooltip: 'Jij bent de leraar, AI is de leerling' }
              ].map((personality) => (
                <div key={personality.id} className="group relative">
                  <button
                    onClick={() => handlePersonalityChange(personality.id as any)}
                    className={`w-full p-2 rounded-lg text-sm transition-all ${
                      aiPersonality === personality.id
                        ? 'bg-white text-blue-600 font-semibold shadow-md'
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg">{getPersonalityIcon(personality.id)}</span>
                      <span className="text-xs mt-1">{personality.label.split('-')[1]}</span>
                    </div>
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    {personality.tooltip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Personality Info */}
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                {selectedPersonalityInfo?.icon}
              </div>
              <div>
                <h4 className="font-semibold">AI-{aiPersonality.charAt(0).toUpperCase() + aiPersonality.slice(1)}</h4>
                <p className="text-blue-100 text-sm">{selectedPersonalityInfo?.description}</p>
              </div>
            </div>
          </div>

          {/* Start Chat Button */}
          <div className="flex justify-center">
            <button
              onClick={startChat}
              disabled={!quickscanResult}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
            >
              🚀 Start Slimme Chat
            </button>
          </div>
        </div>

        {!quickscanResult && (
          <p className="text-blue-100 text-sm mt-2 text-center">
            Wacht tot de quickscan voltooid is...
          </p>
        )}
      </div>
    </div>
  )
}