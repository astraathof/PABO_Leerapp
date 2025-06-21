'use client'

import { useState } from 'react'
import SocraticChatBot from './SocraticChatBot'
import DocumentManager from './DocumentManager'
import KerndoelenViewer from './KerndoelenViewer'
import DevelopmentTheoryViewer from './DevelopmentTheoryViewer'
import SELMethodsViewer from './SELMethodsViewer'
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
  theorieViewer?: string
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
          naam: "Jaarplanning",
          uitleg: "Systematische verdeling van leerstof over het schooljaar in 8 blokken van 4-5 weken, met ruimte voor herhaling en toetsing.",
          voorbeeld: "Blok 1 (aug-sep): Herhaling vorig jaar. Blok 2 (sep-okt): Nieuwe leerstof deel 1. Etc."
        }
      ],
      praktijktips: [
        "Gebruik de SLO Leerlijnenviewer voor concrete uitwerking per groep",
        "Koppel kerndoelen aan je methode door doelenbomen te maken",
        "Plan 8 blokken per jaar met 4-5 weken per blok voor overzicht",
        "Reserveer tijd voor herhaling en verdieping tussen blokken",
        "Maak verbindingen tussen vakgebieden zichtbaar"
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
    bronnen: ["https://tule.slo.nl", "https://curriculum.nu", "Kerndoelendocument 2006"],
    completed: false,
    hasDocumentUpload: true,
    theorieViewer: "kerndoelen",
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
              name: 'Nederlandse Taal',
              coverage: 85,
              alignment: 92,
              gaps: ['Meer aandacht voor digitale geletterdheid', 'Schrijfvaardigheid groep 3-4']
            },
            {
              name: 'Rekenen & Wiskunde',
              coverage: 78,
              alignment: 88,
              gaps: ['Wiskundig redeneren onderbouwd', 'Meer tijd voor automatiseren']
            },
            {
              name: 'Oriëntatie op jezelf en de wereld',
              coverage: 65,
              alignment: 75,
              gaps: ['ICT-vaardigheden systematischer', 'Meer projectmatig werken']
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
      "Toon hoe je een veilige leeromgeving creëert",
      "Pas ontwikkelingstheorieën toe in concrete klassensituaties"
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
        },
        {
          naam: "Erikson's Psychosociale Ontwikkeling",
          uitleg: "Elke levensfase heeft een ontwikkelingstaak. Voor basisschoolkinderen: initiatief vs. schuld (3-6 jaar) en vlijt vs. minderwaardigheid (6-12 jaar).",
          voorbeeld: "Groep 3: kinderen willen zelf dingen proberen. Groep 6: vergelijken zich met klasgenoten."
        }
      ],
      praktijktips: [
        "Observeer kinderen tijdens spel om ontwikkelingsniveau in te schatten",
        "Gebruik concrete materialen voor abstracte begrippen (groep 3-6)",
        "Geef kinderen tijd om te denken voordat je antwoord verwacht",
        "Varieer in ondersteuning: visueel, auditief, tactiel",
        "Vier kleine successen om zelfvertrouwen op te bouwen"
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
        titel: "Scaffolding Designer",
        beschrijving: "Ontwerp een scaffolding-strategie voor een moeilijke leertaak",
        type: "ontwerp",
        startVraag: "Denk aan iets dat kinderen in jouw groep moeilijk vinden. Hoe zou je ze stap voor stap kunnen helpen?",
        context: "Je maakt een concrete scaffolding-plan"
      }
    ],
    bronnen: ["G. Marzano, Classroom Management", "Piaget & Vygotsky, Ontwikkelingspsychologie"],
    completed: false,
    hasDocumentUpload: true,
    theorieViewer: "ontwikkeling",
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
                'Spelen met anderen',
                'Regels begrijpen'
              ],
              interventions: [
                'Gevoelensthermometer gebruiken',
                'Ademhalingsoefeningen',
                'Duidelijke structuur bieden',
                'Positieve bekrachtiging'
              ]
            },
            {
              age: '6-8 jaar (groep 3-4)',
              stage: 'Sociale vaardigheden',
              characteristics: [
                'Vriendschappen vormen',
                'Regels begrijpen en volgen',
                'Empathie ontwikkelen',
                'Conflicten herkennen'
              ],
              interventions: [
                'Rollenspellen doen',
                'Conflictoplossing oefenen',
                'Complimenten geven',
                'Klassenregels samen maken'
              ]
            },
            {
              age: '8-10 jaar (groep 5-6)',
              stage: 'Competentie ontwikkeling',
              characteristics: [
                'Prestaties vergelijken',
                'Zelfbeeld vormen',
                'Groepsdruk ervaren',
                'Verantwoordelijkheid nemen'
              ],
              interventions: [
                'Sterke punten benadrukken',
                'Realistische doelen stellen',
                'Peer feedback organiseren',
                'Zelfstandigheid stimuleren'
              ]
            },
            {
              age: '10-12 jaar (groep 7-8)',
              stage: 'Identiteit en autonomie',
              characteristics: [
                'Eigen mening vormen',
                'Kritisch denken',
                'Toekomstgericht denken',
                'Morele ontwikkeling'
              ],
              interventions: [
                'Discussies faciliteren',
                'Keuzemogelijkheden bieden',
                'Reflectie stimuleren',
                'Leiderschapsrollen geven'
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
                  age: 'Groep 1-2',
                  milestones: ['Symbolisch spel', 'Taal explosie', 'Eerste logica'],
                  redFlags: ['Geen symbolisch spel', 'Beperkte woordenschat', 'Geen interesse in verhalen'],
                  support: ['Veel voorlezen', 'Fantasiespel stimuleren', 'Concrete ervaringen']
                },
                {
                  age: 'Groep 3-4',
                  milestones: ['Lezen en schrijven', 'Rekenen tot 100', 'Logisch denken'],
                  redFlags: ['Geen letter-klank koppeling', 'Geen getalbegrip', 'Zeer korte aandachtsspanne'],
                  support: ['Multisensorisch leren', 'Kleine stapjes', 'Veel herhaling']
                }
              ]
            },
            {
              name: 'Sociaal-Emotioneel',
              stages: [
                {
                  age: 'Groep 1-2',
                  milestones: ['Parallel spel', 'Emoties benoemen', 'Eenvoudige regels'],
                  redFlags: ['Geen contact met anderen', 'Extreme emoties', 'Geen regels volgen'],
                  support: ['Gestructureerde speeltijd', 'Emotiecoaching', 'Duidelijke grenzen']
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
      "Onderscheid drie SEL-methodieken en benoem kernprincipes",
      "Kies en motiveer SEL-programma passend bij schoolcontext", 
      "Formuleer meetbare doelen rond welbevinden en veiligheid",
      "Implementeer SEL-activiteiten in dagelijkse lespraktijk"
    ],
    theorie: {
      concepten: [
        {
          naam: "SEL (Social Emotional Learning)",
          uitleg: "Vijf kerncompetenties: zelfbewustzijn, zelfregulatie, sociale bewustzijn, relatievaardigheden, verantwoordelijke besluitvorming.",
          voorbeeld: "Zelfregulatie: kind leert ademhalingsoefening bij boosheid in plaats van slaan"
        },
        {
          naam: "Klassenklimaat",
          uitleg: "De sociale en emotionele sfeer in de klas die leren en welzijn beïnvloedt. Bestaat uit veiligheid, verbondenheid en uitdaging.",
          voorbeeld: "Positief klimaat: kinderen durven fouten te maken, helpen elkaar en voelen zich gewaardeerd"
        },
        {
          naam: "Sociale Veiligheid",
          uitleg: "Kinderen voelen zich veilig om zichzelf te zijn, fouten te maken en hulp te vragen zonder angst voor afwijzing of pesten.",
          voorbeeld: "Klassenregels: 'We lachen niet om fouten' en 'Iedereen mag meedoen'"
        }
      ],
      praktijktips: [
        "Start elke dag met een positieve begroeting van elk kind",
        "Gebruik 'time-in' in plaats van 'time-out' voor verbinding",
        "Leer kinderen gevoelens benoemen met een gevoelensthermometer",
        "Creëer rituelen voor verbinding (kring, complimenten)",
        "Model zelf sociaal-emotionele vaardigheden"
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
        startVraag: "Hoe zou jouw ideale klas eruitzien? Wat zouden kinderen zeggen en doen?",
        context: "Je maakt een concreet plan voor positief klassenklimaat"
      }
    ],
    bronnen: ["Kanjertraining.nl", "Lions Quest Nederland", "SEL-competenties CASEL"],
    completed: false,
    hasDocumentUpload: true,
    theorieViewer: "sel-methoden",
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
                'Spelen met anderen',
                'Regels begrijpen'
              ],
              interventions: [
                'Gevoelensthermometer gebruiken',
                'Ademhalingsoefeningen',
                'Duidelijke structuur bieden',
                'Positieve bekrachtiging'
              ]
            },
            {
              age: '6-8 jaar (groep 3-4)',
              stage: 'Sociale vaardigheden',
              characteristics: [
                'Vriendschappen vormen',
                'Regels begrijpen en volgen',
                'Empathie ontwikkelen',
                'Conflicten herkennen'
              ],
              interventions: [
                'Rollenspellen doen',
                'Conflictoplossing oefenen',
                'Complimenten geven',
                'Klassenregels samen maken'
              ]
            },
            {
              age: '8-12 jaar (groep 5-8)',
              stage: 'Complexe sociale situaties',
              characteristics: [
                'Groepsdynamiek begrijpen',
                'Morele dilemma\'s herkennen',
                'Leiderschap tonen',
                'Empathie voor verschillende perspectieven'
              ],
              interventions: [
                'Democratische besluitvorming',
                'Peer mediation training',
                'Dilemma discussies',
                'Community service projecten'
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
      "Pas convergente én divergente differentiatie toe in lesontwerp",
      "Gebruik taxonomie van Bloom voor leerdoelen",
      "Ontwerp formatieve checkpoints per lesfase",
      "Creëer een gedifferentieerd leeraanbod voor alle niveaus"
    ],
    theorie: {
      concepten: [
        {
          naam: "Convergente Differentiatie",
          uitleg: "Alle leerlingen werken naar hetzelfde doel, maar via verschillende wegen of met verschillende ondersteuning.",
          voorbeeld: "Iedereen leert breuken: groep A met materiaal, groep B met plaatjes, groep C abstract"
        },
        {
          naam: "Divergente Differentiatie",
          uitleg: "Leerlingen werken aan verschillende doelen op basis van hun niveau en interesse.",
          voorbeeld: "Groep A: breuken herkennen, Groep B: breuken vergelijken, Groep C: breuken optellen"
        },
        {
          naam: "Taxonomie van Bloom",
          uitleg: "Zes niveaus van leren: onthouden, begrijpen, toepassen, analyseren, evalueren, creëren.",
          voorbeeld: "Verhaal: onthouden (hoofdpersoon), begrijpen (thema), toepassen (eigen verhaal schrijven)"
        },
        {
          naam: "Formatieve Evaluatie",
          uitleg: "Tussentijdse controle van begrip om onderwijs bij te stellen tijdens de les.",
          voorbeeld: "Exit ticket: 'Schrijf één ding dat je geleerd hebt en één vraag die je nog hebt'"
        }
      ],
      praktijktips: [
        "Start met kerngroep (60%), dan uitbreiding naar zwakke en sterke leerlingen",
        "Gebruik 'must, should, could' structuur voor opdrachten",
        "Bied keuze in werkvormen: alleen, samen, met hulp",
        "Maak leerdoelen expliciet en controleer begrip",
        "Gebruik flexibele groepering op basis van behoefte"
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
        titel: "Bloom's Taxonomie Toepasser",
        beschrijving: "Maak leerdoelen op verschillende Bloom-niveaus voor één onderwerp",
        type: "toepassing",
        startVraag: "Neem een lesonderwerp. Hoe zou je dit op 6 verschillende niveaus kunnen aanbieden?",
        context: "Je past Bloom's taxonomie praktisch toe"
      }
    ],
    bronnen: ["SLO Differentiatiegids", "Bloom's Taxonomy Handbook", "Tomlinson - Differentiatie"],
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
            },
            {
              level: 'Groep 7 Begrijpend Lezen',
              must: 'Hoofdgedachte vinden',
              should: 'Conclusies trekken uit tekst',
              could: 'Kritisch beoordelen van argumenten'
            },
            {
              level: 'Groep 8 Geschiedenis',
              must: 'Tijdvakken benoemen',
              should: 'Oorzaak-gevolg relaties leggen',
              could: 'Historische bronnen vergelijken'
            }
          ]
        }
      },
      {
        type: 'LearningLineVisual',
        props: {
          subject: 'Differentiatie Strategieën',
          progression: [
            {
              grade: '1-2',
              skills: ['Observeren van verschillen', 'Flexibele groepering', 'Visuele ondersteuning'],
              example: 'Sommige kinderen gebruiken blokjes bij rekenen, anderen rekenen al abstract'
            },
            {
              grade: '3-4',
              skills: ['Must/Should/Could opdrachten', 'Keuze in werkvormen', 'Peer tutoring'],
              example: 'Bij spelling: iedereen oefent woorden, maar verschillende lijsten per niveau'
            },
            {
              grade: '5-6',
              skills: ['Zelfstandig werken', 'Projecten op maat', 'Verrijking en remediëring'],
              example: 'Onderzoeksproject: basis-, uitbreidings- en verdiepingsopdrachten'
            },
            {
              grade: '7-8',
              skills: ['Zelfregulatie', 'Keuze in eindproducten', 'Mentorschap'],
              example: 'Eindwerkstuk: presentatie, poster, video of geschreven verslag naar keuze'
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
      "Koppel data aan concrete interventies en SMART-doelen",
      "Evalueer effectiviteit van onderwijsinterventies"
    ],
    theorie: {
      concepten: [
        {
          naam: "LVS (Leerling Volg Systeem)",
          uitleg: "Systematisch verzamelen en analyseren van leerlinggegevens om ontwikkeling te volgen en onderwijs aan te passen.",
          voorbeeld: "Cito-toetsen 3x per jaar: september (start), januari (midden), juni (eind) voor trendanalyse"
        },
        {
          naam: "PDCA-cyclus",
          uitleg: "Plan-Do-Check-Act cyclus voor continue verbetering van onderwijskwaliteit.",
          voorbeeld: "Plan: doel verhogen rekenprestaties. Do: nieuwe methode. Check: toetsresultaten. Act: bijstellen aanpak"
        },
        {
          naam: "SMART-doelen",
          uitleg: "Specifiek, Meetbaar, Acceptabel, Realistisch, Tijdgebonden doelen voor onderwijsverbetering.",
          voorbeeld: "80% van groep 6 behaalt niveau D of E op Cito rekenen in juni 2024"
        },
        {
          naam: "Interventieladder",
          uitleg: "Systematische aanpak van lichte naar zware interventies op basis van leerlingbehoeften.",
          voorbeeld: "Niveau 1: klassikale aanpak → Niveau 2: kleine groep → Niveau 3: individueel → Niveau 4: externe hulp"
        }
      ],
      praktijktips: [
        "Bekijk data altijd in context: wat speelde er in de klas/school?",
        "Gebruik meerdere databronnen voor betrouwbaar beeld",
        "Betrek team bij data-analyse voor draagvlak",
        "Maak data visueel met grafieken en dashboards",
        "Koppel data direct aan concrete acties"
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
        beschrijving: "Maak een verbeterplan met de PDCA-cyclus",
        type: "toepassing",
        startVraag: "Kies een onderwijsprobleem in jouw school. Hoe zou je dit systematisch aanpakken?",
        context: "Je past de PDCA-cyclus toe op een concreet probleem"
      }
    ],
    bronnen: ["PO-Raad 'Werken met Data' toolkit", "Cito Terugkoppeling Handleiding", "PDCA in het onderwijs"],
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
      },
      {
        type: 'DataAnalysisDashboard',
        props: {
          datasets: [
            {
              name: 'Leerlingprestaties Trend',
              type: 'trend',
              data: { sep: 65, jan: 68, jun: 72 },
              insights: [
                'Positieve trend zichtbaar gedurende schooljaar',
                'Grootste groei tussen januari en juni',
                'Interventies in februari hebben effect gehad'
              ]
            },
            {
              name: 'Groepsvergelijking',
              type: 'comparison', 
              data: { groep4: 78, groep5: 65, groep6: 82 },
              insights: [
                'Groep 5 scoort onder verwachting',
                'Groep 6 presteert bovengemiddeld',
                'Mogelijk methodewisseling effect in groep 5'
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
      "Benoem 12 vaardigheden (SLO-model) en integreer 3 in lesconcept",
      "Beschrijf innovatiecyclus (design thinking) voor schoolontwikkeling",
      "Ontwerp een project dat 21e-eeuwse vaardigheden integreert",
      "Evalueer innovaties op effectiviteit en haalbaarheid"
    ],
    theorie: {
      concepten: [
        {
          naam: "21e-eeuwse Vaardigheden (SLO)",
          uitleg: "12 vaardigheden in 4 categorieën: Denken (kritisch denken, creativiteit, probleemoplossen, metacognitie), Samenwerken (communicatie, samenwerking), Tools (ICT-geletterdheid, informatievaardigheden), Leven (flexibiliteit, leiderschap, productiviteit, initiatief).",
          voorbeeld: "Project 'Duurzame school': kritisch denken (probleem analyseren), samenwerken (in teams), ICT (onderzoek doen), initiatief (oplossingen bedenken)"
        },
        {
          naam: "Design Thinking",
          uitleg: "Vijf-stappen proces: Empathize (begrijpen), Define (probleem definiëren), Ideate (ideeën genereren), Prototype (testen), Test (evalueren).",
          voorbeeld: "Leerlingen ontwerpen speeltoestel: interviews met klasgenoten → probleem formuleren → brainstormen → prototype bouwen → testen en verbeteren"
        },
        {
          naam: "Computational Thinking",
          uitleg: "Probleemoplossing door decompositie, patroonherkenning, abstractie en algoritmes.",
          voorbeeld: "Recept maken: stappen opsplitsen (decompositie), herhalende handelingen herkennen (patronen), algemene principes (abstractie), volgorde bepalen (algoritme)"
        },
        {
          naam: "Innovatiecyclus",
          uitleg: "Systematische aanpak voor vernieuwing: probleem identificeren → ideeën genereren → testen → implementeren → evalueren.",
          voorbeeld: "School introduceert tablets: probleem (digitale vaardigheden), idee (tablets), pilot (één groep), implementatie (hele school), evaluatie (effect meten)"
        }
      ],
      praktijktips: [
        "Start klein: integreer 1 21e-eeuwse vaardigheid per les",
        "Gebruik authentieke, betekenisvolle projecten",
        "Laat leerlingen reflecteren op hun leerproces",
        "Creëer ruimte voor experimenteren en falen",
        "Verbind met actuele maatschappelijke uitdagingen"
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
        titel: "Design Thinking Challenge",
        beschrijving: "Gebruik design thinking om een schoolprobleem op te lossen",
        type: "toepassing",
        startVraag: "Welk probleem zie je op jouw school dat leerlingen zelf zouden kunnen oplossen?",
        context: "Je past design thinking toe in onderwijscontext"
      }
    ],
    bronnen: ["SLO 21-eeuwse vaardigheden", "Design Thinking for Educators", "Computational Thinking Guide"],
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
            { name: 'Probleemoplossen', level: 4, description: 'Complexe uitdagingen aanpakken' },
            { name: 'Metacognitie', level: 2, description: 'Bewust van eigen leerproces' },
            { name: 'Flexibiliteit', level: 3, description: 'Aanpassen aan veranderingen' }
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
              tools: ['Vragenlijsten', 'Observatieformulieren', 'Persona\'s']
            },
            {
              name: 'Define',
              description: 'Definieer het probleem helder',
              activities: ['Probleem formuleren', 'Point of view bepalen', 'How might we vragen'],
              tools: ['Problem statement', 'POV template', 'HMW brainstorm']
            },
            {
              name: 'Ideate',
              description: 'Genereer veel creatieve ideeën',
              activities: ['Brainstormen', 'Schetsen', 'Ideeën combineren'],
              tools: ['Brainstorm regels', 'Crazy 8s', 'Mindmapping']
            },
            {
              name: 'Prototype',
              description: 'Maak snelle, testbare versies',
              activities: ['Bouwen', 'Schetsen', 'Rollenspel'],
              tools: ['Karton en tape', 'Digitale tools', 'Storyboards']
            },
            {
              name: 'Test',
              description: 'Test met echte gebruikers',
              activities: ['Feedback verzamelen', 'Observeren', 'Itereren'],
              tools: ['Testprotocol', 'Feedback formulieren', 'Video opnames']
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
      "Ontwikkel een persoonlijk leiderschapsplan",
      "Pas verschillende leiderschapsstijlen toe in situaties"
    ],
    theorie: {
      concepten: [
        {
          naam: "Beroepsstandaard Schoolleider PO",
          uitleg: "Zes competentiegebieden: 1) Visie en strategie ontwikkelen, 2) Onderwijskundig leiderschap, 3) Organisatie en bedrijfsvoering, 4) Personeel en professionaliteit, 5) Communicatie en samenwerking, 6) Verantwoording en kwaliteitszorg.",
          voorbeeld: "Onderwijskundig leiderschap: schoolleider stimuleert teamontwikkeling door collegiale consultatie en lesson study te organiseren"
        },
        {
          naam: "Schoolplan Cyclus",
          uitleg: "Vierjarige cyclus: Schoolplan (visie, doelen) → Jaarplan (concrete acties) → Uitvoering → Evaluatie → Nieuwe cyclus.",
          voorbeeld: "Schoolplan 2024-2028 stelt doel 'verbeteren rekenprestaties'. Jaarplan 2024: nieuwe methode, bijscholing team. Evaluatie: Cito-resultaten en tevredenheid."
        },
        {
          naam: "Transformationeel Leiderschap",
          uitleg: "Leiderschapsstijl gericht op inspireren, motiveren en ontwikkelen van medewerkers door visie, individuele aandacht, intellectuele stimulatie en charisma.",
          voorbeeld: "Schoolleider inspireert team met visie op inclusief onderwijs, coacht individuele leerkrachten, stimuleert innovatie en toont enthousiasme"
        },
        {
          naam: "Distributed Leadership",
          uitleg: "Leiderschap verspreid over meerdere personen in de organisatie, niet alleen de formele leider.",
          voorbeeld: "Vakcoördinatoren leiden hun vakgebied, teamleiders coördineren hun team, ervaren leerkrachten mentoren nieuwelingen"
        }
      ],
      praktijktips: [
        "Begin met luisteren voordat je veranderingen voorstelt",
        "Maak je visie concreet met voorbeelden en verhalen",
        "Investeer in relaties met alle stakeholders",
        "Gebruik data om beslissingen te onderbouwen",
        "Geef mensen eigenaarschap over hun werk"
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
        beschrijving: "Analyseer een schoolplan en identificeer sterke en zwakke punten",
        type: "analyse",
        startVraag: "Bekijk het schoolplan van jouw school. Wat valt je op aan de doelen en acties?",
        context: "Je leert schoolplannen kritisch te beoordelen"
      }
    ],
    bronnen: ["Schoolleidersregister", "AVS Leiderschapsprofiel", "Transformationeel Leiderschap Handboek"],
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
            { title: 'Financiële Gezondheid', value: '92%', trend: 'down', color: 'bg-orange-500' },
            { title: 'Innovatie Index', value: '76%', trend: 'up', color: 'bg-pink-500' },
            { title: 'Personeelsverloop', value: '12%', trend: 'stable', color: 'bg-teal-500' }
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
      "Integreer mediawijsheid en AI-geletterdheid in les of project",
      "Ontwerp burgerschapsactiviteit die democratische vaardigheden ontwikkelt",
      "Evalueer digitale tools op geschiktheid voor kinderen"
    ],
    theorie: {
      concepten: [
        {
          naam: "Wet Burgerschapsonderwijs 2024",
          uitleg: "Wettelijke verplichting voor scholen om burgerschap te onderwijzen via vier domeinen: 1) Democratie en rechtsstaat, 2) Gelijkwaardigheid en diversiteit, 3) Sociale cohesie, 4) Reflectie op Nederland in de wereld.",
          voorbeeld: "Kinderen leren over verkiezingen door klassenverkiezingen te organiseren (democratie), verschillende culturen te vieren (diversiteit), samen te werken aan schoolproject (cohesie)"
        },
        {
          naam: "AI-geletterdheid voor Kinderen",
          uitleg: "Begrip van wat AI is, hoe het werkt, voordelen en risico's, en ethische overwegingen. Aangepast aan ontwikkelingsniveau.",
          voorbeeld: "Groep 6: AI als 'slimme computer die leert van voorbeelden'. Chatbot uitproberen, bespreken wat het wel/niet kan, privacy en waarheidsgetrouwheid"
        },
        {
          naam: "Mediawijsheid",
          uitleg: "Vaardigheden om media kritisch te gebruiken: informatie zoeken, beoordelen, creëren en delen op verantwoordelijke wijze.",
          voorbeeld: "Nepnieuws herkennen: bronnen checken, meerdere bronnen vergelijken, emotionele reacties herkennen, feitencheckers gebruiken"
        },
        {
          naam: "Digitaal Burgerschap",
          uitleg: "Verantwoordelijk gedrag in digitale omgevingen: privacy, veiligheid, respect, kritisch denken.",
          voorbeeld: "Online pesten herkennen en aanpakken, sterke wachtwoorden maken, respectvol communiceren in digitale omgevingen"
        }
      ],
      praktijktips: [
        "Verbind burgerschap aan actuele gebeurtenissen en kinderervaringen",
        "Gebruik democratische besluitvorming in de klas",
        "Laat kinderen zelf AI-tools uitproberen onder begeleiding",
        "Bespreek online ervaringen van kinderen",
        "Maak abstracte concepten concreet met voorbeelden"
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
        titel: "AI-Ethics voor Kids",
        beschrijving: "Ontwikkel een les over AI-ethiek voor basisschoolkinderen",
        type: "ontwerp",
        startVraag: "Hoe leg je aan kinderen uit wat eerlijk en oneerlijk gebruik van AI is?",
        context: "Je maakt AI-ethiek begrijpelijk voor kinderen"
      }
    ],
    bronnen: ["SLO Burgerschapscurriculum", "Mediawijzer.net", "AI voor Kinderen Gids"],
    completed: false,
    hasDocumentUpload: true,
    visualComponents: [
      {
        type: 'CitizenshipCompetencyMatrix',
        props: {
          competencies: [
            {
              domain: 'Democratie & Rechtsstaat',
              skills: [
                { 
                  name: 'Democratische besluitvorming', 
                  level: 3, 
                  examples: ['Klassenregels samen maken', 'Stemmen over uitje', 'Klassenraad organiseren'] 
                },
                { 
                  name: 'Rechten en plichten kennen', 
                  level: 2, 
                  examples: ['Kinderrechten benoemen', 'Schoolregels begrijpen', 'Hulp zoeken bij problemen'] 
                }
              ]
            },
            {
              domain: 'Gelijkwaardigheid & Diversiteit',
              skills: [
                { 
                  name: 'Diversiteit waarderen', 
                  level: 4, 
                  examples: ['Verschillende culturen vieren', 'Vooroordelen bespreken', 'Inclusief gedrag tonen'] 
                },
                { 
                  name: 'Discriminatie herkennen', 
                  level: 2, 
                  examples: ['Pesten herkennen', 'Uitsluiting signaleren', 'Hulp bieden aan anderen'] 
                }
              ]
            },
            {
              domain: 'Digitaal Burgerschap',
              skills: [
                { 
                  name: 'Online veiligheid', 
                  level: 3, 
                  examples: ['Privacy instellingen', 'Veilig wachtwoord', 'Verdachte berichten melden'] 
                },
                { 
                  name: 'AI-geletterdheid', 
                  level: 2, 
                  examples: ['AI herkennen', 'Beperkingen begrijpen', 'Ethische vragen stellen'] 
                }
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
      "Interpreteer Cito-scores en LVS-data voor schoolsturing",
      "Voer effectieve lesobservaties uit met EDI-kijkwijzers",
      "Geef constructieve feedback die ontwikkeling stimuleert",
      "Ontwikkel een verbeterplan op basis van data-analyse"
    ],
    theorie: {
      concepten: [
        {
          naam: "Cito-score Interpretatie",
          uitleg: "Cito-scores geven inzicht in prestaties per niveau (A-E) en referentieniveaus (1F, 1S, 2F). Belangrijk is trend over tijd en vergelijking met landelijk gemiddelde.",
          voorbeeld: "Rekenen Groep 6: 8% niveau A (landelijk 5%) = zorgelijk. Trend: vorig jaar 12% niveau A = verbetering zichtbaar, maar nog steeds onder landelijk niveau"
        },
        {
          naam: "EDI (Explicit Direct Instruction)",
          uitleg: "Effectieve instructiemethode in 6 fasen: 1) Lesdoel en voorkennis, 2) Nieuwe stof uitleggen, 3) Begeleide inoefening, 4) Zelfstandige verwerking, 5) Afsluiting, 6) Evaluatie.",
          voorbeeld: "Breuken les: Doel benoemen → Voorkennis pizza delen → Uitleg met materiaal → Samen oefenen → Zelfstandig werken → Wat geleerd?"
        },
        {
          naam: "Feedbackgesprek Structuur",
          uitleg: "GROW-model: Goal (doel), Reality (huidige situatie), Options (mogelijkheden), Way forward (vervolgstappen). Focus op gedrag, niet persoon.",
          voorbeeld: "Doel: betere klassenorganisatie. Realiteit: chaos bij overgangen. Opties: signalen, procedures, materiaal. Vervolgstap: 3 signalen afspreken en oefenen"
        },
        {
          naam: "Instructional Leadership",
          uitleg: "Leiderschapsstijl gericht op verbetering van onderwijs door focus op curriculum, instructie en assessment.",
          voorbeeld: "Schoolleider observeert lessen, bespreekt data met teams, organiseert professionalisering op basis van schoolbehoeften"
        }
      ],
      praktijktips: [
        "Gebruik data als startpunt voor gesprek, niet als eindoordeel",
        "Observeer meerdere lessen voor betrouwbaar beeld",
        "Geef eerst positieve feedback, dan verbeterpunten",
        "Maak concrete afspraken met tijdslijn",
        "Volg afspraken op en evalueer voortgang"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Cito Data Analist",
        beschrijving: "Analyseer echte Cito-resultaten en bepaal interventies",
        type: "analyse",
        startVraag: "Je ziet deze Cito-resultaten. Wat valt je op?",
        context: "Je leert data kritisch interpreteren en actieplannen maken"
      },
      {
        titel: "Lesobservatie Simulator",
        beschrijving: "Oefen lesobservaties met EDI-kijkwijzer",
        type: "toepassing",
        startVraag: "Je gaat een rekenles observeren. Waar let je op?",
        context: "Je oefent systematisch observeren en feedback geven"
      }
    ],
    bronnen: ["Cito Terugkoppeling Handleiding", "EDI Kijkwijzer", "GROW Coaching Model"],
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
      },
      {
        type: 'CitoScoreChart',
        props: {
          title: 'Schoolprestaties Analyse - Alle Groepen',
          data: [
            { level: 'A', percentage: 12, national: 8, color: 'bg-red-500' },
            { level: 'B', percentage: 23, national: 18, color: 'bg-orange-500' },
            { level: 'C', percentage: 35, national: 42, color: 'bg-yellow-500' },
            { level: 'D', percentage: 25, national: 27, color: 'bg-green-500' },
            { level: 'E', percentage: 5, national: 5, color: 'bg-blue-500' }
          ],
          explanation: 'Positief: minder A-niveau leerlingen dan landelijk. Aandachtspunt: C-niveau leerlingen naar D-niveau tillen.'
        }
      }
    ]
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'kerndoelen' | 'ontwikkeling' | 'sel-methoden' | 'visueel' | 'chat'>('overzicht')
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

    // Add specific theory viewer tabs based on module
    if (selectedModule.theorieViewer === 'kerndoelen') {
      tabs.push({ id: 'kerndoelen', label: '🎯 58 Kerndoelen', icon: '🎯' })
    } else if (selectedModule.theorieViewer === 'ontwikkeling') {
      tabs.push({ id: 'ontwikkeling', label: '🧠 Ontwikkelingstheorieën', icon: '🧠' })
    } else if (selectedModule.theorieViewer === 'sel-methoden') {
      tabs.push({ id: 'sel-methoden', label: '🤝 SEL-Methodieken', icon: '🤝' })
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

              {activeTab === 'ontwikkeling' && (
                <div>
                  <DevelopmentTheoryViewer />
                </div>
              )}

              {activeTab === 'sel-methoden' && (
                <div>
                  <SELMethodsViewer />
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