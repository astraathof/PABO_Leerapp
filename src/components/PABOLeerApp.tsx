'use client'

import { useState } from 'react'
import SocraticChatBot from './SocraticChatBot'

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
    completed: false
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
    completed: false
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
    completed: false
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
    completed: false
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
          voorbeeld: "Rekenen groep 5: sept 45%, jan 52%, juni 58% → positieve trend, maar nog onder gemiddelde"
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
    completed: false
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
    completed: false
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
    completed: false
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
    title: "Schoolleiderschap: Resultaatsturing & Lesobservatie",
    description: "Leer sturen op resultaten met Cito-data, LVS-interpretatie en effectieve lesobservatie",
    leerdoelen: [
      "Interpreteer Cito-scores en LVS-data voor schoolsturing en interventies",
      "Voer effectieve lesobservaties uit met EDI-gebaseerde kijkwijzers",
      "Geef constructieve feedback die leerkrachtontwikkeling stimuleert",
      "Koppel observatieresultaten aan schoolbrede verbeterdoelen"
    ],
    theorie: {
      concepten: [
        {
          naam: "Cito-score Interpretatie",
          uitleg: "Cito-scores worden uitgedrukt in vaardigheidsniveaus (A t/m E) en percentielscores. Belangrijk is de ontwikkeling over tijd, niet alleen absolute scores.",
          voorbeeld: "Groep 6 Rekenen: 65% behaalt niveau C of hoger (landelijk gemiddelde 70%). Trend: vorig jaar 58% → verbetering zichtbaar, maar nog onder gemiddelde"
        },
        {
          naam: "LVS Trendanalyse",
          uitleg: "Leerling Volg Systeem toont ontwikkeling per leerling, groep en school over meerdere meetmomenten. Focus op groei, niet alleen eindniveau.",
          voorbeeld: "Leerling X: sept 25e percentiel → jan 35e percentiel → juni 45e percentiel. Positieve groei van 20 percentielpunten in 1 jaar"
        },
        {
          naam: "Referentieniveau Doorstroom",
          uitleg: "1F (basis), 1S (streef), 2F (havo/vwo). Minimaal 85% moet 1F halen, 65% moet 1S halen voor goede doorstroom naar VO.",
          voorbeeld: "School X: 92% haalt 1F rekenen (✓), maar slechts 58% haalt 1S (✗). Actie: versterking rekenonderwijs groep 7-8"
        },
        {
          naam: "EDI Lesobservatie Model",
          uitleg: "Explicit Direct Instruction observatie: Lesdoel helder? Voorkennis geactiveerd? Modeling effectief? Guided practice voldoende? Independent practice gedifferentieerd?",
          voorbeeld: "Observatie rekenen: Lesdoel onduidelijk (2/4), Modeling goed (4/4), Guided practice te kort (2/4) → Feedback: meer tijd voor begeleid oefenen"
        },
        {
          naam: "Feedback Gesprekstechnieken",
          uitleg: "GROW-model: Goal (wat wil je bereiken?), Reality (wat zie ik?), Options (wat zijn mogelijkheden?), Way forward (wat ga je doen?).",
          voorbeeld: "Goal: 'Meer differentiatie'. Reality: 'Ik zie één niveau opdrachten'. Options: 'Drie niveaus, keuzemenu, hulpkaarten'. Way: 'Volgende week drie niveaus proberen'"
        },
        {
          naam: "Schoolbrede Data-analyse",
          uitleg: "Combineer Cito, LVS, observaties en tevredenheidsonderzoeken voor compleet beeld. Zoek patronen en verbanden tussen verschillende databronnen.",
          voorbeeld: "Patroon: Groepen met hoge Cito-scores hebben ook hoge observatiescores op 'duidelijke instructie' → Focus op instructievaardigheden team"
        }
      ],
      praktijktips: [
        "Bespreek data altijd in context: wat speelde er in de klas/periode?",
        "Gebruik observaties voor ontwikkeling, niet voor beoordeling",
        "Geef binnen 48 uur na observatie feedback voor maximale impact",
        "Koppel individuele feedback aan schoolbrede verbeterdoelen",
        "Maak data visueel met grafieken en dashboards voor het team",
        "Train leerkrachten in data-interpretatie voor eigenaarschap"
      ]
    },
    interactieveOpdrachten: [
      {
        titel: "Cito Data Analist",
        beschrijving: "Analyseer echte Cito-resultaten en bepaal interventies voor schoolverbetering",
        type: "analyse",
        startVraag: "Je krijgt de Cito-resultaten van je school. Rekenen groep 6: 58% niveau C+, groep 8: 72% niveau C+. Wat valt je op en wat ga je onderzoeken?",
        context: "Je leert Cito-data kritisch interpreteren en actieplannen maken"
      },
      {
        titel: "EDI Observatie Master",
        beschrijving: "Voer een lesobservatie uit met EDI-kijkwijzer en geef constructieve feedback",
        type: "toepassing",
        startVraag: "Je observeert een rekenles. De leerkracht begint direct met sommen zonder uitleg. Hoe ga je dit bespreken in het feedbackgesprek?",
        context: "Je oefent met lesobservatie en feedbackgesprekken"
      },
      {
        titel: "Schooldata Dashboard Designer",
        beschrijving: "Ontwerp een dashboard dat alle relevante schooldata overzichtelijk toont",
        type: "ontwerp",
        startVraag: "Als schoolleider wil je in één oogopslag zien hoe je school presteert. Welke data zou je willen zien en hoe presenteer je dat?",
        context: "Je maakt een praktisch dashboard voor schoolsturing"
      },
      {
        titel: "Interventie Strategist",
        beschrijving: "Ontwikkel gerichte interventies op basis van data-analyse en observaties",
        type: "toepassing",
        startVraag: "Data toont: spelling groep 4 achterlopend, observaties tonen weinig expliciete instructie. Hoe pak je dit systematisch aan?",
        context: "Je koppelt data aan concrete verbeteracties"
      }
    ],
    bronnen: [
      "Cito Schoolrapportage Handleiding",
      "EDI Observatieprotocol (Hollingsworth & Ybarra)",
      "PO-Raad Data-dashboard voorbeelden",
      "Inspectie Onderzoekskader 2024"
    ],
    completed: false
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'chat' | 'tools'>('overzicht')
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

  // Schoolleider module tools
  const renderSchoolleiderTools = () => {
    if (selectedModule?.id !== 9) return null

    return (
      <div className="space-y-8">
        {/* Cito Score Voorbeelden */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Cito Score Voorbeelden & Interpretatie</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Voorbeeld 1: Rekenen */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">🔢 Rekenen Groep 6 - Voorjaar 2024</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Niveau A (zeer zwak):</span>
                  <span className="font-medium text-red-600">8% (landelijk: 5%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Niveau B (zwak):</span>
                  <span className="font-medium text-orange-600">27% (landelijk: 20%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Niveau C (voldoende):</span>
                  <span className="font-medium text-yellow-600">35% (landelijk: 40%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Niveau D (goed):</span>
                  <span className="font-medium text-green-600">22% (landelijk: 25%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Niveau E (zeer goed):</span>
                  <span className="font-medium text-green-700">8% (landelijk: 10%)</span>
                </div>
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>C+ (voldoende of hoger):</span>
                    <span className="text-red-600">65% (landelijk: 75%)</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-white rounded border-l-4 border-red-500">
                <p className="text-sm text-red-700">
                  <strong>Analyse:</strong> Te veel leerlingen in niveau A+B (35% vs 25% landelijk). 
                  Actie: Versterking basisvaardigheden en differentiatie nodig.
                </p>
              </div>
            </div>

            {/* Voorbeeld 2: Begrijpend Lezen */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">📖 Begrijpend Lezen Groep 8 - Voorjaar 2024</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Onder 1F:</span>
                  <span className="font-medium text-red-600">3% (landelijk: 8%)</span>
                </div>
                <div className="flex justify-between">
                  <span>1F (functioneel):</span>
                  <span className="font-medium text-orange-600">12% (landelijk: 15%)</span>
                </div>
                <div className="flex justify-between">
                  <span>1S (streefniveau):</span>
                  <span className="font-medium text-yellow-600">28% (landelijk: 32%)</span>
                </div>
                <div className="flex justify-between">
                  <span>2F (havo/vwo):</span>
                  <span className="font-medium text-green-600">57% (landelijk: 45%)</span>
                </div>
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>1F+ (functioneel of hoger):</span>
                    <span className="text-green-600">97% (landelijk: 92%)</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>1S+ (streef of hoger):</span>
                    <span className="text-green-600">85% (landelijk: 77%)</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
                <p className="text-sm text-green-700">
                  <strong>Analyse:</strong> Uitstekende resultaten! Meer leerlingen halen 2F dan landelijk. 
                  Behoud kwaliteit en deel best practices.
                </p>
              </div>
            </div>
          </div>

          {/* Trendanalyse Voorbeeld */}
          <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-3">📈 3-Jarige Trendanalyse Rekenen</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-purple-700">2022</div>
                <div className="text-2xl font-bold text-red-600">58%</div>
                <div className="text-xs text-gray-600">C+ niveau</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-purple-700">2023</div>
                <div className="text-2xl font-bold text-orange-600">62%</div>
                <div className="text-xs text-gray-600">C+ niveau</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-purple-700">2024</div>
                <div className="text-2xl font-bold text-yellow-600">65%</div>
                <div className="text-xs text-gray-600">C+ niveau</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded border-l-4 border-purple-500">
              <p className="text-sm text-purple-700">
                <strong>Trend:</strong> Gestage verbetering (+7% in 3 jaar), maar nog steeds onder landelijk gemiddelde (75%). 
                Interventies werken, doorzetten!
              </p>
            </div>
          </div>
        </div>

        {/* EDI Observatie Kijkwijzer */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">👁️ EDI Lesobservatie Kijkwijzer</h3>
          
          <div className="space-y-6">
            {/* Observatie Formulier */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">📋 Observatieformulier - Explicit Direct Instruction</h4>
              
              <div className="space-y-4">
                {[
                  {
                    fase: "1. Lesdoel & Activatie Voorkennis",
                    items: [
                      "Lesdoel is helder gecommuniceerd aan leerlingen",
                      "Voorkennis wordt geactiveerd en gecontroleerd",
                      "Verbinding met vorige lessen wordt gelegd",
                      "Leerlingen weten wat ze gaan leren en waarom"
                    ]
                  },
                  {
                    fase: "2. Modeling (Ik doe, jullie kijken)",
                    items: [
                      "Leerkracht demonstreert stap-voor-stap",
                      "Denkproces wordt hardop uitgesproken",
                      "Voorbeelden zijn helder en relevant",
                      "Leerlingen zijn actief betrokken bij modeling"
                    ]
                  },
                  {
                    fase: "3. Guided Practice (Wij doen samen)",
                    items: [
                      "Voldoende tijd voor begeleid oefenen",
                      "Leerkracht controleert begrip van alle leerlingen",
                      "Directe feedback en correctie waar nodig",
                      "Geleidelijke afbouw van ondersteuning"
                    ]
                  },
                  {
                    fase: "4. Independent Practice (Jullie doen zelf)",
                    items: [
                      "Opdrachten zijn gedifferentieerd naar niveau",
                      "Leerlingen werken zelfstandig aan passende taken",
                      "Leerkracht monitort en ondersteunt waar nodig",
                      "Tijd voor verdieping en uitbreiding"
                    ]
                  },
                  {
                    fase: "5. Afsluiting & Evaluatie",
                    items: [
                      "Lesdoel wordt geëvalueerd met leerlingen",
                      "Belangrijkste punten worden samengevat",
                      "Verbinding naar volgende les wordt gelegd",
                      "Leerlingen reflecteren op hun leerproces"
                    ]
                  }
                ].map((fase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">{fase.fase}</h5>
                    <div className="grid gap-2">
                      {fase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4].map((score) => (
                              <div
                                key={score}
                                className="w-6 h-6 border border-gray-300 rounded text-xs flex items-center justify-center cursor-pointer hover:bg-blue-100"
                              >
                                {score}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scoring Uitleg */}
              <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">📏 Scoring:</h5>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-red-600">1 - Onvoldoende</div>
                    <div>Niet zichtbaar</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-orange-600">2 - Matig</div>
                    <div>Beperkt zichtbaar</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-yellow-600">3 - Voldoende</div>
                    <div>Duidelijk zichtbaar</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-green-600">4 - Goed</div>
                    <div>Uitstekend zichtbaar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Template */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">💬 Feedback Gesprek Template (GROW-model)</h4>
              
              <div className="space-y-3">
                <div className="bg-white rounded p-3 border-l-4 border-green-500">
                  <h5 className="font-medium text-green-700">🎯 GOAL - Wat wil je bereiken?</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    "Wat is je doel voor de volgende les/periode? Waar wil je aan werken?"
                  </p>
                </div>
                
                <div className="bg-white rounded p-3 border-l-4 border-blue-500">
                  <h5 className="font-medium text-blue-700">👁️ REALITY - Wat heb ik gezien?</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    "Ik zag dat... [concrete observaties]. Wat is jouw ervaring van de les?"
                  </p>
                </div>
                
                <div className="bg-white rounded p-3 border-l-4 border-purple-500">
                  <h5 className="font-medium text-purple-700">💡 OPTIONS - Wat zijn mogelijkheden?</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    "Welke opties zie jij? Wat zou je anders kunnen doen? Wat heb je al eens geprobeerd?"
                  </p>
                </div>
                
                <div className="bg-white rounded p-3 border-l-4 border-orange-500">
                  <h5 className="font-medium text-orange-700">🚀 WAY FORWARD - Wat ga je doen?</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    "Wat ga je concreet proberen? Wanneer? Hoe kan ik je ondersteunen?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LVS Dashboard Voorbeeld */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 LVS Dashboard Voorbeeld</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Schoolniveau */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">🏫 Schoolniveau</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rekenen gemiddeld:</span>
                  <span className="font-medium">67e percentiel</span>
                </div>
                <div className="flex justify-between">
                  <span>Spelling gemiddeld:</span>
                  <span className="font-medium">72e percentiel</span>
                </div>
                <div className="flex justify-between">
                  <span>Lezen gemiddeld:</span>
                  <span className="font-medium">78e percentiel</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend (3 jaar):</span>
                  <span className="font-medium text-green-600">↗️ +8%</span>
                </div>
              </div>
            </div>

            {/* Groepsniveau */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">👥 Groep 5A</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rekenen:</span>
                  <span className="font-medium text-red-600">45e percentiel</span>
                </div>
                <div className="flex justify-between">
                  <span>Spelling:</span>
                  <span className="font-medium text-green-600">82e percentiel</span>
                </div>
                <div className="flex justify-between">
                  <span>Lezen:</span>
                  <span className="font-medium text-yellow-600">65e percentiel</span>
                </div>
                <div className="flex justify-between">
                  <span>Aandachtspunt:</span>
                  <span className="font-medium text-red-600">Rekenen ↓</span>
                </div>
              </div>
            </div>

            {/* Leerlingniveau */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">👤 Emma (Groep 5A)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rekenen voortgang:</span>
                  <span className="font-medium text-green-600">25→35→42</span>
                </div>
                <div className="flex justify-between">
                  <span>Spelling voortgang:</span>
                  <span className="font-medium text-green-600">78→82→85</span>
                </div>
                <div className="flex justify-between">
                  <span>Groei dit jaar:</span>
                  <span className="font-medium text-green-600">+17 punten</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-green-600">Op schema</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actieplan Template */}
          <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-3">📋 Actieplan Template</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-orange-700 mb-2">🎯 Geconstateerd probleem:</h5>
                <p className="text-gray-600 mb-3">Rekenprestaties groep 5A onder schoolgemiddelde</p>
                
                <h5 className="font-medium text-orange-700 mb-2">📊 Data-onderbouwing:</h5>
                <p className="text-gray-600">45e percentiel vs 67e schoolgemiddelde</p>
              </div>
              <div>
                <h5 className="font-medium text-orange-700 mb-2">🚀 Interventies:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• Extra rekenles 2x per week</li>
                  <li>• Differentiatie in drie niveaus</li>
                  <li>• Coaching leerkracht EDI-model</li>
                  <li>• Ouders informeren + huiswerk</li>
                </ul>
                
                <h5 className="font-medium text-orange-700 mb-2 mt-3">📅 Evaluatie:</h5>
                <p className="text-gray-600">Volgende meting januari 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedModule) {
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
              {[
                { id: 'overzicht', label: '📋 Overzicht', icon: '📋' },
                { id: 'theorie', label: '📚 Theorie', icon: '📚' },
                { id: 'chat', label: '🤖 AI Begeleiding', icon: '🤖' },
                ...(selectedModule.id === 9 ? [{ id: 'tools', label: '🛠️ Praktijktools', icon: '🛠️' }] : [])
              ].map((tab) => (
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

              {activeTab === 'chat' && (
                <div>
                  <SocraticChatBot 
                    module={selectedModule.title}
                    opdrachten={selectedModule.interactieveOpdrachten}
                  />
                </div>
              )}

              {activeTab === 'tools' && renderSchoolleiderTools()}
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
            Interactieve leermodules voor aanstaande leerkrachten & schoolleiders
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

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                completedModules.includes(module.id) ? 'ring-2 ring-green-500' : ''
              } ${module.id === 9 ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' : ''}`}
              onClick={() => setSelectedModule(module)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      module.id === 9 ? 'bg-purple-600' : 'bg-blue-600'
                    }`}>
                      {module.id === 9 ? '👑' : module.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      {module.id === 9 ? 'Schoolleider' : `Module ${module.id}`}
                    </div>
                  </div>
                  {completedModules.includes(module.id) && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                  {module.id === 9 && (
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🛠️</span>
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
                  {module.id === 9 && (
                    <div className="flex items-center text-sm text-purple-600 font-medium">
                      <span className="mr-2">⭐</span>
                      <span>Praktijktools & voorbeelden</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    module.id === 9 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {module.id === 9 ? 'Start Schoolleider Module →' : 'Start Module →'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💜 Gemaakt voor PABO studenten & schoolleiders • Interactief leren met AI-ondersteuning
          </p>
        </div>
      </div>
    </div>
  )
}