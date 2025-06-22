'use client'

import { useState, useRef, useEffect } from 'react'
import ContextAwareChat from './ContextAwareChat'
import MultiModalUpload from './MultiModalUpload'

interface Opdracht {
  titel: string
  beschrijving: string
  type: 'reflectie' | 'analyse' | 'ontwerp' | 'toepassing'
  startVraag: string
  context: string
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

interface UploadedFile {
  id: string
  file: File
  type: 'image' | 'audio' | 'document' | 'video'
  preview?: string
  transcription?: string
  analysis?: string
}

interface SocraticChatBotProps {
  module: string
  opdrachten: Opdracht[]
}

export default function SocraticChatBot({ module, opdrachten }: SocraticChatBotProps) {
  const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null)
  const [studentLevel, setStudentLevel] = useState<'beginnend' | 'gevorderd' | 'expert'>('beginnend')
  const [availableDocuments, setAvailableDocuments] = useState<UploadedDocument[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [useDocuments, setUseDocuments] = useState(true)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [useMultiModal, setUseMultiModal] = useState(true)
  const [showDirectChat, setShowDirectChat] = useState(false)
  const [autoStartChat, setAutoStartChat] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [documentAnalysis, setDocumentAnalysis] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Load documents from localStorage with better error handling
  useEffect(() => {
    const loadDocuments = () => {
      try {
        const savedDocs = localStorage.getItem('pabo-documents')
        console.log('SocraticChatBot: Loading documents from localStorage:', savedDocs)
        
        if (savedDocs) {
          const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
            ...doc,
            uploadDate: new Date(doc.uploadDate)
          }))
          
          console.log('SocraticChatBot: Parsed documents:', parsedDocs)
          setAvailableDocuments(parsedDocs)
          
          // Auto-select all documents
          const docIds = parsedDocs.map((doc: any) => doc.id)
          setSelectedDocuments(docIds)
          console.log('SocraticChatBot: Auto-selected document IDs:', docIds)
          
          // AUTO-START CHAT if documents are available
          if (parsedDocs.length > 0) {
            console.log('SocraticChatBot: Documents found, auto-starting chat...')
            setAutoStartChat(true)
            // Start chat immediately with analysis
            setTimeout(() => {
              startDirectChatWithAnalysis(parsedDocs)
            }, 100)
          }
        } else {
          console.log('SocraticChatBot: No documents found in localStorage')
        }
      } catch (error) {
        console.error('SocraticChatBot: Error loading documents:', error)
        localStorage.removeItem('pabo-documents')
      } finally {
        setIsLoading(false)
      }
    }

    loadDocuments()

    // Listen for storage changes (when documents are uploaded)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pabo-documents') {
        console.log('SocraticChatBot: Storage changed, reloading documents...')
        loadDocuments()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      
      // Also listen for custom events from document upload
      const handleDocumentUpload = (event: any) => {
        console.log('SocraticChatBot: Document upload event detected, reloading...', event.detail)
        setTimeout(loadDocuments, 500) // Small delay to ensure localStorage is updated
      }

      window.addEventListener('documentUploaded', handleDocumentUpload)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('documentUploaded', handleDocumentUpload)
      }
    }
  }, [])

  const analyzeDocumentsForModule = async (documents: UploadedDocument[], moduleTitle: string) => {
    setIsAnalyzing(true)
    try {
      // Create analysis prompt based on module
      const moduleGoals = getModuleGoals(moduleTitle)
      const documentTexts = documents.map(doc => `${doc.fileName}: ${doc.text.substring(0, 2000)}`).join('\n\n')
      
      const analysisPrompt = `Analyseer deze schooldocumenten in relatie tot de module "${moduleTitle}".

MODULE DOELEN:
${moduleGoals}

SCHOOLDOCUMENTEN:
${documentTexts}

Geef een korte analyse (max 200 woorden) waarin je:
1. Benoemt wat je ziet in de documenten dat relevant is voor deze module
2. Koppelt aan de module doelen
3. Eindigt met 2-3 socratische vragen om het gesprek te starten

Wees specifiek en verwijs naar concrete passages uit de documenten.`

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: analysisPrompt,
          context: `Je bent een PABO-docent die documenten analyseert voor de module ${moduleTitle}`,
          module: moduleTitle,
          studentLevel: studentLevel
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setDocumentAnalysis(result.response)
      }
    } catch (error) {
      console.error('Document analysis error:', error)
      setDocumentAnalysis('Ik heb je documenten bekeken en ben klaar om je te helpen met vragen over je schoolpraktijk!')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getModuleGoals = (moduleTitle: string): string => {
    const moduleGoalsMap: { [key: string]: string } = {
      'Curriculum & Kerndoelen': '• Alle 58 kerndoelen beheersen\n• Kerndoelen vertalen naar lesdoelen\n• Progressie monitoren per groep\n• Curriculum mapping toepassen',
      'Ontwikkelingspsychologie': '• Ontwikkelingsstadia herkennen\n• Theorie koppelen aan praktijk\n• Leeftijdsadequaat onderwijs geven\n• Individuele verschillen begrijpen',
      'SEL & Klassenmanagement': '• SEL-methodieken vergelijken\n• Klassenklimaat verbeteren\n• Sociale vaardigheden ontwikkelen\n• Conflicten constructief oplossen',
      'Differentiatie & Inclusie': '• Differentiatie strategieën toepassen\n• Inclusief onderwijs vormgeven\n• Adaptief onderwijs implementeren\n• Alle leerlingen laten slagen',
      'Data & Evaluatie': '• Data interpreteren en gebruiken\n• Formatieve evaluatie toepassen\n• Evidence-based werken\n• Leerresultaten verbeteren',
      'Schoolleiderschap': '• Pedagogisch leiderschap ontwikkelen\n• Veranderprocessen leiden\n• Teamontwikkeling faciliteren\n• Schoolcultuur vormgeven',
      'Burgerschap & Diversiteit': '• Burgerschapsonderwijs vormgeven\n• Democratische waarden overdragen\n• Diversiteit waarderen\n• Sociale cohesie bevorderen',
      'Cito & Monitoring': '• Cito A-E en I-V niveaus begrijpen\n• Monitoring groep 1-8 organiseren\n• Coördinatorrollen effectief invullen\n• Data-gedreven schoolverbetering'
    }
    return moduleGoalsMap[moduleTitle] || 'Algemene PABO-competenties ontwikkelen'
  }

  const startOpdracht = (opdracht: Opdracht) => {
    setSelectedOpdracht(opdracht)
  }

  const startDirectChatWithAnalysis = async (docs?: UploadedDocument[]) => {
    const documents = docs || availableDocuments
    console.log('SocraticChatBot: Starting direct chat with analysis for documents:', documents)
    
    setShowDirectChat(true)
    
    // Start document analysis
    if (documents.length > 0) {
      await analyzeDocumentsForModule(documents, module)
    }
    
    setSelectedOpdracht({
      titel: "Chat met je Schooldocumenten",
      beschrijving: "Chat direct met de AI over je geüploade schooldocumenten en PABO-onderwerpen",
      type: "reflectie",
      startVraag: "Hoe kan ik je helpen met je schooldocumenten en PABO-studie?",
      context: `Je bent een ervaren PABO-docent die studenten helpt met vragen over hun studie en schoolpraktijk. De student heeft ${documents.length} schooldocument(en) geüpload: ${documents.map(d => d.fileName).join(', ')}. Gebruik de socratische methode om studenten zelf tot inzichten te laten komen. Verwijs specifiek naar de geüploade documenten en help de student verbanden te leggen tussen theorie en hun specifieke schoolsituatie.`
    })
  }

  const resetChat = () => {
    setSelectedOpdracht(null)
    setShowDirectChat(false)
    setAutoStartChat(false)
    setDocumentAnalysis('')
  }

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Documenten laden...</p>
        </div>
      </div>
    )
  }

  // AUTO-CHAT MODE: Direct to chat if documents available
  if (autoStartChat && availableDocuments.length > 0 && selectedOpdracht) {
    return (
      <div className="space-y-4">
        {/* Chat Header with Document Info */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🎉 Perfect! Je documenten zijn klaar voor AI-analyse</h3>
              <p className="text-green-100 mb-3">
                Ik heb toegang tot {availableDocuments.length} van jouw schooldocumenten en kan nu gepersonaliseerde begeleiding geven!
              </p>
              <div className="flex flex-wrap gap-2">
                {availableDocuments.slice(0, 3).map((doc, index) => (
                  <span key={index} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    📄 {doc.fileName}
                  </span>
                ))}
                {availableDocuments.length > 3 && (
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    +{availableDocuments.length - 3} meer
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                🌱 {studentLevel}
              </span>
              <button
                onClick={resetChat}
                className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                ⚙️ Instellingen
              </button>
            </div>
          </div>
        </div>

        {/* Document Analysis */}
        {(isAnalyzing || documentAnalysis) && (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">🔍 AI Analyse van je Documenten</h4>
            {isAnalyzing ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-blue-700">Ik analyseer je documenten in relatie tot de module "{module}"...</span>
              </div>
            ) : (
              <div className="text-blue-800 whitespace-pre-wrap">{documentAnalysis}</div>
            )}
          </div>
        )}

        {/* Direct Chat Interface */}
        <ContextAwareChat
          module={module}
          context={selectedOpdracht.context}
          studentLevel={studentLevel}
          availableDocuments={availableDocuments}
          selectedDocuments={selectedDocuments}
        />

        {/* Quick Actions for Documents */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">💡 Probeer deze vragen over je documenten:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Wat staat er in ons schoolplan over burgerschap?",
              "Hoe kan ik de visie van onze school toepassen in mijn lessen?",
              "Vergelijk onze aanpak met de theorie die ik geleerd heb",
              "Geef concrete voorbeelden uit onze schoolcontext",
              "Wat zijn de kernwaarden van onze school?",
              "Hoe monitoren we leerresultaten volgens ons beleid?"
            ].map((vraag, index) => (
              <button
                key={index}
                onClick={() => {
                  // This would trigger sending the question - we'll implement this in ContextAwareChat
                  const event = new CustomEvent('sendMessage', { detail: vraag })
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(event)
                  }
                }}
                className="text-left p-3 bg-white border border-blue-200 rounded-lg text-sm text-blue-700 hover:bg-blue-50 transition-colors"
              >
                💬 {vraag}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // SETUP MODE: No documents or manual access
  if (!selectedOpdracht) {
    return (
      <div className="space-y-6">
        {/* No Documents - Upload Prompt */}
        {availableDocuments.length === 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-bold mb-2">Start met je schooldocumenten uploaden!</h3>
            <p className="text-orange-100 mb-4">
              Upload eerst je schooldocumenten (schoolplan, beleid, etc.) voor de beste AI-begeleiding
            </p>
            <button
              onClick={() => {
                // Navigate to document manager
                if (typeof window !== 'undefined') {
                  window.location.href = '#documents'
                }
              }}
              className="px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              📤 Upload Documenten Nu
            </button>
          </div>
        )}

        {/* Documents Available - Manual Start */}
        {availableDocuments.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 Klaar om te Chatten!</h3>
                <p className="text-green-100 mb-4">
                  Je hebt {availableDocuments.length} document(en) geüpload. Begin direct met chatten over je schoolpraktijk!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {availableDocuments.slice(0, 3).map((doc, index) => (
                    <span key={index} className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      📄 {doc.fileName}
                    </span>
                  ))}
                  {availableDocuments.length > 3 && (
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      +{availableDocuments.length - 3} meer
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => startDirectChatWithAnalysis()}
                className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                💬 Start Chat
              </button>
            </div>
          </div>
        )}

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

        {/* Multi-Modal Upload - STANDAARD ACTIEF */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-purple-800">🎭 Multi-Modal Learning</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-purple-700">Actief</span>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-purple-700 text-sm">
              Upload afbeeldingen, audio, video's en documenten voor rijkere AI-interacties:
            </p>
            <MultiModalUpload
              onFilesChange={setUploadedFiles}
              maxFiles={5}
            />
          </div>
        </div>

        {/* Document Integration - STANDAARD ACTIEF */}
        {availableDocuments.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-800">📚 Je Schooldocumenten</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-700">Actief</span>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-green-700 text-sm mb-3">
                ✅ Alle documenten zijn automatisch geselecteerd voor AI-begeleiding:
              </p>
              <div className="grid gap-2 max-h-32 overflow-y-auto">
                {availableDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center space-x-2 p-2 bg-white rounded border border-green-200">
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
                  </div>
                ))}
              </div>
              <div className="mt-2 p-2 bg-green-100 rounded text-sm text-green-700">
                ✅ {selectedDocuments.length} document(en) klaar voor AI-analyse
              </div>
            </div>
          </div>
        )}

        {/* Opdracht Selector */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🛠️ Of kies een gestructureerde opdracht</h3>
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
                  <div className="flex items-center space-x-2 text-sm">
                    {selectedDocuments.length > 0 && (
                      <div className="flex items-center text-green-600">
                        <span className="mr-1">📚</span>
                        <span>{selectedDocuments.length} docs</span>
                      </div>
                    )}
                    {uploadedFiles.length > 0 && (
                      <div className="flex items-center text-purple-600">
                        <span className="mr-1">🎭</span>
                        <span>{uploadedFiles.length} files</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Info Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">🧠 Geavanceerde AI-begeleiding</h3>
          <p className="text-purple-700 text-sm mb-3">
            Deze AI-mentor gebruikt de socratische methode en is uitgerust met geavanceerde features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🎙️</span>
              <span className="text-purple-700">Spraakherkenning voor hands-free interactie</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">⚡</span>
              <span className="text-purple-700">Real-time feedback tijdens het typen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🧠</span>
              <span className="text-purple-700">Context-bewuste responses</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🎭</span>
              <span className="text-purple-700">Multi-modal learning (tekst, audio, video)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">📚</span>
              <span className="text-purple-700">Automatische integratie schooldocumenten</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🔍</span>
              <span className="text-purple-700">Automatische document analyse per module</span>
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
            <h3 className="font-semibold">🤖 Geavanceerde AI Socratische Begeleiding</h3>
            <p className="text-blue-100 text-sm">
              {showDirectChat ? 'Chat met je Schooldocumenten' : `Opdracht: ${selectedOpdracht.titel}`}
            </p>
            <div className="flex items-center space-x-3 mt-1">
              {selectedDocuments.length > 0 && (
                <p className="text-blue-100 text-xs">📚 Met {selectedDocuments.length} schooldocument(en)</p>
              )}
              {uploadedFiles.length > 0 && (
                <p className="text-blue-100 text-xs">🎭 Met {uploadedFiles.length} multi-modal bestand(en)</p>
              )}
            </div>
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
              {showDirectChat ? 'Terug naar opties' : 'Nieuwe opdracht'}
            </button>
          </div>
        </div>
      </div>

      {/* Document Analysis */}
      {(isAnalyzing || documentAnalysis) && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">🔍 AI Analyse van je Documenten</h4>
          {isAnalyzing ? (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Ik analyseer je documenten in relatie tot de module "{module}"...</span>
            </div>
          ) : (
            <div className="text-blue-800 whitespace-pre-wrap">{documentAnalysis}</div>
          )}
        </div>
      )}

      {/* Context-Aware Chat Component */}
      <ContextAwareChat
        module={module}
        context={selectedOpdracht.context}
        studentLevel={studentLevel}
        availableDocuments={availableDocuments}
        selectedDocuments={selectedDocuments}
      />
    </div>
  )
}