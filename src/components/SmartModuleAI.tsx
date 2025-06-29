'use client'

import { useState, useEffect } from 'react'

interface UploadedDocument {
  id: string
  fileName: string
  fileType: string
  detectedType: string
  text: string
  wordCount: number
  uploadDate: Date
}

interface SmartModuleAIProps {
  moduleTitle: string
  moduleId: string
  documents: UploadedDocument[]
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

export default function SmartModuleAI({ moduleTitle, moduleId, documents }: SmartModuleAIProps) {
  const [quickscanResult, setQuickscanResult] = useState<QuickscanResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiPersonality, setAiPersonality] = useState<'tutor' | 'coach' | 'mentor' | 'teammate' | 'tool' | 'simulator' | 'student'>('mentor')

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
          module: moduleTitle, // Changed from moduleId to module: moduleTitle
          analysisType: 'module-quickscan'
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle specific error types
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
      
      // Set a fallback result for better UX
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
            onClick={() => {
              // Trigger chat start with analysis context
              const event = new CustomEvent('startModuleChat', {
                detail: {
                  module: moduleTitle,
                  personality: aiPersonality,
                  analysis: quickscanResult?.analysis,
                  documents: documents
                }
              })
              window.dispatchEvent(event)
            }}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            🚀 Start Slimme Chat
          </button>
        </div>
      </div>
    </div>
  )
}