'use client'

import { useState, useEffect } from 'react'
import DocumentManager from './DocumentManager'
import KerndoelenViewer from './KerndoelenViewer'
import DevelopmentTheoryViewer from './DevelopmentTheoryViewer'
import ClickableTheoryViewer from './ClickableTheoryViewer'
import SELMethodsViewer from './SELMethodsViewer'
import CitoMonitoringViewer from './CitoMonitoringViewer'
import SocraticChatBot from './SocraticChatBot'
import KerndoelenProgressieTracker from './KerndoelenProgressieTracker'
import OntwikkelingsStadiaTimeline from './OntwikkelingsStadiaTimeline'
import SELCompetentieRadar from './SELCompetentieRadar'
import InspectionFrameworkViewer from './InspectionFrameworkViewer'
import MRWMSViewer from './MRWMSViewer'
import PersistentDocumentPanel from './PersistentDocumentPanel'
import SmartModuleAI from './SmartModuleAI'

interface Module {
  id: string
  title: string
  description: string
  icon: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  category: 'Curriculum' | 'Ontwikkeling' | 'Pedagogiek' | 'Leiderschap' | 'Praktijk'
  components: string[]
  learningGoals: string[]
  learningPath?: 'beginnend' | 'gevorderd' | 'leider'
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

const modules: Module[] = [
  {
    id: 'module1',
    title: 'Curriculum & Kerndoelen',
    description: 'Leer de 58 kerndoelen kennen en hoe je deze implementeert in je lespraktijk',
    icon: '📚',
    difficulty: 'Beginner',
    duration: '2-3 uur',
    category: 'Curriculum',
    components: ['Slimme AI Integratie', 'Kerndoelen Viewer', 'Progressie Tracker', 'Klikbare Theorie'],
    learningGoals: [
      'Alle 58 kerndoelen beheersen',
      'Kerndoelen vertalen naar lesdoelen',
      'Progressie monitoren per groep',
      'Curriculum mapping toepassen'
    ],
    learningPath: 'beginnend'
  },
  {
    id: 'module2',
    title: 'Ontwikkelingspsychologie',
    description: 'Begrijp hoe kinderen zich ontwikkelen van groep 1 tot 8',
    icon: '🌱',
    difficulty: 'Intermediate',
    duration: '3-4 uur',
    category: 'Ontwikkeling',
    components: ['Slimme AI Integratie', 'Ontwikkelingsstadia Timeline', 'Theorie Viewer', 'Klikbare Theorie'],
    learningGoals: [
      'Ontwikkelingsstadia herkennen',
      'Theorie koppelen aan praktijk',
      'Leeftijdsadequaat onderwijs geven',
      'Individuele verschillen begrijpen'
    ],
    learningPath: 'beginnend'
  },
  {
    id: 'module3',
    title: 'SEL & Klassenmanagement',
    description: 'Sociaal-emotioneel leren en effectief klassenmanagement',
    icon: '❤️',
    difficulty: 'Intermediate',
    duration: '3-4 uur',
    category: 'Pedagogiek',
    components: ['Slimme AI Integratie', 'SEL Methodieken', 'Competentie Radar', 'Klikbare Theorie'],
    learningGoals: [
      'SEL-methodieken vergelijken',
      'Klassenklimaat verbeteren',
      'Sociale vaardigheden ontwikkelen',
      'Conflicten constructief oplossen'
    ],
    learningPath: 'beginnend'
  },
  {
    id: 'module4',
    title: 'Differentiatie & Inclusie',
    description: 'Onderwijs op maat voor alle leerlingen',
    icon: '🎯',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Pedagogiek',
    components: ['Slimme AI Integratie', 'Differentiatie Strategieën', 'Inclusief Onderwijs', 'Klikbare Theorie'],
    learningGoals: [
      'Differentiatie strategieën toepassen',
      'Inclusief onderwijs vormgeven',
      'Adaptief onderwijs implementeren',
      'Alle leerlingen laten slagen'
    ],
    learningPath: 'gevorderd'
  },
  {
    id: 'module5',
    title: 'Data & Evaluatie',
    description: 'Data-gedreven besluitvorming en formatieve evaluatie',
    icon: '📊',
    difficulty: 'Advanced',
    duration: '3-4 uur',
    category: 'Praktijk',
    components: ['Slimme AI Integratie', 'Data Analyse', 'Formatieve Evaluatie', 'Klikbare Theorie'],
    learningGoals: [
      'Data interpreteren en gebruiken',
      'Formatieve evaluatie toepassen',
      'Evidence-based werken',
      'Leerresultaten verbeteren'
    ],
    learningPath: 'gevorderd'
  },
  {
    id: 'module6',
    title: '21e-eeuwse Vaardigheden',
    description: 'Bereid leerlingen voor op de toekomst',
    icon: '💡',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Praktijk',
    components: ['Slimme AI Integratie', '21e-eeuwse Vaardigheden', 'Computational Thinking', 'Klikbare Theorie'],
    learningGoals: [
      '21e-eeuwse vaardigheden integreren',
      'Design thinking toepassen',
      'Digitale geletterdheid ontwikkelen',
      'Innovatief onderwijs vormgeven'
    ],
    learningPath: 'gevorderd'
  },
  {
    id: 'module7',
    title: 'Schoolleiderschap',
    description: 'Pedagogisch leiderschap en verandermanagement',
    icon: '👑',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Leiderschap',
    components: ['Slimme AI Integratie', 'Pedagogisch Leiderschap', 'Verandermanagement', 'Klikbare Theorie'],
    learningGoals: [
      'Pedagogisch leiderschap ontwikkelen',
      'Veranderprocessen leiden',
      'Teamontwikkeling faciliteren',
      'Schoolcultuur vormgeven'
    ],
    learningPath: 'leider'
  },
  {
    id: 'module8',
    title: 'Burgerschap & Diversiteit',
    description: 'Burgerschapsonderwijs en interculturele competentie',
    icon: '🏛️',
    difficulty: 'Intermediate',
    duration: '3-4 uur',
    category: 'Pedagogiek',
    components: ['Slimme AI Integratie', 'Burgerschapsonderwijs', 'Interculturele Competentie', 'Klikbare Theorie'],
    learningGoals: [
      'Burgerschapsonderwijs vormgeven',
      'Democratische waarden overdragen',
      'Diversiteit waarderen',
      'Sociale cohesie bevorderen'
    ],
    learningPath: 'leider'
  },
  {
    id: 'module9',
    title: 'Cito & Monitoring',
    description: 'Complete gids voor Cito-monitoring en coördinatorrollen',
    icon: '📈',
    difficulty: 'Advanced',
    duration: '3-4 uur',
    category: 'Leiderschap',
    components: ['Slimme AI Integratie', 'Cito Monitoring', 'Coördinatorrollen', 'Data Doorstroom'],
    learningGoals: [
      'Cito A-E en I-V niveaus begrijpen',
      'Monitoring groep 1-8 organiseren',
      'Coördinatorrollen effectief invullen',
      'Data-gedreven schoolverbetering'
    ],
    learningPath: 'leider'
  },
  {
    id: 'module10',
    title: 'Inspectie Onderzoekskader',
    description: 'Complete voorbereiding op inspectiebezoek met alle standaarden en praktijktips',
    icon: '🔍',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Leiderschap',
    components: ['Slimme AI Integratie', 'Inspectie Framework', 'Zelfevaluatie Tools', 'Praktijkvoorbeelden', 'Voorbereiding Checklist'],
    learningGoals: [
      'Alle 5 inspectiestandaarden beheersen',
      'Zelfevaluatie systematisch uitvoeren',
      'Inspectiebezoek professioneel voorbereiden',
      'Kwaliteitszorg cyclisch organiseren'
    ],
    learningPath: 'leider'
  },
  {
    id: 'module11',
    title: 'MR & WMS voor Schoolleiders',
    description: 'Complete gids voor Medezeggenschapsraad en Wet Medezeggenschap Scholen',
    icon: '🏛️',
    difficulty: 'Advanced',
    duration: '3-4 uur',
    category: 'Leiderschap',
    components: ['Slimme AI Integratie', 'MR Bevoegdheden', 'WMS Procedures', 'Praktijktips', 'Sjablonen & Checklists'],
    learningGoals: [
      'Alle MR-rechten en -plichten beheersen',
      'WMS-procedures correct toepassen',
      'Effectief samenwerken met MR',
      'Geschillen voorkomen en oplossen',
      'Borgingsmechanismen implementeren'
    ],
    learningPath: 'leider'
  }
]

const opdrachten = [
  {
    titel: "Burgerschap Activiteit",
    beschrijving: "Ontwerp een activiteit voor burgerschapsonderwijs",
    type: "ontwerp" as const,
    startVraag: "Welke burgerschapsactiviteit ga je organiseren en wat zijn je doelen?",
    context: "Je wilt burgerschapsonderwijs concreet vormgeven in je klas of school."
  },
  {
    titel: "Kerndoel Implementatie Plan",
    beschrijving: "Maak een concreet plan om een kerndoel te implementeren in je groep",
    type: "ontwerp" as const,
    startVraag: "Welk kerndoel wil je implementeren en waarom is dit belangrijk voor jouw leerlingen?",
    context: "Je bent bezig met het vertalen van kerndoelen naar concrete lesdoelen en activiteiten voor jouw groep."
  },
  {
    titel: "Ontwikkelingsgericht Observeren",
    beschrijving: "Leer systematisch observeren vanuit ontwikkelingspsychologie",
    type: "analyse" as const,
    startVraag: "Wat observeer je bij een leerling en hoe koppel je dit aan ontwikkelingstheorie?",
    context: "Je gebruikt kennis van ontwikkelingsstadia om leerlingen beter te begrijpen en te begeleiden."
  },
  {
    titel: "SEL Methodiek Kiezen",
    beschrijving: "Vergelijk SEL-methodieken en kies de beste voor jouw context",
    type: "analyse" as const,
    startVraag: "Welke SEL-methodiek past het beste bij jouw school en waarom?",
    context: "Je onderzoekt verschillende SEL-methodieken om de beste keuze te maken voor jouw onderwijscontext."
  },
  {
    titel: "Differentiatie Strategie",
    beschrijving: "Ontwerp een differentiatiestrategie voor een diverse klas",
    type: "ontwerp" as const,
    startVraag: "Hoe ga je differentiëren voor de verschillende leerlingen in jouw klas?",
    context: "Je hebt een diverse klas met verschillende leerbehoeften en wilt iedereen optimaal laten leren."
  },
  {
    titel: "Data Interpretatie",
    beschrijving: "Analyseer Cito-resultaten en stel verbeteracties voor",
    type: "analyse" as const,
    startVraag: "Wat vertellen deze data over de leerresultaten en welke acties ga je ondernemen?",
    context: "Je hebt Cito-resultaten ontvangen en wilt deze gebruiken voor gerichte verbeteracties."
  },
  {
    titel: "21e-eeuwse Vaardigheden Project",
    beschrijving: "Ontwerp een project dat 21e-eeuwse vaardigheden integreert",
    type: "ontwerp" as const,
    startVraag: "Welk project ga je ontwerpen om 21e-eeuwse vaardigheden te ontwikkelen?",
    context: "Je wilt leerlingen voorbereiden op de toekomst door 21e-eeuwse vaardigheden te integreren in je onderwijs."
  },
  {
    titel: "Leiderschap Reflectie",
    beschrijving: "Reflecteer op je eigen leiderschapsstijl en ontwikkeling",
    type: "reflectie" as const,
    startVraag: "Hoe zou je jouw leiderschapsstijl omschrijven en wat wil je ontwikkelen?",
    context: "Je bent bezig met je professionele ontwikkeling als (aanstaand) schoolleider."
  },
  {
    titel: "Cito Analyse & Actieplan",
    beschrijving: "Analyseer Cito-trends en maak een verbeterplan",
    type: "analyse" as const,
    startVraag: "Wat zie je in de Cito-trends en welke interventies ga je inzetten?",
    context: "Als schoolleider of coördinator analyseer je Cito-resultaten om de onderwijskwaliteit te verbeteren."
  },
  {
    titel: "Inspectie Voorbereiding",
    beschrijving: "Bereid je school systematisch voor op een inspectiebezoek",
    type: "analyse" as const,
    startVraag: "Hoe ga je je school voorbereiden op het komende inspectiebezoek en welke standaarden vereisen extra aandacht?",
    context: "Je school krijgt binnenkort inspectiebezoek en je wilt alle standaarden grondig voorbereiden met je team."
  },
  {
    titel: "MR Samenwerking Optimaliseren",
    beschrijving: "Verbeter de samenwerking met je Medezeggenschapsraad",
    type: "reflectie" as const,
    startVraag: "Hoe verloopt de samenwerking met je MR momenteel en welke verbeterpunten zie je?",
    context: "Als schoolleider wil je de samenwerking met de MR professionaliseren en effectiever maken."
  }
]

export default function PABOLeerApp() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const [selectedLearningPath, setSelectedLearningPath] = useState<string | null>(null)
  const [showDocumentManager, setShowDocumentManager] = useState(false)
  const [showDirectChat, setShowDirectChat] = useState(false)
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [userLevel, setUserLevel] = useState<'beginnend' | 'gevorderd' | 'expert'>('beginnend')

  // Check URL hash for direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      
      if (hash === '#start-chat') {
        setShowDirectChat(true)
        setShowDocumentManager(false)
        setActiveModule(null)
        setActiveComponent(null)
        // Clear the hash
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', window.location.pathname)
        }
      } else if (hash === '#documents') {
        setShowDocumentManager(true)
      }
    }

    // Handle initial hash
    handleHashChange()

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Curriculum': return 'bg-green-500'
      case 'Ontwikkeling': return 'bg-green-500'
      case 'Pedagogiek': return 'bg-blue-500'
      case 'Leiderschap': return 'bg-purple-500'
      case 'Praktijk': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getLearningPathColor = (path: string) => {
    switch (path) {
      case 'beginnend': return 'border-green-500 bg-green-50'
      case 'gevorderd': return 'border-blue-500 bg-blue-50'
      case 'leider': return 'border-purple-500 bg-purple-50'
      default: return 'border-gray-200'
    }
  }

  const getLearningPathInfo = (path: string) => {
    switch (path) {
      case 'beginnend': return { icon: '🌱', title: 'Beginnend PABO-student', desc: 'Start met de basis: kerndoelen en ontwikkelingspsychologie' }
      case 'gevorderd': return { icon: '🎯', title: 'Gevorderd PABO-student', desc: 'Verdiep je in differentiatie en data-gedreven werken' }
      case 'leider': return { icon: '👑', title: 'Aanstaand Schoolleider', desc: 'Focus op leiderschap en schoolontwikkeling' }
      default: return { icon: '📚', title: 'Alle modules', desc: 'Bekijk alle beschikbare modules' }
    }
  }

  const renderComponent = () => {
    if (showDocumentManager) {
      return <DocumentManager />
    }

    if (showDirectChat) {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">🤖 AI Chat met je Schooldocumenten</h3>
                <p className="text-green-100 text-sm">Direct chatten over je geüploade documenten</p>
              </div>
              <button
                onClick={() => {
                  setShowDirectChat(false)
                  if (typeof window !== 'undefined') {
                    window.location.hash = ''
                  }
                }}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
              >
                🔙 Terug naar overzicht
              </button>
            </div>
          </div>

          <SocraticChatBot 
            module="Algemeen" 
            opdrachten={[{
              titel: "Chat met je Schooldocumenten",
              beschrijving: "Stel vragen over je geüploade schooldocumenten",
              type: "reflectie" as const,
              startVraag: "Hoe kan ik je helpen met je schooldocumenten?",
              context: "Je hebt schooldocumenten geüpload en wilt hier vragen over stellen aan de AI."
            }]} 
          />
        </div>
      )
    }

    if (!activeModule || !activeComponent) return null

    const moduleData = modules.find(m => m.id === activeModule)
    if (!moduleData) return null

    switch (activeComponent) {
      case 'Slimme AI Integratie':
        return <SmartModuleAI 
          moduleId={activeModule}
          moduleTitle={moduleData.title}
          documents={documents}
          userLevel={userLevel}
        />
      case 'Kerndoelen Viewer':
        return <KerndoelenViewer />
      case 'Progressie Tracker':
        return <KerndoelenProgressieTracker />
      case 'Ontwikkelingsstadia Timeline':
        return <OntwikkelingsStadiaTimeline />
      case 'Theorie Viewer':
        return <DevelopmentTheoryViewer />
      case 'SEL Methodieken':
        return <SELMethodsViewer />
      case 'Competentie Radar':
        return <SELCompetentieRadar />
      case 'Cito Monitoring':
        return <CitoMonitoringViewer />
      case 'Coördinatorrollen':
        return <CitoMonitoringViewer />
      case 'Data Doorstroom':
        return <CitoMonitoringViewer />
      case 'Inspectie Framework':
        return <InspectionFrameworkViewer />
      case 'Zelfevaluatie Tools':
        return <InspectionFrameworkViewer />
      case 'Praktijkvoorbeelden':
        return <InspectionFrameworkViewer />
      case 'Voorbereiding Checklist':
        return <InspectionFrameworkViewer />
      case 'MR Bevoegdheden':
        return <MRWMSViewer />
      case 'WMS Procedures':
        return <MRWMSViewer />
      case 'Praktijktips':
        return <MRWMSViewer />
      case 'Sjablonen & Checklists':
        return <MRWMSViewer />
      case 'Klikbare Theorie':
        return <ClickableTheoryViewer moduleId={activeModule} />
      case 'AI Begeleiding':
        const moduleOpdrachten = opdrachten.filter((_, index) => {
          const moduleIndex = parseInt(activeModule.replace('module', '')) - 1
          return index === moduleIndex
        })
        return <SocraticChatBot module={moduleData.title} opdrachten={moduleOpdrachten} />
      default:
        return <ClickableTheoryViewer moduleId={activeModule} />
    }
  }

  // Filter modules based on selected learning path
  const filteredModules = selectedLearningPath 
    ? modules.filter(module => module.learningPath === selectedLearningPath)
    : modules

  // Show Document Manager
  if (showDocumentManager) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowDocumentManager(false)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-xl">🔙</span>
                  <span className="font-medium">Terug naar overzicht</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📚</span>
                  <span className="font-semibold text-gray-900">Mijn Documenten</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DocumentManager />
        </div>
      </div>
    )
  }

  // Show Direct Chat
  if (showDirectChat) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setShowDirectChat(false)
                    if (typeof window !== 'undefined') {
                      window.location.hash = ''
                    }
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-xl">🔙</span>
                  <span className="font-medium">Terug naar overzicht</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold text-gray-900">AI Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PersistentDocumentPanel 
            onDocumentsChange={setDocuments}
            currentModule="Algemeen"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {renderComponent()}
        </div>
      </div>
    )
  }

  if (activeModule && activeComponent) {
    const moduleData = modules.find(m => m.id === activeModule)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setActiveComponent(null)
                    setActiveModule(null)
                    if (typeof window !== 'undefined') {
                      window.location.hash = ''
                    }
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-xl">🔙</span>
                  <span className="font-medium">Terug naar overzicht</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{moduleData?.icon}</span>
                  <span className="font-semibold text-gray-900">{moduleData?.title}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-gray-700">{activeComponent}</span>
                </div>
              </div>
              
              {/* User Level Selector in Header */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Niveau:</span>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginnend">🌱 Beginnend</option>
                  <option value="gevorderd">🎯 Gevorderd</option>
                  <option value="expert">🏆 Expert</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PersistentDocumentPanel 
            onDocumentsChange={setDocuments}
            currentModule={moduleData?.title}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {renderComponent()}
        </div>
      </div>
    )
  }

  if (activeModule) {
    const moduleData = modules.find(m => m.id === activeModule)
    if (!moduleData) return null

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setActiveModule(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-xl">🔙</span>
                <span className="font-medium">Terug naar overzicht</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{moduleData.icon}</span>
                <span className="font-semibold text-gray-900">{moduleData.title}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PersistentDocumentPanel 
            onDocumentsChange={setDocuments}
            currentModule={moduleData.title}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl">{moduleData.icon}</span>
              <div>
                <h1 className="text-3xl font-bold">{moduleData.title}</h1>
                <p className="text-indigo-100 text-lg">{moduleData.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className={`px-3 py-1 rounded-full ${getDifficultyColor(moduleData.difficulty)} text-xs font-medium`}>
                {moduleData.difficulty}
              </span>
              <span className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{moduleData.duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🎯</span>
                <span>{moduleData.category}</span>
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Leerdoelen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {moduleData.learningGoals.map((goal, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-gray-800">📚 Module Onderdelen</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Slimme AI Integratie - FEATURED */}
              <div
                onClick={() => setActiveComponent('Slimme AI Integratie')}
                className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 text-white col-span-full md:col-span-2 lg:col-span-3"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl">🤖</span>
                  <div>
                    <h3 className="text-xl font-bold">🌟 Slimme AI Integratie</h3>
                    <p className="text-emerald-100">
                      Quickscan van je documenten + Rolgebaseerde AI Chatbot (Tutor, Coach, Mentor, etc.)
                    </p>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔍</div>
                      <div className="font-medium">Quickscan</div>
                      <div className="text-emerald-100 text-xs">Document analyse</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">👨‍🏫</div>
                      <div className="font-medium">AI-Tutor</div>
                      <div className="text-emerald-100 text-xs">Stap voor stap</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">💪</div>
                      <div className="font-medium">AI-Coach</div>
                      <div className="text-emerald-100 text-xs">Doelgericht</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🧙‍♂️</div>
                      <div className="font-medium">AI-Mentor</div>
                      <div className="text-emerald-100 text-xs">Professioneel</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-emerald-100 text-sm">🚀 Nieuw! Geavanceerde AI per module</span>
                  <span className="text-2xl">⭐</span>
                </div>
              </div>

              {/* Other Components */}
              {moduleData.components.filter(comp => comp !== 'Slimme AI Integratie').map((component, index) => (
                <div
                  key={index}
                  onClick={() => setActiveComponent(component)}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">
                      {component.includes('Kerndoelen') ? '📚' :
                       component.includes('Progressie') ? '📈' :
                       component.includes('Ontwikkeling') ? '🌱' :
                       component.includes('SEL') ? '❤️' :
                       component.includes('Competentie') ? '🎯' :
                       component.includes('Cito') ? '📊' :
                       component.includes('Inspectie') ? '🔍' :
                       component.includes('MR') || component.includes('WMS') ? '🏛️' :
                       component.includes('Theorie') ? '🔗' :
                       component.includes('AI') ? '🤖' : '📖'}
                    </span>
                    <h3 className="font-semibold text-gray-800">{component}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {component.includes('Kerndoelen') ? 'Interactieve gids door alle 58 kerndoelen' :
                     component.includes('Progressie') ? 'Volg ontwikkeling van kerndoelen per groep' :
                     component.includes('Ontwikkeling') ? 'Timeline van ontwikkelingsstadia' :
                     component.includes('SEL') && component.includes('Methodieken') ? 'Vergelijk verschillende SEL-methodieken' :
                     component.includes('Competentie') ? 'Visualiseer SEL-competenties per leeftijd' :
                     component.includes('Cito') ? 'Complete gids voor Cito-monitoring' :
                     component.includes('Inspectie') ? 'Onderzoekskader 2021 met praktijktips' :
                     component.includes('MR') ? 'MR-bevoegdheden en procedures' :
                     component.includes('WMS') ? 'Wet Medezeggenschap Scholen uitleg' :
                     component.includes('Praktijktips') ? 'Praktische tips voor MR-samenwerking' :
                     component.includes('Sjablonen') ? 'Templates en checklists voor MR' :
                     component.includes('Theorie') ? 'Klikbare theorie met verdieping' :
                     'Leermateriaal'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Klik om te openen</span>
                    <span className="text-xl">🔗</span>
                  </div>
                </div>
              ))}

              <div
                onClick={() => setActiveComponent('AI Begeleiding')}
                className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 text-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🤖</span>
                  <h3 className="font-semibold">Klassieke AI Begeleiding</h3>
                </div>
                <p className="text-purple-100 text-sm mb-4">
                  Socratische AI-begeleiding met automatische analyse van je schooldocumenten
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-100">Traditionele chatbot</span>
                  <span className="text-xl">🔗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎓</span>
              <span className="text-xl font-bold text-gray-900">PABO Leerapp</span>
            </div>
            <div className="flex items-center space-x-4">
              {selectedLearningPath && (
                <button
                  onClick={() => setSelectedLearningPath(null)}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <span>🔙</span>
                  <span>Alle modules</span>
                </button>
              )}
              
              <button
                onClick={() => setShowDocumentManager(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <span>📚</span>
                <span>Mijn Documenten</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <PersistentDocumentPanel 
            onDocumentsChange={setDocuments}
            currentModule={undefined}
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welkom bij de PABO Leerapp
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Een interactieve leerapp voor PABO-studenten om alle competenties eigen te maken 
            met geavanceerde AI-integratie, praktijkvoorbeelden en rolgebaseerde begeleiding.
          </p>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🚀 Nieuwe Slimme AI Integratie per Module!
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-3">🔍</span>
                Deel 1: Quickscan Analyse
              </h3>
              <ul className="space-y-2 text-emerald-100">
                <li>• 📚 Analyseert je schooldocumenten</li>
                <li>• 🎯 Vergelijkt met module leerdoelen</li>
                <li>• 💪 Identificeert sterke punten</li>
                <li>• 🔧 Benoemt ontwikkelpunten</li>
                <li>• ❓ Genereert openingsvraag voor chat</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                Deel 2: Rolgebaseerde Chatbot
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center p-2 bg-white bg-opacity-20 rounded">👨‍🏫 AI-Tutor</div>
                <div className="text-center p-2 bg-white bg-opacity-20 rounded">💪 AI-Coach</div>
                <div className="text-center p-2 bg-white bg-opacity-20 rounded">🧙‍♂️ AI-Mentor</div>
                <div className="text-center p-2 bg-white bg-opacity-20 rounded">🤝 AI-Teammate</div>
                <div className="text-center p-2 bg-white bg-opacity-20 rounded">🔧 AI-Tool</div>
                <div className="text-center p-2 bg-white bg-opacity-20 rounded">🎭 AI-Simulator</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-emerald-100 mb-4">
              Elke module heeft nu een slimme AI die je documenten analyseert en zich aanpast aan jouw gekozen rol!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDocumentManager(true)}
                className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors font-semibold"
              >
                📚 Upload Documenten
              </button>
            </div>
          </div>
        </div>

        {!selectedLearningPath ? (
          <>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🚀 Kies je leerpad
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div 
                  onClick={() => setSelectedLearningPath('beginnend')}
                  className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-semibold text-green-800 mb-2">Beginnend PABO-student</h3>
                  <p className="text-green-600 text-sm mb-4">Start met de basis: kerndoelen en ontwikkelingspsychologie</p>
                  <div className="space-y-1 text-xs text-green-700">
                    <div>📚 Curriculum & Kerndoelen</div>
                    <div>🌱 Ontwikkelingspsychologie</div>
                    <div>❤️ SEL & Klassenmanagement</div>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedLearningPath('gevorderd')}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-semibold text-blue-800 mb-2">Gevorderd PABO-student</h3>
                  <p className="text-blue-600 text-sm mb-4">Verdiep je in differentiatie en data-gedreven werken</p>
                  <div className="space-y-1 text-xs text-blue-700">
                    <div>🎯 Differentiatie & Inclusie</div>
                    <div>📊 Data & Evaluatie</div>
                    <div>💡 21e-eeuwse Vaardigheden</div>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedLearningPath('leider')}
                  className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">👑</div>
                  <h3 className="font-semibold text-purple-800 mb-2">Aanstaand Schoolleider</h3>
                  <p className="text-purple-600 text-sm mb-4">Focus op leiderschap en schoolontwikkeling</p>
                  <div className="space-y-1 text-xs text-purple-700">
                    <div>👑 Schoolleiderschap</div>
                    <div>🏛️ Burgerschap & Diversiteit</div>
                    <div>📈 Cito & Monitoring</div>
                    <div>🔍 Inspectie Onderzoekskader</div>
                    <div>🏛️ MR & WMS</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm mb-4">Of bekijk alle modules hieronder 👇</p>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {getLearningPathInfo(selectedLearningPath).icon} {getLearningPathInfo(selectedLearningPath).title}
                  </h2>
                  <p className="text-gray-600">
                    {getLearningPathInfo(selectedLearningPath).desc}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {['beginnend', 'gevorderd', 'leider'].map((path) => (
                    <button
                      key={path}
                      onClick={() => setSelectedLearningPath(path)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedLearningPath === path
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }`}
                    >
                      {getLearningPathInfo(path).icon} {getLearningPathInfo(path).title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedLearningPath ? 'Jouw Modules' : '📚 Alle Modules'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`bg-white rounded-xl shadow-lg border-2 p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 ${
                  module.learningPath ? getLearningPathColor(module.learningPath) : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{module.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{module.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{module.duration}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                
                {/* NEW: Smart AI Badge */}
                <div className="mb-3 p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg border border-emerald-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs font-medium text-emerald-700">Slimme AI Integratie</span>
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">Quickscan + 7 AI-rollen</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${getCategoryColor(module.category)} rounded-full`}></div>
                    <span className="text-xs text-gray-500">{module.category}</span>
                  </div>
                  <span className="text-xl">🔗</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Onderdelen:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.components.slice(0, 2).map((component, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {component.split(' ')[0]}
                      </span>
                    ))}
                    {module.components.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{module.components.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}