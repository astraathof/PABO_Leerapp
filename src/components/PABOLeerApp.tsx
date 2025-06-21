'use client'

import { useState } from 'react'

interface TheorieSection {
  title: string
  content: string
  examples?: string[]
  tips?: string[]
}

interface PraktijkOpdracht {
  title: string
  description: string
  steps: string[]
}

interface Module {
  id: number
  title: string
  subtitle: string
  leerdoelen: string[]
  theorie: TheorieSection[]
  praktijkopdrachten: PraktijkOpdracht[]
  inhoud: string
  bronnen: string[]
  completed: boolean
  progress: number
}

const modules: Module[] = [
  {
    id: 1,
    title: "Doorlopende Leerlijnen & Kerncurriculum",
    subtitle: "Kerndoelen, leerlijnen en jaarplanning",
    leerdoelen: [
      "De deelnemer benoemt de 58 wettelijke kerndoelen (huidig) en herkent de concept‑kerndoelen 2025.",
      "De deelnemer koppelt kerndoel → leerlijn → leerjaar voor ten minste taal EN rekenen.",
      "De deelnemer schetst een jaarplanning (8 blokken) op basis van een leerlijn.",
      "De deelnemer vergelijkt PO‑leerlijn met een VO/MBO‑leerlijn uit eigen ervaring."
    ],
    theorie: [
      {
        title: "De 58 Wettelijke Kerndoelen",
        content: "De kerndoelen vormen de wettelijke basis voor het onderwijs in Nederland. Ze beschrijven wat leerlingen minimaal moeten kennen en kunnen aan het einde van de basisschool. De kerndoelen zijn verdeeld over 8 leergebieden: Nederlands, Engels, Rekenen/wiskunde, Oriëntatie op jezelf en de wereld, Kunstzinnige oriëntatie, Bewegingsonderwijs, en sinds 2021 ook Burgerschap.",
        examples: [
          "Kerndoel 2 (Nederlands): De leerlingen leren informatie te achterhalen uit gesproken teksten",
          "Kerndoel 25 (Rekenen): De leerlingen leren hoofdrekenen met gehele getallen",
          "Kerndoel 43 (Wereldoriëntatie): De leerlingen leren over de Nederlandse staatsinrichting"
        ],
        tips: [
          "Gebruik de SLO-website om alle 58 kerndoelen te bestuderen",
          "Let op de nieuwe kerndoelen 2025 die meer focus leggen op 21e-eeuwse vaardigheden",
          "Maak verbindingen tussen kerndoelen van verschillende vakgebieden"
        ]
      },
      {
        title: "Leerlijnen en Referentieniveaus",
        content: "Een leerlijn toont de ontwikkeling van kennis en vaardigheden van groep 1 tot en met 8. Referentieniveaus (1F, 1S, 2F) geven aan welk niveau leerlingen moeten bereiken. 1F is het streefniveau voor alle leerlingen, 1S voor leerlingen die meer aankunnen, en 2F voor de hoogste groep.",
        examples: [
          "Leerlijn spelling: van klankzuiver schrijven (groep 3) naar correcte spelling van moeilijke woorden (groep 8)",
          "Leerlijn rekenen: van getalbegrip tot 20 naar breuken en procenten",
          "Referentieniveau 1F rekenen: basisvaardigheden die iedereen moet beheersen"
        ],
        tips: [
          "Bestudeer de leerlijnenviewer van SLO voor concrete voorbeelden",
          "Koppel elke les aan een specifiek punt in de leerlijn",
          "Gebruik referentieniveaus voor realistische doelstellingen"
        ]
      },
      {
        title: "Jaarplanning en Blokkenstructuur",
        content: "Een jaarplanning verdeelt de leerstof over 8 blokken van ongeveer 5 weken. Dit zorgt voor een logische opbouw en voldoende herhaling. Elke blok heeft een thema of focus, met duidelijke leerdoelen en evaluatiemomenten.",
        examples: [
          "Blok 1 (september): Herhaling en diagnose van het vorige schooljaar",
          "Blok 4 (januari): Nieuwe leerstof na de kerstvakantie",
          "Blok 8 (juni): Afsluiting en voorbereiding op volgend schooljaar"
        ],
        tips: [
          "Plan evaluatiemomenten aan het einde van elke blok",
          "Houd rekening met vakanties en bijzondere dagen",
          "Bouw voldoende herhaling en verdieping in"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "Kerndoelen Analyse",
        description: "Analyseer 10 kerndoelen uit verschillende leergebieden",
        steps: [
          "Kies 10 kerndoelen uit minimaal 4 verschillende leergebieden",
          "Beschrijf per kerndoel wat leerlingen concreet moeten kunnen",
          "Geef voorbeelden van activiteiten die bij elk kerndoel passen",
          "Reflecteer op de samenhang tussen de gekozen kerndoelen"
        ]
      },
      {
        title: "Leerlijn Mapping",
        description: "Maak een overzicht van een complete leerlijn voor taal of rekenen",
        steps: [
          "Kies een leerlijn (bijvoorbeeld spelling of vermenigvuldigen)",
          "Beschrijf de ontwikkeling van groep 1 tot 8",
          "Koppel specifieke kerndoelen aan elk leerjaar",
          "Maak een visueel schema van de progressie"
        ]
      }
    ],
    inhoud: "Kerndoelen • Referentieniveaus 1F/1S/2F • Leerlijnenviewer SLO • Meso‑ macroplanning.",
    bronnen: ["https://tule.slo.nl", "https://curriculum.nu"],
    completed: false,
    progress: 0
  },
  {
    id: 2,
    title: "Pedagogisch Handelen & Kindontwikkeling",
    subtitle: "Ontwikkelingsfasen en didactische principes",
    leerdoelen: [
      "De deelnemer legt de fasen van cognitieve en sociaal‑emotionele ontwikkeling (Piaget, Vygotsky, Erikson) uit aan teamleden.",
      "De deelnemer ontwerpt een les met de basisprincipes van EDI + scaffolding.",
      "De deelnemer toont in eigen praktijkvoorbeeld hoe hij een veilige leeromgeving creëert."
    ],
    theorie: [
      {
        title: "Piaget's Cognitieve Ontwikkelingsstadia",
        content: "Jean Piaget onderscheidde vier stadia in de cognitieve ontwikkeling: sensomotorisch (0-2 jaar), preoperationeel (2-7 jaar), concreet operationeel (7-11 jaar) en formeel operationeel (11+ jaar). Basisschoolkinderen bevinden zich voornamelijk in het preoperationele en concreet operationele stadium.",
        examples: [
          "Preoperationeel: Kind denkt dat er meer water in een hoog glas zit dan in een breed glas",
          "Concreet operationeel: Kind begrijpt dat hoeveelheid hetzelfde blijft ondanks vorm",
          "Egocentrisme: Jonge kinderen kunnen zich moeilijk verplaatsen in anderen"
        ],
        tips: [
          "Gebruik concrete materialen bij abstracte concepten",
          "Respecteer het ontwikkelingsniveau van elk kind",
          "Bied uitdaging binnen de zone van naaste ontwikkeling"
        ]
      },
      {
        title: "Vygotsky's Zone van Naaste Ontwikkeling",
        content: "Vygotsky introduceerde het concept van de Zone van Naaste Ontwikkeling (ZNO): het verschil tussen wat een kind zelfstandig kan en wat het kan met hulp van een volwassene of bekwamere peer. Scaffolding is het tijdelijk ondersteunen binnen deze zone.",
        examples: [
          "Begeleide instructie: Leraar toont eerst, doet samen, laat zelfstandig oefenen",
          "Peer tutoring: Sterke leerling helpt zwakkere leerling",
          "Gradueel vrijgeven van verantwoordelijkheid"
        ],
        tips: [
          "Observeer goed wat kinderen al kunnen",
          "Bied net genoeg ondersteuning, niet te veel",
          "Bouw ondersteuning geleidelijk af"
        ]
      },
      {
        title: "Erikson's Psychosociale Ontwikkeling",
        content: "Erik Erikson beschreef acht psychosociale crises. Voor basisschoolkinderen zijn vooral relevant: autonomie vs. schaamte (2-3 jaar), initiatief vs. schuld (3-5 jaar), en vlijt vs. minderwaardigheid (5-12 jaar). Succesvolle doorlopen van deze fasen leidt tot gezonde persoonlijkheidsontwikkeling.",
        examples: [
          "Autonomie: Peuters willen zelf dingen doen ('Ik kan het zelf!')",
          "Initiatief: Kleuters nemen zelf initiatieven en maken plannen",
          "Vlijt: Schoolkinderen willen competent zijn en erkenning krijgen"
        ],
        tips: [
          "Geef kinderen keuzemogelijkheden (autonomie)",
          "Moedig eigen initiatieven aan",
          "Erken inspanningen en vooruitgang, niet alleen resultaten"
        ]
      },
      {
        title: "Expliciete Directe Instructie (EDI)",
        content: "EDI is een gestructureerde onderwijsmethode met duidelijke stappen: lesdoel, voorkennis activeren, modeleren, begeleide oefening, zelfstandige oefening en afsluiting. Deze methode is bewezen effectief voor het aanleren van nieuwe vaardigheden.",
        examples: [
          "Lesdoel: 'Vandaag leren we breuken optellen met gelijke noemers'",
          "Modeleren: Leraar toont stap voor stap hoe het moet",
          "Begeleide oefening: Samen oefenen met directe feedback"
        ],
        tips: [
          "Houd lesdoelen concreet en meetbaar",
          "Controleer regelmatig of iedereen het begrijpt",
          "Geef directe en specifieke feedback"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "Ontwikkelingsstadia Herkennen",
        description: "Observeer kinderen en herken ontwikkelingsstadia",
        steps: [
          "Observeer 3 kinderen van verschillende leeftijden (4, 7, 10 jaar)",
          "Beschrijf hun gedrag in termen van Piaget's stadia",
          "Geef voorbeelden van Erikson's psychosociale ontwikkeling",
          "Formuleer passende pedagogische interventies"
        ]
      },
      {
        title: "EDI Lesontwerp",
        description: "Ontwerp een complete les volgens EDI-principes",
        steps: [
          "Kies een concreet onderwerp (bijv. staartdelingen)",
          "Formuleer een helder lesdoel",
          "Werk alle EDI-stappen uit met concrete activiteiten",
          "Bouw scaffolding in voor verschillende niveaus"
        ]
      }
    ],
    inhoud: "Pedagogische basisbehoeften (relatie, competentie, autonomie) • Directe Instructie • Scaffolding • Growth mindset • Klassenmanagement routines.",
    bronnen: ["G. Marzano, Classroom Management", "John Hattie, Visible Learning"],
    completed: false,
    progress: 0
  },
  {
    id: 3,
    title: "Sociaal‑Emotionele Ontwikkeling & Klassenklimaat",
    subtitle: "SEL-methodieken en veilig klassenklimaat",
    leerdoelen: [
      "De deelnemer onderscheidt minimaal drie SEL‑methodieken (Kanjertraining, Kwink, Leefstijl) en kan hun kernprincipes benoemen.",
      "De deelnemer kiest en motiveert een SEL‑programma passend bij schoolcontext.",
      "De deelnemer formuleert meetbare doelen rond welbevinden en sociaal veiligheid."
    ],
    theorie: [
      {
        title: "Kanjertraining Methodiek",
        content: "Kanjertraining is een sociaal-emotionele methode gebaseerd op 6 kanjereigenschappen: ik ben zuinig op mezelf, ik ben zuinig op een ander, ik kan samenwerken, ik ga voor mijn doel, ik kan omgaan met tegenslag, en ik durf te kiezen. De methode gebruikt concrete situaties en rollenspellen.",
        examples: [
          "Zuinig op mezelf: Ik zorg goed voor mijn lichaam en gevoel",
          "Zuinig op ander: Ik help anderen en doe niemand pijn",
          "Samenwerken: Ik luister naar anderen en deel mijn ideeën"
        ],
        tips: [
          "Gebruik de kanjerposter als visuele ondersteuning",
          "Koppel kanjereigenschappen aan dagelijkse situaties",
          "Vier kanjergedrag expliciet"
        ]
      },
      {
        title: "Kwink Methodiek",
        content: "Kwink (Kwaliteit in Interactie met Kinderen) richt zich op het versterken van de pedagogische kwaliteit. Het programma werkt met 5 dimensies: emotionele ondersteuning, klassenorganisatie, instructionele ondersteuning, taalstimulering en interactiekwaliteit.",
        examples: [
          "Emotionele ondersteuning: Warmte tonen en responsief reageren",
          "Klassenorganisatie: Duidelijke structuur en routines",
          "Instructionele ondersteuning: Uitdagende en betekenisvolle activiteiten"
        ],
        tips: [
          "Observeer je eigen interacties met kinderen",
          "Vraag feedback van collega's",
          "Werk systematisch aan verbetering van interactiekwaliteit"
        ]
      },
      {
        title: "Leefstijl Methodiek",
        content: "Leefstijl is een brede sociaal-emotionele methode die werkt met thema's zoals zelfvertrouwen, vriendschap, omgaan met conflicten, en emotieregulatie. De methode gebruikt verhalen, gesprekken en praktische oefeningen.",
        examples: [
          "Zelfvertrouwen: Kinderen leren hun sterke punten herkennen",
          "Vriendschap: Oefenen met vrienden maken en houden",
          "Conflicthantering: Stappen leren voor het oplossen van ruzies"
        ],
        tips: [
          "Integreer thema's in dagelijkse lessen",
          "Gebruik concrete voorbeelden uit de klas",
          "Betrek ouders bij de thema's"
        ]
      },
      {
        title: "Veilig Klassenklimaat Creëren",
        content: "Een veilig klassenklimaat kenmerkt zich door wederzijds respect, duidelijke afspraken, voorspelbaarheid en ruimte voor fouten maken. Tuckman's model (forming, storming, norming, performing) helpt bij groepsvorming.",
        examples: [
          "Forming: Kennismaking en eerste indrukken",
          "Storming: Conflicten en machtsstrijd",
          "Norming: Afspraken maken en accepteren",
          "Performing: Effectief samenwerken"
        ],
        tips: [
          "Investeer tijd in de vormingsfase",
          "Begeleid conflicten constructief",
          "Evalueer regelmatig het klassenklimaat"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "SEL-Methodiek Vergelijking",
        description: "Vergelijk drie SEL-methodieken en kies de beste voor jouw context",
        steps: [
          "Bestudeer Kanjertraining, Kwink en Leefstijl grondig",
          "Maak een vergelijkingstabel met voor- en nadelen",
          "Beschrijf welke methode past bij jouw schoolcontext",
          "Motiveer je keuze met concrete argumenten"
        ]
      },
      {
        title: "Klassenklimaat Actieplan",
        description: "Ontwikkel een plan voor het verbeteren van het klassenklimaat",
        steps: [
          "Analyseer het huidige klassenklimaat (sterke en zwakke punten)",
          "Formuleer 3 SMART-doelen voor verbetering",
          "Beschrijf concrete interventies per doel",
          "Maak een tijdlijn voor implementatie en evaluatie"
        ]
      }
    ],
    inhoud: "Veiligheidsniveaus leerlingmonitor • Pestprotocol • Interventie‑trias (universeel, selectief, geïndiceerd) • Groepsvorming Tuckman.",
    bronnen: ["Kanjertraining.nl (whitepaper)", "NJi Dossier SEL"],
    completed: false,
    progress: 0
  },
  {
    id: 4,
    title: "Didactisch Ontwerp & Differentiatie",
    subtitle: "Lesontwerp en aangepast onderwijs",
    leerdoelen: [
      "De deelnemer past convergente én divergente differentiatie toe in een lesontwerp.",
      "De deelnemer gebruikt taxonomie van Bloom om leerdoelen te formuleren.",
      "De deelnemer ontwerpt formatieve checkpoints per lesfase."
    ],
    theorie: [
      {
        title: "Tomlinson's Differentiatiemodel",
        content: "Carol Tomlinson onderscheidt differentiatie in inhoud (wat leerlingen leren), proces (hoe ze leren) en product (hoe ze tonen wat ze geleerd hebben). Convergente differentiatie richt zich op hetzelfde doel via verschillende wegen, divergente differentiatie heeft verschillende doelen.",
        examples: [
          "Inhoud: Verschillende teksten over hetzelfde onderwerp op verschillende niveaus",
          "Proces: Sommigen werken individueel, anderen in groepjes",
          "Product: Presentatie, poster, of geschreven verslag als eindproduct"
        ],
        tips: [
          "Start met één vorm van differentiatie",
          "Gebruik flexibele groepering",
          "Zorg voor keuzemogelijkheden voor leerlingen"
        ]
      },
      {
        title: "Bloom's Taxonomie",
        content: "Bloom's taxonomie onderscheidt zes cognitieve niveaus: onthouden, begrijpen, toepassen, analyseren, evalueren en creëren. Deze helpen bij het formuleren van leerdoelen op verschillende denkniveaus en het ontwerpen van passende activiteiten.",
        examples: [
          "Onthouden: Noem de hoofdsteden van Europa",
          "Begrijpen: Leg uit waarom planten licht nodig hebben",
          "Toepassen: Bereken de oppervlakte van deze rechthoek",
          "Analyseren: Vergelijk de voor- en nadelen van windenergie",
          "Evalueren: Beoordeel welke oplossing het beste is",
          "Creëren: Ontwerp een poster over gezonde voeding"
        ],
        tips: [
          "Varieer in denkniveaus binnen één les",
          "Gebruik actiewerkwoorden bij leerdoelen",
          "Bouw op van lagere naar hogere denkniveaus"
        ]
      },
      {
        title: "Formatief Handelen",
        content: "Formatief handelen betekent voortdurend informatie verzamelen over het leerproces om onderwijs bij te stellen. Het bestaat uit vier stappen: waar ga je naartoe, waar sta je nu, hoe kom je verder, en waar ga je hierna naartoe.",
        examples: [
          "Exit tickets: Korte vraag aan einde van les",
          "Duim omhoog/omlaag: Snelle check van begrip",
          "Peer feedback: Leerlingen geven elkaar feedback",
          "Zelfbeoordeling: Leerlingen reflecteren op eigen werk"
        ],
        tips: [
          "Maak formatieve evaluatie onderdeel van elke les",
          "Gebruik de informatie direct voor bijsturing",
          "Betrek leerlingen bij het evaluatieproces"
        ]
      },
      {
        title: "Universal Design for Learning (UDL)",
        content: "UDL is een onderwijsontwerp dat toegankelijk is voor alle leerlingen. Het werkt met drie principes: meerdere manieren van representatie (hoe informatie wordt gepresenteerd), engagement (hoe leerlingen gemotiveerd worden) en expressie (hoe leerlingen kunnen tonen wat ze weten).",
        examples: [
          "Representatie: Tekst, beeld, audio en video combineren",
          "Engagement: Keuze in onderwerpen en werkvormen",
          "Expressie: Mondeling, schriftelijk of visueel presenteren"
        ],
        tips: [
          "Denk vanaf het begin aan alle leerlingen",
          "Bied altijd alternatieven",
          "Gebruik technologie om toegankelijkheid te vergroten"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "Gedifferentieerde Les Ontwerpen",
        description: "Ontwerp een les met convergente en divergente differentiatie",
        steps: [
          "Kies een onderwerp en formuleer het hoofddoel",
          "Ontwerp convergente differentiatie (zelfde doel, verschillende wegen)",
          "Ontwerp divergente differentiatie (verschillende doelen)",
          "Beschrijf hoe je het niveau van elke leerling bepaalt"
        ]
      },
      {
        title: "Bloom's Leerdoelen Piramide",
        description: "Maak een complete set leerdoelen voor één onderwerp",
        steps: [
          "Kies een onderwerp uit je vakgebied",
          "Formuleer minimaal 2 leerdoelen per Bloom-niveau",
          "Ontwerp passende activiteiten bij elk leerdoel",
          "Maak een visuele piramide van je leerdoelen"
        ]
      }
    ],
    inhoud: "Differentiatiemodel Tomlinson • Formatief Handelen • BLOOM/RBT • UDL‑principes.",
    bronnen: ["SLO Differentiatiegids", "F. Wiliam, Embedded Formative Assessment"],
    completed: false,
    progress: 0
  },
  {
    id: 5,
    title: "Data‑Geïnformeerd Werken & Kwaliteitszorg",
    subtitle: "LVS-data en schoolverbetering",
    leerdoelen: [
      "De deelnemer interpreteert LVS‑data (bijv. ParnasSys, Cito) op leerling‑, groeps‑ en schoolniveau.",
      "De deelnemer hanteert de PDCA‑cyclus binnen kwaliteitszorg.",
      "De deelnemer koppelt data aan concrete interventies en SMART‑schooldoelen."
    ],
    theorie: [
      {
        title: "Leerling Volg Systeem (LVS) Begrijpen",
        content: "Een LVS registreert de ontwikkeling van leerlingen systematisch. Het bevat toetsresultaten, observaties en andere relevante informatie. Belangrijke systemen zijn ParnasSys, Cito LVS en Esis. Data wordt gebruikt op drie niveaus: leerling, groep en school.",
        examples: [
          "Leerlingniveau: Individuele voortgang in rekenen van september tot januari",
          "Groepsniveau: Gemiddelde scores van groep 6 vergeleken met landelijk gemiddelde",
          "Schoolniveau: Trend in Cito-scores over meerdere jaren"
        ],
        tips: [
          "Kijk naar trends, niet alleen momentopnames",
          "Combineer kwantitatieve data met kwalitatieve observaties",
          "Gebruik data voor gesprekken, niet als oordeel"
        ]
      },
      {
        title: "Data-interpretatie en Analyse",
        content: "Goede data-interpretatie vereist begrip van statistische concepten zoals gemiddelden, standaarddeviaties en percentielscores. Belangrijk is ook het herkennen van patronen en het onderscheiden van toeval en trend.",
        examples: [
          "Percentielscores: P75 betekent beter dan 75% van leeftijdsgenoten",
          "Standaarddeviatie: Maat voor spreiding rond het gemiddelde",
          "Trendanalyse: Stijgende, dalende of stabiele lijn over tijd"
        ],
        tips: [
          "Leer de betekenis van verschillende scores",
          "Kijk naar meerdere meetmomenten",
          "Betrek context bij interpretatie"
        ]
      },
      {
        title: "PDCA-cyclus in het Onderwijs",
        content: "De Plan-Do-Check-Act cyclus is een systematische methode voor kwaliteitsverbetering. Plan: doelen stellen en aanpak bepalen. Do: uitvoeren van de plannen. Check: evalueren van resultaten. Act: bijstellen en verbeteren.",
        examples: [
          "Plan: Doel om rekenprestaties groep 5 te verbeteren",
          "Do: Implementeren van nieuwe rekenmethode",
          "Check: Toetsen na 3 maanden en resultaten analyseren",
          "Act: Bijstellen van aanpak op basis van resultaten"
        ],
        tips: [
          "Houd cycli kort (3-6 maanden)",
          "Documenteer elke stap",
          "Betrek alle betrokkenen bij evaluatie"
        ]
      },
      {
        title: "SMART Doelen Formuleren",
        content: "SMART doelen zijn Specifiek, Meetbaar, Acceptabel, Realistisch en Tijdgebonden. In het onderwijs helpen ze bij het concretiseren van verbeterdoelen en het meten van voortgang.",
        examples: [
          "Specifiek: Verbeteren van begrijpend lezen (niet 'betere resultaten')",
          "Meetbaar: Van gemiddeld percentiel 40 naar 50",
          "Acceptabel: Door team gedragen en haalbaar",
          "Realistisch: Binnen mogelijkheden van school en leerlingen",
          "Tijdgebonden: Binnen schooljaar 2024-2025"
        ],
        tips: [
          "Formuleer doelen positief",
          "Maak tussentijdse checkpoints",
          "Koppel doelen aan concrete acties"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "LVS Data Analyse",
        description: "Analyseer echte of fictieve LVS-data van een groep",
        steps: [
          "Verzamel data van een groep (toetsresultaten, observaties)",
          "Maak grafieken van de ontwikkeling over tijd",
          "Identificeer patronen en opvallende zaken",
          "Formuleer conclusies en aanbevelingen"
        ]
      },
      {
        title: "PDCA Verbeterplan",
        description: "Ontwikkel een compleet verbeterplan volgens PDCA",
        steps: [
          "Identificeer een verbeterpunt op basis van data",
          "Maak een SMART doel en actieplan (Plan)",
          "Beschrijf de uitvoering (Do)",
          "Ontwerp evaluatiemethoden (Check)",
          "Plan bijsturing en vervolg (Act)"
        ]
      }
    ],
    inhoud: "LVS‑trendanalyses • Schooldashboards • Auditcyclus Inspectie (Onderzoekskader 2024) • School‑ en groepsplannen.",
    bronnen: ["PO‑Raad 'Werken met Data' toolkit", "Inspectie OK/2024 samenvatting"],
    completed: false,
    progress: 0
  },
  {
    id: 6,
    title: "Innovatie & 21e‑Eeuwse Vaardigheden",
    subtitle: "Moderne vaardigheden en technologie",
    leerdoelen: [
      "De deelnemer benoemt de 12 vaardigheden (SLO‑model) en integreert er minimaal 3 in een lesconcept.",
      "De deelnemer beschrijft een innovatiecyclus (design thinking) voor schoolontwikkeling.",
      "De deelnemer overweegt digitale tools (AI, AR/VR) op didactische meerwaarde en privacy."
    ],
    theorie: [
      {
        title: "SLO 21e-eeuwse Vaardigheden Model",
        content: "Het SLO onderscheidt 12 vaardigheden verdeeld over 4 categorieën: Cognitieve vaardigheden (kritisch denken, creatief denken, probleemoplossen, metacognitie), Intrapersoonlijke vaardigheden (zelfregulatie, aanpassingsvermogen, initiatief), Interpersoonlijke vaardigheden (samenwerken, leiderschap, sociaal-cultureel bewustzijn) en ICT-geletterdheid.",
        examples: [
          "Kritisch denken: Informatie beoordelen op betrouwbaarheid",
          "Creatief denken: Originele oplossingen bedenken voor problemen",
          "Samenwerken: Effectief werken in diverse teams",
          "ICT-geletterdheid: Verantwoord gebruik van digitale tools"
        ],
        tips: [
          "Integreer vaardigheden in reguliere lessen",
          "Maak vaardigheden expliciet voor leerlingen",
          "Oefen vaardigheden in authentieke contexten"
        ]
      },
      {
        title: "Design Thinking in het Onderwijs",
        content: "Design thinking is een innovatiemethode met 5 fasen: Empathize (begrijpen van gebruikers), Define (probleem definiëren), Ideate (ideeën genereren), Prototype (oplossingen maken), Test (testen en verbeteren). Deze cyclus kan gebruikt worden voor onderwijsinnovatie.",
        examples: [
          "Empathize: Interviews met leerlingen over hun leerbehoeften",
          "Define: 'Leerlingen hebben moeite met motivatie voor rekenen'",
          "Ideate: Brainstormen over gamification van rekenlessen",
          "Prototype: Maken van een rekenspel",
          "Test: Uitproberen in de klas en feedback verzamelen"
        ],
        tips: [
          "Betrek gebruikers (leerlingen, ouders) bij elke fase",
          "Maak snel en goedkoop prototypes",
          "Wees bereid om ideeën los te laten"
        ]
      },
      {
        title: "STEAM-onderwijs",
        content: "STEAM combineert Science, Technology, Engineering, Arts en Mathematics in geïntegreerde projecten. Het doel is om leerlingen voor te bereiden op een technologische samenleving door interdisciplinair en probleemgericht te werken.",
        examples: [
          "Project: Ontwerp een duurzame school (techniek + milieukunde + wiskunde)",
          "Opdracht: Maak een robot die kan dansen (techniek + kunst + programmeren)",
          "Uitdaging: Los het plastic probleem op (wetenschap + techniek + maatschappij)"
        ],
        tips: [
          "Start met echte problemen uit de leefwereld",
          "Laat leerlingen zelf ontdekken en experimenteren",
          "Combineer verschillende vakgebieden natuurlijk"
        ]
      },
      {
        title: "Digitale Tools en Privacy",
        content: "Bij het gebruik van digitale tools in het onderwijs zijn didactische meerwaarde en privacy belangrijke overwegingen. AI-tools kunnen personaliseren en feedback geven, maar vereisen zorgvuldige afweging van voor- en nadelen.",
        examples: [
          "AI-voordelen: Gepersonaliseerde oefeningen, directe feedback",
          "Privacy-risico's: Dataverzameling, profiling van kinderen",
          "AR/VR-mogelijkheden: Virtuele excursies, 3D-visualisaties",
          "Ethische vragen: Algoritme-bias, afhankelijkheid van technologie"
        ],
        tips: [
          "Evalueer tools op didactische meerwaarde",
          "Lees privacyvoorwaarden zorgvuldig",
          "Betrek ouders bij keuzes voor digitale tools"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "21e-eeuwse Vaardigheden Lesontwerp",
        description: "Ontwerp een les die 3 van de 12 vaardigheden integreert",
        steps: [
          "Kies 3 vaardigheden uit verschillende categorieën",
          "Ontwerp een authentieke taak die alle 3 vaardigheden vereist",
          "Beschrijf hoe je de vaardigheden expliciet maakt",
          "Maak een beoordelingsrubric voor de vaardigheden"
        ]
      },
      {
        title: "Design Thinking Schoolinnovatie",
        description: "Pas design thinking toe op een schooluitdaging",
        steps: [
          "Identificeer een uitdaging op jouw school",
          "Doorloop alle 5 fasen van design thinking",
          "Documenteer elke fase met concrete outputs",
          "Reflecteer op het proces en de uitkomsten"
        ]
      }
    ],
    inhoud: "SLO 21‑skills raamwerk • STEAM‑projecten • Design Thinking stappenplan • Basis AVG.",
    bronnen: ["Kennisnet Innovatiehub", "SLO 21‑eeuwse vaardigheden kaartenset"],
    completed: false,
    progress: 0
  },
  {
    id: 7,
    title: "Professioneel Leiderschap & Schoolplan",
    subtitle: "Schoolleiderschap en strategische planning",
    leerdoelen: [
      "De deelnemer beschrijft de Beroepsstandaard Schoolleider PO en koppelt eigen competenties.",
      "De deelnemer uploadt en annoteert het eigen schoolplan (of voorbeeld) in de leerapp.",
      "De deelnemer stelt een 100‑dagenplan op met quick‑wins en langetermijndoelen."
    ],
    theorie: [
      {
        title: "Beroepsstandaard Schoolleider PO",
        content: "De beroepsstandaard beschrijft 6 competentiegebieden: Onderwijskundig leiderschap, Organisatorisch leiderschap, Leiderschap in personeelsontwikkeling, Leiderschap in kwaliteitszorg, Leiderschap in externe contacten, en Leiderschap in de eigen professionele ontwikkeling.",
        examples: [
          "Onderwijskundig: Visie ontwikkelen op goed onderwijs",
          "Organisatorisch: Efficiënte processen en structuren creëren",
          "Personeelsontwikkeling: Talenten herkennen en ontwikkelen",
          "Kwaliteitszorg: Systematisch werken aan verbetering"
        ],
        tips: [
          "Reflecteer regelmatig op je competenties",
          "Vraag feedback van collega's en leerlingen",
          "Maak een persoonlijk ontwikkelingsplan"
        ]
      },
      {
        title: "Schoolplan Cyclus",
        content: "Een schoolplan doorloopt een 4-jarige cyclus met jaarlijkse evaluatie. Het bevat visie, missie, ambities, doelen, acties en evaluatie. Het plan moet aansluiten bij de context van de school en de behoeften van leerlingen.",
        examples: [
          "Visie: 'Elke leerling ontwikkelt zijn talenten optimaal'",
          "Ambitie: 'Alle leerlingen bereiken minimaal referentieniveau 1F'",
          "Doel: 'Verhogen van rekenprestaties met 10 percentiel'",
          "Actie: 'Implementeren van nieuwe rekenmethode'"
        ],
        tips: [
          "Betrek alle stakeholders bij de ontwikkeling",
          "Maak doelen SMART en meetbaar",
          "Plan tussentijdse evaluatiemomenten"
        ]
      },
      {
        title: "Veranderkunde volgens Kotter",
        content: "John Kotter beschrijft 8 stappen voor succesvolle verandering: urgentie creëren, coalitie vormen, visie ontwikkelen, visie communiceren, empowerment, korte termijn successen, consolideren en verankeren.",
        examples: [
          "Urgentie: 'Onze rekenprestaties dalen, we moeten nu handelen'",
          "Coalitie: Team van gedreven leraren en ouders",
          "Visie: 'Rekenen wordt leuk en betekenisvol'",
          "Korte termijn succes: Eerste verbeteringen na 3 maanden"
        ],
        tips: [
          "Begin met urgentie, niet met oplossingen",
          "Investeer in communicatie en betrokkenheid",
          "Vier tussentijdse successen"
        ]
      },
      {
        title: "100-dagenplan Ontwikkelen",
        content: "Een 100-dagenplan helpt nieuwe schoolleiders om snel impact te maken. Het combineert quick wins (snelle zichtbare verbeteringen) met langetermijndoelen. Focus ligt op luisteren, leren en eerste acties ondernemen.",
        examples: [
          "Quick win: Verbeteren van communicatie met ouders",
          "Quick win: Opruimen en opknappen van schoolgebouw",
          "Langetermijn: Implementeren van nieuwe onderwijsmethode",
          "Langetermijn: Cultuurverandering naar meer samenwerking"
        ],
        tips: [
          "Luister eerst, handel dan",
          "Kies quick wins die breed gedragen worden",
          "Koppel korte en lange termijn doelen"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "Competentie Zelfanalyse",
        description: "Analyseer je eigen competenties volgens de beroepsstandaard",
        steps: [
          "Bestudeer alle 6 competentiegebieden grondig",
          "Beoordeel jezelf op elk gebied (sterk/ontwikkelpunt)",
          "Verzamel feedback van collega's of leidinggevende",
          "Maak een persoonlijk ontwikkelingsplan"
        ]
      },
      {
        title: "Schoolplan Analyse",
        description: "Analyseer een bestaand schoolplan en stel verbeteringen voor",
        steps: [
          "Bestudeer een schoolplan (eigen school of voorbeeld)",
          "Beoordeel op volledigheid en kwaliteit",
          "Identificeer sterke punten en verbeterpunten",
          "Stel concrete verbeteringen voor"
        ]
      }
    ],
    inhoud: "Schoolleidersregister PO • Schoolplan‑cyclus (visie, ambities, doelen, acties, evaluatie) • Veranderkunde (Kotter).",
    bronnen: ["Schoolleidersregister beroepsprofiel", "Kotter, Leading Change"],
    completed: false,
    progress: 0
  },
  {
    id: 8,
    title: "Burgerschap & (AI-)Digitale Geletterdheid",
    subtitle: "Burgerschap en mediawijsheid",
    leerdoelen: [
      "De deelnemer benoemt de wettelijke burgerschapsdoelen voor het primair onderwijs (Wet Burgerschapsonderwijs 2024) en de aangescherpte inspectienormen 2025‑2026.",
      "De deelnemer koppelt burgerschapsdoelen aan leerlijnen taal, rekenen en 21e‑eeuwse vaardigheden.",
      "De deelnemer integreert mediawijsheid en AI‑geletterdheid (begrip algoritme, data‑bias, privacy, ethiek) in ten minste één les of project.",
      "De deelnemer formuleert indicatoren voor burgerschap op leerling‑, groeps‑ en schoolniveau en verwerkt deze in het schoolplan/LVS."
    ],
    theorie: [
      {
        title: "Wet Burgerschapsonderwijs 2024",
        content: "De wet verplicht scholen om burgerschapsonderwijs te geven dat bijdraagt aan de voorbereiding van leerlingen op hun rol als burger in de democratische rechtsstaat. Kernthema's zijn: democratie en rechtsstaat, gelijkwaardigheid en non-discriminatie, grondrechten en vrijheden, pluriformiteit en diversiteit.",
        examples: [
          "Democratie: Klassenvergaderingen en leerlingenraad",
          "Gelijkwaardigheid: Projecten over diversiteit en inclusie",
          "Grondrechten: Bespreken van kinderrechten",
          "Pluriformiteit: Kennismaking met verschillende culturen en religies"
        ],
        tips: [
          "Integreer burgerschap in alle vakken",
          "Gebruik actuele gebeurtenissen als aanleiding",
          "Laat leerlingen zelf ervaren wat democratie betekent"
        ]
      },
      {
        title: "Inspectienormen 2025-2026",
        content: "De inspectie heeft aangescherpte normen voor burgerschap en sociale veiligheid. Scholen moeten aantonen dat ze systematisch werken aan burgerschapsvorming en dat leerlingen de beoogde competenties ontwikkelen.",
        examples: [
          "Systematisch: Burgerschapsplan met doelen en activiteiten",
          "Meetbaar: Indicatoren voor burgerschapscompetenties",
          "Zichtbaar: Concrete voorbeelden in lessen en projecten",
          "Effectief: Evaluatie van resultaten en bijsturing"
        ],
        tips: [
          "Documenteer burgerschapsactiviteiten systematisch",
          "Maak burgerschapsdoelen meetbaar",
          "Evalueer regelmatig de effectiviteit"
        ]
      },
      {
        title: "Mediawijsheid Competentiemodel",
        content: "Mediawijsheid bestaat uit 6 competenties: Gebruiken (technische vaardigheden), Begrijpen (mediaboodschappen doorgronden), Creëren (zelf media maken), Communiceren (verantwoord delen), Kritisch evalueren (betrouwbaarheid beoordelen), en Participeren (actief deelnemen aan mediamaatschappij).",
        examples: [
          "Gebruiken: Veilig internetten en apps bedienen",
          "Begrijpen: Herkennen van reclame en beïnvloeding",
          "Creëren: Maken van een eigen video of podcast",
          "Kritisch evalueren: Nepnieuws herkennen"
        ],
        tips: [
          "Begin met concrete, herkenbare voorbeelden",
          "Laat leerlingen zelf ontdekken en ervaren",
          "Koppel aan actuele media-gebeurtenissen"
        ]
      },
      {
        title: "AI-geletterdheid voor Kinderen",
        content: "AI-geletterdheid omvat begrip van wat AI is, hoe algoritmes werken, welke data gebruikt wordt, mogelijke bias en ethische vraagstukken. Voor kinderen gaat het om basisbegrip en kritisch denken over AI-toepassingen.",
        examples: [
          "Algoritme: 'Een recept dat de computer volgt'",
          "Data-bias: 'Als de computer alleen foto's van witte katten heeft gezien'",
          "Privacy: 'Welke informatie deel je wel/niet met apps'",
          "Ethiek: 'Is het eerlijk als een robot beslist wie een baan krijgt?'"
        ],
        tips: [
          "Gebruik concrete voorbeelden uit de kinderwereld",
          "Laat kinderen zelf AI-tools uitproberen",
          "Bespreek voor- en nadelen van AI"
        ]
      }
    ],
    praktijkopdrachten: [
      {
        title: "Burgerschapsplan Ontwikkelen",
        description: "Ontwikkel een compleet burgerschapsplan voor een groep",
        steps: [
          "Analyseer de wettelijke vereisten voor jouw groep",
          "Koppel burgerschapsdoelen aan bestaande leerlijnen",
          "Ontwerp concrete activiteiten en projecten",
          "Maak indicatoren om voortgang te meten"
        ]
      },
      {
        title: "AI-geletterdheid Les",
        description: "Ontwerp een les over AI voor basisschoolkinderen",
        steps: [
          "Kies een AI-toepassing die kinderen kennen (Siri, spelletjes)",
          "Leg uit hoe deze AI werkt op kinderniveau",
          "Bespreek voor- en nadelen met concrete voorbeelden",
          "Laat kinderen zelf nadenken over ethische vragen"
        ]
      }
    ],
    inhoud: "Wettelijk kader burgerschapsopdracht • Inspectie 'Burgerschap en Sociale Veiligheid' (vanaf 2025) • Mediawijsheid Competentiemodel • UNESCO AI Literacy framework • Digitale geletterdheid (SLO) • Datagebruik en reflectie.",
    bronnen: ["SLO Burgerschapscurriculum (https://slo.nl)", "Mediawijsheid.nl (competentiemodel)", "UNESCO \"AI and Education — Guidance for Educators\" (2024)"],
    completed: false,
    progress: 0
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'theorie' | 'praktijk'>('overzicht')
  const [moduleStates, setModuleStates] = useState<Module[]>(modules)
  const [completedGoals, setCompletedGoals] = useState<{[key: string]: boolean[]}>({})

  const updateModuleProgress = (moduleId: number, goalIndex: number, completed: boolean) => {
    const moduleKey = `module-${moduleId}`
    const currentGoals = completedGoals[moduleKey] || new Array(moduleStates.find(m => m.id === moduleId)?.leerdoelen.length || 0).fill(false)
    const newGoals = [...currentGoals]
    newGoals[goalIndex] = completed
    
    setCompletedGoals({
      ...completedGoals,
      [moduleKey]: newGoals
    })

    // Update module progress
    const completedCount = newGoals.filter(Boolean).length
    const totalCount = newGoals.length
    const progress = Math.round((completedCount / totalCount) * 100)
    
    setModuleStates(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, progress, completed: progress === 100 }
        : module
    ))
  }

  const totalProgress = Math.round(moduleStates.reduce((sum, module) => sum + module.progress, 0) / moduleStates.length)
  const completedModules = moduleStates.filter(m => m.completed).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎓 PABO Leerapp
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Eigen maken van leerdoelen voor de PABO studie
        </p>
        
        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Voortgang</h2>
            <span className="text-2xl font-bold text-blue-600">{totalProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-600">
            {completedModules} van {moduleStates.length} modules voltooid
          </p>
        </div>
      </div>

      {!selectedModule ? (
        /* Module Overview */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleStates.map((module) => (
            <div
              key={module.id}
              onClick={() => {
                setSelectedModule(module)
                setActiveTab('overzicht')
              }}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                module.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {module.completed ? '✅' : '📚'}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      Module {module.id}
                    </h3>
                    <p className="text-xs text-gray-500">{module.progress}% voltooid</p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-bold text-gray-800 mb-2 text-lg leading-tight">
                {module.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {module.subtitle}
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    module.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Module Detail View */
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar overzicht
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">
                {selectedModule.completed ? '✅' : '📚'}
              </span>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Module {selectedModule.id}: {selectedModule.title}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {selectedModule.subtitle}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Voortgang</span>
                <span className="text-sm font-medium text-blue-600">{selectedModule.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    selectedModule.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${selectedModule.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('overzicht')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'overzicht'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Overzicht & Leerdoelen
              </button>
              <button
                onClick={() => setActiveTab('theorie')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'theorie'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📖 Theorie & Uitleg
              </button>
              <button
                onClick={() => setActiveTab('praktijk')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'praktijk'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🛠️ Praktijkopdrachten
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overzicht' && (
              <div>
                {/* Leerdoelen */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Leerdoelen</h2>
                  <div className="space-y-3">
                    {selectedModule.leerdoelen.map((doel, index) => {
                      const moduleKey = `module-${selectedModule.id}`
                      const isCompleted = completedGoals[moduleKey]?.[index] || false
                      
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <label className="flex items-start cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={(e) => updateModuleProgress(selectedModule.id, index, e.target.checked)}
                              className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className={`text-gray-700 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                              {doel}
                            </span>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Inhoud */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Inhoud</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700">{selectedModule.inhoud}</p>
                  </div>
                </div>

                {/* Bronnen */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Bronnen</h2>
                  <div className="space-y-2">
                    {selectedModule.bronnen.map((bron, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        {bron.startsWith('http') ? (
                          <a 
                            href={bron} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {bron}
                          </a>
                        ) : (
                          <span className="text-gray-700">{bron}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theorie' && (
              <div className="space-y-8">
                {selectedModule.theorie.map((section, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-gray-700 leading-relaxed">{section.content}</p>
                    </div>

                    {section.examples && section.examples.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <span className="text-green-600 mr-2">💡</span>
                          Voorbeelden:
                        </h4>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <ul className="space-y-2">
                            {section.examples.map((example, exIndex) => (
                              <li key={exIndex} className="text-gray-700 flex items-start">
                                <span className="text-green-600 mr-2 mt-1">•</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {section.tips && section.tips.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <span className="text-yellow-600 mr-2">💡</span>
                          Praktische Tips:
                        </h4>
                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <ul className="space-y-2">
                            {section.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-gray-700 flex items-start">
                                <span className="text-yellow-600 mr-2 mt-1">→</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'praktijk' && (
              <div className="space-y-8">
                {selectedModule.praktijkopdrachten.map((opdracht, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {opdracht.title}
                    </h3>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-gray-700 leading-relaxed font-medium">{opdracht.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="text-purple-600 mr-2">📝</span>
                        Stappen:
                      </h4>
                      <div className="bg-white rounded-lg p-4 border border-purple-200">
                        <ol className="space-y-3">
                          {opdracht.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-gray-700 flex items-start">
                              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                                {stepIndex + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Module Complete Button */}
            {selectedModule.progress === 100 && (
              <div className="text-center mt-8">
                <div className="bg-green-100 border border-green-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    🎉 Module Voltooid!
                  </h3>
                  <p className="text-green-700">
                    Gefeliciteerd! Je hebt alle leerdoelen van deze module behaald.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}