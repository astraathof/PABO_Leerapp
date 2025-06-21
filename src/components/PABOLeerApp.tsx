'use client'

import { useState } from 'react'
import SocraticChatBot from './SocraticChatBot'
import DocumentManager from './DocumentManager'
import KerndoelenViewer from './KerndoelenViewer'
import DevelopmentTheoryViewer from './DevelopmentTheoryViewer'
import SELMethodsViewer from './SELMethodsViewer'
import CitoMonitoringViewer from './CitoMonitoringViewer'
import ClickableTheoryViewer from './ClickableTheoryViewer'
import {
  CitoScoreChart,
  LVSTrendChart,
  EDIObservationCard,
  LearningLineVisual,
  SELDevelopmentChart,
  DifferentiationMatrix,
  SkillsRadarChart,
  LeadershipDashboard,
  CurriculumMappingChart,
  DevelopmentProgressionTracker,
  InnovationCycleVisualizer,
  CitizenshipCompetencyMatrix,
  DataAnalysisDashboard
} from './VisualLearningComponents'

interface Module {
  id: number
  title: string
  description: string
  icon: string
  gradient: string
  leerdoelen: string[]
  theorie: {
    concepten: { naam: string; uitleg: string; voorbeeld?: string; clickable?: boolean }[]
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
  specialViewers?: string[]
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
        },
        {
          naam: "Curriculum Mapping",
          uitleg: "Systematische analyse van hoe het curriculum is opgebouwd en waar eventuele hiaten of overlappingen zitten.",
          voorbeeld: "Mapping toont dat rekenen in groep 4 veel aandacht krijgt, maar meetkunde onderbelicht blijft",
          clickable: true
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
    specialViewers: ['kerndoelen', 'klikbare-theorie'],
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
      },
      {
        type: 'CurriculumMappingChart',
        props: {
          subjects: [
            {
              name: 'Rekenen',
              coverage: 85,
              alignment: 92,
              gaps: ['Meetkunde in groep 3-4', 'Statistiek bovenbouw']
            },
            {
              name: 'Taal',
              coverage: 78,
              alignment: 88,
              gaps: ['Schrijfvaardigheid groep 5-6', 'Woordenschat systematiek']
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
      "Leg fasen van cognitieve en sociaal-emotionele ontwikkeling uit volgens Piaget, Vygotsky en Erikson",
      "Ontwerp een les met EDI + scaffolding principes voor groep 1-8",
      "Toon hoe je een veilige leeromgeving creëert per ontwikkelingsfase",
      "Analyseer kindgedrag vanuit ontwikkelingstheorieën en pas interventies toe"
    ],
    theorie: {
      concepten: [
        {
          naam: "Piaget's Ontwikkelingsstadia",
          uitleg: "Kinderen doorlopen vier stadia: sensomotorisch (0-2), preoperationeel (2-7), concreet operationeel (7-11), formeel operationeel (11+). Elk stadium heeft eigen denkkenmerken.",
          voorbeeld: "Groep 3-4 (preoperationeel): kinderen denken nog niet logisch, hebben moeite met behoud (water in hoog/breed glas)",
          clickable: true
        },
        {
          naam: "Vygotsky's Zone van Naaste Ontwikkeling",
          uitleg: "Het verschil tussen wat een kind alleen kan en wat het met hulp kan. Hier vindt optimaal leren plaats.",
          voorbeeld: "Kind kan zelfstandig tot 10 tellen, met hulp tot 20. De ZNO ligt tussen 10-20.",
          clickable: true
        },
        {
          naam: "Scaffolding",
          uitleg: "Tijdelijke ondersteuning die geleidelijk wordt weggenomen naarmate het kind zelfstandiger wordt.",
          voorbeeld: "Rekenen: eerst samen doen → met hulpkaart → zelfstandig → automatiseren",
          clickable: true
        },
        {
          naam: "Erikson's Psychosociale Ontwikkeling",
          uitleg: "Acht levensfasen met elk een crisis die opgelost moet worden voor gezonde ontwikkeling.",
          voorbeeld: "Groep 3-8: Vlijt vs. Minderwaardigheid - kinderen willen competent zijn en prestaties leveren",
          clickable: true
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
      },
      {
        titel: "Scaffolding Architect",
        beschrijving: "Ontwerp een scaffolding-plan voor een complexe vaardigheid",
        type: "ontwerp",
        startVraag: "Kies een vaardigheid die kinderen moeilijk vinden. Hoe zou je deze stap voor stap opbouwen?",
        context: "Je maakt een concreet scaffolding-plan"
      }
    ],
    bronnen: ["G. Marzano, Classroom Management", "Piaget, J. - Cognitive Development"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['ontwikkelingstheorieen', 'klikbare-theorie'],
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
            },
            {
              age: '8-10 jaar (groep 5-6)',
              stage: 'Competentie ontwikkeling',
              characteristics: [
                'Prestaties belangrijk',
                'Vergelijken met anderen',
                'Zelfbeeld vormen'
              ],
              interventions: [
                'Succeservaringen creëren',
                'Groepswerk stimuleren',
                'Individuele doelen stellen'
              ]
            },
            {
              age: '10-12 jaar (groep 7-8)',
              stage: 'Identiteit en autonomie',
              characteristics: [
                'Meer zelfstandigheid',
                'Vriendschappen centraal',
                'Toekomstgericht denken'
              ],
              interventions: [
                'Keuzemogelijkheden bieden',
                'Verantwoordelijkheid geven',
                'Toekomstplannen bespreken'
              ]
            }
          ]
        }
      },
      {
        type: 'DevelopmentProgressionTracker',
        props: {
          domains: [
            {
              name: 'Cognitieve Ontwikkeling',
              stages: [
                {
                  age: '4-6 jaar',
                  milestones: ['Symbolisch denken', 'Eenvoudige regels', 'Concrete begrippen'],
                  redFlags: ['Geen symbolisch spel', 'Extreme egocentrisme', 'Geen regelbegrip'],
                  support: ['Veel voorlezen', 'Symbolisch spel stimuleren', 'Concrete ervaringen']
                },
                {
                  age: '6-8 jaar',
                  milestones: ['Logisch denken', 'Behoud begrip', 'Classificeren'],
                  redFlags: ['Geen behoud begrip', 'Extreme impulsiviteit', 'Geen logische verbanden'],
                  support: ['Concrete materialen', 'Stap-voor-stap uitleg', 'Veel herhaling']
                }
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
      "Onderscheid drie SEL-methodieken (Kanjertraining, Lions Quest, Rots & Water) en benoem kernprincipes",
      "Kies en motiveer SEL-programma passend bij schoolcontext en leerlingpopulatie", 
      "Formuleer meetbare doelen rond welbevinden en sociale veiligheid per groep",
      "Ontwerp interventies voor klassenklimaat gebaseerd op SEL-competenties"
    ],
    theorie: {
      concepten: [
        {
          naam: "SEL (Social Emotional Learning)",
          uitleg: "Vijf kerncompetenties: zelfbewustzijn, zelfregulatie, sociale bewustzijn, relatievaardigheden, verantwoordelijke besluitvorming.",
          voorbeeld: "Zelfregulatie: kind leert ademhalingsoefening bij boosheid in plaats van slaan",
          clickable: true
        },
        {
          naam: "Klassenklimaat",
          uitleg: "De sociale en emotionele sfeer in de klas die leren en welzijn beïnvloedt.",
          voorbeeld: "Positief klimaat: kinderen durven fouten te maken en vragen te stellen",
          clickable: true
        },
        {
          naam: "Sociale Veiligheid",
          uitleg: "De mate waarin leerlingen zich veilig voelen om zichzelf te zijn zonder angst voor pesten of uitsluiting.",
          voorbeeld: "Veilige klas: alle kinderen doen mee, niemand wordt gepest of buitengesloten",
          clickable: true
        },
        {
          naam: "Weerbaarheid",
          uitleg: "Het vermogen om voor jezelf op te komen en grenzen te stellen op een respectvolle manier.",
          voorbeeld: "Kind zegt 'nee' tegen ongewenst gedrag en zoekt hulp bij volwassenen",
          clickable: true
        }
      ],
      praktijktips: [
        "Start elke dag met een positieve begroeting van elk kind",
        "Gebruik 'time-in' in plaats van 'time-out' voor verbinding",
        "Implementeer dagelijkse kringgesprekken voor sociale vaardigheden",
        "Train kinderen in conflictoplossing met concrete stappenplannen"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "SEL-Methode Verkenner",
        beschrijving: "Vergelijk verschillende SEL-methodieken en kies de beste voor jouw context",
        type: "analyse",
        startVraag: "Denk aan een klas die je kent. Welke sociale uitdagingen zie je daar?",
        context: "Je verkent welke SEL-aanpak past bij specifieke klassenbehoeften"
      },
      {
        titel: "Klassenklimaat Designer",
        beschrijving: "Ontwerp een plan om het klassenklimaat te verbeteren",
        type: "ontwerp",
        startVraag: "Beschrijf je ideale klassenklimaat. Hoe ziet dat eruit en hoe voelt het?",
        context: "Je maakt een concreet plan voor klimaatverbetering"
      }
    ],
    bronnen: ["Kanjertraining.nl", "Lions Quest Nederland", "Rots en Water"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['sel-methodieken', 'klikbare-theorie'],
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
    id: 4,
    title: "Didactisch Ontwerp & Differentiatie",
    description: "Ontwerp lessen die aansluiten bij alle leerlingen door slimme differentiatie",
    icon: "🎯",
    gradient: "from-orange-500 to-orange-700",
    leerdoelen: [
      "Pas convergente én divergente differentiatie toe in lesontwerp voor groep 1-8",
      "Gebruik taxonomie van Bloom voor leerdoelen op verschillende niveaus",
      "Ontwerp formatieve checkpoints per lesfase (EDI-model)",
      "Creëer must-should-could opdrachten voor heterogene groepen"
    ],
    theorie: {
      concepten: [
        {
          naam: "Convergente Differentiatie",
          uitleg: "Alle leerlingen werken naar hetzelfde doel, maar via verschillende wegen of met verschillende ondersteuning.",
          voorbeeld: "Iedereen leert breuken: groep A met materiaal, groep B met plaatjes, groep C abstract",
          clickable: true
        },
        {
          naam: "Divergente Differentiatie",
          uitleg: "Leerlingen werken aan verschillende doelen op basis van hun niveau en interesse.",
          voorbeeld: "Groep A: basis breuken, Groep B: breuken vergelijken, Groep C: breuken bewerkingen",
          clickable: true
        },
        {
          naam: "Scaffolding Strategieën",
          uitleg: "Verschillende vormen van ondersteuning die geleidelijk weggenomen worden.",
          voorbeeld: "Visuele hulp → verbale aanwijzing → zelfstandig werken",
          clickable: true
        },
        {
          naam: "Bloom's Taxonomie",
          uitleg: "Zes niveaus van denken: onthouden, begrijpen, toepassen, analyseren, evalueren, creëren.",
          voorbeeld: "Rekenen: onthouden (tafels) → begrijpen (concept) → toepassen (woordsommen)",
          clickable: true
        }
      ],
      praktijktips: [
        "Start met kerngroep (60%), dan uitbreiding naar zwakke en sterke leerlingen",
        "Gebruik must-should-could structuur voor alle opdrachten",
        "Creëer leercentra met verschillende niveaus en werkvormen",
        "Plan dagelijks 10 minuten voor individuele begeleiding"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Differentiatie Designer",
        beschrijving: "Ontwerp een les met meerdere niveaus voor verschillende leerlingen",
        type: "ontwerp",
        startVraag: "Kies een onderwerp dat je wilt gaan onderwijzen. Welke verschillen verwacht je?",
        context: "Je ontwerpt een gedifferentieerde les stap voor stap"
      },
      {
        titel: "Must-Should-Could Creator",
        beschrijving: "Maak een complete opdrachtenset voor heterogene groep",
        type: "toepassing",
        startVraag: "Denk aan je moeilijkste groep. Hoe zorg je dat iedereen succesvol kan werken?",
        context: "Je ontwikkelt concrete gedifferentieerde opdrachten"
      }
    ],
    bronnen: ["SLO Differentiatiegids", "Tomlinson - Differentiating Instruction"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['klikbare-theorie'],
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
            },
            {
              level: 'Groep 7 Wereldoriëntatie',
              must: 'Europese landen benoemen',
              should: 'Hoofdsteden en kenmerken',
              could: 'EU-samenwerking en geschiedenis'
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
      "Interpreteer LVS-data op leerling-, groeps- en schoolniveau voor interventies",
      "Hanteer PDCA-cyclus binnen kwaliteitszorg en schoolontwikkeling",
      "Koppel data aan concrete interventies en SMART-doelen per kwartaal",
      "Analyseer Cito-trends en stel verbeterplannen op met team"
    ],
    theorie: {
      concepten: [
        {
          naam: "LVS (Leerling Volg Systeem)",
          uitleg: "Systematisch verzamelen en analyseren van leerlinggegevens om ontwikkeling te volgen en onderwijs aan te passen.",
          voorbeeld: "Cito-toetsen 3x per jaar: september (start), januari (midden), juni (eind) voor trendanalyse",
          clickable: true
        },
        {
          naam: "PDCA-cyclus",
          uitleg: "Plan-Do-Check-Act cyclus voor continue verbetering van onderwijsprocessen.",
          voorbeeld: "Plan: leesdoelen stellen → Do: interventie uitvoeren → Check: resultaten meten → Act: bijstellen",
          clickable: true
        },
        {
          naam: "Data-gedreven Besluitvorming",
          uitleg: "Het gebruik van objectieve data voor het nemen van onderbouwde beslissingen over onderwijs.",
          voorbeeld: "Cito-resultaten tonen leesachterstand groep 4 → extra leesondersteuning inzetten",
          clickable: true
        },
        {
          naam: "Benchmarking",
          uitleg: "Vergelijken van eigen resultaten met andere scholen of landelijke gemiddelden.",
          voorbeeld: "School scoort 15% onder landelijk gemiddeld rekenen → analyse en actieplan",
          clickable: true
        }
      ],
      praktijktips: [
        "Bekijk data altijd in context: wat speelde er in de klas/school?",
        "Gebruik visualisaties om trends duidelijk te maken voor team",
        "Koppel elke data-analyse aan concrete vervolgacties",
        "Plan maandelijks teamoverleg met data-bespreking"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Data Detective",
        beschrijving: "Analyseer LVS-data en ontdek wat de cijfers echt vertellen",
        type: "analyse",
        startVraag: "Je ziet dat de rekenprestaties in groep 4 zijn gedaald. Wat zou je willen weten?",
        context: "Je leert data kritisch interpreteren en vragen stellen"
      },
      {
        titel: "PDCA Planner",
        beschrijving: "Ontwerp een complete PDCA-cyclus voor schoolverbetering",
        type: "ontwerp",
        startVraag: "Welk probleem in je school zou je graag systematisch willen aanpakken?",
        context: "Je maakt een concreet verbeterplan met PDCA-cyclus"
      }
    ],
    bronnen: ["PO-Raad 'Werken met Data' toolkit", "Schildkamp - Data-based Decision Making"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['klikbare-theorie'],
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
      },
      {
        type: 'DataAnalysisDashboard',
        props: {
          datasets: [
            {
              name: 'Cito Rekenen Trends',
              type: 'trend',
              data: { sept: 65, jan: 68, juni: 72 },
              insights: [
                'Positieve trend gedurende schooljaar',
                'Interventies in januari hebben effect gehad',
                'Doel van 75% bijna behaald'
              ]
            },
            {
              name: 'Groepsvergelijking Taal',
              type: 'comparison',
              data: { groep4: 78, groep5: 82, groep6: 75 },
              insights: [
                'Groep 6 valt terug ten opzichte van groep 5',
                'Mogelijk effect van nieuwe leerkracht',
                'Extra aandacht voor groep 6 nodig'
              ]
            }
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
      "Benoem 12 vaardigheden (SLO-model) en integreer 3 in concreet lesconcept",
      "Beschrijf innovatiecyclus (design thinking) voor schoolontwikkeling",
      "Ontwerp project waarin 21e-eeuwse vaardigheden natuurlijk geïntegreerd zijn",
      "Evalueer en meet 21e-eeuwse vaardigheden met rubrics en portfolio's"
    ],
    theorie: {
      concepten: [
        {
          naam: "21e-eeuwse Vaardigheden (SLO)",
          uitleg: "12 vaardigheden in 4 categorieën: Denken (kritisch, creatief, probleemoplossend), Samenwerken, Tools (ICT, media), Leven (flexibiliteit, initiatief, sociale vaardigheden).",
          voorbeeld: "Project 'Duurzame school': kritisch denken, samenwerken, ICT, initiatief",
          clickable: true
        },
        {
          naam: "Design Thinking",
          uitleg: "Vijf-fasen proces voor innovatie: empathize, define, ideate, prototype, test.",
          voorbeeld: "Schoolplein verbeteren: interviews → probleem definiëren → ideeën → prototype → testen",
          clickable: true
        },
        {
          naam: "Computational Thinking",
          uitleg: "Denkvaardigheden voor probleemoplossing: decompositie, patroonherkenning, abstractie, algoritmes.",
          voorbeeld: "Opruimen klas: opdelen in stappen, patroon herkennen, algemene regel maken",
          clickable: true
        },
        {
          naam: "Mediawijsheid",
          uitleg: "Kritisch omgaan met media en informatie: zoeken, beoordelen, gebruiken, creëren.",
          voorbeeld: "Nieuwsartikel checken: bron controleren, feiten verifiëren, bias herkennen",
          clickable: true
        }
      ],
      praktijktips: [
        "Start klein: integreer 1 21e-eeuwse vaardigheid per les",
        "Gebruik authentieke, betekenisvolle projecten",
        "Laat kinderen reflecteren op hun eigen leerproces",
        "Creëer keuzemogelijkheden in werkvormen en onderwerpen"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "21e-eeuwse Vaardigheid Integrator",
        beschrijving: "Ontwerp een les die moderne vaardigheden natuurlijk integreert",
        type: "ontwerp",
        startVraag: "Denk aan een traditionele les. Welke 21e-eeuwse vaardigheden zou je kunnen verweven?",
        context: "Je maakt een bestaande les toekomstbestendig"
      },
      {
        titel: "Design Thinking Project",
        beschrijving: "Gebruik design thinking om een schoolprobleem op te lossen",
        type: "toepassing",
        startVraag: "Welk probleem in je school zou je graag willen oplossen met leerlingen?",
        context: "Je doorloopt alle fasen van design thinking"
      }
    ],
    bronnen: ["SLO 21-eeuwse vaardigheden", "Design Thinking for Educators"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['klikbare-theorie'],
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
      },
      {
        type: 'InnovationCycleVisualizer',
        props: {
          phases: [
            {
              name: 'Empathize',
              description: 'Begrijp de gebruiker en hun behoeften',
              activities: ['Interviews houden', 'Observeren', 'Empathy maps maken'],
              tools: ['Vragenlijsten', 'Observatieformulieren', 'Video-opnames']
            },
            {
              name: 'Define',
              description: 'Definieer het probleem helder',
              activities: ['Probleem formuleren', 'Point of view bepalen', 'How might we vragen'],
              tools: ['Problem statements', 'Persona\'s', 'Journey maps']
            },
            {
              name: 'Ideate',
              description: 'Genereer veel creatieve ideeën',
              activities: ['Brainstormen', 'Schetsen', 'Ideeën combineren'],
              tools: ['Post-its', 'Mindmaps', 'Crazy 8s']
            },
            {
              name: 'Prototype',
              description: 'Maak snelle, testbare versies',
              activities: ['Bouwen', 'Schetsen', 'Rollenspel'],
              tools: ['Karton', 'LEGO', 'Digitale tools']
            },
            {
              name: 'Test',
              description: 'Test met echte gebruikers',
              activities: ['Feedback verzamelen', 'Observeren', 'Itereren'],
              tools: ['Testprotocollen', 'Feedback formulieren', 'Video-analyse']
            }
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
      "Analyseer schoolplan en begrijp cyclus van visie naar evaluatie",
      "Ontwerp verbeterplan gebaseerd op schooldata en teamfeedback",
      "Demonstreer verschillende leiderschapsstijlen in praktijksituaties"
    ],
    theorie: {
      concepten: [
        {
          naam: "Beroepsstandaard Schoolleider PO",
          uitleg: "Zes competentiegebieden: visie en strategie, onderwijskundig leiderschap, organisatie en personeel, financieel management, externe oriëntatie, verantwoording.",
          voorbeeld: "Onderwijskundig leiderschap: schoolleider stimuleert teamontwikkeling en monitort onderwijskwaliteit",
          clickable: true
        },
        {
          naam: "Transformationeel Leiderschap",
          uitleg: "Leiderschapsstijl gericht op inspireren, motiveren en ontwikkelen van medewerkers.",
          voorbeeld: "Schoolleider inspireert team met gezamenlijke visie en ondersteunt individuele groei",
          clickable: true
        },
        {
          naam: "Distributed Leadership",
          uitleg: "Leiderschap verspreid over meerdere personen in de organisatie.",
          voorbeeld: "Vakcoördinatoren, bouwcoördinatoren en IB-er delen leiderschapstaken",
          clickable: true
        },
        {
          naam: "Schoolcultuur",
          uitleg: "De gedeelde waarden, normen en gewoonten binnen een school.",
          voorbeeld: "Cultuur van leren: fouten maken mag, feedback wordt gewaardeerd, iedereen groeit",
          clickable: true
        }
      ],
      praktijktips: [
        "Begin met luisteren voordat je veranderingen voorstelt",
        "Geef medewerkers eigenaarschap over hun ontwikkeling",
        "Creëer psychologische veiligheid voor open communicatie",
        "Gebruik data om beslissingen te onderbouwen"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Leiderschapscompetentie Mapper",
        beschrijving: "Analyseer je eigen leiderschapsvaardigheden en ontwikkelpunten",
        type: "reflectie",
        startVraag: "Denk aan een moment waarop je leiding hebt gegeven. Wat ging goed?",
        context: "Je reflecteert op eigen leiderschapsstijl en competenties"
      },
      {
        titel: "Schoolplan Analist",
        beschrijving: "Analyseer een schoolplan en identificeer verbeterpunten",
        type: "analyse",
        startVraag: "Bekijk een schoolplan. Wat valt je op aan de doelen en aanpak?",
        context: "Je leert schoolplannen kritisch te beoordelen"
      }
    ],
    bronnen: ["Schoolleidersregister", "Beroepsstandaard Schoolleider PO"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['klikbare-theorie'],
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
      "Integreer mediawijsheid en AI-geletterdheid in les of project voor groep 5-8",
      "Ontwerp democratische activiteiten die burgerschap concreet maken",
      "Evalueer burgerschapscompetenties met portfolio en observatie"
    ],
    theorie: {
      concepten: [
        {
          naam: "Wet Burgerschapsonderwijs 2024",
          uitleg: "Wettelijke verplichting voor scholen om burgerschap te onderwijzen met focus op democratie, rechtsstaat en grondrechten.",
          voorbeeld: "Kinderen leren over verkiezingen door klassenverkiezingen en gemeenteraadsbezoek",
          clickable: true
        },
        {
          naam: "AI-geletterdheid voor Kinderen",
          uitleg: "Basiskennis over kunstmatige intelligentie: wat is AI, hoe werkt het, wat zijn kansen en risico's.",
          voorbeeld: "Kinderen ontdekken AI in hun leven: Siri, spelletjes, aanbevelingen YouTube",
          clickable: true
        },
        {
          naam: "Digitaal Burgerschap",
          uitleg: "Verantwoordelijk gedrag in digitale omgevingen: privacy, veiligheid, respect, kritisch denken.",
          voorbeeld: "Kinderen leren hoe ze veilig online communiceren en nepnieuws herkennen",
          clickable: true
        },
        {
          naam: "Democratische Competenties",
          uitleg: "Vaardigheden voor participatie in democratie: luisteren, discussiëren, compromissen sluiten, stemmen.",
          voorbeeld: "Klassenraad waarin kinderen democratisch beslissingen nemen over klassenregels",
          clickable: true
        }
      ],
      praktijktips: [
        "Verbind burgerschap aan actuele gebeurtenissen en kinderervaringen",
        "Gebruik concrete voorbeelden uit de lokale gemeenschap",
        "Laat kinderen zelf democratische processen ervaren",
        "Integreer AI-voorbeelden die kinderen kennen uit hun dagelijks leven"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Burgerschap Curriculum Designer",
        beschrijving: "Ontwerp een burgerschapscurriculum dat voldoet aan wettelijke eisen",
        type: "ontwerp",
        startVraag: "Hoe zou je kinderen willen voorbereiden op hun rol als burger?",
        context: "Je maakt een concreet burgerschapsplan voor een basisschool"
      },
      {
        titel: "AI voor Kids Ontwerper",
        beschrijving: "Ontwikkel lessen over AI die begrijpelijk zijn voor kinderen",
        type: "ontwerp",
        startVraag: "Hoe leg je aan een 10-jarige uit wat kunstmatige intelligentie is?",
        context: "Je maakt AI-onderwijs toegankelijk voor basisschoolkinderen"
      }
    ],
    bronnen: ["SLO Burgerschapscurriculum", "AI voor Nederland - Onderwijs"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['klikbare-theorie'],
    visualComponents: [
      {
        type: 'CitizenshipCompetencyMatrix',
        props: {
          competencies: [
            {
              domain: 'Democratie & Rechtsstaat',
              skills: [
                { name: 'Democratische besluitvorming', level: 3, examples: ['Klassenraad', 'Stemmen', 'Discussiëren'] },
                { name: 'Rechten en plichten', level: 2, examples: ['Kinderrechten', 'Schoolregels', 'Wetten'] },
                { name: 'Rechtsstaat begrijpen', level: 2, examples: ['Rechter', 'Politie', 'Eerlijk proces'] }
              ]
            },
            {
              domain: 'Digitaal Burgerschap',
              skills: [
                { name: 'Online veiligheid', level: 4, examples: ['Privacy instellingen', 'Veilig wachtwoord', 'Cyberpesten'] },
                { name: 'Mediawijsheid', level: 3, examples: ['Nepnieuws herkennen', 'Bronnen checken', 'Reclame herkennen'] },
                { name: 'AI-bewustzijn', level: 2, examples: ['AI herkennen', 'Algoritmes begrijpen', 'Ethische vragen'] }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    title: "Schoolleiderschap - Resultaatsturing & Lesobservatie",
    description: "Leer sturen op resultaten en voer effectieve lesobservaties uit",
    icon: "📈",
    gradient: "from-red-500 to-red-700",
    leerdoelen: [
      "Interpreteer Cito-scores (A-E én I-V) en LVS-data voor schoolsturing en interventies",
      "Voer effectieve lesobservaties uit met EDI-kijkwijzers en geef constructieve feedback",
      "Organiseer data-overleg met coördinatoren (taal, rekenen, bouw, IB, kwaliteit)",
      "Ontwerp monitoring-cyclus van groep 1-2 (Mijn Kleutergroep) tot B8/doorstroomtoets"
    ],
    theorie: {
      concepten: [
        {
          naam: "Cito A-E en I-V Niveaus",
          uitleg: "Beide systemen zijn identiek: A=I (zwakst) tot E=V (sterkst). Geeft prestaties weer ten opzichte van landelijke norm.",
          voorbeeld: "Niveau C/III = gemiddeld (45% leerlingen), niveau A/I = zeer zwak (5% leerlingen)",
          clickable: true
        },
        {
          naam: "B8 Toets en Doorstroomtoets",
          uitleg: "B8 toets in april bepaalt VO-advies. Doorstroomtoets in mei/juni kan advies bevestigen of bijstellen.",
          voorbeeld: "B8 toets wijst op HAVO, doorstroomtoets bevestigt dit → definitief HAVO-advies",
          clickable: true
        },
        {
          naam: "Monitoring Doorlopende Lijn",
          uitleg: "Systematische monitoring van groep 1 (Mijn Kleutergroep) tot groep 8 (B8 toets) voor continue ontwikkeling.",
          voorbeeld: "Groep 1-2: ontwikkelingsrapport → Groep 3-8: Cito-data → VO: terugkoppeling resultaten",
          clickable: true
        },
        {
          naam: "Coördinatorrollen Data",
          uitleg: "Elke coördinator heeft specifieke taken rond data-analyse en interventies binnen hun domein.",
          voorbeeld: "Rekencoördinator analyseert Cito Rekenen, stelt interventies voor, werkt samen met IB-er",
          clickable: true
        }
      ],
      praktijktips: [
        "Gebruik data als startpunt voor gesprek, niet als eindoordeel",
        "Organiseer maandelijks data-overleg met alle coördinatoren",
        "Koppel elke data-analyse aan concrete vervolgacties",
        "Zorg voor goede overdracht tussen groepen met ontwikkelingsrapporten"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Cito Data Analist",
        beschrijving: "Analyseer echte Cito-resultaten en bepaal interventies",
        type: "analyse",
        startVraag: "Je ziet deze Cito-resultaten. Wat valt je op en welke vragen roept dit op?",
        context: "Je leert data kritisch interpreteren en actieplannen maken"
      },
      {
        titel: "Coördinator Overleg Organisator",
        beschrijving: "Plan een effectief data-overleg met alle coördinatoren",
        type: "toepassing",
        startVraag: "Hoe organiseer je een productief overleg waarin alle coördinatoren hun data delen?",
        context: "Je ontwerpt een effectieve overlegstructuur"
      },
      {
        titel: "Monitoring Cyclus Designer",
        beschrijving: "Ontwerp een complete monitoring-cyclus van groep 1-8",
        type: "ontwerp",
        startVraag: "Hoe zorg je voor een doorlopende lijn in monitoring van kleuteronderwijs tot VO?",
        context: "Je maakt een systematisch monitoringplan"
      }
    ],
    bronnen: ["Cito Terugkoppeling Handleiding", "PO-Raad Data-analyse", "Inspectie Toezichtkader"],
    completed: false,
    hasDocumentUpload: true,
    specialViewers: ['cito-monitoring', 'klikbare-theorie'],
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
      },
      {
        type: 'CitoScoreChart',
        props: {
          title: 'Schoolbrede Cito Analyse - Rekenen Groep 6',
          data: [
            { level: 'A/I', percentage: 12, national: 5, color: 'bg-red-500' },
            { level: 'B/II', percentage: 28, national: 20, color: 'bg-orange-500' },
            { level: 'C/III', percentage: 35, national: 45, color: 'bg-yellow-500' },
            { level: 'D/IV', percentage: 20, national: 25, color: 'bg-green-500' },
            { level: 'E/V', percentage: 5, national: 5, color: 'bg-blue-500' }
          ],
          explanation: 'Zorgelijk: 40% onder niveau C (landelijk 25%). Actie: intensief rekenplan met rekencoördinator en IB-er.'
        }
      },
      {
        type: 'LeadershipDashboard',
        props: {
          metrics: [
            { title: 'Cito Gemiddelde', value: '78%', trend: 'up', color: 'bg-green-500' },
            { title: 'VO-advies Accuraat', value: '92%', trend: 'stable', color: 'bg-blue-500' },
            { title: 'Team Data-vaardig', value: '85%', trend: 'up', color: 'bg-purple-500' },
            { title: 'Interventie Effectief', value: '76%', trend: 'up', color: 'bg-orange-500' }
          ]
        }
      }
    ]
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'kerndoelen' | 'ontwikkelingstheorieen' | 'sel-methodieken' | 'cito-monitoring' | 'klikbare-theorie' | 'visueel' | 'chat'>('overzicht')
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
      { id: 'theorie', label: '📚 Theorie', icon: '📚' }
    ]

    // Add special viewers based on module
    if (selectedModule.specialViewers?.includes('kerndoelen')) {
      tabs.push({ id: 'kerndoelen', label: '🎯 Kerndoelen', icon: '🎯' })
    }
    if (selectedModule.specialViewers?.includes('ontwikkelingstheorieen')) {
      tabs.push({ id: 'ontwikkelingstheorieen', label: '🧠 Ontwikkelingstheorieën', icon: '🧠' })
    }
    if (selectedModule.specialViewers?.includes('sel-methodieken')) {
      tabs.push({ id: 'sel-methodieken', label: '🤝 SEL-Methodieken', icon: '🤝' })
    }
    if (selectedModule.specialViewers?.includes('cito-monitoring')) {
      tabs.push({ id: 'cito-monitoring', label: '📊 Cito & Monitoring', icon: '📊' })
    }
    if (selectedModule.specialViewers?.includes('klikbare-theorie')) {
      tabs.push({ id: 'klikbare-theorie', label: '🔗 Klikbare Theorie', icon: '🔗' })
    }

    // Add visual tab if module has visual components
    if (selectedModule.visualComponents && selectedModule.visualComponents.length > 0) {
      tabs.push({ id: 'visueel', label: '📊 Visueel Leren', icon: '📊' })
    }

    tabs.push({ id: 'chat', label: '🤖 AI Begeleiding', icon: '🤖' })

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
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-semibold text-blue-800">{concept.naam}</h4>
                            {concept.clickable && (
                              <button
                                onClick={() => setActiveTab('klikbare-theorie')}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                              >
                                🔗 Verdiep
                              </button>
                            )}
                          </div>
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

              {activeTab === 'ontwikkelingstheorieen' && (
                <div>
                  <DevelopmentTheoryViewer />
                </div>
              )}

              {activeTab === 'sel-methodieken' && (
                <div>
                  <SELMethodsViewer />
                </div>
              )}

              {activeTab === 'cito-monitoring' && (
                <div>
                  <CitoMonitoringViewer />
                </div>
              )}

              {activeTab === 'klikbare-theorie' && (
                <div>
                  <ClickableTheoryViewer />
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
                      LeadershipDashboard,
                      CurriculumMappingChart,
                      DevelopmentProgressionTracker,
                      InnovationCycleVisualizer,
                      CitizenshipCompetencyMatrix,
                      DataAnalysisDashboard
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

        {/* Document Management */}
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
                    {module.specialViewers && module.specialViewers.length > 0 && (
                      <div className="flex items-center text-sm text-teal-600">
                        <span className="mr-2">🔗</span>
                        <span>Speciale viewers beschikbaar</span>
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