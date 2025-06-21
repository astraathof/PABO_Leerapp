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
    concepten: { naam: string; uitleg: string; voorbeeld?: string; bronnen?: string[] }[]
    praktijktips: string[]
    verdieping: {
      titel: string
      inhoud: string
      voorbeelden: string[]
    }[]
  }
  leeractiviteiten: {
    titel: string
    beschrijving: string
    type: 'reflectie' | 'analyse' | 'ontwerp' | 'toepassing' | 'onderzoek'
    startVraag: string
    context: string
    stappen: string[]
    eindproduct: string
  }[]
  bronnen: string[]
  completed: boolean
  hasDocumentUpload?: boolean
  visualComponents?: any[]
  hasRichContent?: boolean
  richContentType?: 'kerndoelen' | 'theories' | 'sel-methods' | 'data-examples' | 'skills-assessment' | 'leadership-tools'
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
          voorbeeld: "Kerndoel 9 (Rekenen): 'Leerlingen leren hoofdrekenen, cijferen en rekenen met de rekenmachine.'",
          bronnen: ["Wet op het primair onderwijs", "SLO Kerndoelen overzicht"]
        },
        {
          naam: "Leerlijnen", 
          uitleg: "Een leerlijn toont de opbouw van kennis en vaardigheden van groep 1 tot 8. Het verbindt kerndoelen met concrete leerdoelen per leerjaar.",
          voorbeeld: "Leerlijn 'Getalbegrip': groep 1-2 (tellen tot 20) → groep 3-4 (getallen tot 100) → groep 5-6 (tot 10.000) → groep 7-8 (tot 1.000.000)",
          bronnen: ["SLO Leerlijnenviewer", "Curriculum.nu"]
        },
        {
          naam: "Referentieniveaus",
          uitleg: "1F (functioneel), 1S (streefniveau) en 2F bepalen wat leerlingen minimaal moeten beheersen voor vervolgonderwijs.",
          voorbeeld: "1F Rekenen: basisvaardigheden voor dagelijks leven. 2F Rekenen: voorbereiding op HAVO/VWO",
          bronnen: ["Cito Referentieniveaus", "SLO Tussendoelen"]
        },
        {
          naam: "Jaarplanning",
          uitleg: "Systematische verdeling van leerstof over het schooljaar, meestal in 8 blokken van 4-5 weken.",
          voorbeeld: "Blok 1: Herhaling vorig jaar, Blok 2-3: Nieuwe leerstof deel 1, Blok 4: Kerstvakantie project, etc.",
          bronnen: ["Schoolplannen", "Methodehandleidingen"]
        },
        {
          naam: "Concept-kerndoelen 2025",
          uitleg: "Vernieuwde kerndoelen die meer nadruk leggen op 21e-eeuwse vaardigheden en digitale geletterdheid.",
          voorbeeld: "Nieuwe focus op computational thinking, mediawijsheid en duurzaamheid",
          bronnen: ["SLO Concept-kerndoelen", "Ministerie OCW"]
        }
      ],
      praktijktips: [
        "Gebruik de SLO Leerlijnenviewer voor concrete uitwerking per groep",
        "Koppel kerndoelen aan je methode door doelenbomen te maken",
        "Plan 8 blokken per jaar met 4-5 weken per blok voor overzicht",
        "Reserveer tijd voor herhaling en verdieping tussen blokken",
        "Maak verbindingen tussen vakgebieden zichtbaar",
        "Gebruik de tussendoelen voor tussentijdse evaluatie"
      ],
      verdieping: [
        {
          titel: "Internationale vergelijking",
          inhoud: "Hoe verhouden Nederlandse kerndoelen zich tot andere landen?",
          voorbeelden: ["Finse curriculum", "Singaporese mathematics", "Franse taalonderwijs"]
        },
        {
          titel: "Historische ontwikkeling",
          inhoud: "Van Mammoetwet tot huidige kerndoelen: een tijdreis door het Nederlandse onderwijs",
          voorbeelden: ["Mammoetwet 1968", "Basisvorming 1993", "Kerndoelen 1998", "Vernieuwing 2010"]
        }
      ]
    },
    leeractiviteiten: [
      {
        titel: "Kerndoel Detective",
        beschrijving: "Analyseer een kerndoel en ontdek wat het echt betekent voor je lespraktijk",
        type: "analyse",
        startVraag: "Kies een kerndoel uit jouw vakgebied. Wat denk je dat dit kerndoel precies van leerlingen verwacht?",
        context: "Je gaat een kerndoel uitpluizen en koppelen aan concrete lesdoelen",
        stappen: [
          "Kies een kerndoel dat je interessant vindt",
          "Analyseer de kernwoorden in de omschrijving",
          "Zoek voorbeelden van hoe dit kerndoel in de praktijk vorm krijgt",
          "Koppel het aan een specifieke leeftijdsgroep",
          "Bedenk hoe je dit zou toetsen"
        ],
        eindproduct: "Een uitgewerkte analyse van een kerndoel met praktijkvoorbeelden"
      },
      {
        titel: "Leerlijn Architect", 
        beschrijving: "Ontwerp een leerlijn van groep 1 tot 8 voor een specifiek onderwerp",
        type: "ontwerp",
        startVraag: "Welk onderwerp binnen taal of rekenen vind je het moeilijkst om uit te leggen aan kinderen? Waarom denk je dat dat zo is?",
        context: "Je gaat stap voor stap een leerlijn opbouwen",
        stappen: [
          "Kies een onderwerp (bijv. breuken, spelling, begrijpend lezen)",
          "Bepaal het eindniveau (wat moeten kinderen kunnen in groep 8?)",
          "Werk terug: wat is nodig in groep 7, 6, 5, etc.?",
          "Identificeer cruciale overgangsmomenten",
          "Bedenk concrete activiteiten per groep",
          "Test je leerlijn met een ervaren leerkracht"
        ],
        eindproduct: "Een complete leerlijn met tussendoelen en activiteiten per groep"
      },
      {
        titel: "Jaarplanning Puzzel",
        beschrijving: "Maak een realistische jaarplanning die aansluit bij leerlijnen",
        type: "toepassing", 
        startVraag: "Stel je voor: je krijgt een nieuwe groep 5. Waar begin je met plannen? Wat zijn je eerste overwegingen?",
        context: "Je maakt een concrete jaarplanning voor een specifieke groep",
        stappen: [
          "Analyseer de uitgangssituatie van je groep",
          "Bepaal de eindtermen voor het schooljaar",
          "Verdeel de leerstof over 8 blokken",
          "Plan momenten voor toetsing en evaluatie",
          "Integreer projecten en thema's",
          "Bouw in flexibiliteit voor aanpassingen"
        ],
        eindproduct: "Een complete jaarplanning met tijdlijn en evaluatiemomenten"
      }
    ],
    bronnen: [
      "https://tule.slo.nl - SLO Leerlijnenviewer",
      "https://curriculum.nu - Curriculum ontwikkeling",
      "Wet op het primair onderwijs",
      "SLO Kerndoelen overzicht"
    ],
    completed: false,
    hasDocumentUpload: true,
    hasRichContent: true,
    richContentType: 'kerndoelen',
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
      "Toon hoe je een veilige leeromgeving creëert",
      "Pas ontwikkelingstheorieën toe in concrete situaties"
    ],
    theorie: {
      concepten: [
        {
          naam: "Piaget's Ontwikkelingsstadia",
          uitleg: "Kinderen doorlopen vier stadia: sensomotorisch (0-2), preoperationeel (2-7), concreet operationeel (7-11), formeel operationeel (11+). Elk stadium heeft eigen denkkenmerken.",
          voorbeeld: "Groep 3-4 (preoperationeel): kinderen denken nog niet logisch, hebben moeite met behoud (water in hoog/breed glas)",
          bronnen: ["Piaget, J. (1952). The Origins of Intelligence in Children", "Wadsworth, B. (2004). Piaget's Theory of Cognitive Development"]
        },
        {
          naam: "Vygotsky's Zone van Naaste Ontwikkeling",
          uitleg: "Het verschil tussen wat een kind alleen kan en wat het met hulp kan. Hier vindt optimaal leren plaats.",
          voorbeeld: "Kind kan zelfstandig tot 10 tellen, met hulp tot 20. De ZNO ligt tussen 10-20.",
          bronnen: ["Vygotsky, L.S. (1978). Mind in Society", "Wood, D. (1998). How Children Think and Learn"]
        },
        {
          naam: "Scaffolding",
          uitleg: "Tijdelijke ondersteuning die geleidelijk wordt weggenomen naarmate het kind zelfstandiger wordt.",
          voorbeeld: "Rekenen: eerst samen doen → met hulpkaart → zelfstandig → automatiseren",
          bronnen: ["Bruner, J. (1983). Child's Talk", "Van de Pol, J. (2010). Scaffolding in Teacher-Student Interaction"]
        },
        {
          naam: "Erikson's Psychosociale Ontwikkeling",
          uitleg: "Acht levensfasen met elk een ontwikkelingscrisis die opgelost moet worden voor gezonde ontwikkeling.",
          voorbeeld: "Groep 3-8: Vlijt vs. Minderwaardigheid - kinderen willen competent zijn en vergelijken zich met anderen",
          bronnen: ["Erikson, E.H. (1963). Childhood and Society", "Bee, H. & Boyd, D. (2012). The Developing Child"]
        }
      ],
      praktijktips: [
        "Observeer kinderen tijdens spel om ontwikkelingsniveau in te schatten",
        "Gebruik concrete materialen voor abstracte begrippen (groep 3-6)",
        "Geef kinderen tijd om te denken voordat je antwoord verwacht",
        "Varieer in ondersteuning: visueel, auditief, tactiel",
        "Erken en vier kleine vooruitgang",
        "Creëer kansen voor succeservaringen"
      ],
      verdieping: [
        {
          titel: "Neurobiologie van leren",
          inhoud: "Hoe ontwikkelt het kinderbrein zich en wat betekent dit voor onderwijs?",
          voorbeelden: ["Prefrontale cortex ontwikkeling", "Myelinisatie", "Synaptische snoei"]
        },
        {
          titel: "Culturele invloeden op ontwikkeling",
          inhoud: "Hoe beïnvloedt cultuur de manier waarop kinderen zich ontwikkelen?",
          voorbeelden: ["Collectivistische vs. individualistische culturen", "Taalverschillen", "Opvoedingsstijlen"]
        }
      ]
    },
    leeractiviteiten: [
      {
        titel: "Ontwikkelingsdetective",
        beschrijving: "Herken ontwikkelingsstadia in kindgedrag en pas je aanpak aan",
        type: "analyse",
        startVraag: "Beschrijf een situatie waarin een kind iets niet begreep. Hoe reageerde je toen? Wat zou je nu anders doen?",
        context: "Je analyseert kindgedrag vanuit ontwikkelingstheorie",
        stappen: [
          "Beschrijf de situatie in detail",
          "Identificeer het ontwikkelingsstadium van het kind",
          "Analyseer waarom het kind moeite had",
          "Bedenk alternatieve benaderingen",
          "Test je nieuwe aanpak in de praktijk"
        ],
        eindproduct: "Een casusanalyse met theoretische onderbouwing en praktische aanbevelingen"
      },
      {
        titel: "Scaffolding Strategie Ontwerper",
        beschrijving: "Ontwikkel een scaffolding strategie voor een specifieke vaardigheid",
        type: "ontwerp",
        startVraag: "Kies een vaardigheid die kinderen moeilijk vinden. Hoe zou je ze stap voor stap kunnen begeleiden?",
        context: "Je ontwerpt een complete scaffolding aanpak",
        stappen: [
          "Analyseer de eindvaardigheid",
          "Bepaal de huidige vaardigheden van kinderen",
          "Ontwerp tussenstappen",
          "Bedenk ondersteuningsmateriaal",
          "Plan het afbouwen van hulp",
          "Evalueer de effectiviteit"
        ],
        eindproduct: "Een scaffolding plan met materialen en evaluatiecriteria"
      }
    ],
    bronnen: [
      "Piaget, J. - Cognitive Development Theory",
      "Vygotsky, L.S. - Social Development Theory", 
      "Erikson, E.H. - Psychosocial Development",
      "G. Marzano - Classroom Management"
    ],
    completed: false,
    hasDocumentUpload: true,
    hasRichContent: true,
    richContentType: 'theories',
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
      "Formuleer meetbare doelen rond welbevinden en veiligheid",
      "Implementeer SEL-activiteiten in de dagelijkse praktijk"
    ],
    theorie: {
      concepten: [
        {
          naam: "SEL (Social Emotional Learning)",
          uitleg: "Vijf kerncompetenties: zelfbewustzijn, zelfregulatie, sociale bewustzijn, relatievaardigheden, verantwoordelijke besluitvorming.",
          voorbeeld: "Zelfregulatie: kind leert ademhalingsoefening bij boosheid in plaats van slaan",
          bronnen: ["CASEL Framework", "Durlak et al. (2011) SEL Meta-analysis"]
        },
        {
          naam: "Klassenklimaat",
          uitleg: "De sociale en emotionele sfeer in de klas die leren en welzijn beïnvloedt.",
          voorbeeld: "Veilig klimaat: kinderen durven vragen te stellen en fouten te maken",
          bronnen: ["Marzano, R. (2003) Classroom Management", "Cohen, J. (2006) Social, Emotional, Ethical Climate"]
        },
        {
          naam: "Sociale Veiligheid",
          uitleg: "De mate waarin leerlingen zich veilig, geaccepteerd en gerespecteerd voelen in de schoolomgeving.",
          voorbeeld: "Anti-pestprotocol, inclusieve activiteiten, duidelijke gedragsregels",
          bronnen: ["Inspectie van het Onderwijs - Sociale Veiligheid", "Veerman & Van Yperen (2007)"]
        }
      ],
      praktijktips: [
        "Start elke dag met een positieve begroeting van elk kind",
        "Gebruik 'time-in' in plaats van 'time-out' voor verbinding",
        "Creëer rituelen voor overgangen en emotieregulatie",
        "Leer kinderen gevoelens benoemen en uiten",
        "Implementeer restorative justice bij conflicten",
        "Vier diversiteit en verschillen in de klas"
      ],
      verdieping: [
        {
          titel: "Trauma-informed teaching",
          inhoud: "Hoe herken je trauma bij kinderen en hoe pas je je onderwijs daarop aan?",
          voorbeelden: ["ACE-scores", "Regulatiestrategieën", "Veilige relaties opbouwen"]
        },
        {
          titel: "Neurodiversiteit in de klas",
          inhoud: "Omgaan met ADHD, autisme en andere neurobiologische verschillen",
          voorbeelden: ["Sensorische behoeften", "Executieve functies", "Sociale communicatie"]
        }
      ]
    },
    leeractiviteiten: [
      {
        titel: "SEL-Methode Verkenner",
        beschrijving: "Vergelijk verschillende SEL-methodieken en kies de beste voor jouw context",
        type: "analyse",
        startVraag: "Denk aan een klas die je kent. Welke sociale uitdagingen zie je daar?",
        context: "Je verkent welke SEL-aanpak past bij specifieke klassenbehoeften",
        stappen: [
          "Analyseer de huidige situatie in een klas",
          "Identificeer de belangrijkste uitdagingen",
          "Onderzoek verschillende SEL-methodieken",
          "Vergelijk voor- en nadelen per methode",
          "Maak een keuze en onderbouw deze",
          "Ontwerp een implementatieplan"
        ],
        eindproduct: "Een gemotiveerde keuze voor een SEL-methodiek met implementatieplan"
      },
      {
        titel: "Klassenklimaat Thermometer",
        beschrijving: "Meet en verbeter het klassenklimaat systematisch",
        type: "onderzoek",
        startVraag: "Hoe zou je kunnen meten of kinderen zich veilig en gelukkig voelen in de klas?",
        context: "Je ontwikkelt instrumenten om klassenklimaat te monitoren",
        stappen: [
          "Bepaal wat je wilt meten (veiligheid, verbondenheid, etc.)",
          "Ontwikkel meetinstrumenten (vragenlijsten, observaties)",
          "Verzamel data van leerlingen, ouders en collega's",
          "Analyseer de resultaten",
          "Identificeer verbeterpunten",
          "Implementeer interventies en meet opnieuw"
        ],
        eindproduct: "Een klimaatmeting met analyse en verbeterplan"
      }
    ],
    bronnen: [
      "CASEL.org - SEL Framework",
      "Kanjertraining.nl - Nederlandse SEL-methode",
      "Lions Quest - Internationale SEL-curriculum",
      "Inspectie van het Onderwijs - Sociale Veiligheid"
    ],
    completed: false,
    hasDocumentUpload: true,
    hasRichContent: true,
    richContentType: 'sel-methods'
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
      "Creëer een inclusieve leeromgeving voor alle leerlingen"
    ],
    theorie: {
      concepten: [
        {
          naam: "Convergente Differentiatie",
          uitleg: "Alle leerlingen werken naar hetzelfde doel, maar via verschillende wegen of met verschillende ondersteuning.",
          voorbeeld: "Iedereen leert breuken: groep A met materiaal, groep B met plaatjes, groep C abstract",
          bronnen: ["Tomlinson, C.A. (2001) How to Differentiate Instruction", "SLO Differentiatiegids"]
        },
        {
          naam: "Divergente Differentiatie", 
          uitleg: "Leerlingen werken aan verschillende doelen op basis van hun niveau en interesse.",
          voorbeeld: "Taalproject: sommigen schrijven verhaal, anderen gedicht, weer anderen toneelstuk",
          bronnen: ["Gardner, H. (1983) Multiple Intelligences", "Renzulli, J. (1977) Enrichment Triad Model"]
        },
        {
          naam: "Taxonomie van Bloom",
          uitleg: "Hiërarchie van denkvaardigheden: onthouden, begrijpen, toepassen, analyseren, evalueren, creëren.",
          voorbeeld: "Rekenen: onthouden (tafels) → begrijpen (concept) → toepassen (woordsommen) → analyseren (strategieën)",
          bronnen: ["Bloom, B.S. (1956) Taxonomy of Educational Objectives", "Anderson & Krathwohl (2001) Revised Taxonomy"]
        },
        {
          naam: "Formatieve Evaluatie",
          uitleg: "Doorlopende beoordeling tijdens het leerproces om onderwijs bij te sturen.",
          voorbeeld: "Exit tickets, thumbs up/down, one minute papers, peer feedback",
          bronnen: ["Black & Wiliam (1998) Assessment and Classroom Learning", "Hattie, J. (2009) Visible Learning"]
        }
      ],
      praktijktips: [
        "Start met kerngroep (60%), dan uitbreiding naar zwakke en sterke leerlingen",
        "Gebruik de 'must, should, could' structuur voor opdrachten",
        "Bied keuze in werkvormen: alleen, samen, met hulp",
        "Maak leerdoelen transparant voor leerlingen",
        "Gebruik flexibele groepering op basis van behoefte",
        "Integreer zelfregulatie en reflectie"
      ],
      verdieping: [
        {
          titel: "Universal Design for Learning (UDL)",
          inhoud: "Ontwerp onderwijs dat toegankelijk is voor alle leerlingen vanaf het begin",
          voorbeelden: ["Multiple means of representation", "Multiple means of engagement", "Multiple means of action/expression"]
        },
        {
          titel: "Gepersonaliseerd leren",
          inhoud: "Hoe kun je onderwijs aanpassen aan individuele leerbehoeften en interesses?",
          voorbeelden: ["Adaptieve software", "Individuele leerroutes", "Student agency"]
        }
      ]
    },
    leeractiviteiten: [
      {
        titel: "Differentiatie Designer",
        beschrijving: "Ontwerp een les met meerdere niveaus voor verschillende leerlingen",
        type: "ontwerp",
        startVraag: "Kies een onderwerp dat je wilt gaan onderwijzen. Welke verschillen verwacht je tussen leerlingen?",
        context: "Je ontwerpt een gedifferentieerde les stap voor stap",
        stappen: [
          "Analyseer je doelgroep en hun verschillen",
          "Formuleer heldere leerdoelen",
          "Ontwerp de kernactiviteit",
          "Bedenk uitbreidingen voor snelle leerlingen",
          "Creëer extra ondersteuning voor zwakkere leerlingen",
          "Plan formatieve evaluatiemomenten",
          "Test je les en evalueer"
        ],
        eindproduct: "Een complete lesopzet met differentiatiematrix en evaluatie"
      },
      {
        titel: "Bloom's Ladder Bouwer",
        beschrijving: "Ontwikkel een reeks opdrachten die alle niveaus van Bloom's taxonomie bestrijkt",
        type: "ontwerp",
        startVraag: "Hoe kun je één onderwerp op zes verschillende denkniveaus laten behandelen?",
        context: "Je maakt een complete leerroute van simpel naar complex",
        stappen: [
          "Kies een onderwerp uit je vakgebied",
          "Ontwerp opdrachten voor elk Bloom-niveau",
          "Zorg voor logische opbouw en samenhang",
          "Maak rubrics voor beoordeling",
          "Test met verschillende leerlingen",
          "Reflecteer op effectiviteit"
        ],
        eindproduct: "Een Bloom's ladder met zes opdrachten en beoordelingscriteria"
      }
    ],
    bronnen: [
      "SLO Differentiatiegids",
      "Tomlinson, C.A. - Differentiated Instruction",
      "Bloom's Taxonomy Revised",
      "UDL Guidelines - CAST.org"
    ],
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
      "Koppel data aan concrete interventies en SMART-doelen",
      "Evalueer effectiviteit van onderwijsinterventies"
    ],
    theorie: {
      concepten: [
        {
          naam: "LVS (Leerling Volg Systeem)",
          uitleg: "Systematisch verzamelen en analyseren van leerlinggegevens om ontwikkeling te volgen en onderwijs aan te passen.",
          voorbeeld: "Cito-toetsen 3x per jaar: september (start), januari (midden), juni (eind) voor trendanalyse",
          bronnen: ["Cito LVS Handleiding", "PO-Raad Data-gedreven werken"]
        },
        {
          naam: "PDCA-cyclus",
          uitleg: "Plan-Do-Check-Act cyclus voor continue verbetering van onderwijskwaliteit.",
          voorbeeld: "Plan: doel stellen, Do: interventie uitvoeren, Check: resultaten meten, Act: bijsturen",
          bronnen: ["Deming, W.E. Quality Management", "Scheerens, J. School Effectiveness"]
        },
        {
          naam: "Formatieve vs. Summatieve Evaluatie",
          uitleg: "Formatief: tijdens leerproces voor bijsturing. Summatief: aan einde voor beoordeling.",
          voorbeeld: "Formatief: dagelijkse exit tickets. Summatief: eindtoets hoofdstuk",
          bronnen: ["Scriven, M. (1967) Evaluation Methodology", "Wiliam, D. (2011) Embedded Formative Assessment"]
        }
      ],
      praktijktips: [
        "Bekijk data altijd in context: wat speelde er in de klas/school?",
        "Gebruik data als startpunt voor gesprek, niet als eindoordeel",
        "Combineer kwantitatieve data met kwalitatieve observaties",
        "Betrek leerlingen bij hun eigen data en doelen",
        "Maak data visueel en begrijpelijk voor alle stakeholders",
        "Focus op trends, niet op losse meetpunten"
      ],
      verdieping: [
        {
          titel: "Learning Analytics",
          inhoud: "Hoe kunnen digitale tools helpen bij het verzamelen en analyseren van leerdata?",
          voorbeelden: ["Adaptieve software", "Dashboard ontwikkeling", "Predictive modeling"]
        },
        {
          titel: "Evidence-based onderwijs",
          inhoud: "Hoe gebruik je onderzoek en data om onderwijsbeslissingen te onderbouwen?",
          voorbeelden: ["Randomized Controlled Trials", "Meta-analyses", "Praktijkonderzoek"]
        }
      ]
    },
    leeractiviteiten: [
      {
        titel: "Data Detective",
        beschrijving: "Analyseer LVS-data en ontdek wat de cijfers echt vertellen",
        type: "analyse",
        startVraag: "Je ziet dat de rekenprestaties in groep 4 zijn gedaald. Wat zou je willen weten?",
        context: "Je leert data kritisch interpreteren en vragen stellen",
        stappen: [
          "Bekijk de ruwe data en eerste indrukken",
          "Stel verdiepende vragen over context",
          "Zoek naar patronen en trends",
          "Vergelijk met andere data (observaties, gesprekken)",
          "Formuleer hypotheses over oorzaken",
          "Ontwerp interventies om te testen"
        ],
        eindproduct: "Een data-analyse rapport met aanbevelingen voor actie"
      },
      {
        titel: "PDCA Praktijkproject",
        beschrijving: "Voer een complete verbetercyclus uit in je eigen onderwijspraktijk",
        type: "toepassing",
        startVraag: "Welk aspect van je onderwijs zou je graag willen verbeteren en hoe ga je dat meten?",
        context: "Je past de PDCA-cyclus toe op een echte onderwijsuitdaging",
        stappen: [
          "Plan: Identificeer probleem en stel SMART-doel",
          "Plan: Ontwerp interventie en meetstrategie",
          "Do: Voer interventie uit en verzamel data",
          "Check: Analyseer resultaten en effectiviteit",
          "Act: Besluit over voortzetting, aanpassing of stoppen",
          "Reflecteer op het hele proces"
        ],
        eindproduct: "Een complete PDCA-cyclus documentatie met lessen geleerd"
      }
    ],
    bronnen: [
      "PO-Raad 'Werken met Data' toolkit",
      "Cito LVS Handleiding",
      "Inspectie van het Onderwijs - Kwaliteitsindicatoren",
      "Scheerens, J. - School Effectiveness Research"
    ],
    completed: false,
    hasDocumentUpload: true,
    hasRichContent: true,
    richContentType: 'data-examples',
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
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'leeractiviteiten' | 'verrijkt' | 'visueel'>('overzicht')
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
      { id: 'theorie', label: '📚 Theorie & Verdieping', icon: '📚' },
      { id: 'leeractiviteiten', label: '🎯 Leeractiviteiten', icon: '🎯' }
    ]

    // Add rich content tab if module has it
    if (selectedModule.hasRichContent) {
      const richContentLabels = {
        'kerndoelen': '📖 Alle 58 Kerndoelen',
        'theories': '🧠 Ontwikkelingstheorieën',
        'sel-methods': '🤝 SEL-Methodieken',
        'data-examples': '📊 Data Voorbeelden',
        'skills-assessment': '🌟 Vaardigheden Assessment',
        'leadership-tools': '👑 Leiderschapstools'
      }
      tabs.push({ 
        id: 'verrijkt', 
        label: richContentLabels[selectedModule.richContentType!] || '📖 Verrijkte Inhoud',
        icon: '📖' 
      })
    }

    // Add visual tab if module has visual components
    if (selectedModule.visualComponents && selectedModule.visualComponents.length > 0) {
      tabs.push({ id: 'visueel', label: '📊 Visuele Voorbeelden', icon: '📊' })
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

                  {/* Leeractiviteiten Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Leeractiviteiten met AI-begeleiding</h3>
                    <div className="grid gap-4">
                      {selectedModule.leeractiviteiten.map((activiteit, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{activiteit.titel}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activiteit.type === 'reflectie' ? 'bg-purple-100 text-purple-800' :
                              activiteit.type === 'analyse' ? 'bg-blue-100 text-blue-800' :
                              activiteit.type === 'ontwerp' ? 'bg-green-100 text-green-800' :
                              activiteit.type === 'onderzoek' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {activiteit.type}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{activiteit.beschrijving}</p>
                          <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500 mb-3">
                            <p className="text-sm font-medium text-blue-700 mb-1">🤔 Startvraag:</p>
                            <p className="text-blue-800 italic text-sm">"{activiteit.startVraag}"</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('leeractiviteiten')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Start activiteit met AI-begeleiding →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bronnen */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📖 Bronnen & Literatuur</h3>
                    <div className="space-y-2">
                      {selectedModule.bronnen.map((bron, index) => (
                        <div key={index} className="flex items-center space-x-2 text-blue-600">
                          <span>🔗</span>
                          <span className="text-sm">{bron}</span>
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
                            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 mb-4">
                              <p className="text-sm font-medium text-blue-700 mb-1">💡 Praktijkvoorbeeld:</p>
                              <p className="text-gray-600 italic">{concept.voorbeeld}</p>
                            </div>
                          )}
                          {concept.bronnen && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-blue-700 mb-1">📚 Bronnen:</p>
                              <ul className="space-y-1">
                                {concept.bronnen.map((bron, bIndex) => (
                                  <li key={bIndex} className="text-xs text-blue-600">• {bron}</li>
                                ))}
                              </ul>
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

                  {/* Verdieping */}
                  {selectedModule.theorie.verdieping && selectedModule.theorie.verdieping.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 Verdieping</h3>
                      <div className="space-y-4">
                        {selectedModule.theorie.verdieping.map((verdieping, index) => (
                          <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2">{verdieping.titel}</h4>
                            <p className="text-purple-700 mb-3">{verdieping.inhoud}</p>
                            <div>
                              <p className="text-sm font-medium text-purple-700 mb-1">Voorbeelden:</p>
                              <ul className="space-y-1">
                                {verdieping.voorbeelden.map((voorbeeld, vIndex) => (
                                  <li key={vIndex} className="text-sm text-purple-600">• {voorbeeld}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'leeractiviteiten' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">🎯 Leeractiviteiten met AI-begeleiding</h3>
                    <p className="text-green-100">
                      Elke activiteit wordt begeleid door een AI-mentor die je stap voor stap helpt met de socratische methode
                    </p>
                  </div>

                  {selectedModule.leeractiviteiten.map((activiteit, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-800">{activiteit.titel}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activiteit.type === 'reflectie' ? 'bg-purple-100 text-purple-800' :
                          activiteit.type === 'analyse' ? 'bg-blue-100 text-blue-800' :
                          activiteit.type === 'ontwerp' ? 'bg-green-100 text-green-800' :
                          activiteit.type === 'onderzoek' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {activiteit.type}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{activiteit.beschrijving}</p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">📋 Stappen:</h5>
                          <ol className="space-y-2">
                            {activiteit.stappen.map((stap, sIndex) => (
                              <li key={sIndex} className="flex items-start space-x-2 text-sm">
                                <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {sIndex + 1}
                                </span>
                                <span className="text-gray-700">{stap}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">🎯 Eindproduct:</h5>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <p className="text-green-800 text-sm">{activiteit.eindproduct}</p>
                          </div>
                        </div>
                      </div>

                      {/* AI Chat Integration */}
                      <div className="border-t border-gray-200 pt-6">
                        <SocraticChatBot 
                          module={selectedModule.title}
                          opdrachten={[{
                            titel: activiteit.titel,
                            beschrijving: activiteit.beschrijving,
                            type: activiteit.type,
                            startVraag: activiteit.startVraag,
                            context: activiteit.context
                          }]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'verrijkt' && selectedModule.hasRichContent && (
                <div>
                  {selectedModule.richContentType === 'kerndoelen' && <KerndoelenViewer />}
                  {selectedModule.richContentType === 'theories' && <DevelopmentTheoryViewer />}
                  {selectedModule.richContentType === 'sel-methods' && <SELMethodsViewer />}
                  {selectedModule.richContentType === 'data-examples' && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">📊 Data Interpretatie Voorbeelden</h3>
                        <p className="text-indigo-100">
                          Leer herkennen en interpreteren van echte data uit het onderwijs
                        </p>
                      </div>
                      {selectedModule.visualComponents?.map((component, index) => {
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
                </div>
              )}

              {activeTab === 'visueel' && selectedModule.visualComponents && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">📊 Visuele Voorbeelden</h3>
                    <p className="text-purple-100">
                      Praktische voorbeelden en visualisaties uit het onderwijs
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
                      <span className="mr-2">🎯</span>
                      <span>{module.leeractiviteiten.length} leeractiviteiten</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">🤖</span>
                      <span>AI-begeleide leeractiviteiten</span>
                    </div>
                    {module.hasRichContent && (
                      <div className="flex items-center text-sm text-purple-600">
                        <span className="mr-2">📖</span>
                        <span>Uitgebreide theorie</span>
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
              <span>🤖 AI-begeleide leeractiviteiten</span>
              <span>•</span>
              <span>📚 Schoolspecifiek leren</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}