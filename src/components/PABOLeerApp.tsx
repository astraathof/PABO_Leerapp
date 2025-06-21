'use client'

import { useState } from 'react'
import DocumentManager from './DocumentManager'
import KerndoelenViewer from './KerndoelenViewer'
import DevelopmentTheoryViewer from './DevelopmentTheoryViewer'
import ClickableTheoryViewer from './ClickableTheoryViewer'
import SELMethodsViewer from './SELMethodsViewer'
import CitoMonitoringViewer from './CitoMonitoringViewer'
import VisualLearningComponents from './VisualLearningComponents'
import SocraticChatBot from './SocraticChatBot'
import KerndoelenProgressieTracker from './KerndoelenProgressieTracker'
import OntwikkelingsStadiaTimeline from './OntwikkelingsStadiaTimeline'
import SELCompetentieRadar from './SELCompetentieRadar'

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
    components: ['Kerndoelen Viewer', 'Progressie Tracker', 'Klikbare Theorie'],
    learningGoals: [
      'Alle 58 kerndoelen beheersen',
      'Kerndoelen vertalen naar lesdoelen',
      'Progressie monitoren per groep',
      'Curriculum mapping toepassen'
    ]
  },
  {
    id: 'module2',
    title: 'Ontwikkelingspsychologie',
    description: 'Begrijp hoe kinderen zich ontwikkelen van groep 1 tot 8',
    icon: '🌱',
    difficulty: 'Intermediate',
    duration: '3-4 uur',
    category: 'Ontwikkeling',
    components: ['Ontwikkelingsstadia Timeline', 'Theorie Viewer', 'Visueel Leren'],
    learningGoals: [
      'Ontwikkelingsstadia herkennen',
      'Theorie koppelen aan praktijk',
      'Leeftijdsadequaat onderwijs geven',
      'Individuele verschillen begrijpen'
    ]
  },
  {
    id: 'module3',
    title: 'SEL & Klassenmanagement',
    description: 'Sociaal-emotioneel leren en effectief klassenmanagement',
    icon: '❤️',
    difficulty: 'Intermediate',
    duration: '3-4 uur',
    category: 'Pedagogiek',
    components: ['SEL Methodieken', 'Competentie Radar', 'Klikbare Theorie'],
    learningGoals: [
      'SEL-methodieken vergelijken',
      'Klassenklimaat verbeteren',
      'Sociale vaardigheden ontwikkelen',
      'Conflicten constructief oplossen'
    ]
  },
  {
    id: 'module4',
    title: 'Differentiatie & Inclusie',
    description: 'Onderwijs op maat voor alle leerlingen',
    icon: '🎯',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Pedagogiek',
    components: ['Differentiatie Strategieën', 'Inclusief Onderwijs', 'Klikbare Theorie'],
    learningGoals: [
      'Differentiatie strategieën toepassen',
      'Inclusief onderwijs vormgeven',
      'Adaptief onderwijs implementeren',
      'Alle leerlingen laten slagen'
    ]
  },
  {
    id: 'module5',
    title: 'Data & Evaluatie',
    description: 'Data-gedreven besluitvorming en formatieve evaluatie',
    icon: '📊',
    difficulty: 'Advanced',
    duration: '3-4 uur',
    category: 'Praktijk',
    components: ['Data Analyse', 'Formatieve Evaluatie', 'Klikbare Theorie'],
    learningGoals: [
      'Data interpreteren en gebruiken',
      'Formatieve evaluatie toepassen',
      'Evidence-based werken',
      'Leerresultaten verbeteren'
    ]
  },
  {
    id: 'module6',
    title: '21e-eeuwse Vaardigheden',
    description: 'Bereid leerlingen voor op de toekomst',
    icon: '💡',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Praktijk',
    components: ['21e-eeuwse Vaardigheden', 'Computational Thinking', 'Klikbare Theorie'],
    learningGoals: [
      '21e-eeuwse vaardigheden integreren',
      'Design thinking toepassen',
      'Digitale geletterdheid ontwikkelen',
      'Innovatief onderwijs vormgeven'
    ]
  },
  {
    id: 'module7',
    title: 'Schoolleiderschap',
    description: 'Pedagogisch leiderschap en verandermanagement',
    icon: '👑',
    difficulty: 'Advanced',
    duration: '4-5 uur',
    category: 'Leiderschap',
    components: ['Pedagogisch Leiderschap', 'Verandermanagement', 'Klikbare Theorie'],
    learningGoals: [
      'Pedagogisch leiderschap ontwikkelen',
      'Veranderprocessen leiden',
      'Teamontwikkeling faciliteren',
      'Schoolcultuur vormgeven'
    ]
  },
  {
    id: 'module8',
    title: 'Burgerschap & Diversiteit',
    description: 'Burgerschapsonderwijs en interculturele competentie',
    icon: '🏛️',
    difficulty: 'Intermediate',
    duration: '3-4 uur',
    category: 'Pedagogiek',
    components: ['Burgerschapsonderwijs', 'Interculturele Competentie', 'Klikbare Theorie'],
    learningGoals: [
      'Burgerschapsonderwijs vormgeven',
      'Democratische waarden overdragen',
      'Diversiteit waarderen',
      'Sociale cohesie bevorderen'
    ]
  },
  {
    id: 'module9',
    title: 'Cito & Monitoring',
    description: 'Complete gids voor Cito-monitoring en coördinatorrollen',
    icon: '📈',
    difficulty: 'Advanced',
    duration: '3-4 uur',
    category: 'Leiderschap',
    components: ['Cito Monitoring', 'Coördinatorrollen', 'Data Doorstroom'],
    learningGoals: [
      'Cito A-E en I-V niveaus begrijpen',
      'Monitoring groep 1-8 organiseren',
      'Coördinatorrollen effectief invullen',
      'Data-gedreven schoolverbetering'
    ]
  }
]

const opdrachten = [
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
    titel: "Burgerschap Activiteit",
    beschrijving: "Ontwerp een activiteit voor burgerschapsonderwijs",
    type: "ontwerp" as const,
    startVraag: "Welke burgerschapsactiviteit ga je organiseren en wat zijn je doelen?",
    context: "Je wilt burgerschapsonderwijs concreet vormgeven in je klas of school."
  },
  {
    titel: "Cito Analyse & Actieplan",
    beschrijving: "Analyseer Cito-trends en maak een verbeterplan",
    type: "analyse" as const,
    startVraag: "Wat zie je in de Cito-trends en welke interventies ga je inzetten?",
    context: "Als schoolleider of coördinator analyseer je Cito-resultaten om de onderwijskwaliteit te verbeteren."
  }
]

export default function PABOLeerApp() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

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
      case 'Curriculum': return 'bg-blue-500'
      case 'Ontwikkeling': return 'bg-green-500'
      case 'Pedagogiek': return 'bg-purple-500'
      case 'Leiderschap': return 'bg-red-500'
      case 'Praktijk': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const renderComponent = () => {
    if (!activeModule || !activeComponent) return null

    const moduleData = modules.find(m => m.id === activeModule)
    if (!moduleData) return null

    switch (activeComponent) {
      case 'Kerndoelen Viewer':
        return <KerndoelenViewer />
      case 'Progressie Tracker':
        return <KerndoelenProgressieTracker />
      case 'Ontwikkelingsstadia Timeline':
        return <OntwikkelingsStadiaTimeline />
      case 'SEL Methodieken':
        return <SELMethodsViewer />
      case 'Competentie Radar':
        return <SELCompetentieRadar />
      case 'Cito Monitoring':
        return <CitoMonitoringViewer />
      case 'Klikbare Theorie':
        return <ClickableTheoryViewer moduleId={activeModule} />
      case 'AI Begeleiding':
        const moduleOpdrachten = opdrachten.filter((_, index) => {
          const moduleIndex = parseInt(activeModule.replace('module', '')) - 1
          return index === moduleIndex
        })
        return <SocraticChatBot module={moduleData.title} opdrachten={moduleOpdrachten} />
      case 'Document Manager':
        return <DocumentManager />
      default:
        return <div className="text-center py-12 text-gray-500">Component wordt geladen...</div>
    }
  }

  if (activeModule && activeComponent) {
    const moduleData = modules.find(m => m.id === activeModule)
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setActiveComponent(null)
                    setActiveModule(null)
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
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        {/* Header */}
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

        {/* Module Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Module Header */}
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

          {/* Learning Goals */}
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

          {/* Components */}
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-gray-800">📚 Module Onderdelen</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Always show these core components */}
              {moduleData.components.map((component, index) => (
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
                     component.includes('Theorie') ? 'Klikbare theorie met verdieping' :
                     component.includes('AI') ? 'Socratische AI-begeleiding' : 'Leermateriaal'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Klik om te openen</span>
                    <span className="text-xl">🔗</span>
                  </div>
                </div>
              ))}

              {/* AI Begeleiding - always available */}
              <div
                onClick={() => setActiveComponent('AI Begeleiding')}
                className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105 text-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">🤖</span>
                  <h3 className="font-semibold">AI Begeleiding</h3>
                </div>
                <p className="text-purple-100 text-sm mb-4">
                  Socratische AI-mentor voor gepersonaliseerde begeleiding
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-100">Interactieve opdrachten</span>
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎓</span>
              <span className="text-xl font-bold text-gray-900">PABO Leerapp</span>
            </div>
            <button
              onClick={() => setActiveComponent('Document Manager')}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <span>📚</span>
              <span>Mijn Documenten</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welkom bij de PABO Leerapp
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Een interactieve leerapp voor PABO-studenten om alle competenties eigen te maken 
            met AI-begeleiding, praktijkvoorbeelden en socratische methode.
          </p>
        </div>

        {/* Quick Start Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🚀 Waar wil je beginnen?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-semibold text-green-800 mb-2">Ik ben nieuw</h3>
              <p className="text-green-600 text-sm mb-4">Start met de basis: kerndoelen en ontwikkelingspsychologie</p>
              <button
                onClick={() => setActiveModule('module1')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start met Module 1
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-blue-800 mb-2">Ik wil verdiepen</h3>
              <p className="text-blue-600 text-sm mb-4">Kies een specifiek onderwerp dat je interesseert</p>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveModule('module3')}
                  className="w-full px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                >
                  SEL & Klassenmanagement
                </button>
                <button
                  onClick={() => setActiveModule('module4')}
                  className="w-full px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                >
                  Differentiatie & Inclusie
                </button>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="font-semibold text-purple-800 mb-2">Ik wil leiden</h3>
              <p className="text-purple-600 text-sm mb-4">Focus op leiderschap en schoolontwikkeling</p>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveModule('module7')}
                  className="w-full px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors"
                >
                  Schoolleiderschap
                </button>
                <button
                  onClick={() => setActiveModule('module9')}
                  className="w-full px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors"
                >
                  Cito & Monitoring
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">Of bekijk alle modules hieronder 👇</p>
          </div>
        </div>

        {/* All Modules Grid - Always Visible */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Alle Modules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
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

        {/* Learning Path Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Aanbevolen Leerpaden</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3">🌱 Beginnend PABO-student</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <span className="text-green-700">Curriculum & Kerndoelen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <span className="text-green-700">Ontwikkelingspsychologie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <span className="text-green-700">SEL & Klassenmanagement</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">🎯 Gevorderd PABO-student</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <span className="text-blue-700">Differentiatie & Inclusie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <span className="text-blue-700">Data & Evaluatie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <span className="text-blue-700">21e-eeuwse Vaardigheden</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-3">👑 Aanstaand Schoolleider</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <span className="text-purple-700">Schoolleiderschap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <span className="text-purple-700">Cito & Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <span className="text-purple-700">Burgerschap & Diversiteit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}