'use client'

import { useState } from 'react'
import SocraticChatBot from './SocraticChatBot'
import DocumentManager from './DocumentManager'
import KerndoelenViewer from './KerndoelenViewer'
import {
  CitoScoreChart,
  LVSTrendChart,
  EDIObservationCard,
  LearningLineVisual,
  SELDevelopmentChart,
  DifferentiationMatrix,
  SkillsRadarChart,
  LeadershipDashboard
} from './VisualLearningComponents'

interface Module {
  id: number
  title: string
  description: string
  icon: string
  gradient: string
  leerdoelen: string[]
  theorie: {
    concepten: { naam: string; uitleg: string; voorbeeld?: string }[]
    praktijktips: string[]
  }
  interactieveOpdrachten: {
    titel: string
    beschrijving: string
    type: 'reflectie' | 'analyse' | 'ontwerp' | 'toepassing'
    startVraag: string
    context: string
  }[]
  bronnen: string[]
  completed: boolean
  hasDocumentUpload?: boolean
  visualComponents?: any[]
}

const modules: Module[] = [
  {
    id: 1,
    title: "Doorlopende Leerlijnen & Kerncurriculum",
    description: "Leer de 58 kerndoelen kennen en koppel deze aan leerlijnen en jaarplanningen",
    icon: "📚",
    gradient: "from-blue-500 to-blue-700",
    leerdoelen: [
      "Benoem de 58 wettelijke kerndoelen en herken concept-kerndoelen 2025",
      "Koppel kerndoel → leerlijn → leerjaar voor taal EN rekenen", 
      "Schets een jaarplanning (8 blokken) op basis van een leerlijn",
      "Vergelijk PO-leerlijn met VO/MBO-leerlijn uit eigen ervaring"
    ],
    theorie: {
      concepten: [
        {
          naam: "Kerndoelen",
          uitleg: "De 58 wettelijke kerndoelen vormen de basis van het Nederlandse primair onderwijs. Ze beschrijven wat leerlingen minimaal moeten kennen en kunnen aan het einde van de basisschool.",
          voorbeeld: "Kerndoel 9 (Rekenen): 'Leerlingen leren hoofdrekenen, cijferen en rekenen met de rekenmachine.'"
        },
        {
          naam: "Leerlijnen", 
          uitleg: "Een leerlijn toont de opbouw van kennis en vaardigheden van groep 1 tot 8. Het verbindt kerndoelen met concrete leerdoelen per leerjaar.",
          voorbeeld: "Leerlijn 'Getalbegrip': groep 1-2 (tellen tot 20) → groep 3-4 (getallen tot 100) → groep 5-6 (tot 10.000) → groep 7-8 (tot 1.000.000)"
        },
        {
          naam: "Referentieniveaus",
          uitleg: "1F (functioneel), 1S (streefniveau) en 2F bepalen wat leerlingen minimaal moeten beheersen voor vervolgonderwijs.",
          voorbeeld: "1F Rekenen: basisvaardigheden voor dagelijks leven. 2F Rekenen: voorbereiding op HAVO/VWO"
        }
      ],
      praktijktips: [
        "Gebruik de SLO Leerlijnenviewer voor concrete uitwerking per groep",
        "Koppel kerndoelen aan je methode door doelenbomen te maken",
        "Plan 8 blokken per jaar met 4-5 weken per blok voor overzicht",
        "Reserveer tijd voor herhaling en verdieping tussen blokken"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Kerndoel Detective",
        beschrijving: "Analyseer een kerndoel en ontdek wat het echt betekent voor je lespraktijk",
        type: "analyse",
        startVraag: "Kies een kerndoel uit jouw vakgebied. Wat denk je dat dit kerndoel precies van leerlingen verwacht?",
        context: "Je gaat een kerndoel uitpluizen en koppelen aan concrete lesdoelen"
      },
      {
        titel: "Leerlijn Architect", 
        beschrijving: "Ontwerp een leerlijn van groep 1 tot 8 voor een specifiek onderwerp",
        type: "ontwerp",
        startVraag: "Welk onderwerp binnen taal of rekenen vind je het moeilijkst om uit te leggen aan kinderen? Waarom denk je dat dat zo is?",
        context: "Je gaat stap voor stap een leerlijn opbouwen"
      },
      {
        titel: "Jaarplanning Puzzel",
        beschrijving: "Maak een realistische jaarplanning die aansluit bij leerlijnen",
        type: "toepassing", 
        startVraag: "Stel je voor: je krijgt een nieuwe groep 5. Waar begin je met plannen? Wat zijn je eerste overwegingen?",
        context: "Je maakt een concrete jaarplanning voor een specifieke groep"
      }
    ],
    bronnen: ["https://tule.slo.nl", "https://curriculum.nu"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'LearningLineVisual',
        props: {
          subject: 'Rekenen - Getalbegrip',
          progression: [
            {
              grade: '1-2',
              skills: ['Tellen tot 20', 'Getalsymbolen herkennen', 'Meer/minder vergelijken'],
              example: 'Kinderen tellen speelgoed en zeggen welke stapel meer heeft'
            },
            {
              grade: '3-4', 
              skills: ['Getallen tot 100', 'Plaats van cijfers', 'Optellen en aftrekken'],
              example: 'Rekenen met geld: 25 cent + 10 cent = 35 cent'
            },
            {
              grade: '5-6',
              skills: ['Getallen tot 10.000', 'Vermenigvuldigen', 'Breuken introduceren'],
              example: '3 x 25 = 75, want 3 keer een kwartje is 75 cent'
            },
            {
              grade: '7-8',
              skills: ['Getallen tot 1.000.000', 'Kommagetallen', 'Procenten'],
              example: '1,5 miljoen inwoners = 1.500.000 mensen'
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Pedagogisch Handelen & Kindontwikkeling",
    description: "Begrijp ontwikkelingstheorieën en pas deze toe in je pedagogische handelen",
    icon: "👶",
    gradient: "from-green-500 to-green-700",
    leerdoelen: [
      "Leg fasen van cognitieve en sociaal-emotionele ontwikkeling uit",
      "Ontwerp een les met EDI + scaffolding principes",
      "Toon hoe je een veilige leeromgeving creëert"
    ],
    theorie: {
      concepten: [
        {
          naam: "Piaget's Ontwikkelingsstadia",
          uitleg: "Kinderen doorlopen vier stadia: sensomotorisch (0-2), preoperationeel (2-7), concreet operationeel (7-11), formeel operationeel (11+). Elk stadium heeft eigen denkkenmerken.",
          voorbeeld: "Groep 3-4 (preoperationeel): kinderen denken nog niet logisch, hebben moeite met behoud (water in hoog/breed glas)"
        },
        {
          naam: "Vygotsky's Zone van Naaste Ontwikkeling",
          uitleg: "Het verschil tussen wat een kind alleen kan en wat het met hulp kan. Hier vindt optimaal leren plaats.",
          voorbeeld: "Kind kan zelfstandig tot 10 tellen, met hulp tot 20. De ZNO ligt tussen 10-20."
        },
        {
          naam: "Scaffolding",
          uitleg: "Tijdelijke ondersteuning die geleidelijk wordt weggenomen naarmate het kind zelfstandiger wordt.",
          voorbeeld: "Rekenen: eerst samen doen → met hulpkaart → zelfstandig → automatiseren"
        }
      ],
      praktijktips: [
        "Observeer kinderen tijdens spel om ontwikkelingsniveau in te schatten",
        "Gebruik concrete materialen voor abstracte begrippen (groep 3-6)",
        "Geef kinderen tijd om te denken voordat je antwoord verwacht",
        "Varieer in ondersteuning: visueel, auditief, tactiel"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Ontwikkelingsdetective",
        beschrijving: "Herken ontwikkelingsstadia in kindgedrag en pas je aanpak aan",
        type: "analyse",
        startVraag: "Beschrijf een situatie waarin een kind iets niet begreep. Hoe reageerde je toen? Wat zou je nu anders doen?",
        context: "Je analyseert kindgedrag vanuit ontwikkelingstheorie"
      }
    ],
    bronnen: ["G. Marzano, Classroom Management"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'SELDevelopmentChart',
        props: {
          stages: [
            {
              age: '4-6 jaar (groep 1-2)',
              stage: 'Basis emotieregulatie',
              characteristics: [
                'Leren gevoelens benoemen',
                'Eenvoudige zelfcontrole',
                'Spelen met anderen'
              ],
              interventions: [
                'Gevoelensthermometer gebruiken',
                'Ademhalingsoefeningen',
                'Duidelijke structuur bieden'
              ]
            },
            {
              age: '6-8 jaar (groep 3-4)',
              stage: 'Sociale vaardigheden',
              characteristics: [
                'Vriendschappen vormen',
                'Regels begrijpen',
                'Empathie ontwikkelen'
              ],
              interventions: [
                'Rollenspellen doen',
                'Conflictoplossing oefenen',
                'Complimenten geven'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Sociaal-Emotionele Ontwikkeling & Klassenklimaat",
    description: "Creëer een positief klassenklimaat en ondersteun SEL-ontwikkeling",
    icon: "🤝",
    gradient: "from-purple-500 to-purple-700",
    leerdoelen: [
      "Onderscheid drie SEL-methodieken en benoem kernprincipes",
      "Kies en motiveer SEL-programma passend bij schoolcontext", 
      "Formuleer meetbare doelen rond welbevinden en veiligheid"
    ],
    theorie: {
      concepten: [
        {
          naam: "SEL (Social Emotional Learning)",
          uitleg: "Vijf kerncompetenties: zelfbewustzijn, zelfregulatie, sociale bewustzijn, relatievaardigheden, verantwoordelijke besluitvorming.",
          voorbeeld: "Zelfregulatie: kind leert ademhalingsoefening bij boosheid in plaats van slaan"
        }
      ],
      praktijktips: [
        "Start elke dag met een positieve begroeting van elk kind",
        "Gebruik 'time-in' in plaats van 'time-out' voor verbinding"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "SEL-Methode Verkenner",
        beschrijving: "Vergelijk verschillende SEL-methodieken en kies de beste voor jouw context",
        type: "analyse",
        startVraag: "Denk aan een klas die je kent. Welke sociale uitdagingen zie je daar?",
        context: "Je verkent welke SEL-aanpak past bij specifieke klassenbehoeften"
      }
    ],
    bronnen: ["Kanjertraining.nl"],
    completed: false,
    hasDocumentUpload: true
  },
  {
    id: 4,
    title: "Didactisch Ontwerp & Differentiatie",
    description: "Ontwerp lessen die aansluiten bij alle leerlingen door slimme differentiatie",
    icon: "🎯",
    gradient: "from-orange-500 to-orange-700",
    leerdoelen: [
      "Pas convergente én divergente differentiatie toe in lesontwerp",
      "Gebruik taxonomie van Bloom voor leerdoelen",
      "Ontwerp formatieve checkpoints per lesfase"
    ],
    theorie: {
      concepten: [
        {
          naam: "Convergente Differentiatie",
          uitleg: "Alle leerlingen werken naar hetzelfde doel, maar via verschillende wegen of met verschillende ondersteuning.",
          voorbeeld: "Iedereen leert breuken: groep A met materiaal, groep B met plaatjes, groep C abstract"
        }
      ],
      praktijktips: [
        "Start met kerngroep (60%), dan uitbreiding naar zwakke en sterke leerlingen"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Differentiatie Designer",
        beschrijving: "Ontwerp een les met meerdere niveaus voor verschillende leerlingen",
        type: "ontwerp",
        startVraag: "Kies een onderwerp dat je wilt gaan onderwijzen. Welke verschillen verwacht je?",
        context: "Je ontwerpt een gedifferentieerde les stap voor stap"
      }
    ],
    bronnen: ["SLO Differentiatiegids"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'DifferentiationMatrix',
        props: {
          activities: [
            {
              level: 'Groep 3 Rekenen',
              must: 'Optellen tot 20 met materiaal',
              should: 'Optellen tot 20 zonder materiaal', 
              could: 'Aftrekken tot 20 en woordsommen'
            },
            {
              level: 'Groep 5 Taal',
              must: 'Werkwoorden herkennen',
              should: 'Werkwoorden vervoegen (ik/jij/hij)',
              could: 'Onregelmatige werkwoorden en tijden'
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Data-geïnformeerd Werken & Kwaliteitszorg",
    description: "Gebruik data om onderwijs te verbeteren en kwaliteit te borgen",
    icon: "📊",
    gradient: "from-indigo-500 to-indigo-700",
    leerdoelen: [
      "Interpreteer LVS-data op leerling-, groeps- en schoolniveau",
      "Hanteer PDCA-cyclus binnen kwaliteitszorg",
      "Koppel data aan concrete interventies en SMART-doelen"
    ],
    theorie: {
      concepten: [
        {
          naam: "LVS (Leerling Volg Systeem)",
          uitleg: "Systematisch verzamelen en analyseren van leerlinggegevens om ontwikkeling te volgen en onderwijs aan te passen.",
          voorbeeld: "Cito-toetsen 3x per jaar: september (start), januari (midden), juni (eind) voor trendanalyse"
        }
      ],
      praktijktips: [
        "Bekijk data altijd in context: wat speelde er in de klas/school?"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Data Detective",
        beschrijving: "Analyseer LVS-data en ontdek wat de cijfers echt vertellen",
        type: "analyse",
        startVraag: "Je ziet dat de rekenprestaties in groep 4 zijn gedaald. Wat zou je willen weten?",
        context: "Je leert data kritisch interpreteren en vragen stellen"
      }
    ],
    bronnen: ["PO-Raad 'Werken met Data' toolkit"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'CitoScoreChart',
        props: {
          title: 'Cito Rekenen Groep 6 - Schooljaar 2023-2024',
          data: [
            { level: 'A', percentage: 8, national: 5, color: 'bg-red-500' },
            { level: 'B', percentage: 27, national: 20, color: 'bg-orange-500' },
            { level: 'C', percentage: 40, national: 45, color: 'bg-yellow-500' },
            { level: 'D', percentage: 20, national: 25, color: 'bg-green-500' },
            { level: 'E', percentage: 5, national: 5, color: 'bg-blue-500' }
          ],
          explanation: 'Zorgelijk: 8% op niveau A (landelijk 5%). Actie: extra ondersteuning voor zwakke rekenaars en analyse van rekenonderwijs.'
        }
      },
      {
        type: 'LVSTrendChart',
        props: {
          subject: 'Begrijpend Lezen Groep 5',
          data: [
            { month: 'Sep', percentage: 45, target: 70 },
            { month: 'Jan', percentage: 52, target: 70 },
            { month: 'Jun', percentage: 58, target: 70 }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Innovatie & 21e-eeuwse Vaardigheden",
    description: "Bereid leerlingen voor op de toekomst met moderne vaardigheden",
    icon: "🚀",
    gradient: "from-pink-500 to-pink-700",
    leerdoelen: [
      "Benoem 12 vaardigheden (SLO-model) en integreer 3 in lesconcept",
      "Beschrijf innovatiecyclus (design thinking) voor schoolontwikkeling"
    ],
    theorie: {
      concepten: [
        {
          naam: "21e-eeuwse Vaardigheden (SLO)",
          uitleg: "12 vaardigheden in 4 categorieën: Denken, Samenwerken, Tools, Leven.",
          voorbeeld: "Project 'Duurzame school': kritisch denken, samenwerken, ICT, initiatief"
        }
      ],
      praktijktips: [
        "Start klein: integreer 1 21e-eeuwse vaardigheid per les"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "21e-eeuwse Vaardigheid Integrator",
        beschrijving: "Ontwerp een les die moderne vaardigheden natuurlijk integreert",
        type: "ontwerp",
        startVraag: "Denk aan een traditionele les. Welke 21e-eeuwse vaardigheden zou je kunnen verweven?",
        context: "Je maakt een bestaande les toekomstbestendig"
      }
    ],
    bronnen: ["SLO 21-eeuwse vaardigheden"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'SkillsRadarChart',
        props: {
          skills: [
            { name: 'Kritisch denken', level: 3, description: 'Informatie analyseren en beoordelen' },
            { name: 'Creativiteit', level: 4, description: 'Originele ideeën ontwikkelen' },
            { name: 'Samenwerking', level: 5, description: 'Effectief in teams werken' },
            { name: 'Communicatie', level: 3, description: 'Duidelijk ideeën overbrengen' },
            { name: 'ICT-geletterdheid', level: 2, description: 'Technologie effectief gebruiken' },
            { name: 'Probleemoplossen', level: 4, description: 'Complexe uitdagingen aanpakken' }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: "Professioneel Leiderschap & Schoolplan",
    description: "Ontwikkel leiderschapsvaardigheden en begrijp schoolorganisatie",
    icon: "👑",
    gradient: "from-teal-500 to-teal-700",
    leerdoelen: [
      "Beschrijf Beroepsstandaard Schoolleider PO en koppel eigen competenties",
      "Analyseer schoolplan en begrijp cyclus van visie naar evaluatie"
    ],
    theorie: {
      concepten: [
        {
          naam: "Beroepsstandaard Schoolleider PO",
          uitleg: "Zes competentiegebieden: visie en strategie, onderwijskundig leiderschap, organisatie.",
          voorbeeld: "Onderwijskundig leiderschap: schoolleider stimuleert teamontwikkeling"
        }
      ],
      praktijktips: [
        "Begin met luisteren voordat je veranderingen voorstelt"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Leiderschapscompetentie Mapper",
        beschrijving: "Analyseer je eigen leiderschapsvaardigheden en ontwikkelpunten",
        type: "reflectie",
        startVraag: "Denk aan een moment waarop je leiding hebt gegeven. Wat ging goed?",
        context: "Je reflecteert op eigen leiderschapsstijl en competenties"
      }
    ],
    bronnen: ["Schoolleidersregister"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'LeadershipDashboard',
        props: {
          metrics: [
            { title: 'Leerlingresultaten', value: '85%', trend: 'up', color: 'bg-green-500' },
            { title: 'Tevredenheid Team', value: '7.8', trend: 'stable', color: 'bg-blue-500' },
            { title: 'Oudertevredenheid', value: '8.2', trend: 'up', color: 'bg-purple-500' },
            { title: 'Financiële Gezondheid', value: '92%', trend: 'down', color: 'bg-orange-500' }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: "Burgerschap & (AI-)Digitale Geletterdheid",
    description: "Bereid kinderen voor op digitale samenleving en actief burgerschap",
    icon: "🤖",
    gradient: "from-cyan-500 to-cyan-700",
    leerdoelen: [
      "Benoem wettelijke burgerschapsdoelen PO en inspectienormen 2025-2026",
      "Integreer mediawijsheid en AI-geletterdheid in les of project"
    ],
    theorie: {
      concepten: [
        {
          naam: "Wet Burgerschapsonderwijs 2024",
          uitleg: "Wettelijke verplichting voor scholen om burgerschap te onderwijzen.",
          voorbeeld: "Kinderen leren over verkiezingen door klassenverkiezingen"
        }
      ],
      praktijktips: [
        "Verbind burgerschap aan actuele gebeurtenissen en kinderervaringen"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Burgerschap Curriculum Designer",
        beschrijving: "Ontwerp een burgerschapscurriculum dat voldoet aan wettelijke eisen",
        type: "ontwerp",
        startVraag: "Hoe zou je kinderen willen voorbereiden op hun rol als burger?",
        context: "Je maakt een concreet burgerschapsplan voor een basisschool"
      }
    ],
    bronnen: ["SLO Burgerschapscurriculum"],
    completed: false,
    hasDocumentUpload: true
  },
  {
    id: 9,
    title: "Schoolleiderschap - Resultaatsturing & Lesobservatie",
    description: "Leer sturen op resultaten en voer effectieve lesobservaties uit",
    icon: "📈",
    gradient: "from-red-500 to-red-700",
    leerdoelen: [
      "Interpreteer Cito-scores en LVS-data voor schoolsturing",
      "Voer effectieve lesobservaties uit met EDI-kijkwijzers",
      "Geef constructieve feedback die ontwikkeling stimuleert"
    ],
    theorie: {
      concepten: [
        {
          naam: "Cito-score Interpretatie",
          uitleg: "Cito-scores geven inzicht in prestaties per niveau (A-E) en referentieniveaus.",
          voorbeeld: "Rekenen Groep 6: 8% niveau A (landelijk 5%) = zorgelijk"
        }
      ],
      praktijktips: [
        "Gebruik data als startpunt voor gesprek, niet als eindoordeel"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Cito Data Analist",
        beschrijving: "Analyseer echte Cito-resultaten en bepaal interventies",
        type: "analyse",
        startVraag: "Je ziet deze Cito-resultaten. Wat valt je op?",
        context: "Je leert data kritisch interpreteren en actieplannen maken"
      }
    ],
    bronnen: ["Cito Terugkoppeling Handleiding"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'EDIObservationCard',
        props: {
          phase: 'Fase 1: Lesdoel & Voorkennis',
          score: 3,
          maxScore: 4,
          criteria: [
            'Lesdoel helder gecommuniceerd',
            'Gekoppeld aan voorkennis',
            'Leerlingen begrijpen wat ze gaan leren',
            'Succes criteria duidelijk'
          ],
          feedback: 'Goed: duidelijk lesdoel. Verbeterpunt: meer tijd voor voorkennis activeren.'
        }
      }
    ]
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'kerndoelen' | 'visueel' | 'chat'>('overzicht')
  const [completedModules, setCompletedModules] = useState<number[]>([])

  const toggleModuleCompletion = (moduleId: number) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getProgressPercentage = () => {
    return Math.round((completedModules.length / modules.length) * 100)
  }

  if (selectedModule) {
    const tabs = [
      { id: 'overzicht', label: '📋 Overzicht', icon: '📋' },
      { id: 'theorie', label: '📚 Theorie', icon: '📚' },
      { id: 'kerndoelen', label: '🎯 Kerndoelen', icon: '🎯' },
      { id: 'chat', label: '🤖 AI Begeleiding', icon: '🤖' }
    ]

    // Add visual tab if module has visual components
    if (selectedModule.visualComponents && selectedModule.visualComponents.length > 0) {
      tabs.splice(3, 0, { id: 'visueel', label: '📊 Visueel Leren', icon: '📊' })
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  ← Terug naar overzicht
                </button>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedModule.gradient} rounded-full flex items-center justify-center text-white text-xl`}>
                    {selectedModule.icon}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Module {selectedModule.id}: {selectedModule.title}
                    </h1>
                    <p className="text-gray-600 mt-1">{selectedModule.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleModuleCompletion(selectedModule.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    completedModules.includes(selectedModule.id)
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-green-50'
                  }`}
                >
                  {completedModules.includes(selectedModule.id) ? '✅ Voltooid' : '⭕ Markeer als voltooid'}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg mb-6">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-shrink-0 px-6 py-4 text-center font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overzicht' && (
                <div className="space-y-6">
                  {/* Leerdoelen */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Leerdoelen</h3>
                    <div className="grid gap-3">
                      {selectedModule.leerdoelen.map((doel, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <p className="text-gray-700">{doel}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactieve Opdrachten Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🛠️ Interactieve Opdrachten</h3>
                    <div className="grid gap-4">
                      {selectedModule.interactieveOpdrachten.map((opdracht, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{opdracht.titel}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              opdracht.type === 'reflectie' ? 'bg-purple-100 text-purple-800' :
                              opdracht.type === 'analyse' ? 'bg-blue-100 text-blue-800' :
                              opdracht.type === 'ontwerp' ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {opdracht.type}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{opdracht.beschrijving}</p>
                          <button
                            onClick={() => setActiveTab('chat')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Start opdracht met AI-begeleiding →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bronnen */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📖 Bronnen</h3>
                    <div className="space-y-2">
                      {selectedModule.bronnen.map((bron, index) => (
                        <div key={index} className="flex items-center space-x-2 text-blue-600">
                          <span>🔗</span>
                          <span>{bron}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'theorie' && (
                <div className="space-y-8">
                  {/* Kernconcepten */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">🧠 Kernconcepten</h3>
                    <div className="space-y-6">
                      {selectedModule.theorie.concepten.map((concept, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                          <h4 className="text-lg font-semibold text-blue-800 mb-3">{concept.naam}</h4>
                          <p className="text-gray-700 mb-4 leading-relaxed">{concept.uitleg}</p>
                          {concept.voorbeeld && (
                            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                              <p className="text-sm font-medium text-blue-700 mb-1">💡 Praktijkvoorbeeld:</p>
                              <p className="text-gray-600 italic">{concept.voorbeeld}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Praktijktips */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Praktijktips</h3>
                    <div className="grid gap-4">
                      {selectedModule.theorie.praktijktips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <p className="text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'kerndoelen' && (
                <div>
                  <KerndoelenViewer />
                </div>
              )}

              {activeTab === 'visueel' && selectedModule.visualComponents && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">📊 Visuele Leercomponenten</h3>
                    <p className="text-purple-100">
                      Leer herkennen en interpreteren van praktische voorbeelden uit het onderwijs
                    </p>
                  </div>
                  
                  {selectedModule.visualComponents.map((component, index) => {
                    const Component = {
                      CitoScoreChart,
                      LVSTrendChart,
                      EDIObservationCard,
                      LearningLineVisual,
                      SELDevelopmentChart,
                      DifferentiationMatrix,
                      SkillsRadarChart,
                      LeadershipDashboard
                    }[component.type]
                    
                    return Component ? (
                      <div key={index}>
                        <Component {...component.props} />
                      </div>
                    ) : null
                  })}
                </div>
              )}

              {activeTab === 'chat' && (
                <div>
                  <SocraticChatBot 
                    module={selectedModule.title}
                    opdrachten={selectedModule.interactieveOpdrachten}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <span className="text-2xl">🎓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PABO Leerapp</h1>
          <p className="text-xl text-blue-700 mb-4">
            Interactieve leermodules voor aanstaande leerkrachten
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Voortgang</span>
              <span>{completedModules.length}/{modules.length} modules</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{getProgressPercentage()}% voltooid</p>
          </div>
        </div>

        {/* Document Management - BOVENAAN */}
        <div className="mb-8">
          <DocumentManager />
        </div>

        {/* Modules Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📚 Leermodules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  completedModules.includes(module.id) ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedModule(module)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${module.gradient} rounded-full flex items-center justify-center text-white text-xl`}>
                        {module.icon}
                      </div>
                      <div className="text-sm text-gray-500">Module {module.id}</div>
                    </div>
                    {completedModules.includes(module.id) && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {module.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">🎯</span>
                      <span>{module.leerdoelen.length} leerdoelen</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">🛠️</span>
                      <span>{module.interactieveOpdrachten.length} interactieve opdrachten</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">🤖</span>
                      <span>AI-begeleiding beschikbaar</span>
                    </div>
                    {module.visualComponents && module.visualComponents.length > 0 && (
                      <div className="flex items-center text-sm text-purple-600">
                        <span className="mr-2">📊</span>
                        <span>Visuele leercomponenten</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors bg-gradient-to-r ${module.gradient} text-white hover:opacity-90`}>
                      Start Module →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🚀 Start je PABO-reis</h3>
            <p className="text-gray-600 mb-4">
              Upload je schooldocumenten, kies een module en begin met leren!
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>💜 Gemaakt voor PABO studenten</span>
              <span>•</span>
              <span>🤖 AI-begeleiding</span>
              <span>•</span>
              <span>📚 Schoolspecifiek leren</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}