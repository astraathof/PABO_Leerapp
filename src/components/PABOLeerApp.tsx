'use client'

import { useState, useEffect } from 'react'
import DocumentManager from './DocumentManager'
import SocraticChatBot from './SocraticChatBot'
import KerndoelenViewer from './KerndoelenViewer'
import DevelopmentTheoryViewer from './DevelopmentTheoryViewer'
import OntwikkelingsStadiaTimeline from './OntwikkelingsStadiaTimeline'
import SELCompetentieRadar from './SELCompetentieRadar'
import SELMethodsViewer from './SELMethodsViewer'
import CitoMonitoringViewer from './CitoMonitoringViewer'
import InspectionFrameworkViewer from './InspectionFrameworkViewer'
import KerndoelenProgressieTracker from './KerndoelenProgressieTracker'
import ClickableTheoryViewer from './ClickableTheoryViewer'
import PersistentDocumentPanel from './PersistentDocumentPanel'
import SmartModuleAI from './SmartModuleAI'

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

interface Module {
  id: string
  titel: string
  beschrijving: string
  icon: string
  kleur: string
  leerdoelen: string[]
  competenties: string[]
  onderwerpen: string[]
  praktijkvoorbeelden: string[]
  opdrachten: any[]
}

const modules: Module[] = [
  {
    id: 'module1',
    titel: 'Curriculum & Kerndoelen',
    beschrijving: 'Alle 58 kerndoelen beheersen en toepassen in de onderwijspraktijk',
    icon: '📚',
    kleur: 'from-blue-500 to-indigo-600',
    leerdoelen: [
      'Alle 58 kerndoelen kennen en begrijpen',
      'Kerndoelen vertalen naar concrete lesdoelen',
      'Progressie monitoren per groep',
      'Curriculum mapping toepassen'
    ],
    competenties: [
      'Vakinhoudelijke bekwaamheid',
      'Didactische bekwaamheid',
      'Organisatorische bekwaamheid'
    ],
    onderwerpen: [
      'Nederlandse taal (kerndoelen 1-5)',
      'Rekenen en wiskunde (kerndoelen 6-15)',
      'Engelse taal (kerndoelen 16-19)',
      'Oriëntatie op jezelf en de wereld (kerndoelen 20-43)',
      'Kunstzinnige oriëntatie (kerndoelen 44-51)',
      'Bewegingsonderwijs (kerndoelen 52-58)'
    ],
    praktijkvoorbeelden: [
      'Jaarplanning maken per kerndoel',
      'Lesdoelen formuleren met SMART-criteria',
      'Toetsing afstemmen op kerndoelen',
      'Differentiatie binnen kerndoelen'
    ],
    opdrachten: [
      {
        titel: "Kerndoel Analyse",
        beschrijving: "Analyseer hoe jouw school invulling geeft aan specifieke kerndoelen",
        type: "analyse",
        startVraag: "Welk kerndoel vind je het meest uitdagend om te implementeren in je klas?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij het begrijpen en toepassen van kerndoelen. Gebruik de socratische methode om dieper inzicht te krijgen."
      }
    ]
  },
  {
    id: 'module2',
    titel: 'Ontwikkelingspsychologie',
    beschrijving: 'Kindontwikkeling begrijpen en toepassen in het onderwijs',
    icon: '🧠',
    kleur: 'from-green-500 to-emerald-600',
    leerdoelen: [
      'Ontwikkelingsstadia herkennen en begrijpen',
      'Theorie koppelen aan onderwijspraktijk',
      'Leeftijdsadequaat onderwijs vormgeven',
      'Individuele verschillen in ontwikkeling begrijpen'
    ],
    competenties: [
      'Pedagogische bekwaamheid',
      'Interpersoonlijke bekwaamheid',
      'Reflectieve bekwaamheid'
    ],
    onderwerpen: [
      'Cognitieve ontwikkeling (Piaget)',
      'Sociaal-culturele theorie (Vygotsky)',
      'Psychosociale ontwikkeling (Erikson)',
      'Morele ontwikkeling (Kohlberg)',
      'Sociale leertheorie (Bandura)'
    ],
    praktijkvoorbeelden: [
      'Scaffolding technieken toepassen',
      'Zone van Naaste Ontwikkeling gebruiken',
      'Ontwikkelingsgerichte activiteiten ontwerpen',
      'Observatie-instrumenten inzetten'
    ],
    opdrachten: [
      {
        titel: "Ontwikkelingstheorie in Praktijk",
        beschrijving: "Reflecteer op hoe ontwikkelingstheorieën zichtbaar zijn in jouw klas",
        type: "reflectie",
        startVraag: "Welke ontwikkelingstheorie herken je het meest in het gedrag van je leerlingen?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij het koppelen van ontwikkelingstheorie aan praktijk. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module3',
    titel: 'SEL & Klassenmanagement',
    beschrijving: 'Sociaal-emotioneel leren en effectief klassenmanagement',
    icon: '❤️',
    kleur: 'from-red-500 to-pink-600',
    leerdoelen: [
      'SEL-competenties begrijpen en ontwikkelen',
      'Positief klassenklimaat creëren',
      'Gedragsmanagement strategieën toepassen',
      'Sociale vaardigheden stimuleren'
    ],
    competenties: [
      'Pedagogische bekwaamheid',
      'Interpersoonlijke bekwaamheid',
      'Communicatieve bekwaamheid'
    ],
    onderwerpen: [
      'Vijf SEL-competenties',
      'Klassenklimaat en veiligheid',
      'Gedragsinterventies',
      'Sociale vaardigheden training'
    ],
    praktijkvoorbeelden: [
      'SEL-lessen implementeren',
      'Conflictoplossing begeleiden',
      'Positieve bekrachtiging systemen',
      'Emotieregulatie technieken'
    ],
    opdrachten: [
      {
        titel: "SEL Implementatie",
        beschrijving: "Ontwerp een plan voor het implementeren van SEL in jouw klas",
        type: "ontwerp",
        startVraag: "Welke SEL-competentie heeft de meeste aandacht nodig in jouw klas?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij SEL-implementatie. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module4',
    titel: 'Differentiatie & Inclusie',
    beschrijving: 'Onderwijs op maat voor alle leerlingen',
    icon: '🎯',
    kleur: 'from-purple-500 to-violet-600',
    leerdoelen: [
      'Differentiatie strategieën toepassen',
      'Inclusief onderwijs vormgeven',
      'Adaptief onderwijs implementeren',
      'Individuele leerbehoeften herkennen'
    ],
    competenties: [
      'Didactische bekwaamheid',
      'Pedagogische bekwaamheid',
      'Organisatorische bekwaamheid'
    ],
    onderwerpen: [
      'Differentiatie in inhoud, proces en product',
      'Universeel ontwerp voor leren',
      'Adaptief onderwijs',
      'Inclusieve didactiek'
    ],
    praktijkvoorbeelden: [
      'Niveaugroepen organiseren',
      'Verschillende leerstijlen bedienen',
      'Assistive technologie inzetten',
      'Flexibele groepsvormen'
    ],
    opdrachten: [
      {
        titel: "Differentiatie Plan",
        beschrijving: "Ontwikkel een differentiatie strategie voor een specifieke les",
        type: "ontwerp",
        startVraag: "Hoe zorg je ervoor dat alle leerlingen in jouw klas uitgedaagd worden op hun niveau?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij differentiatie. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module5',
    titel: 'Data & Evaluatie',
    beschrijving: 'Data-gedreven besluitvorming en evaluatie in het onderwijs',
    icon: '📊',
    kleur: 'from-orange-500 to-red-600',
    leerdoelen: [
      'Data verzamelen en analyseren',
      'Evaluatie-instrumenten inzetten',
      'Formatieve en summatieve evaluatie',
      'Data-gedreven beslissingen nemen'
    ],
    competenties: [
      'Analytische bekwaamheid',
      'Reflectieve bekwaamheid',
      'Organisatorische bekwaamheid'
    ],
    onderwerpen: [
      'Leerlingvolgsystemen',
      'Formatieve evaluatie',
      'Data-analyse technieken',
      'Feedback strategieën'
    ],
    praktijkvoorbeelden: [
      'Cito-resultaten analyseren',
      'Observatie-instrumenten gebruiken',
      'Portfolio-evaluatie',
      'Peer-assessment organiseren'
    ],
    opdrachten: [
      {
        titel: "Data Analyse",
        beschrijving: "Analyseer leerlingdata en trek conclusies voor je onderwijs",
        type: "analyse",
        startVraag: "Welke data gebruik je om te bepalen of je leerlingen vorderingen maken?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij data-analyse. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module6',
    titel: '21e-eeuwse Vaardigheden',
    beschrijving: 'Toekomstgerichte vaardigheden ontwikkelen',
    icon: '💡',
    kleur: 'from-teal-500 to-cyan-600',
    leerdoelen: [
      '21e-eeuwse vaardigheden herkennen',
      'Kritisch denken stimuleren',
      'Creativiteit en innovatie bevorderen',
      'Digitale geletterdheid ontwikkelen'
    ],
    competenties: [
      'Innovatieve bekwaamheid',
      'Didactische bekwaamheid',
      'Technologische bekwaamheid'
    ],
    onderwerpen: [
      'Kritisch denken en probleemoplossing',
      'Creativiteit en innovatie',
      'Communicatie en samenwerking',
      'Digitale geletterdheid'
    ],
    praktijkvoorbeelden: [
      'Projectgebaseerd leren',
      'Design thinking processen',
      'Digitale tools integreren',
      'Onderzoeksvaardigheden ontwikkelen'
    ],
    opdrachten: [
      {
        titel: "21e-eeuwse Vaardigheden Project",
        beschrijving: "Ontwerp een project dat 21e-eeuwse vaardigheden integreert",
        type: "ontwerp",
        startVraag: "Welke 21e-eeuwse vaardigheid vind je het belangrijkst voor jouw leerlingen?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij het ontwikkelen van 21e-eeuwse vaardigheden. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module7',
    titel: 'Schoolleiderschap',
    beschrijving: 'Leiderschap en management in het onderwijs',
    icon: '👑',
    kleur: 'from-indigo-500 to-purple-600',
    leerdoelen: [
      'Leiderschapsstijlen begrijpen',
      'Teamontwikkeling faciliteren',
      'Verandermanagement toepassen',
      'Visie en strategie ontwikkelen'
    ],
    competenties: [
      'Leiderschapsbekwaamheid',
      'Communicatieve bekwaamheid',
      'Organisatorische bekwaamheid'
    ],
    onderwerpen: [
      'Pedagogisch leiderschap',
      'Teamdynamiek',
      'Verandermanagement',
      'Strategische planning'
    ],
    praktijkvoorbeelden: [
      'Teamvergaderingen leiden',
      'Professionele ontwikkeling organiseren',
      'Innovaties implementeren',
      'Stakeholder management'
    ],
    opdrachten: [
      {
        titel: "Leiderschapsreflectie",
        beschrijving: "Reflecteer op jouw leiderschapsstijl en ontwikkelpunten",
        type: "reflectie",
        startVraag: "Welke leiderschapsstijl past het beste bij jouw persoonlijkheid en context?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij leiderschapsontwikkeling. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module8',
    titel: 'Burgerschap & Diversiteit',
    beschrijving: 'Burgerschapsonderwijs en omgaan met diversiteit',
    icon: '🤝',
    kleur: 'from-emerald-500 to-teal-600',
    leerdoelen: [
      'Burgerschapscompetenties ontwikkelen',
      'Diversiteit waarderen en benutten',
      'Interculturele competentie opbouwen',
      'Democratische waarden overdragen'
    ],
    competenties: [
      'Interculturele bekwaamheid',
      'Pedagogische bekwaamheid',
      'Communicatieve bekwaamheid'
    ],
    onderwerpen: [
      'Burgerschapsonderwijs',
      'Interculturele competentie',
      'Democratie en participatie',
      'Sociale cohesie'
    ],
    praktijkvoorbeelden: [
      'Klassenraad organiseren',
      'Interculturele projecten',
      'Democratische besluitvorming',
      'Conflictbemiddeling'
    ],
    opdrachten: [
      {
        titel: "Burgerschap in Praktijk",
        beschrijving: "Ontwikkel een activiteit die burgerschapscompetenties bevordert",
        type: "ontwerp",
        startVraag: "Hoe help je leerlingen om actieve burgers te worden?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij burgerschapsonderwijs. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module9',
    titel: 'Cito & Monitoring',
    beschrijving: 'Complete gids voor Cito-toetsen en leerlingmonitoring',
    icon: '📈',
    kleur: 'from-blue-500 to-indigo-600',
    leerdoelen: [
      'Cito-systeem volledig begrijpen',
      'A-E en I-V niveaus interpreteren',
      'Monitoring strategieën toepassen',
      'Data gebruiken voor interventies'
    ],
    competenties: [
      'Analytische bekwaamheid',
      'Didactische bekwaamheid',
      'Organisatorische bekwaamheid'
    ],
    onderwerpen: [
      'Cito A-E en I-V niveaus',
      'Monitoring tools groep 1-8',
      'Coördinator rollen',
      'Data doorstroom'
    ],
    praktijkvoorbeelden: [
      'Cito-resultaten analyseren',
      'Interventieplannen opstellen',
      'Monitoring cyclus implementeren',
      'Team-overleg organiseren'
    ],
    opdrachten: [
      {
        titel: "Cito Data Analyse",
        beschrijving: "Analyseer Cito-resultaten en stel verbeteracties voor",
        type: "analyse",
        startVraag: "Hoe gebruik je Cito-data om je onderwijs te verbeteren?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij Cito-analyse. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module10',
    titel: 'Inspectie Onderzoekskader',
    beschrijving: 'Voorbereiding op inspectiebezoek en kwaliteitszorg',
    icon: '🔍',
    kleur: 'from-purple-500 to-indigo-600',
    leerdoelen: [
      'Onderzoekskader 2021 beheersen',
      'Inspectie voorbereiding organiseren',
      'Kwaliteitszorg implementeren',
      'Zelfevaluatie uitvoeren'
    ],
    competenties: [
      'Kwaliteitsbekwaamheid',
      'Organisatorische bekwaamheid',
      'Reflectieve bekwaamheid'
    ],
    onderwerpen: [
      '5 Standaarden (OP1-OP5)',
      'Inspectie voorbereiding',
      'Zelfevaluatie tools',
      'Praktijkvoorbeelden'
    ],
    praktijkvoorbeelden: [
      'Inspectie checklist maken',
      'Team voorbereiden',
      'Documentatie organiseren',
      'Gesprekken voorbereiden'
    ],
    opdrachten: [
      {
        titel: "Inspectie Voorbereiding",
        beschrijving: "Bereid je school voor op een inspectiebezoek",
        type: "toepassing",
        startVraag: "Hoe zou je je school voorbereiden op een inspectiebezoek?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij inspectie voorbereiding. Gebruik de socratische methode."
      }
    ]
  },
  {
    id: 'module11',
    titel: 'MR & WMS',
    beschrijving: 'Medezeggenschapsraad en Wet Medezeggenschap Scholen',
    icon: '⚖️',
    kleur: 'from-gray-500 to-slate-600',
    leerdoelen: [
      'WMS wetgeving begrijpen',
      'MR-taken en bevoegdheden kennen',
      'Participatie organiseren',
      'Democratische processen faciliteren'
    ],
    competenties: [
      'Juridische bekwaamheid',
      'Communicatieve bekwaamheid',
      'Organisatorische bekwaamheid'
    ],
    onderwerpen: [
      'Wet Medezeggenschap Scholen',
      'MR-taken en bevoegdheden',
      'Participatie en inspraak',
      'Democratische besluitvorming'
    ],
    praktijkvoorbeelden: [
      'MR-vergaderingen organiseren',
      'Adviesaanvragen behandelen',
      'Participatie stimuleren',
      'Conflicten bemiddelen'
    ],
    opdrachten: [
      {
        titel: "MR Participatie",
        beschrijving: "Ontwikkel een plan om participatie in de MR te vergroten",
        type: "ontwerp",
        startVraag: "Hoe zorg je voor effectieve medezeggenschap in jouw school?",
        context: "Je bent een ervaren onderwijsprofessional die helpt bij medezeggenschap. Gebruik de socratische methode."
      }
    ]
  }
]

export default function PABOLeerApp() {
  const [currentView, setCurrentView] = useState<'overzicht' | 'module' | 'documenten'>('overzicht')
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedSubView, setSelectedSubView] = useState<string>('ai-integratie')
  const [userLevel, setUserLevel] = useState<'beginnend' | 'gevorderd' | 'expert'>('beginnend')
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
          setDocuments(parsedDocs)
        }
      } catch (error) {
        console.error('Error loading documents:', error)
      }
    }

    loadDocuments()

    // Listen for document changes
    const handleDocumentChange = () => {
      setTimeout(loadDocuments, 100)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('documentUploaded', handleDocumentChange)
      window.addEventListener('storage', handleDocumentChange)
      
      return () => {
        window.removeEventListener('documentUploaded', handleDocumentChange)
        window.removeEventListener('storage', handleDocumentChange)
      }
    }
  }, [])

  const selectModule = (module: Module) => {
    setSelectedModule(module)
    setCurrentView('module')
    setSelectedSubView('ai-integratie')
  }

  const goToOverview = () => {
    setCurrentView('overzicht')
    setSelectedModule(null)
  }

  const goToDocuments = () => {
    setCurrentView('documenten')
    setSelectedModule(null)
  }

  const getSubViewComponent = () => {
    if (!selectedModule) return null

    switch (selectedSubView) {
      case 'ai-integratie':
        return (
          <SmartModuleAI
            moduleTitle={selectedModule.titel}
            moduleId={selectedModule.id}
            documents={documents}
            userLevel={userLevel}
          />
        )
      case 'socratische-chat':
        return (
          <SocraticChatBot
            module={selectedModule.titel}
            opdrachten={selectedModule.opdrachten}
          />
        )
      case 'kerndoelen':
        return <KerndoelenViewer />
      case 'kerndoelen-progressie':
        return <KerndoelenProgressieTracker />
      case 'ontwikkelingstheorie':
        return <DevelopmentTheoryViewer />
      case 'ontwikkelingsstadia':
        return <OntwikkelingsStadiaTimeline />
      case 'sel-competenties':
        return <SELCompetentieRadar />
      case 'sel-methoden':
        return <SELMethodsViewer />
      case 'cito-monitoring':
        return <CitoMonitoringViewer />
      case 'inspectie-kader':
        return <InspectionFrameworkViewer />
      case 'klikbare-theorie':
        return <ClickableTheoryViewer moduleId={selectedModule.id} />
      default:
        return (
          <SmartModuleAI
            moduleTitle={selectedModule.titel}
            moduleId={selectedModule.id}
            documents={documents}
            userLevel={userLevel}
          />
        )
    }
  }

  const getModuleSubViews = (moduleId: string) => {
    const baseViews = [
      { id: 'ai-integratie', label: '🤖 Slimme AI Integratie', beschrijving: 'AI-analyse van je documenten + rolgebaseerde chatbot' }
    ]

    switch (moduleId) {
      case 'module1':
        return [
          ...baseViews,
          { id: 'kerndoelen', label: '📚 Alle 58 Kerndoelen', beschrijving: 'Interactieve kerndoelen met voorbeelden' },
          { id: 'kerndoelen-progressie', label: '📈 Kerndoel Progressie', beschrijving: 'Progressie tracking per groep' }
        ]
      case 'module2':
        return [
          ...baseViews,
          { id: 'ontwikkelingstheorie', label: '🧠 Ontwikkelingstheorieën', beschrijving: 'Interactieve theorieën met audio' },
          { id: 'ontwikkelingsstadia', label: '🌱 Ontwikkelingsstadia', beschrijving: 'Timeline van ontwikkeling' }
        ]
      case 'module3':
        return [
          ...baseViews,
          { id: 'sel-competenties', label: '❤️ SEL Competentie Radar', beschrijving: 'Visualisatie van SEL-vaardigheden' },
          { id: 'sel-methoden', label: '🤝 SEL Methodieken', beschrijving: 'Vergelijking van SEL-methoden' }
        ]
      case 'module9':
        return [
          ...baseViews,
          { id: 'cito-monitoring', label: '📊 Cito & Monitoring', beschrijving: 'Complete Cito-gids met A-E niveaus' }
        ]
      case 'module10':
        return [
          ...baseViews,
          { id: 'inspectie-kader', label: '🔍 Inspectie Onderzoekskader', beschrijving: 'Voorbereiding op inspectiebezoek' }
        ]
      default:
        return [
          ...baseViews,
          { id: 'klikbare-theorie', label: '🔗 Klikbare Theorie', beschrijving: 'Interactieve theorie verdieping' }
        ]
    }
  }

  if (currentView === 'documenten') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={goToOverview}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-xl">🏠</span>
                  <span className="font-medium">Terug naar overzicht</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Niveau:</span>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginnend">🌱 Beginnend</option>
                  <option value="gevorderd">🌿 Gevorderd</option>
                  <option value="expert">🌳 Expert</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Document Manager */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DocumentManager onDocumentsChange={setDocuments} />
        </main>
      </div>
    )
  }

  if (currentView === 'module' && selectedModule) {
    const subViews = getModuleSubViews(selectedModule.id)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={goToOverview}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span className="text-xl">←</span>
                  <span className="font-medium">Terug naar overzicht</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{selectedModule.icon}</span>
                  <span className="font-semibold text-gray-900">{selectedModule.titel}</span>
                  <span className="text-sm text-gray-500">→</span>
                  <span className="text-sm text-gray-600">
                    {subViews.find(v => v.id === selectedSubView)?.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Niveau:</span>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginnend">🌱 Beginnend</option>
                  <option value="gevorderd">🌿 Gevorderd</option>
                  <option value="expert">🌳 Expert</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex-shrink-0`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                {!sidebarCollapsed && (
                  <h3 className="font-semibold text-gray-800">Module Onderdelen</h3>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  {sidebarCollapsed ? '→' : '←'}
                </button>
              </div>

              {/* Document Panel */}
              {!sidebarCollapsed && (
                <div className="mb-6">
                  <PersistentDocumentPanel 
                    onDocumentsChange={setDocuments}
                    currentModule={selectedModule.titel}
                  />
                </div>
              )}

              {/* Sub Views */}
              <div className="space-y-2">
                {subViews.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setSelectedSubView(view.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedSubView === view.id
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={sidebarCollapsed ? view.beschrijving : undefined}
                  >
                    {sidebarCollapsed ? (
                      <div className="text-center">
                        <span className="text-xl">{view.label.split(' ')[0]}</span>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">{view.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{view.beschrijving}</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {getSubViewComponent()}
          </div>
        </div>
      </div>
    )
  }

  // Overview
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎓</span>
                <h1 className="text-xl font-bold text-gray-900">PO Leerapp</h1>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Primair Onderwijs
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={goToDocuments}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>📚</span>
                <span>Mijn Documenten</span>
                {documents.length > 0 && (
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    {documents.length}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Niveau:</span>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginnend">🌱 Beginnend</option>
                  <option value="gevorderd">🌿 Gevorderd</option>
                  <option value="expert">🌳 Expert</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welkom bij de PO Leerapp
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Interactieve modules voor professionele ontwikkeling in het primair onderwijs
          </p>
          
          {documents.length > 0 && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <span className="text-lg">✅</span>
                <span className="font-medium">
                  Je hebt {documents.length} document(en) geüpload voor gepersonaliseerde AI-begeleiding
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => selectModule(module)}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <div className={`bg-gradient-to-r ${module.kleur} p-6 text-white`}>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">{module.icon}</span>
                  <h3 className="text-xl font-bold">{module.titel}</h3>
                </div>
                <p className="text-sm opacity-90">{module.beschrijving}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🎯 Leerdoelen:</h4>
                    <ul className="space-y-1">
                      {module.leerdoelen.slice(0, 2).map((doel, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{doel}</span>
                        </li>
                      ))}
                      {module.leerdoelen.length > 2 && (
                        <li className="text-sm text-gray-500 italic">
                          +{module.leerdoelen.length - 2} meer...
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>📚</span>
                      <span>{module.onderwerpen.length} onderwerpen</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600 font-medium">
                      <span>Start module</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🚀 Wat maakt deze app bijzonder?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-semibold text-gray-800 mb-2">AI-Begeleiding</h4>
              <p className="text-gray-600 text-sm">
                Upload je schooldocumenten en krijg gepersonaliseerde AI-analyse en begeleiding
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-800 mb-2">Interactieve Modules</h4>
              <p className="text-gray-600 text-sm">
                11 complete modules met theorie, praktijk en interactieve tools
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-800 mb-2">Data & Monitoring</h4>
              <p className="text-gray-600 text-sm">
                Complete gidsen voor Cito, inspectie en kwaliteitszorg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}