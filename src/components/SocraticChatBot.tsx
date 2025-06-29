'use client'

import { useState, useRef, useEffect } from 'react'
import ContextAwareChat from './ContextAwareChat'

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
  mimeType?: string
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
  const [autoStartChat, setAutoStartChat] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [documentAnalysis, setDocumentAnalysis] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [initialQuestion, setInitialQuestion] = useState<string>('')
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [returnToModule, setReturnToModule] = useState<boolean>(true)
  const [analysisVisible, setAnalysisVisible] = useState(true)

  // Load documents from localStorage
  useEffect(() => {
    const loadDocuments = () => {
      try {
        const savedDocs = localStorage.getItem('pabo-documents')
        
        if (savedDocs) {
          const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
            ...doc,
            uploadDate: new Date(doc.uploadDate)
          }))
          
          console.log('📚 Loading documents for AI analysis:', parsedDocs.length)
          setAvailableDocuments(parsedDocs)
          
          // Auto-select all documents
          const docIds = parsedDocs.map((doc: any) => doc.id)
          setSelectedDocuments(docIds)
          
          // AUTO-START CHAT if documents are available
          if (parsedDocs.length > 0) {
            setAutoStartChat(true)
            setTimeout(() => {
              startDirectChatWithAnalysis(parsedDocs)
            }, 500)
          }
        }
      } catch (error) {
        console.error('Error loading documents:', error)
        localStorage.removeItem('pabo-documents')
      } finally {
        setIsLoading(false)
      }
    }

    loadDocuments()

    if (typeof window !== 'undefined') {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'pabo-documents') {
          setTimeout(loadDocuments, 500)
        }
      }

      const handleDocumentUpload = (event: any) => {
        setTimeout(loadDocuments, 500)
      }

      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('documentUploaded', handleDocumentUpload)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('documentUploaded', handleDocumentUpload)
      }
    }
  }, [])

  const analyzeDocumentsForModule = async (documents: UploadedDocument[], moduleTitle: string) => {
    setIsAnalyzing(true)
    setAnalysisComplete(false)
    
    try {
      console.log(`🔍 Starting AI analysis for ${documents.length} documents and module: ${moduleTitle}`)
      
      // Prepare document content for AI analysis
      const documentTexts = documents.map(doc => {
        console.log(`📖 Processing document: ${doc.fileName}`)
        
        // Use the full extracted text from the document
        let content = doc.text
        
        // If the text is very long, take a meaningful sample
        if (content.length > 3000) {
          // Try to extract the most relevant parts
          const sections = content.split(/===|---|\n\n/)
          const relevantSections = sections
            .filter(section => section.length > 50)
            .slice(0, 5)
            .join('\n\n')
          
          content = relevantSections || content.substring(0, 3000)
        }
        
        console.log(`📋 Using ${content.length} characters for ${doc.fileName}`)
        
        return `DOCUMENT: ${doc.fileName} (${doc.detectedType})

INHOUD:
${content}

EINDE DOCUMENT`
      }).join('\n\n')
      
      console.log(`📊 Total content for AI: ${documentTexts.length} characters`)
      
      console.log('🤖 Sending analysis request to AI...')

      // Use the analyze-document endpoint
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentText: documentTexts,
          documentType: 'schooldocument',
          analysisType: 'praktijk-reflectie',
          module: moduleTitle
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const analysisText = result.analysis
        console.log('✅ AI analysis completed successfully')
        setDocumentAnalysis(analysisText)
        
        // Extract the initial question from the analysis
        const questionMatch = analysisText.match(/Openingsvraag(?:.*?):\s*(.+?)(?:\n|$)/i)
        
        if (questionMatch) {
          const question = questionMatch[1].trim()
          setInitialQuestion(question)
          console.log('✅ Extracted initial question:', question)
        } else {
          const fallbackQuestion = `Welk aspect van je ${documents.map(d => d.detectedType.toLowerCase()).join(' en ')} vind je het meest relevant voor "${moduleTitle}"?`
          setInitialQuestion(fallbackQuestion)
          console.log('🔄 Using fallback question:', fallbackQuestion)
        }
        
        setAnalysisComplete(true)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(`Analysis request failed: ${response.status} - ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('❌ Document analysis error:', error)
      
      // Fallback analysis
      const fallbackAnalysis = `Documenten ontvangen
Je hebt ${documents.length} schooldocument(en) geüpload: ${documents.map(doc => doc.fileName).join(', ')}.

Pluspunten t.o.v. module doelen
• Je documenten bieden concrete schoolcontext voor de module "${module}"
• Ze maken het mogelijk om theorie te koppelen aan jullie specifieke praktijk
• Er is materiaal beschikbaar om praktische verbeteringen te identificeren

Ontwikkelkansen
• We kunnen samen onderzoeken hoe jullie aanpak zich verhoudt tot de module doelen
• Er zijn mogelijkheden om concrete implementatiestrategieën te ontwikkelen
• We kunnen verbanden leggen tussen theorie en jullie schoolsituatie

Openingsvraag
Welk specifiek aspect van je schooldocumenten wil je als eerste bespreken in relatie tot de module "${module}"?`
      
      setDocumentAnalysis(fallbackAnalysis)
      setInitialQuestion(`Welk aspect van je schooldocumenten is het meest relevant voor de module "${module}"?`)
      setAnalysisComplete(true)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const startOpdracht = (opdracht: Opdracht) => {
    setSelectedOpdracht(opdracht)
  }

  const startDirectChatWithAnalysis = async (docs?: UploadedDocument[]) => {
    const documents = docs || availableDocuments
    
    console.log(`🚀 Starting direct chat with analysis for ${documents.length} documents`)
    
    // Set up the chat first
    setSelectedOpdracht({
      titel: "Chat met je Schooldocumenten",
      beschrijving: "Chat direct met de AI over je geüploade schooldocumenten",
      type: "reflectie",
      startVraag: "Hoe kan ik je helpen met je schooldocumenten?",
      context: `Je bent een ervaren onderwijsprofessional die gebruikers helpt met vragen over hun werk en schoolpraktijk. De gebruiker heeft ${documents.length} schooldocument(en) geüpload. Gebruik de socratische methode en verwijs naar de documenten waar relevant. Spreek de gebruiker aan als "je".`
    })
    
    // Start analysis AFTER setting up chat
    if (documents.length > 0) {
      await analyzeDocumentsForModule(documents, module)
    }
  }

  const resetChat = () => {
    setSelectedOpdracht(null)
    setAutoStartChat(false)
    setDocumentAnalysis('')
    setInitialQuestion('')
    setAnalysisComplete(false)
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
        {/* Document Info Block */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">🤖 AI-Analyse: {module}</h3>
              <div className="flex items-center space-x-4 text-green-100 text-sm">
                <span>📚 {availableDocuments.length} document(en)</span>
                <span>✅ {selectedDocuments.length} geselecteerd</span>
                <span>🌱 {studentLevel}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAnalysisVisible(!analysisVisible)}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                {analysisVisible ? '🔍 Verberg analyse' : '🔍 Toon analyse'}
              </button>
              <label className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm">
                <input
                  type="checkbox"
                  checked={returnToModule}
                  onChange={(e) => setReturnToModule(e.target.checked)}
                  className="rounded border-white border-opacity-50"
                />
                <span>Blijf in module</span>
              </label>
              <button
                onClick={resetChat}
                className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                ⚙️ Instellingen
              </button>
            </div>
          </div>
          
          {/* Document List */}
          <div className="flex flex-wrap gap-2 mb-4">
            {availableDocuments.slice(0, 3).map((doc, index) => (
              <span key={index} className="px-3 py-1 bg-white bg-opacity-25 rounded-full text-sm font-medium">
                {doc.mimeType?.startsWith('image/') ? '🖼️' : '📄'} {doc.fileName}
              </span>
            ))}
            {availableDocuments.length > 3 && (
              <span className="px-3 py-1 bg-white bg-opacity-25 rounded-full text-sm font-medium">
                +{availableDocuments.length - 3} meer
              </span>
            )}
          </div>

          {/* Analysis Status */}
          {isAnalyzing ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="text-white font-medium">🔍 AI analyseert je documenten...</span>
              </div>
              <p className="text-green-100 text-sm">
                Ik analyseer de inhoud van je documenten en koppel deze aan de doelen van "{module}"
              </p>
            </div>
          ) : analysisComplete ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white font-medium">✅ Analyse voltooid!</span>
              </div>
              <p className="text-green-100 text-sm">
                Ik heb je documenten geanalyseerd en gekoppeld aan de module doelen.
              </p>
            </div>
          ) : (
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-white text-sm">🔄 Documenten worden voorbereid voor analyse...</p>
            </div>
          )}
        </div>

        {/* Analysis Results - Now toggleable */}
        {analysisVisible && analysisComplete && documentAnalysis && (
          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <span className="text-xl mr-2">📋</span>
                Analyse van je Schooldocumenten
              </h4>
              <button
                onClick={() => setAnalysisVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <div className="whitespace-pre-wrap">{documentAnalysis}</div>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <ContextAwareChat
          module={module}
          context={selectedOpdracht.context}
          studentLevel={studentLevel}
          availableDocuments={availableDocuments}
          selectedDocuments={selectedDocuments}
          initialQuestion={initialQuestion}
          returnToModule={returnToModule}
        />
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
            <h3 className="text-xl font-bold mb-2">Upload je schooldocumenten!</h3>
            <p className="text-orange-100 mb-4">
              Upload eerst je schooldocumenten voor de beste AI-begeleiding
            </p>
            <p className="text-orange-100 text-sm">
              💡 Tip: Gebruik het documentenpaneel bovenaan deze pagina
            </p>
          </div>
        )}

        {/* Documents Available - Manual Start */}
        {availableDocuments.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 Klaar voor AI-Analyse!</h3>
                <p className="text-green-100 mb-4">
                  Je hebt {availableDocuments.length} document(en) geüpload. Begin direct met inhoudelijke gesprekken!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {availableDocuments.slice(0, 3).map((doc, index) => (
                    <span key={index} className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      {doc.mimeType?.startsWith('image/') ? '🖼️' : '📄'} {doc.fileName}
                    </span>
                  ))}
                  {availableDocuments.length > 3 && (
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      +{availableDocuments.length - 3} meer
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => startDirectChatWithAnalysis()}
                  className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  💬 Start Chat
                </button>
                <label className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm">
                  <input
                    type="checkbox"
                    checked={returnToModule}
                    onChange={(e) => setReturnToModule(e.target.checked)}
                    className="rounded border-white border-opacity-50"
                  />
                  <span>Blijf in module</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Student Level Selector */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">🎯 Stel je niveau in</h3>
          <div className="flex space-x-3">
            {[
              { id: 'beginnend', label: '🌱 Beginnend', desc: 'Eerste jaar' },
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
              </div>
            ))}
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
            <p className="text-blue-100 text-sm">
              Opdracht: {selectedOpdracht.titel}
            </p>
            {selectedDocuments.length > 0 && (
              <p className="text-blue-100 text-xs">📚 Met {selectedDocuments.length} schooldocument(en)</p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {analysisComplete && (
              <button
                onClick={() => setAnalysisVisible(!analysisVisible)}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                {analysisVisible ? '🔍 Verberg analyse' : '🔍 Toon analyse'}
              </button>
            )}
            <label className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-lg text-sm">
              <input
                type="checkbox"
                checked={returnToModule}
                onChange={(e) => setReturnToModule(e.target.checked)}
                className="rounded border-white border-opacity-50"
              />
              <span>Blijf in module</span>
            </label>
            <button
              onClick={resetChat}
              className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
            >
              Nieuwe opdracht
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results - Now toggleable */}
      {analysisVisible && analysisComplete && documentAnalysis && (
        <div className="bg-white rounded-lg p-6 border-l-4 border-green-500 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <span className="text-xl mr-2">📋</span>
              Analyse van je Schooldocumenten
            </h4>
            <button
              onClick={() => setAnalysisVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700">
            <div className="whitespace-pre-wrap">{documentAnalysis}</div>
          </div>
        </div>
      )}

      {/* Context-Aware Chat Component */}
      <ContextAwareChat
        module={module}
        context={selectedOpdracht.context}
        studentLevel={studentLevel}
        availableDocuments={availableDocuments}
        selectedDocuments={selectedDocuments}
        initialQuestion={initialQuestion}
        returnToModule={returnToModule}
      />
    </div>
  )
}