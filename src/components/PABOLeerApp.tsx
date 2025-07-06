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
  leerlijn: 'didactiek' | 'pedagogiek' | 'organisatie'
  leerdoelen: string[]
  competenties: string[]
  onderwerpen: string[]
  praktijkvoorbeelden: string[]
  opdrachten: any[]
}

const leerlijnen = [
  {
    id: 'didactiek',
    titel: 'Didactiek & Vakinhoud',
    beschrijving: 'Lesgeven, kerndoelen en vakspecifieke kennis',
    icon: '📚',
    kleur: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'pedagogiek',
    titel: 'Pedagogiek & Ontwikkeling',
    beschrijving: 'Kindontwikkeling, SEL en klassenmanagement',
    icon: '❤️',
    kleur: 'from-red-500 to-pink-600'
  },
  {
    id: 'organisatie',
    titel: 'Organisatie & Leiderschap',
    beschrijving: 'Schoolorganisatie, data en kwaliteitszorg',
    icon: '⚖️',
    kleur: 'from-purple-500 to-indigo-600'
  }
]

const modules: Module[] = [
  {
    id: 'module1',
    titel: 'Curriculum & Kerndoelen',
    beschrijving: 'Alle 58 kerndoelen beheersen en toepassen in de onderwijspraktijk',
    icon: '📚',
    kleur: 'from-blue-500 to-indigo-600',
    leerlijn: 'didactiek',
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
    leerlijn: 'pedagogiek',
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
    leerlijn: 'pedagogiek',
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
    leerlijn: 'didactiek',
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
    leerlijn: 'organisatie',
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
    leerlijn: 'didactiek',
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
    leerlijn: 'organisatie',
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
    leerlijn: 'pedagogiek',
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
    leerlijn: 'organisatie',
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
    leerlijn: 'organisatie',
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
    leerlijn: 'organisatie',
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
  const [selectedLeerlijn, setSelectedLeerlijn] = useState<string>('alle')

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

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Home', onClick: goToOverview, active: currentView === 'overzicht' }
    ]

    if (currentView === 'documenten') {
      breadcrumbs.push({ label: 'Documenten', onClick: goToDocuments, active: true })
    } else if (currentView === 'module' && selectedModule) {
      breadcrumbs.push({ 
        label: selectedModule.titel, 
        onClick: () => {}, 
        active: true 
      })
    }

    return breadcrumbs
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
      { 
        id: 'ai-integratie', 
        label: '🤖 Slimme AI Integratie', 
        beschrijving: 'AI-analyse van je documenten + rolgebaseerde chatbot',
        tooltip: 'Upload je schooldocumenten voor gepersonaliseerde AI-begeleiding'
      }
    ]

    switch (moduleId) {
      case 'module1':
        return [
          ...baseViews,
          { 
            id: 'kerndoelen', 
            label: '📚 Alle 58 Kerndoelen', 
            beschrijving: 'Interactieve kerndoelen met voorbeelden',
            tooltip: 'Ontdek alle kerndoelen met audio en praktijkvoorbeelden'
          },
          { 
            id: 'kerndoelen-progressie', 
            label: '📈 Kerndoel Progressie', 
            beschrijving: 'Progressie tracking per groep',
            tooltip: 'Volg de ontwikkeling van kerndoelen van groep 1 tot 8'
          }
        ]
      case 'module2':
        return [
          ...baseViews,
          { 
            id: 'ontwikkelingstheorie', 
            label: '🧠 Ontwikkelingstheorieën', 
            beschrijving: 'Interactieve theorieën met audio',
            tooltip: 'Piaget, Vygotsky, Erikson en meer met voorleesfunctie'
          },
          { 
            id: 'ontwikkelingsstadia', 
            label: '🌱 Ontwikkelingsstadia', 
            beschrijving: 'Timeline van ontwikkeling',
            tooltip: 'Visuele timeline van cognitieve en sociale ontwikkeling'
          }
        ]
      case 'module3':
        return [
          ...baseViews,
          { 
            id: 'sel-competenties', 
            label: '❤️ SEL Competentie Radar', 
            beschrijving: 'Visualisatie van SEL-vaardigheden',
            tooltip: 'Interactieve radar voor sociaal-emotionele competenties'
          },
          { 
            id: 'sel-methoden', 
            label: '🤝 SEL Methodieken', 
            beschrijving: 'Vergelijking van SEL-methoden',
            tooltip: 'Kanjertraining, Lions Quest en andere SEL-methoden vergelijken'
          }
        ]
      case 'module9':
        return [
          ...baseViews,
          { 
            id: 'cito-monitoring', 
            label: '📊 Cito & Monitoring', 
            beschrijving: 'Complete Cito-gids met A-E niveaus',
            tooltip: 'Alles over Cito-toetsen, monitoring en coördinatorrollen'
          }
        ]
      case 'module10':
        return [
          ...baseViews,
          { 
            id: 'inspectie-kader', 
            label: '🔍 Inspectie Onderzoekskader', 
            beschrijving: 'Voorbereiding op inspectiebezoek',
            tooltip: 'Complete gids voor inspectie voorbereiding en kwaliteitszorg'
          }
        ]
      default:
        return [
          ...baseViews,
          { 
            id: 'klikbare-theorie', 
            label: '🔗 Klikbare Theorie', 
            beschrijving: 'Interactieve theorie verdieping',
            tooltip: 'Klik op onderstreepte termen voor diepere uitleg'
          }
        ]
    }
  }

  const filteredModules = selectedLeerlijn === 'alle' 
    ? modules 
    : modules.filter(module => module.leerlijn === selectedLeerlijn)

  if (currentView === 'documenten') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Breadcrumbs */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={goToOverview}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                    PO
                  </div>
                  <span className="font-semibold">PO Leerapp</span>
                </button>
                
                <nav className="flex items-center space-x-2 text-sm">
                  {getBreadcrumbs().map((crumb, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {index > 0 && <span className="text-gray-400">/</span>}
                      <button
                        onClick={crumb.onClick}
                        className={`px-2 py-1 rounded transition-colors ${
                          crumb.active 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {crumb.label}
                      </button>
                    </div>
                  ))}
                </nav>
              </div>

              {/* User Level */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Niveau:</span>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo & Breadcrumbs */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={goToOverview}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                    PO
                  </div>
                  <span className="font-semibold">PO Leerapp</span>
                </button>
                
                <nav className="flex items-center space-x-2 text-sm">
                  {getBreadcrumbs().map((crumb, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {index > 0 && <span className="text-gray-400">/</span>}
                      <button
                        onClick={crumb.onClick}
                        className={`px-2 py-1 rounded transition-colors ${
                          crumb.active 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        {crumb.label}
                      </button>
                    </div>
                  ))}
                </nav>
              </div>

              {/* User Level */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Niveau:</span>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value as any)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
          {/* Sticky Sidebar - ENHANCED */}
          <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white/95 backdrop-blur-sm shadow-lg border-r border-gray-200 transition-all duration-300 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto`}>
            <div className="p-4">
              {/* Module Header with Icon */}
              <div className="flex items-center justify-between mb-6">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${selectedModule.kleur} rounded-lg flex items-center justify-center text-white text-xl shadow-sm`}>
                      {selectedModule.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedModule.titel}</h3>
                      <p className="text-xs text-gray-500 capitalize">{selectedModule.leerlijn}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  title={sidebarCollapsed ? 'Uitklappen' : 'Inklappen'}
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

              {/* Sub Views - ENHANCED */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2 px-2">
                  {sidebarCollapsed ? '📋' : 'Module Onderdelen'}
                </h4>
                
                {subViews.map((view) => (
                  <div key={view.id} className="group relative">
                    <button
                      onClick={() => setSelectedSubView(view.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedSubView === view.id
                          ? `bg-gradient-to-r ${selectedModule.kleur} text-white shadow-sm`
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    >
                      {sidebarCollapsed ? (
                        <div className="flex flex-col items-center">
                          <span className="text-xl">{view.label.split(' ')[0]}</span>
                          <span className="text-[10px] mt-1">{view.id.split('-')[0]}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{view.label.split(' ')[0]}</span>
                          <div>
                            <div className="font-medium text-sm">{view.label.split(' ').slice(1).join(' ')}</div>
                            <div className="text-xs opacity-80">{view.beschrijving}</div>
                          </div>
                        </div>
                      )}
                    </button>
                    
                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        <div className="font-medium">{view.label}</div>
                        <div className="text-gray-300">{view.tooltip}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              {!sidebarCollapsed && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-3 px-2">Snelle Acties</h4>
                  <div className="space-y-2">
                    <button
                      onClick={goToOverview}
                      className="w-full text-left p-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <span className="text-blue-500 text-lg">🏠</span>
                      <span>Terug naar overzicht</span>
                    </button>
                    <button
                      onClick={goToDocuments}
                      className="w-full text-left p-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <span className="text-blue-500 text-lg">📚</span>
                      <span>Documenten beheren</span>
                    </button>
                  </div>
                </div>
              )}
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

  // Homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                PO
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">PO Leerapp</h1>
                <p className="text-xs text-gray-500">Primair Onderwijs</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('overzicht')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'overzicht'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                🏠 Overzicht
              </button>
              <button
                onClick={goToDocuments}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  'text-gray-600 hover:text-blue-600'
                }`}
              >
                📚 Documenten
                {documents.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {documents.length}
                  </span>
                )}
              </button>
            </nav>

            {/* User Level */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Niveau:</span>
              <select
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="beginnend">🌱 Beginnend</option>
                <option value="gevorderd">🌿 Gevorderd</option>
                <option value="expert">🌳 Expert</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welkom bij de PO Leerapp
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Interactieve modules voor professionele ontwikkeling in het primair onderwijs. 
              Upload je schooldocumenten voor gepersonaliseerde AI-begeleiding.
            </p>
            
            {documents.length > 0 ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
                <div className="flex items-center justify-center space-x-3 text-white mb-4">
                  <span className="text-2xl">✅</span>
                  <span className="text-lg font-semibold">
                    {documents.length} document(en) geüpload voor AI-begeleiding
                  </span>
                </div>
                <p className="text-blue-100 mb-4">
                  Je documenten zijn inhoudelijk geanalyseerd en klaar voor gebruik in alle modules
                </p>
                <button
                  onClick={goToDocuments}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg font-medium"
                >
                  📚 Beheer documenten
                </button>
              </div>
            ) : (
              <button
                onClick={goToDocuments}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📚 Upload je eerste document
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Leerlijnen Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            🎓 Kies je leerlijn
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {leerlijnen.map((leerlijn) => (
              <div key={leerlijn.id} className="group relative">
                <button
                  onClick={() => setSelectedLeerlijn(selectedLeerlijn === leerlijn.id ? 'alle' : leerlijn.id)}
                  className={`w-full p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    selectedLeerlijn === leerlijn.id
                      ? `bg-gradient-to-br ${leerlijn.kleur} text-white shadow-2xl`
                      : 'bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-200'
                  }`}
                >
                  <div className="text-4xl mb-4">{leerlijn.icon}</div>
                  <h4 className="text-xl font-bold mb-3">{leerlijn.titel}</h4>
                  <p className={`text-sm ${
                    selectedLeerlijn === leerlijn.id ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {leerlijn.beschrijving}
                  </p>
                  <div className="mt-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      selectedLeerlijn === leerlijn.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {modules.filter(m => m.leerlijn === leerlijn.id).length} modules
                    </span>
                  </div>
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  Klik om te filteren op {leerlijn.titel.toLowerCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Reset */}
        {selectedLeerlijn !== 'alle' && (
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedLeerlijn('alle')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Toon alle modules
            </button>
          </div>
        )}

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module) => (
            <div key={module.id} className="group relative">
              <div
                onClick={() => selectModule(module)}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${module.kleur} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{module.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold">{module.titel}</h3>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {module.leerlijn}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm opacity-90">{module.beschrijving}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">🎯 Leerdoelen:</h4>
                      <ul className="space-y-1">
                        {module.leerdoelen.slice(0, 2).map((doel, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{doel}</span>
                          </li>
                        ))}
                        {module.leerdoelen.length > 2 && (
                          <li className="text-xs text-gray-500 italic">
                            +{module.leerdoelen.length - 2} meer...
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>📚</span>
                        <span>{module.onderwerpen.length} onderwerpen</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-600 font-medium text-sm">
                        <span>Start module</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                Klik om {module.titel} te starten
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            🚀 Wat maakt deze app bijzonder?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">AI-Begeleiding</h4>
              <p className="text-gray-600 text-sm">
                Upload je schooldocumenten en krijg gepersonaliseerde AI-analyse en begeleiding
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Interactieve Modules</h4>
              <p className="text-gray-600 text-sm">
                11 complete modules met theorie, praktijk en interactieve tools
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Data & Monitoring</h4>
              <p className="text-gray-600 text-sm">
                Complete gidsen voor Cito, inspectie en kwaliteitszorg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  PO
                </div>
                <span className="font-bold text-lg">PO Leerapp</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professionele ontwikkeling voor het primair onderwijs met AI-ondersteuning
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Snelle Links</h4>
              <div className="space-y-2">
                <button onClick={goToDocuments} className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Documenten uploaden
                </button>
                <button onClick={() => selectModule(modules[0])} className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Curriculum & Kerndoelen
                </button>
                <button onClick={() => selectModule(modules[8])} className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Cito & Monitoring
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">
                Gemaakt voor het primair onderwijs<br />
                © 2024 PO Leerapp
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}