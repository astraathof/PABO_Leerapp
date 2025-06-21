'use client'

import { useState } from 'react'
import SocraticChatBot from './SocraticChatBot'
import DocumentManager from './DocumentManager'
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
  visualComponents?: React.ReactNode[]
}

const modules: Module[] = [
  {
    id: 1,
    title: "Doorlopende Leerlijnen & Kerncurriculum",
    description: "Leer de 58 kerndoelen kennen en koppel deze aan leerlijnen en jaarplanningen",
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
    visualComponents: [
      <LearningLineVisual 
        key="rekenen-leerlijn"
        subject="Rekenen - Getalbegrip"
        progression={[
          {
            grade: "1-2",
            skills: ["Tellen tot 20", "Herkennen van cijfers", "Meer/minder vergelijken"],
            example: "Kinderen tellen speelgoed en zeggen welke stapel meer heeft"
          },
          {
            grade: "3-4", 
            skills: ["Getallen tot 100", "Optellen en aftrekken", "Tiental overgangen"],
            example: "27 + 15 = ? met behulp van materiaal en hoofdrekenen"
          },
          {
            grade: "5-6",
            skills: ["Getallen tot 10.000", "Vermenigvuldigen en delen", "Kommagetallen"],
            example: "3,5 × 4 = ? en uitleggen waarom het antwoord 14 is"
          },
          {
            grade: "7-8",
            skills: ["Getallen tot 1.000.000", "Breuken en procenten", "Verhoudingen"],
            example: "25% van 80 berekenen en koppelen aan ¼ van 80"
          }
        ]}
      />
    ]
  },
  {
    id: 2,
    title: "Pedagogisch Handelen & Kindontwikkeling",
    description: "Begrijp ontwikkelingstheorieën en pas deze toe in je pedagogische handelen",
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
        },
        {
          naam: "EDI (Explicit Direct Instruction)",
          uitleg: "Gestructureerde lesmethode: lesdoel → voorkennis → modeleren → begeleid oefenen → zelfstandig werken → afsluiting.",
          voorbeeld: "Les staartdeling: 'Vandaag leren we delen door 12' → voorkennis tafels → stappen voordoen → samen oefenen → zelfstandig → evaluatie"
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
        titel: "Scaffolding Meester",
        beschrijving: "Ontwerp een scaffolding-plan voor een moeilijk onderwerp",
        type: "ontwerp",
        startVraag: "Welk onderwerp vinden kinderen in jouw ervaring het moeilijkst? Hoe zou je dat stap voor stap kunnen opbouwen?",
        context: "Je maakt een concreet scaffolding-plan"
      },
      {
        titel: "Veilige Klas Creator",
        beschrijving: "Ontwerp een klassenomgeving die veiligheid en leren bevordert",
        type: "toepassing",
        startVraag: "Wat maakt volgens jou dat kinderen zich veilig voelen in de klas? Denk aan fysieke ruimte, regels, en sfeer.",
        context: "Je ontwerpt een veilige leeromgeving"
      }
    ],
    bronnen: ["G. Marzano, Classroom Management", "John Hattie, Visible Learning"],
    completed: false,
    visualComponents: [
      <SELDevelopmentChart 
        key="piaget-stages"
        stages={[
          {
            age: "2-7 jaar (Groep 1-4)",
            stage: "Preoperationeel",
            characteristics: [
              "Symbolisch denken ontwikkelt zich",
              "Egocentrisme: moeilijk andermans perspectief innemen",
              "Animisme: levenloze voorwerpen hebben gevoelens",
              "Geen begrip van behoud (conservatie)"
            ],
            interventions: [
              "Gebruik concrete materialen en voorwerpen",
              "Geef veel voorbeelden en herhaling",
              "Laat kinderen zelf ontdekken en experimenteren",
              "Gebruik verhalen en rollenspel voor begrip"
            ]
          },
          {
            age: "7-11 jaar (Groep 5-8)",
            stage: "Concreet Operationeel", 
            characteristics: [
              "Logisch denken over concrete situaties",
              "Begrip van behoud (conservatie)",
              "Kunnen classificeren en ordenen",
              "Reversibiliteit: begrijpen dat acties omgekeerd kunnen"
            ],
            interventions: [
              "Gebruik concrete voorbeelden bij abstracte concepten",
              "Laat kinderen zelf regels en patronen ontdekken",
              "Geef stap-voor-stap instructies",
              "Gebruik manipulatieve materialen bij wiskunde"
            ]
          }
        ]}
      />
    ]
  },
  {
    id: 3,
    title: "Sociaal-Emotionele Ontwikkeling & Klassenklimaat",
    description: "Creëer een positief klassenklimaat en ondersteun SEL-ontwikkeling",
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
        },
        {
          naam: "Kanjertraining",
          uitleg: "Methodiek gericht op zelfvertrouwen, sociale vaardigheden en weerbaarheid. Gebruikt 'Kanjertaal' en concrete oefeningen.",
          voorbeeld: "'Ik vind het niet leuk als je...' in plaats van schelden of wegrennen"
        },
        {
          naam: "Interventie-trias",
          uitleg: "Universeel (hele klas), selectief (risicogroep), geïndiceerd (individueel). Preventie naar behandeling.",
          voorbeeld: "Universeel: klassengesprek over vriendschap. Selectief: sociale vaardigheidstraining. Geïndiceerd: individuele begeleiding"
        },
        {
          naam: "Tuckman Groepsvorming",
          uitleg: "Vier fasen: forming (kennismaking), storming (conflict), norming (regels), performing (samenwerking).",
          voorbeeld: "Nieuwe klas: eerst leuk en aardig → dan ruzies → samen regels maken → goed samenwerken"
        }
      ],
      praktijktips: [
        "Start elke dag met een positieve begroeting van elk kind",
        "Gebruik 'time-in' in plaats van 'time-out' voor verbinding",
        "Leer kinderen gevoelens benoemen met gevoelensthermometer",
        "Creëer rituelen voor overgangen en moeilijke momenten"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "SEL-Methode Verkenner",
        beschrijving: "Vergelijk verschillende SEL-methodieken en kies de beste voor jouw context",
        type: "analyse",
        startVraag: "Denk aan een klas die je kent. Welke sociale uitdagingen zie je daar? Wat hebben die kinderen het meest nodig?",
        context: "Je verkent welke SEL-aanpak past bij specifieke klassenbehoeften"
      },
      {
        titel: "Klassenklimaat Architect",
        beschrijving: "Ontwerp een plan voor positief klassenklimaat vanaf dag 1",
        type: "ontwerp", 
        startVraag: "Je krijgt een nieuwe klas. Hoe zorg je ervoor dat kinderen zich vanaf de eerste dag welkom en veilig voelen?",
        context: "Je maakt een concreet plan voor klassenklimaat"
      },
      {
        titel: "Conflict Oplosser",
        beschrijving: "Ontwikkel strategieën voor het oplossen van sociale conflicten",
        type: "toepassing",
        startVraag: "Twee kinderen hebben ruzie op het plein. Hoe pak je dit aan? Wat is je eerste stap?",
        context: "Je oefent met conflictoplossing in verschillende scenario's"
      }
    ],
    bronnen: ["Kanjertraining.nl", "NJi Dossier SEL"],
    completed: false,
    visualComponents: [
      <SELDevelopmentChart 
        key="sel-development"
        stages={[
          {
            age: "4-6 jaar",
            stage: "Basis Emotieherkenning",
            characteristics: [
              "Herkennen van basisemoties (blij, boos, verdrietig)",
              "Leren emoties benoemen",
              "Eerste zelfregulatie strategieën",
              "Empathie ontwikkelt zich"
            ],
            interventions: [
              "Gevoelensthermometer gebruiken",
              "Emoties benoemen in verhalen",
              "Ademhalingsoefeningen aanleren",
              "Modelgedrag tonen"
            ]
          },
          {
            age: "7-9 jaar",
            stage: "Sociale Vaardigheden",
            characteristics: [
              "Complexere emoties herkennen",
              "Vriendschappen worden belangrijker",
              "Conflictoplossing vaardigheden",
              "Groepsregels begrijpen"
            ],
            interventions: [
              "Kanjertraining technieken",
              "Klassengesprekken over vriendschap",
              "Rollenspel voor conflictoplossing",
              "Complimenten rituelen"
            ]
          },
          {
            age: "10-12 jaar",
            stage: "Zelfstandigheid & Verantwoordelijkheid",
            characteristics: [
              "Zelfbeeld wordt belangrijker",
              "Peer pressure neemt toe",
              "Moreel redeneren ontwikkelt",
              "Toekomstgericht denken"
            ],
            interventions: [
              "Leerling-mentorgesprekken",
              "Democratische klassenraad",
              "Dilemma discussies",
              "Doelen stellen en evalueren"
            ]
          }
        ]}
      />
    ]
  },
  {
    id: 4,
    title: "Didactisch Ontwerp & Differentiatie",
    description: "Ontwerp lessen die aansluiten bij alle leerlingen door slimme differentiatie",
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
        },
        {
          naam: "Divergente Differentiatie", 
          uitleg: "Leerlingen werken aan verschillende doelen op hun eigen niveau binnen hetzelfde thema.",
          voorbeeld: "Thema 'dieren': groep A leest prentenboek, groep B schrijft verslag, groep C maakt presentatie"
        },
        {
          naam: "Taxonomie van Bloom",
          uitleg: "Zes niveaus van denken: onthouden, begrijpen, toepassen, analyseren, evalueren, creëren. Van simpel naar complex.",
          voorbeeld: "Verhaal: onthouden (wie?), begrijpen (waarom?), toepassen (ander einde), analyseren (thema), evalueren (beoordelen), creëren (eigen verhaal)"
        },
        {
          naam: "Formatief Handelen",
          uitleg: "Voortdurend checken of leerlingen het begrijpen en aanpassen van onderwijs op basis van feedback.",
          voorbeeld: "Duimpje omhoog/omlaag, exitticket, 3-2-1 (3 dingen geleerd, 2 vragen, 1 tip)"
        },
        {
          naam: "UDL (Universal Design for Learning)",
          uitleg: "Onderwijs ontwerpen dat toegankelijk is voor alle leerlingen: meerdere manieren van presenteren, betrokkenheid en expressie.",
          voorbeeld: "Informatie: tekst + plaatjes + video. Betrokkenheid: keuze in onderwerp. Expressie: tekst, tekening of presentatie"
        }
      ],
      praktijktips: [
        "Start met kerngroep (60%), dan uitbreiding naar zwakke en sterke leerlingen",
        "Gebruik 'must, should, could' voor verschillende niveaus",
        "Geef keuze in werkvormen maar niet in leerdoelen",
        "Check begrip om de 10 minuten met snelle assessment"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Differentiatie Designer",
        beschrijving: "Ontwerp een les met meerdere niveaus voor verschillende leerlingen",
        type: "ontwerp",
        startVraag: "Kies een onderwerp dat je wilt gaan onderwijzen. Welke verschillen verwacht je tussen leerlingen in jouw klas?",
        context: "Je ontwerpt een gedifferentieerde les stap voor stap"
      },
      {
        titel: "Bloom's Ladder Bouwer",
        beschrijving: "Maak vragen en opdrachten op alle niveaus van Bloom's taxonomie",
        type: "toepassing",
        startVraag: "Denk aan een les die je hebt gegeven. Welke vragen stelde je? Op welk niveau van Bloom waren die?",
        context: "Je maakt een complete vragenladder voor een onderwerp"
      },
      {
        titel: "Formatieve Check Master",
        beschrijving: "Ontwikkel manieren om voortdurend te checken of leerlingen het begrijpen",
        type: "toepassing",
        startVraag: "Hoe merk je tijdens een les of kinderen het begrijpen? Wat zijn signalen dat je moet bijsturen?",
        context: "Je ontwikkelt een toolkit voor formatieve evaluatie"
      }
    ],
    bronnen: ["SLO Differentiatiegids", "F. Wiliam, Embedded Formative Assessment"],
    completed: false,
    visualComponents: [
      <DifferentiationMatrix 
        key="differentiation-example"
        activities={[
          {
            level: "Zwakke leerlingen",
            must: "Herken breuken ½, ¼ met plaatjes",
            should: "Vergelijk ½ en ¼ met materiaal",
            could: "Leg uit waarom ½ > ¼"
          },
          {
            level: "Gemiddelde leerlingen", 
            must: "Reken uit: ½ + ¼ met plaatjes",
            should: "Los op: ¾ - ¼ zelfstandig",
            could: "Maak eigen breukensommen"
          },
          {
            level: "Sterke leerlingen",
            must: "Reken breuken op tot tienden",
            should: "Vergelijk breuken en decimalen",
            could: "Ontwerp breukspel voor klasgenoten"
          }
        ]}
      />
    ]
  },
  {
    id: 5,
    title: "Data-geïnformeerd Werken & Kwaliteitszorg",
    description: "Gebruik data om onderwijs te verbeteren en kwaliteit te borgen",
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
        },
        {
          naam: "PDCA-cyclus",
          uitleg: "Plan (wat willen we?), Do (uitvoeren), Check (evalueren), Act (bijsturen). Cyclus voor continue verbetering.",
          voorbeeld: "Plan: verhoog rekenprestaties. Do: extra rekenles. Check: toetsresultaten. Act: aanpassen methode"
        },
        {
          naam: "SMART-doelen",
          uitleg: "Specifiek, Meetbaar, Acceptabel, Realistisch, Tijdgebonden. Zorgt voor heldere en haalbare doelstellingen.",
          voorbeeld: "80% van groep 6 behaalt eind schooljaar minimaal niveau 2F voor begrijpend lezen (was 65%)"
        },
        {
          naam: "Trendanalyse",
          uitleg: "Ontwikkeling van prestaties over meerdere meetmomenten bekijken om patronen te herkennen.",
          voorbeeld: "Rekenen groep 5: sept 45% → jan 52% → juni 58% → positieve trend, maar nog onder gemiddelde"
        },
        {
          naam: "Onderzoekskader Inspectie 2024",
          uitleg: "Vier domeinen: onderwijsproces, onderwijsresultaten, schoolklimaat, kwaliteitszorg. Basis voor schoolbeoordeling.",
          voorbeeld: "Kwaliteitszorg: heeft school systematiek voor evaluatie en verbetering van onderwijs?"
        }
      ],
      praktijktips: [
        "Bekijk data altijd in context: wat speelde er in de klas/school?",
        "Gebruik data voor gesprek, niet als oordeel over kind of leerkracht",
        "Combineer harde data met zachte informatie (observaties, gesprekken)",
        "Maak data visueel met grafieken voor ouders en team"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Data Detective",
        beschrijving: "Analyseer LVS-data en ontdek wat de cijfers echt vertellen",
        type: "analyse",
        startVraag: "Je ziet dat de rekenprestaties in groep 4 zijn gedaald. Wat zou je willen weten voordat je conclusies trekt?",
        context: "Je leert data kritisch interpreteren en vragen stellen"
      },
      {
        titel: "PDCA Planner",
        beschrijving: "Maak een verbeterplan met de PDCA-cyclus voor een concrete situatie",
        type: "toepassing",
        startVraag: "Stel je voor: de spellingresultaten van jouw groep zijn teleurstellend. Hoe pak je dit systematisch aan?",
        context: "Je past de PDCA-cyclus toe op een onderwijsprobleem"
      },
      {
        titel: "SMART Doel Maker",
        beschrijving: "Formuleer heldere, meetbare doelen voor onderwijsverbetering",
        type: "ontwerp",
        startVraag: "Wat wil je dit schooljaar bereiken met jouw leerlingen? Hoe zou je dat concreet kunnen formuleren?",
        context: "Je maakt SMART-doelen voor verschillende aspecten van onderwijs"
      }
    ],
    bronnen: ["PO-Raad 'Werken met Data' toolkit", "Inspectie OK/2024"],
    completed: false,
    visualComponents: [
      <LVSTrendChart 
        key="lvs-trend"
        subject="Begrijpend Lezen Groep 6"
        data={[
          { month: "Sept", percentage: 45, target: 70 },
          { month: "Jan", percentage: 52, target: 70 },
          { month: "Juni", percentage: 58, target: 70 }
        ]}
      />
    ]
  },
  {
    id: 6,
    title: "Innovatie & 21e-eeuwse Vaardigheden",
    description: "Bereid leerlingen voor op de toekomst met moderne vaardigheden en innovatieve didactiek",
    leerdoelen: [
      "Benoem 12 vaardigheden (SLO-model) en integreer 3 in lesconcept",
      "Beschrijf innovatiecyclus (design thinking) voor schoolontwikkeling",
      "Overweeg digitale tools op didactische meerwaarde en privacy"
    ],
    theorie: {
      concepten: [
        {
          naam: "21e-eeuwse Vaardigheden (SLO)",
          uitleg: "12 vaardigheden in 4 categorieën: Denken (kritisch, creatief, probleemoplossend), Samenwerken (communiceren, samenwerken), Tools (ICT, informatie), Leven (flexibiliteit, initiatief, productiviteit, leiderschap).",
          voorbeeld: "Project 'Duurzame school': kritisch denken (energieverbruik analyseren), samenwerken (groepsplan), ICT (presentatie maken), initiatief (eigen ideeën)"
        },
        {
          naam: "Design Thinking",
          uitleg: "5 stappen: Empathize (begrijpen), Define (probleem definiëren), Ideate (ideeën), Prototype (testen), Test (evalueren). Cyclisch proces.",
          voorbeeld: "Probleem: kinderen bewegen te weinig. Empathize: interviews. Define: 'hoe maken we bewegen leuker?'. Ideate: brainstorm. Prototype: nieuwe spelletjes. Test: uitproberen"
        },
        {
          naam: "STEAM-onderwijs",
          uitleg: "Science, Technology, Engineering, Arts, Mathematics geïntegreerd. Interdisciplinair leren met echte problemen.",
          voorbeeld: "Project 'Brug bouwen': wiskunde (meten), techniek (constructie), kunst (ontwerp), natuurkunde (krachten), onderzoek (materialen)"
        },
        {
          naam: "Computational Thinking",
          uitleg: "Denken in patronen, abstractie, algoritmes en decompositie. Basis voor programmeren en probleemoplossen.",
          voorbeeld: "Recept maken: decompositie (stappen), patroon (herhaling), abstractie (algemene regel), algoritme (volgorde)"
        },
        {
          naam: "AVG en Privacy",
          uitleg: "Algemene Verordening Gegevensbescherming. Bescherming van persoonlijke data, vooral belangrijk bij kinderen onder 16.",
          voorbeeld: "Foto's van kinderen: toestemming ouders, geen herkenbare gezichten online, veilige opslag"
        }
      ],
      praktijktips: [
        "Start klein: integreer 1 21e-eeuwse vaardigheid per les",
        "Gebruik echte problemen uit de buurt/school voor projecten",
        "Laat kinderen zelf tools kiezen voor presentaties",
        "Evalueer niet alleen eindproduct maar ook proces en samenwerking"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "21e-eeuwse Vaardigheid Integrator",
        beschrijving: "Ontwerp een les die moderne vaardigheden natuurlijk integreert",
        type: "ontwerp",
        startVraag: "Denk aan een traditionele les die je vaak geeft. Welke 21e-eeuwse vaardigheden zou je daar natuurlijk in kunnen verweven?",
        context: "Je maakt een bestaande les toekomstbestendig"
      },
      {
        titel: "Design Thinking Facilitator",
        beschrijving: "Leid kinderen door een design thinking proces voor een echt probleem",
        type: "toepassing",
        startVraag: "Welk probleem ervaren kinderen in jullie school? Hoe zou je hen kunnen helpen dit systematisch aan te pakken?",
        context: "Je past design thinking toe met kinderen"
      },
      {
        titel: "Digitale Tool Evaluator",
        beschrijving: "Beoordeel digitale tools op didactische meerwaarde en veiligheid",
        type: "analyse",
        startVraag: "Je overweegt een nieuwe app voor in de klas. Waar let je op bij het maken van deze keuze?",
        context: "Je ontwikkelt criteria voor tool-selectie"
      }
    ],
    bronnen: ["Kennisnet Innovatiehub", "SLO 21-eeuwse vaardigheden"],
    completed: false,
    visualComponents: [
      <SkillsRadarChart 
        key="21st-century-skills"
        skills={[
          { name: "Kritisch denken", level: 3, description: "Informatie analyseren en evalueren" },
          { name: "Creativiteit", level: 4, description: "Originele ideeën en oplossingen bedenken" },
          { name: "Samenwerken", level: 5, description: "Effectief werken in teams" },
          { name: "Communiceren", level: 4, description: "Duidelijk ideeën overbrengen" },
          { name: "ICT-geletterdheid", level: 3, description: "Technologie effectief gebruiken" },
          { name: "Informatievaardigheden", level: 2, description: "Informatie zoeken en beoordelen" },
          { name: "Flexibiliteit", level: 3, description: "Aanpassen aan veranderingen" },
          { name: "Initiatief", level: 4, description: "Zelfstandig actie ondernemen" },
          { name: "Productiviteit", level: 3, description: "Efficiënt werken en resultaten behalen" },
          { name: "Leiderschap", level: 2, description: "Anderen inspireren en leiden" }
        ]}
      />
    ]
  },
  {
    id: 7,
    title: "Professioneel Leiderschap & Schoolplan",
    description: "Ontwikkel leiderschapsvaardigheden en begrijp schoolorganisatie",
    leerdoelen: [
      "Beschrijf Beroepsstandaard Schoolleider PO en koppel eigen competenties",
      "Analyseer schoolplan en begrijp cyclus van visie naar evaluatie",
      "Stel 100-dagenplan op met quick-wins en langetermijndoelen"
    ],
    theorie: {
      concepten: [
        {
          naam: "Beroepsstandaard Schoolleider PO",
          uitleg: "Zes competentiegebieden: visie en strategie, onderwijskundig leiderschap, organisatie en bedrijfsvoering, personeel en professionaliteit, externe oriëntatie, verantwoording.",
          voorbeeld: "Onderwijskundig leiderschap: schoolleider stimuleert teamontwikkeling, bewaakt onderwijskwaliteit, faciliteert innovatie"
        },
        {
          naam: "Schoolplan-cyclus",
          uitleg: "4-jarige cyclus: Visie → Ambities → Doelen → Acties → Evaluatie → Nieuwe visie. Basis voor schoolontwikkeling.",
          voorbeeld: "Visie: 'Elk kind telt'. Ambitie: 'Excellente zorg voor alle leerlingen'. Doel: '90% haalt referentieniveaus'. Actie: 'Invoering RTI-model'"
        },
        {
          naam: "Veranderkunde (Kotter)",
          uitleg: "8 stappen voor succesvolle verandering: urgentie, coalitie, visie, communicatie, empowerment, quick-wins, consolidatie, verankering.",
          voorbeeld: "Nieuwe rekenmethode: urgentie (slechte resultaten) → coalitie (rekenteam) → visie (beter rekenonderwijs) → communicatie (teamvergadering)"
        },
        {
          naam: "Distributief Leiderschap",
          uitleg: "Leiderschap verspreid over meerdere personen. Iedereen kan leider zijn op eigen expertise-gebied.",
          voorbeeld: "ICT-coördinator leidt digitalisering, intern begeleider leidt zorgvernieuwing, groepsleerkracht leidt vakgroep"
        },
        {
          naam: "100-dagenplan",
          uitleg: "Plan voor eerste 100 dagen in nieuwe functie. Combinatie van luisteren, leren, quick-wins en relaties opbouwen.",
          voorbeeld: "Dag 1-30: luisteren en observeren. Dag 31-60: eerste verbeteringen. Dag 61-100: structurele veranderingen inzetten"
        }
      ],
      praktijktips: [
        "Begin met luisteren voordat je veranderingen voorstelt",
        "Zoek bondgenoten die enthousiast zijn over vernieuwing",
        "Vier kleine successen om momentum te behouden",
        "Investeer in relaties met alle stakeholders"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Leiderschapscompetentie Mapper",
        beschrijving: "Analyseer je eigen leiderschapsvaardigheden en ontwikkelpunten",
        type: "reflectie",
        startVraag: "Denk aan een moment waarop je leiding hebt gegeven (project, groep, situatie). Wat ging goed en wat zou je anders doen?",
        context: "Je reflecteert op eigen leiderschapsstijl en competenties"
      },
      {
        titel: "Schoolplan Analist",
        beschrijving: "Analyseer een schoolplan en begrijp de samenhang tussen onderdelen",
        type: "analyse",
        startVraag: "Als je een schoolplan leest, waar kijk je dan het eerst naar? Wat vertelt dat over de school?",
        context: "Je leert schoolplannen kritisch lezen en begrijpen"
      },
      {
        titel: "Verandering Architect",
        beschrijving: "Ontwerp een veranderproces voor een concrete schoolverbetering",
        type: "ontwerp",
        startVraag: "Stel je voor: je school wil meer aandacht voor welbevinden van leerlingen. Hoe zou je zo'n verandering aanpakken?",
        context: "Je past veranderkunde toe op een schoolsituatie"
      }
    ],
    bronnen: ["Schoolleidersregister", "Kotter, Leading Change"],
    completed: false,
    visualComponents: [
      <LeadershipDashboard 
        key="leadership-kpis"
        metrics={[
          { title: "Tevredenheid Team", value: "8.2/10", trend: "up", color: "bg-green-600" },
          { title: "Leerlingresultaten", value: "78%", trend: "up", color: "bg-blue-600" },
          { title: "Oudertevredenheid", value: "7.9/10", trend: "stable", color: "bg-yellow-600" },
          { title: "Innovatieprojecten", value: "5 actief", trend: "up", color: "bg-purple-600" }
        ]}
      />
    ]
  },
  {
    id: 8,
    title: "Burgerschap & (AI-)Digitale Geletterdheid",
    description: "Bereid kinderen voor op digitale samenleving en actief burgerschap",
    leerdoelen: [
      "Benoem wettelijke burgerschapsdoelen PO en inspectienormen 2025-2026",
      "Koppel burgerschapsdoelen aan leerlijnen taal, rekenen en 21e-eeuwse vaardigheden",
      "Integreer mediawijsheid en AI-geletterdheid in les of project",
      "Formuleer indicatoren voor burgerschap op alle niveaus"
    ],
    theorie: {
      concepten: [
        {
          naam: "Wet Burgerschapsonderwijs 2024",
          uitleg: "Wettelijke verplichting voor scholen om burgerschap te onderwijzen. Focus op democratische waarden, sociale cohesie en actief burgerschap.",
          voorbeeld: "Kinderen leren over verkiezingen door klassenverkiezingen, begrijpen regels door klassenregels maken"
        },
        {
          naam: "Inspectienormen Burgerschap 2025-2026",
          uitleg: "Verscherpte eisen: school heeft visie op burgerschap, curriculum is uitgewerkt, leerkrachten zijn bekwaam, resultaten worden gemonitord.",
          voorbeeld: "School moet aantonen hoe burgerschap in alle vakken wordt geïntegreerd, niet alleen als apart vak"
        },
        {
          naam: "Mediawijsheid Competentiemodel",
          uitleg: "Vier competenties: gebruiken (technische vaardigheden), begrijpen (hoe media werken), creëren (eigen content), participeren (verantwoord meedoen).",
          voorbeeld: "Groep 6 maakt nieuwsbericht: gebruiken (camera), begrijpen (wat is nieuws?), creëren (filmpje), participeren (delen met school)"
        },
        {
          naam: "AI-geletterdheid voor Kinderen",
          uitleg: "Begrijpen wat AI is, hoe het werkt, voordelen en risico's. UNESCO framework: AI herkennen, begrijpen, evalueren, toepassen.",
          voorbeeld: "Kinderen ontdekken AI in hun leven: Siri, YouTube-aanbevelingen, spelletjes. Bespreken: hoe 'leert' AI? Wat zijn risico's?"
        },
        {
          naam: "Digitale Geletterdheid (SLO)",
          uitleg: "ICT-basisvaardigheden, informatievaardigheden, mediawijsheid, computational thinking. Geïntegreerd in alle vakken.",
          voorbeeld: "Werkstuk maken: zoeken (informatievaardigheid), selecteren (kritisch denken), presenteren (ICT-vaardigheden), delen (mediawijsheid)"
        },
        {
          naam: "Data-bias en Algoritme-ethiek",
          uitleg: "AI-systemen kunnen vooroordelen bevatten. Kinderen leren kritisch kijken naar automatische beslissingen.",
          voorbeeld: "Waarom krijg je bepaalde advertenties? Waarom toont zoekresultaat dit eerst? Hoe kan AI oneerlijk zijn?"
        }
      ],
      praktijktips: [
        "Verbind burgerschap aan actuele gebeurtenissen en kinderervaringen",
        "Gebruik school als oefenplaats voor democratie (klassenraad, schoolparlement)",
        "Laat kinderen zelf media maken om te begrijpen hoe het werkt",
        "Bespreek AI-voorbeelden uit kinderleven (spelletjes, apps, robots)"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Burgerschap Curriculum Designer",
        beschrijving: "Ontwerp een burgerschapscurriculum dat voldoet aan wettelijke eisen",
        type: "ontwerp",
        startVraag: "Hoe zou je kinderen willen voorbereiden op hun rol als burger? Wat vind je het belangrijkst dat ze leren?",
        context: "Je maakt een concreet burgerschapsplan voor een basisschool"
      },
      {
        titel: "AI-Detective voor Kids",
        beschrijving: "Ontwikkel lessen waarin kinderen AI leren herkennen en begrijpen",
        type: "toepassing",
        startVraag: "Een kind vraagt: 'Hoe weet Siri wat ik bedoel?' Hoe leg je uit wat AI is op kindniveau?",
        context: "Je maakt AI-geletterdheid toegankelijk voor basisschoolkinderen"
      },
      {
        titel: "Mediawijsheid Project Maker",
        beschrijving: "Creëer een project waarin kinderen alle mediawijsheid-competenties ontwikkelen",
        type: "ontwerp",
        startVraag: "Kinderen maken veel gebruik van sociale media en YouTube. Hoe help je hen kritische mediagebruikers te worden?",
        context: "Je ontwerpt een praktisch mediawijsheidsproject"
      }
    ],
    bronnen: ["SLO Burgerschapscurriculum", "Mediawijsheid.nl", "UNESCO AI Education"],
    completed: false
  },
  {
    id: 9,
    title: "Schoolleiderschap - Resultaatsturing & Lesobservatie",
    description: "Leer sturen op resultaten en voer effectieve lesobservaties uit",
    leerdoelen: [
      "Interpreteer Cito-scores en LVS-data voor schoolsturing",
      "Voer effectieve lesobservaties uit met EDI-kijkwijzers",
      "Geef constructieve feedback die ontwikkeling stimuleert",
      "Koppel observaties aan schoolbrede verbeterdoelen"
    ],
    theorie: {
      concepten: [
        {
          naam: "Cito-score Interpretatie",
          uitleg: "Cito-scores geven inzicht in prestaties per niveau (A-E) en referentieniveaus (1F, 1S, 2F). Vergelijking met landelijke percentages toont relatieve positie.",
          voorbeeld: "Rekenen Groep 6: 8% niveau A (landelijk 5%) = zorgelijk. 65% niveau C+ (landelijk 75%) = onder gemiddelde. Actie: extra ondersteuning niveau A/B."
        },
        {
          naam: "LVS Dashboard Analyse",
          uitleg: "Leerling Volg Systeem toont trends op school-, groeps- en leerlingniveau. Drie meetmomenten per jaar voor trendanalyse.",
          voorbeeld: "Begrijpend lezen trend: sept 45% → jan 52% → juni 58%. Positieve ontwikkeling, maar nog onder streefniveau 70%."
        },
        {
          naam: "EDI Lesobservatie Model",
          uitleg: "Explicit Direct Instruction observatie: 5 fasen met specifieke aandachtspunten en scoringscriteria per fase.",
          voorbeeld: "Fase 1 (Lesdoel): Score 4 = doel helder gecommuniceerd + gekoppeld aan voorkennis + leerlingen begrijpen wat ze gaan leren."
        },
        {
          naam: "GROW Feedback Model",
          uitleg: "Goal (doel), Reality (werkelijkheid), Options (opties), Way forward (vervolgstappen). Structuur voor ontwikkelingsgerichte gesprekken.",
          voorbeeld: "Goal: 'Wat wil je bereiken met differentiatie?' Reality: 'Wat zag ik in je les?' Options: 'Welke mogelijkheden zie je?' Way: 'Wat ga je concreet doen?'"
        },
        {
          naam: "Interventie Mapping",
          uitleg: "Systematisch koppelen van data-uitkomsten aan concrete interventies op leerling-, groeps- en schoolniveau.",
          voorbeeld: "Data: 30% groep 4 onder 1F rekenen → Interventie: dagelijkse 15 min extra rekenen + ouderbetrokkenheid + IB-begeleiding."
        }
      ],
      praktijktips: [
        "Gebruik data als startpunt voor gesprek, niet als eindoordeel",
        "Observeer minimaal 20 minuten voor betrouwbaar beeld",
        "Geef binnen 48 uur feedback na observatie",
        "Koppel observaties aan schoolbrede ontwikkeldoelen",
        "Maak afspraken SMART en controleerbaar"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Cito Data Analist",
        beschrijving: "Analyseer echte Cito-resultaten en bepaal interventies",
        type: "analyse",
        startVraag: "Je ziet deze Cito-resultaten voor groep 6 rekenen: A=8%, B=27%, C=40%, D=20%, E=5%. Landelijk: A=5%, B=20%, C=45%, D=25%, E=5%. Wat valt je op?",
        context: "Je leert data kritisch interpreteren en actieplannen maken"
      },
      {
        titel: "EDI Observatie Master",
        beschrijving: "Oefen met lesobservatie en feedback geven",
        type: "toepassing",
        startVraag: "Je observeert een rekenles. De leerkracht begint direct met sommen zonder lesdoel te noemen. Hoe scoor je dit en welke feedback geef je?",
        context: "Je past EDI-kijkwijzer toe en oefent feedback geven"
      },
      {
        titel: "Schooldata Dashboard Designer",
        beschrijving: "Ontwerp overzichtelijke dashboards voor verschillende doelgroepen",
        type: "ontwerp",
        startVraag: "Je moet LVS-data presenteren aan het team. Welke informatie is het belangrijkst en hoe maak je het inzichtelijk?",
        context: "Je maakt data toegankelijk voor verschillende stakeholders"
      },
      {
        titel: "Interventie Strategist",
        beschrijving: "Koppel data aan concrete verbeteracties",
        type: "toepassing",
        startVraag: "De spellingresultaten van groep 5 zijn 3 jaar achtereen gedaald. Welke stappen zet je als schoolleider?",
        context: "Je ontwikkelt systematische verbeteraanpak"
      }
    ],
    bronnen: ["Cito Terugkoppeling Handleiding", "EDI Observatieprotocol", "GROW Coaching Model"],
    completed: false,
    visualComponents: [
      <CitoScoreChart 
        key="cito-example-1"
        title="📊 Cito Rekenen Groep 6 - Schooljaar 2023-2024"
        data={[
          { level: "A", percentage: 8, national: 5, color: "bg-red-500" },
          { level: "B", percentage: 27, national: 20, color: "bg-orange-500" },
          { level: "C", percentage: 40, national: 45, color: "bg-yellow-500" },
          { level: "D", percentage: 20, national: 25, color: "bg-green-500" },
          { level: "E", percentage: 5, national: 5, color: "bg-blue-500" }
        ]}
        explanation="⚠️ Zorgpunt: Te veel leerlingen op niveau A (8% vs 5% landelijk). Positief: Minder leerlingen op niveau B dan landelijk gemiddelde. Actie: Gerichte interventie voor niveau A leerlingen."
      />,
      <CitoScoreChart 
        key="cito-example-2"
        title="📈 Cito Begrijpend Lezen Groep 8 - Vergelijking 3 jaar"
        data={[
          { level: "1F-", percentage: 12, national: 15, color: "bg-red-600" },
          { level: "1F", percentage: 25, national: 30, color: "bg-orange-500" },
          { level: "1S", percentage: 35, national: 35, color: "bg-yellow-500" },
          { level: "2F", percentage: 28, national: 20, color: "bg-green-500" }
        ]}
        explanation="✅ Positief: Minder leerlingen onder 1F dan landelijk. Meer leerlingen op 2F niveau. School presteert boven landelijk gemiddelde. Behoud huidige aanpak."
      />,
      <EDIObservationCard 
        key="edi-example"
        phase="Fase 1: Lesdoel & Voorkennis"
        score={3}
        maxScore={4}
        criteria={[
          "Lesdoel wordt helder gecommuniceerd",
          "Lesdoel wordt gekoppeld aan voorkennis",
          "Leerlingen begrijpen wat ze gaan leren",
          "Succes criteria worden benoemd"
        ]}
        feedback="Goed: Lesdoel was helder en je koppelde aan vorige les. Verbeterpunt: Maak succes criteria explicieter zodat leerlingen weten wanneer ze het doel hebben behaald."
      />,
      <LVSTrendChart 
        key="lvs-spelling"
        subject="Spelling Groep 5"
        data={[
          { month: "Sept", percentage: 62, target: 75 },
          { month: "Jan", percentage: 58, target: 75 },
          { month: "Juni", percentage: 54, target: 75 }
        ]}
      />
    ]
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'chat'>('overzicht')
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [showDocumentManager, setShowDocumentManager] = useState(false)

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

  // Document Manager View
  if (showDocumentManager) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowDocumentManager(false)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  ← Terug naar modules
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">📚 Document Manager</h1>
                  <p className="text-gray-600 mt-1">Beheer al je schooldocumenten op één plek</p>
                </div>
              </div>
            </div>
          </div>

          <DocumentManager />
        </div>
      </div>
    )
  }

  // Module Detail View
  if (selectedModule) {
    const tabs = [
      { id: 'overzicht', label: '📋 Overzicht', icon: '📋' },
      { id: 'theorie', label: '📚 Theorie', icon: '📚' },
      { id: 'chat', label: '🤖 AI Begeleiding', icon: '🤖' }
    ]

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
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Module {selectedModule.id}: {selectedModule.title}
                  </h1>
                  <p className="text-gray-600 mt-1">{selectedModule.description}</p>
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
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
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

                  {/* Visual Learning Components */}
                  {selectedModule.visualComponents && selectedModule.visualComponents.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Visuele Leerondersteuning</h3>
                      <div className="space-y-6">
                        {selectedModule.visualComponents.map((component, index) => (
                          <div key={index}>
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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

                  {/* Visual Learning Components in Theory Tab */}
                  {selectedModule.visualComponents && selectedModule.visualComponents.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Visuele Voorbeelden & Modellen</h3>
                      <div className="space-y-6">
                        {selectedModule.visualComponents.map((component, index) => (
                          <div key={index}>
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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

  // Main Overview
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
          <div className="max-w-md mx-auto mb-6">
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

          {/* Document Manager Button */}
          <button
            onClick={() => setShowDocumentManager(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg"
          >
            📚 Beheer Schooldocumenten
          </button>
        </div>

        {/* Modules Grid */}
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
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {module.id}
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
                  <div className="flex items-center text-sm text-green-600">
                    <span className="mr-2">📚</span>
                    <span>Schooldocument integratie</span>
                  </div>
                  {module.visualComponents && module.visualComponents.length > 0 && (
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="mr-2">📊</span>
                      <span>Visuele leerondersteuning</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Start Module →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💜 Gemaakt voor PABO studenten • Interactief leren met AI-ondersteuning • Schoolspecifieke documenten • Visuele leerondersteuning
          </p>
        </div>
      </div>
    </div>
  )
}