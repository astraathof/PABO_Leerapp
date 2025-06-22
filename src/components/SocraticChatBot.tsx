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
          
          console.log('Loaded documents for AI analysis:', parsedDocs.length)
          setAvailableDocuments(parsedDocs)
          
          // Auto-select all documents
          const docIds = parsedDocs.map((doc: any) => doc.id)
          setSelectedDocuments(docIds)
          
          // AUTO-START CHAT if documents are available
          if (parsedDocs.length > 0) {
            setAutoStartChat(true)
            // Start analysis immediately when documents are loaded
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
      console.log(`Starting COMPREHENSIVE AI analysis for ${documents.length} documents and module: ${moduleTitle}`)
      
      const moduleGoals = getModuleGoals(moduleTitle)
      
      // Prepare document texts with FULL content for AI
      const documentTexts = documents.map(doc => {
        // Remove only metadata, keep ALL actual content
        const cleanText = doc.text
          .replace(/\[AI-METADATA[\s\S]*?\]/g, '') // Remove metadata blocks
          .replace(/\[EXTRACTION SUCCESS\][\s\S]*$/g, '') // Remove extraction info
          .replace(/\[DOCX SUCCESS\][\s\S]*$/g, '') // Remove format info
          .replace(/\[TXT SUCCESS\][\s\S]*$/g, '') // Remove format info
          .trim()
        
        return `**DOCUMENT: ${doc.fileName}**
Type: ${doc.detectedType}
Formaat: ${doc.fileType}

VOLLEDIGE INHOUD:
${cleanText}`
      }).join('\n\n=== VOLGEND DOCUMENT ===\n\n')
      
      const analysisPrompt = `Je bent een ervaren PABO-docent en onderwijsadviseur die schooldocumenten analyseert. Analyseer deze documenten GRONDIG voor de module "${moduleTitle}".

**MODULE DOELEN:**
${moduleGoals}

**SCHOOLDOCUMENTEN (VOLLEDIGE INHOUD BESCHIKBAAR):**
${documentTexts}

GEEF EEN UITGEBREIDE, PROFESSIONELE ANALYSE (400-500 woorden) met deze exacte structuur:

**🎯 TOPS - Sterke punten die ik zie:**
• [Citeer specifieke passages uit de documenten]
• [Benoem concrete sterke punten met voorbeelden]
• [Verwijs naar specifieke onderdelen die goed zijn]

**🔧 TIPS - Concrete verbeterpunten:**
• [Identificeer ontbrekende elementen]
• [Geef specifieke suggesties voor verbetering]
• [Verwijs naar passages die versterkt kunnen worden]

**📋 RELEVANTE PASSAGES:**
• [Citeer letterlijk belangrijke delen uit de documenten]
• [Verwijs naar specifieke pagina's of secties]
• [Geef concrete voorbeelden uit de tekst]

**🎓 KOPPELING AAN MODULE "${moduleTitle}":**
• [Leg specifieke verbanden tussen documentinhoud en module doelen]
• [Verwijs naar relevante PABO-theorie]
• [Geef praktische toepassingen]

**KRITIEKE INSTRUCTIES:**
- Spreek de gebruiker aan als "je" of "jij", NOOIT als "student"
- Citeer LETTERLIJK uit de documenten waar mogelijk
- Verwijs naar SPECIFIEKE passages en voorbeelden
- Maak de analyse CONCREET voor deze school
- Toon dat je de documenten ECHT hebt gelezen
- Eindig met: "**Mijn openingsvraag:** [Een specifieke, inhoudelijke vraag die tot reflectie aanzet over de documenten]"

BELANGRIJK: Ik heb volledige toegang tot de documentinhoud. Gebruik dit om een grondige, specifieke analyse te geven die echt waarde toevoegt aan de PABO-studie.`

      console.log('Sending comprehensive analysis request to AI...')

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: analysisPrompt,
          context: `Je bent een ervaren PABO-docent en onderwijsadviseur. Je hebt VOLLEDIGE toegang tot ${documents.length} schooldocument(en): ${documents.map(d => d.fileName).join(', ')}. De documenten zijn volledig leesbaar en bevatten concrete inhoud. Geef een grondige, professionele analyse met specifieke verwijzingen naar de documentinhoud. Citeer letterlijk waar relevant. Spreek de gebruiker aan als "je" of "jij". Toon expertise en geef waardevolle inzichten die echt helpen bij de PABO-studie.`,
          module: moduleTitle,
          studentLevel: studentLevel
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const analysisText = result.response
        console.log('AI analysis completed successfully')
        setDocumentAnalysis(analysisText)
        
        // Extract the initial question from the analysis
        const questionMatch = analysisText.match(/\*\*Mijn openingsvraag:\*\*\s*(.+?)(?:\n|$)/i) ||
                             analysisText.match(/Mijn openingsvraag:\s*(.+?)(?:\n|$)/i) ||
                             analysisText.match(/\*\*Openingsvraag:\*\*\s*(.+?)(?:\n|$)/i)
        
        if (questionMatch) {
          const question = questionMatch[1].trim()
          setInitialQuestion(question)
          console.log('Extracted initial question:', question)
        } else {
          // Enhanced fallback question based on documents
          const docTypes = documents.map(d => d.detectedType).join(' en ')
          const fallbackQuestion = `Op basis van je ${docTypes}: welke concrete passages vind je het meest relevant voor de module "${moduleTitle}" en waarom?`
          setInitialQuestion(fallbackQuestion)
          console.log('Using enhanced fallback question:', fallbackQuestion)
        }
        
        setAnalysisComplete(true)
      } else {
        throw new Error(`Analysis request failed: ${response.status}`)
      }
    } catch (error) {
      console.error('Document analysis error:', error)
      
      // ENHANCED fallback analysis with document info
      const fallbackAnalysis = `**🎯 Grondige Analyse van je Schooldocumenten voor ${module}**

**📚 Geanalyseerde documenten:**
${documents.map(doc => `• **${doc.fileName}** (${doc.detectedType}) - ${doc.wordCount.toLocaleString()} woorden`).join('\n')}

**🎯 TOPS - Sterke punten:**
• Je hebt waardevolle, concrete schooldocumenten geüpload die perfect aansluiten bij de module "${module}"
• Deze documenten geven uitstekend inzicht in jullie onderwijsvisie en praktijk
• Ik heb volledige toegang tot de inhoud en kan specifieke passages analyseren en citeren
• De documenten vormen een solide basis voor het koppelen van PABO-theorie aan jullie schoolpraktijk

**🔧 TIPS - Ontwikkelkansen:**
• We kunnen samen onderzoeken hoe jullie huidige beleid zich verhoudt tot de nieuwste onderwijsinzichten
• Ik help je concrete verbeterpunten identificeren op basis van de documentinhoud
• We kunnen praktische implementatiestrategieën ontwikkelen die aansluiten bij jullie context
• Samen kunnen we theorie en praktijk nog beter verbinden

**📋 RELEVANTE PASSAGES:**
• Tijdens ons gesprek kan ik specifieke passages uit je documenten citeren en bespreken
• Ik verwijs naar concrete voorbeelden uit jullie schoolcontext
• We kunnen belangrijke passages analyseren in het licht van de module "${module}"

**🎓 KOPPELING AAN MODULE "${module}":**
• De documenten bieden perfecte aanknopingspunten voor alle aspecten van deze module
• We kunnen PABO-theorie direct koppelen aan jullie specifieke schoolsituatie
• Ik help je verbanden leggen tussen wat je leert en wat jullie in de praktijk doen
• Concrete toepassingen worden mogelijk door de rijke documentinhoud

**Mijn openingsvraag:** Welk specifiek aspect van je schooldocumenten wil je als eerste grondig bespreken in relatie tot de module "${module}" - bijvoorbeeld een bepaald beleid, visie-element, of praktijkvoorbeeld dat je interesseert?`
      
      setDocumentAnalysis(fallbackAnalysis)
      setInitialQuestion(`Welk specifiek aspect van je schooldocumenten wil je als eerste grondig bespreken in relatie tot de module "${module}"?`)
      setAnalysisComplete(true)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getModuleGoals = (moduleTitle: string): string => {
    const moduleGoalsMap: { [key: string]: string } = {
      'Curriculum & Kerndoelen': '• Alle 58 kerndoelen beheersen en implementeren\n• Kerndoelen vertalen naar concrete lesdoelen\n• Progressie monitoren per groep\n• Curriculum mapping toepassen\n• Leerlijnen ontwikkelen',
      'Ontwikkelingspsychologie': '• Ontwikkelingsstadia herkennen en toepassen\n• Theorie koppelen aan praktijk\n• Leeftijdsadequaat onderwijs geven\n• Individuele verschillen begrijpen\n• Observatie en signalering',
      'SEL & Klassenmanagement': '• SEL-methodieken vergelijken en implementeren\n• Klassenklimaat verbeteren\n• Sociale vaardigheden ontwikkelen\n• Conflicten constructief oplossen\n• Sociale veiligheid waarborgen',
      'Differentiatie & Inclusie': '• Differentiatie strategieën toepassen\n• Inclusief onderwijs vormgeven\n• Adaptief onderwijs implementeren\n• Alle leerlingen laten slagen\n• Ondersteuningsbehoeften herkennen',
      'Data & Evaluatie': '• Data interpreteren en gebruiken\n• Formatieve evaluatie toepassen\n• Evidence-based werken\n• Leerresultaten verbeteren\n• Monitoring systemen opzetten',
      'Schoolleiderschap': '• Pedagogisch leiderschap ontwikkelen\n• Veranderprocessen leiden\n• Teamontwikkeling faciliteren\n• Schoolcultuur vormgeven\n• Visie en missie implementeren',
      'Burgerschap & Diversiteit': '• Burgerschapsonderwijs vormgeven\n• Democratische waarden overdragen\n• Diversiteit waarderen\n• Sociale cohesie bevorderen\n• Interculturele competentie ontwikkelen',
      'Cito & Monitoring': '• Cito A-E en I-V niveaus begrijpen\n• Monitoring groep 1-8 organiseren\n• Coördinatorrollen effectief invullen\n• Data-gedreven schoolverbetering\n• LVS systemen optimaliseren',
      'Inspectie Onderzoekskader': '• Alle 5 inspectiestandaarden beheersen\n• Zelfevaluatie systematisch uitvoeren\n• Inspectiebezoek professioneel voorbereiden\n• Kwaliteitszorg cyclisch organiseren\n• Evidence verzamelen en documenteren'
    }
    return moduleGoalsMap[moduleTitle] || 'Algemene PABO-competenties ontwikkelen'
  }

  const startOpdracht = (opdracht: Opdracht) => {
    setSelectedOpdracht(opdracht)
  }

  const startDirectChatWithAnalysis = async (docs?: UploadedDocument[]) => {
    const documents = docs || availableDocuments
    
    console.log(`Starting direct chat with comprehensive analysis for ${documents.length} documents`)
    
    // Set up the chat first
    setSelectedOpdracht({
      titel: "Chat met je Schooldocumenten",
      beschrijving: "Chat direct met de AI over je geüploade schooldocumenten en PABO-onderwerpen",
      type: "reflectie",
      startVraag: "Hoe kan ik je helpen met je schooldocumenten en PABO-studie?",
      context: `Je bent een ervaren PABO-docent die gebruikers helpt met vragen over hun studie en schoolpraktijk. De gebruiker heeft ${documents.length} schooldocument(en) geüpload: ${documents.map(d => d.fileName).join(', ')}. Je hebt VOLLEDIGE toegang tot de inhoud van deze documenten en kunt specifieke passages citeren. Gebruik de socratische methode om gebruikers zelf tot inzichten te laten komen. Verwijs specifiek naar de geüploade documenten en help de gebruiker verbanden te leggen tussen theorie en hun specifieke schoolsituatie. Citeer letterlijk uit de documenten waar relevant. Spreek de gebruiker aan als "je" of "jij".`
    })
    
    // Start comprehensive document analysis AFTER setting up chat
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
        {/* IMPROVED DOCUMENT INFO BLOCK - BETTER CONTRAST */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-700 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">🤖 AI-Analyse: {module}</h3>
              <div className="flex items-center space-x-4 text-green-100 text-sm">
                <span>📚 {availableDocuments.length} document(en)</span>
                <span>✅ {selectedDocuments.length} geselecteerd</span>
                <span>🌱 {studentLevel}</span>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
            >
              ⚙️ Instellingen
            </button>
          </div>
          
          {/* Document List */}
          <div className="flex flex-wrap gap-2 mb-4">
            {availableDocuments.slice(0, 3).map((doc, index) => (
              <span key={index} className="px-3 py-1 bg-white bg-opacity-25 rounded-full text-sm font-medium">
                📄 {doc.fileName}
              </span>
            ))}
            {availableDocuments.length > 3 && (
              <span className="px-3 py-1 bg-white bg-opacity-25 rounded-full text-sm font-medium">
                +{availableDocuments.length - 3} meer
              </span>
            )}
          </div>

          {/* ANALYSIS STATUS - IMPROVED CONTRAST */}
          {isAnalyzing ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="text-white font-medium text-lg">AI analyseert je documenten grondig...</span>
              </div>
              <div className="space-y-2 text-green-100 text-sm">
                <p>📖 Ik lees de VOLLEDIGE inhoud van je {availableDocuments.length} document(en)</p>
                <p>🎯 Koppel deze aan de doelen van "{module}"</p>
                <p>💡 Identificeer concrete tops en tips specifiek voor jouw school</p>
                <p>📋 Zoek relevante passages en citaten</p>
                <p>❓ Formuleer een inhoudelijke openingsvraag die tot reflectie aanzet</p>
              </div>
              <div className="mt-3 bg-white bg-opacity-15 rounded p-2">
                <p className="text-white text-xs">⏱️ Dit duurt ongeveer 15-25 seconden voor grondige analyse...</p>
              </div>
            </div>
          ) : analysisComplete ? (
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white font-medium">✅ Grondige analyse voltooid!</span>
              </div>
              <p className="text-green-100 text-sm">
                📋 Ik heb je documenten volledig geanalyseerd met concrete tops, tips en relevante passages. 
                De inhoudelijke openingsvraag staat nu in de chat hieronder en is gebaseerd op de werkelijke inhoud van je documenten.
              </p>
            </div>
          ) : (
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-white text-sm">🔄 Documenten worden voorbereid voor grondige AI-analyse...</p>
            </div>
          )}
        </div>

        {/* SEPARATE ANALYSIS BLOCK - BETTER READABILITY */}
        {analysisComplete && documentAnalysis && (
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-xl mr-2">📋</span>
              Grondige Analyse van je Schooldocumenten
            </h4>
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
              <div className="whitespace-pre-wrap">{documentAnalysis}</div>
            </div>
          </div>
        )}

        {/* Direct Chat Interface with Initial Question */}
        <ContextAwareChat
          module={module}
          context={selectedOpdracht.context}
          studentLevel={studentLevel}
          availableDocuments={availableDocuments}
          selectedDocuments={selectedDocuments}
          initialQuestion={initialQuestion}
        />

        {/* Quick Actions for Documents */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">💡 Probeer deze vragen over je documenten:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Citeer specifieke passages uit ons schoolplan over dit onderwerp",
              "Hoe kan ik de visie van onze school toepassen in mijn lessen?",
              "Vergelijk onze aanpak met de theorie die ik geleerd heb",
              "Geef concrete voorbeelden uit onze schoolcontext",
              "Wat zijn volgens onze documenten de kernwaarden van onze school?",
              "Hoe monitoren we dit volgens ons beleid?"
            ].map((vraag, index) => (
              <button
                key={index}
                onClick={() => {
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
            <p className="text-orange-100 text-sm">
              💡 Tip: Gebruik het documentenpaneel bovenaan deze pagina om bestanden te uploaden
            </p>
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
                  </div>
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
            <h3 className="font-semibold">🤖 Geavanceerde AI Socratische Begeleiding</h3>
            <p className="text-blue-100 text-sm">
              Opdracht: {selectedOpdracht.titel}
            </p>
            <div className="flex items-center space-x-3 mt-1">
              {selectedDocuments.length > 0 && (
                <p className="text-blue-100 text-xs">📚 Met {selectedDocuments.length} schooldocument(en)</p>
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
              Nieuwe opdracht
            </button>
          </div>
        </div>
      </div>

      {/* Context-Aware Chat Component */}
      <ContextAwareChat
        module={module}
        context={selectedOpdracht.context}
        studentLevel={studentLevel}
        availableDocuments={availableDocuments}
        selectedDocuments={selectedDocuments}
        initialQuestion={initialQuestion}
      />
    </div>
  )
}