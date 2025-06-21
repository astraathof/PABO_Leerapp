'use client'

import { useState } from 'react'

interface TheoryTopic {
  id: string
  title: string
  category: 'pedagogiek' | 'didactiek' | 'organisatie' | 'leiderschap' | 'kwaliteit' | 'ontwikkeling' | 'sel' | 'burgerschap' | 'innovatie'
  shortDescription: string
  fullContent: {
    definitie: string
    kernprincipes: string[]
    praktijktoepassing: string[]
    voorbeelden: string[]
    literatuur: string[]
    relatedTopics: string[]
  }
  clickableTerms: {
    term: string
    explanation: string
    deepDive?: string
  }[]
  modules: string[] // Which modules this theory belongs to
}

const theoryTopics: TheoryTopic[] = [
  // MODULE 1: Curriculum & Kerndoelen
  {
    id: 'kerndoelen-implementatie',
    title: 'Kerndoelen Implementatie',
    category: 'didactiek',
    shortDescription: 'Het systematisch vertalen van kerndoelen naar concrete lesdoelen en activiteiten',
    fullContent: {
      definitie: 'Kerndoelen implementatie is het proces waarbij de 58 wettelijke kerndoelen worden vertaald naar concrete, meetbare lesdoelen en passende onderwijsactiviteiten die aansluiten bij de ontwikkeling van leerlingen.',
      kernprincipes: [
        'Systematische vertaling van abstract naar concreet',
        'Afstemming op ontwikkelingsniveau leerlingen',
        'Spiraalcurriculum principe',
        'Integratie tussen vakgebieden',
        'Continue evaluatie en bijstelling'
      ],
      praktijktoepassing: [
        'Jaarplanning maken per kerndoel',
        'Lesdoelen formuleren met SMART-criteria',
        'Leerlijn-mapping per vakgebied',
        'Toetsing afstemmen op kerndoelen',
        'Differentiatie binnen kerndoelen'
      ],
      voorbeelden: [
        'Kerndoel 6 (getallen) vertalen naar concrete rekenactiviteiten',
        'Kerndoel 21 (samenleven) koppelen aan klassengesprekken',
        'Kerndoel 44 (beeldende vorming) integreren in projectwerk',
        'Kerndoel 52 (beweging) verbinden met buitenspel'
      ],
      literatuur: [
        'SLO (2006). Kerndoelen Primair Onderwijs',
        'Van den Akker, J. (2003). Curriculum Perspectives',
        'Thijs, A. (2010). Leerplan in Ontwikkeling'
      ],
      relatedTopics: ['curriculum-mapping', 'leerlijnen', 'toetsing']
    },
    clickableTerms: [
      {
        term: 'spiraalcurriculum',
        explanation: 'Onderwijsmodel waarbij concepten herhaaldelijk terugkeren op steeds complexer niveau',
        deepDive: 'Ontwikkeld door Jerome Bruner, waarbij leerlingen dezelfde concepten meerdere keren tegenkomen met toenemende diepte en complexiteit.'
      },
      {
        term: 'SMART-criteria',
        explanation: 'Specifiek, Meetbaar, Acceptabel, Realistisch, Tijdgebonden doelen formuleren',
        deepDive: 'Methodiek om lesdoelen zo te formuleren dat ze duidelijk, haalbaar en evalueerbaar zijn voor zowel leerkracht als leerling.'
      }
    ],
    modules: ['module1']
  },
  {
    id: 'curriculum-mapping',
    title: 'Curriculum Mapping',
    category: 'organisatie',
    shortDescription: 'Het in kaart brengen van de samenhang tussen kerndoelen, leerlijnen en lespraktijk',
    fullContent: {
      definitie: 'Curriculum mapping is een systematische methode om de relaties tussen kerndoelen, leerlijnen, lesmethoden en toetsing visueel in kaart te brengen om hiaten en overlap te identificeren.',
      kernprincipes: [
        'Transparantie in curriculum',
        'Identificatie van hiaten en overlap',
        'Afstemming tussen collega\'s',
        'Continue curriculum evaluatie',
        'Data-gedreven besluitvorming'
      ],
      praktijktoepassing: [
        'Jaarplanning visualiseren per vak',
        'Kerndoel-dekking monitoren',
        'Methode-evaluatie uitvoeren',
        'Team-afstemming faciliteren',
        'Curriculum-audit voorbereiden'
      ],
      voorbeelden: [
        'Matrix van kerndoelen vs. lesperiodes',
        'Visuele leerlijn per vakgebied',
        'Overlap-analyse tussen methoden',
        'Hiaten-rapport per groep'
      ],
      literatuur: [
        'Jacobs, H.H. (2004). Getting Results with Curriculum Mapping',
        'Udelhofen, S. (2005). Keys to Curriculum Mapping'
      ],
      relatedTopics: ['kerndoelen-implementatie', 'kwaliteitszorg']
    },
    clickableTerms: [
      {
        term: 'curriculum-audit',
        explanation: 'Systematische evaluatie van de kwaliteit en samenhang van het curriculum',
        deepDive: 'Proces waarbij extern of intern wordt beoordeeld of het curriculum voldoet aan de gestelde doelen en wettelijke vereisten.'
      }
    ],
    modules: ['module1']
  },

  // MODULE 2: Ontwikkelingspsychologie
  {
    id: 'cognitieve-ontwikkeling',
    title: 'Cognitieve Ontwikkeling',
    category: 'ontwikkeling',
    shortDescription: 'De ontwikkeling van denken, leren en probleemoplossing bij kinderen',
    fullContent: {
      definitie: 'Cognitieve ontwikkeling betreft de veranderingen in denkprocessen, geheugen, taal, probleemoplossing en andere mentale vaardigheden die optreden naarmate kinderen ouder worden.',
      kernprincipes: [
        'Stadia van cognitieve ontwikkeling',
        'Zone van Naaste Ontwikkeling',
        'Scaffolding en ondersteuning',
        'Actieve kennisconstructie',
        'Sociale interactie als motor'
      ],
      praktijktoepassing: [
        'Lesstof afstemmen op ontwikkelingsniveau',
        'Scaffolding technieken toepassen',
        'Concrete materialen gebruiken',
        'Samenwerking stimuleren',
        'Metacognitie ontwikkelen'
      ],
      voorbeelden: [
        'Concreet rekenen in groep 3-4',
        'Abstract denken stimuleren in groep 7-8',
        'Hardop denken bij probleemoplossing',
        'Peer tutoring organiseren'
      ],
      literatuur: [
        'Piaget, J. (1952). The Origins of Intelligence',
        'Vygotsky, L. (1978). Mind in Society',
        'Bruner, J. (1966). Toward a Theory of Instruction'
      ],
      relatedTopics: ['scaffolding', 'metacognitie', 'differentatie']
    },
    clickableTerms: [
      {
        term: 'Zone van Naaste Ontwikkeling',
        explanation: 'Het verschil tussen wat een kind zelfstandig kan en wat het met hulp kan bereiken',
        deepDive: 'Vygotsky\'s concept dat de optimale leerzone beschrijft waar kinderen met begeleiding nieuwe vaardigheden kunnen ontwikkelen.'
      },
      {
        term: 'metacognitie',
        explanation: 'Het bewustzijn van en controle over eigen denkprocessen',
        deepDive: 'Het vermogen om over je eigen denken na te denken, strategieën te plannen en je leerproces te monitoren.'
      }
    ],
    modules: ['module2']
  },
  {
    id: 'sociaal-emotionele-ontwikkeling',
    title: 'Sociaal-Emotionele Ontwikkeling',
    category: 'ontwikkeling',
    shortDescription: 'De ontwikkeling van emoties, sociale vaardigheden en zelfregulatie',
    fullContent: {
      definitie: 'Sociaal-emotionele ontwikkeling omvat de groei in emotioneel bewustzijn, sociale vaardigheden, empathie, zelfregulatie en het vermogen om positieve relaties aan te gaan.',
      kernprincipes: [
        'Emotionele intelligentie ontwikkeling',
        'Sociale vaardigheden training',
        'Zelfregulatie en impulsbeheer',
        'Empathie en perspectief nemen',
        'Positieve relaties bouwen'
      ],
      praktijktoepassing: [
        'Gevoelens benoemen en herkennen',
        'Conflictoplossing begeleiden',
        'Sociale situaties oefenen',
        'Zelfregulatie technieken aanleren',
        'Klassenklimaat verbeteren'
      ],
      voorbeelden: [
        'Gevoelensthermometer gebruiken',
        'Klassenraad organiseren',
        'Buddy-systeem implementeren',
        'Mindfulness momenten inbouwen'
      ],
      literatuur: [
        'Goleman, D. (1995). Emotional Intelligence',
        'Durlak, J. (2011). The Impact of SEL Programs',
        'Cohen, J. (2006). Social Emotional Learning'
      ],
      relatedTopics: ['klassenklimaat', 'sel-methodieken', 'gedragsmanagement']
    },
    clickableTerms: [
      {
        term: 'emotionele intelligentie',
        explanation: 'Het vermogen om emoties te herkennen, begrijpen en reguleren bij jezelf en anderen',
        deepDive: 'Concept van Daniel Goleman met vier domeinen: zelfbewustzijn, zelfregulatie, sociale bewustzijn en relatievaardigheden.'
      },
      {
        term: 'zelfregulatie',
        explanation: 'Het vermogen om gedrag, emoties en aandacht bewust te controleren',
        deepDive: 'Executieve functie die kinderen helpt doelen te stellen, impulsen te beheersen en vol te houden bij uitdagingen.'
      }
    ],
    modules: ['module2']
  },

  // MODULE 3: SEL & Klassenmanagement
  {
    id: 'klassenklimaat',
    title: 'Klassenklimaat',
    category: 'pedagogiek',
    shortDescription: 'De sociale en emotionele sfeer in de klas die leren en welzijn beïnvloedt',
    fullContent: {
      definitie: 'Klassenklimaat verwijst naar de sociale, emotionele en fysieke omgeving in de klas die het leren, gedrag en welzijn van leerlingen beïnvloedt. Het omvat de relaties tussen leerlingen onderling, tussen leerkracht en leerlingen, en de algemene sfeer in de klas.',
      kernprincipes: [
        'Veiligheid en vertrouwen als basis',
        'Positieve relaties tussen alle betrokkenen',
        'Duidelijke structuur en verwachtingen',
        'Inclusiviteit en respect voor diversiteit',
        'Stimulerende en uitdagende leeromgeving'
      ],
      praktijktoepassing: [
        'Dagelijkse begroeting van elke leerling',
        'Klassenregels samen opstellen',
        'Conflictoplossing systematisch aanpakken',
        'Positief gedrag versterken',
        'Regelmatige evaluatie van klassensfeer'
      ],
      voorbeelden: [
        'Kanjermomenten voor positieve aandacht',
        'Klassenraad voor democratische besluitvorming',
        'Buddy-systeem voor nieuwe leerlingen',
        'Mindfulness momenten voor rust',
        'Complimentencirkel voor waardering'
      ],
      literatuur: [
        'Marzano, R. (2003). Classroom Management That Works',
        'Hattie, J. (2009). Visible Learning',
        'Cohen, J. (2006). Social, Emotional, Ethical and Academic Education'
      ],
      relatedTopics: ['sociale-veiligheid', 'pedagogisch-handelen', 'groepsdynamiek']
    },
    clickableTerms: [
      {
        term: 'sociale veiligheid',
        explanation: 'De mate waarin leerlingen zich veilig voelen om zichzelf te zijn zonder angst voor pesten, uitsluiting of negatieve beoordeling',
        deepDive: 'Sociale veiligheid is fundamenteel voor effectief leren. Het omvat fysieke veiligheid (geen geweld), emotionele veiligheid (geen pesten) en psychologische veiligheid (durven fouten maken).'
      },
      {
        term: 'pedagogisch handelen',
        explanation: 'De bewuste keuzes en acties van de leerkracht gericht op de ontwikkeling van de hele persoon van het kind',
        deepDive: 'Pedagogisch handelen gaat verder dan lesgeven en omvat het vormgeven van waarden, normen, sociale vaardigheden en persoonlijkheidsontwikkeling.'
      }
    ],
    modules: ['module3']
  },
  {
    id: 'sel-methodieken',
    title: 'SEL-Methodieken',
    category: 'sel',
    shortDescription: 'Systematische benaderingen voor sociaal-emotioneel leren in de klas',
    fullContent: {
      definitie: 'SEL-methodieken zijn gestructureerde programma\'s en benaderingen die gericht zijn op het ontwikkelen van sociale en emotionele vaardigheden bij leerlingen, zoals zelfbewustzijn, zelfregulatie, sociale bewustzijn, relatievaardigheden en verantwoordelijke besluitvorming.',
      kernprincipes: [
        'Systematische vaardighedenontwikkeling',
        'Expliciete instructie van sociale vaardigheden',
        'Oefening in authentieke situaties',
        'Positieve bekrachtiging',
        'Schoolbrede implementatie'
      ],
      praktijktoepassing: [
        'Wekelijkse SEL-lessen plannen',
        'Sociale vaardigheden modelleren',
        'Conflictsituaties als leermomenten gebruiken',
        'Ouders betrekken bij SEL-ontwikkeling',
        'SEL integreren in alle vakken'
      ],
      voorbeelden: [
        'Kanjertraining implementeren',
        'Lions Quest curriculum gebruiken',
        'Rots en Water training organiseren',
        'Mindfulness programma opstarten'
      ],
      literatuur: [
        'Durlak, J. (2011). The Impact of SEL Programs',
        'Elias, M. (1997). Promoting Social and Emotional Learning',
        'Zins, J. (2004). Building Academic Success on SEL'
      ],
      relatedTopics: ['emotionele-intelligentie', 'sociale-vaardigheden', 'weerbaarheid']
    },
    clickableTerms: [
      {
        term: 'sociale vaardigheden',
        explanation: 'Vaardigheden die nodig zijn voor effectieve interactie met anderen',
        deepDive: 'Omvat communicatie, samenwerking, empathie, conflictoplossing en het aangaan en onderhouden van vriendschappen.'
      },
      {
        term: 'weerbaarheid',
        explanation: 'Het vermogen om weerstand te bieden aan negatieve invloeden en terug te veren na tegenslagen',
        deepDive: 'Resilience omvat zelfvertrouwen, probleemoplossend vermogen, sociale steun en het vermogen om betekenis te geven aan ervaringen.'
      }
    ],
    modules: ['module3']
  },

  // MODULE 4: Differentiatie
  {
    id: 'differentiatiestrategieen',
    title: 'Differentiatie Strategieën',
    category: 'didactiek',
    shortDescription: 'Methoden om onderwijs aan te passen aan verschillende leerbehoeften',
    fullContent: {
      definitie: 'Differentiatie is het aanpassen van onderwijs aan de verschillende leerbehoeften, interesses en leerstijlen van leerlingen om optimaal leren voor iedereen mogelijk te maken.',
      kernprincipes: [
        'Uitgaan van wat leerlingen kunnen en weten',
        'Flexibele groepering van leerlingen',
        'Variatie in instructie en materialen',
        'Keuzemogelijkheden voor leerlingen',
        'Continue assessment en aanpassing'
      ],
      praktijktoepassing: [
        'Niveaugroepen voor specifieke vakken',
        'Verschillende opdrachten voor verschillende niveaus',
        'Variatie in tijd en tempo',
        'Keuze in werkvormen en materialen',
        'Individuele leerdoelen binnen klassendoelen'
      ],
      voorbeelden: [
        'Must-Should-Could opdrachten',
        'Leercentra met verschillende activiteiten',
        'Compacting voor snelle leerders',
        'Scaffolding voor zwakkere leerders',
        'Projectwerk met verschillende rollen'
      ],
      literatuur: [
        'Tomlinson, C. (2001). How to Differentiate Instruction',
        'Gregory, G. (2008). Differentiated Instructional Strategies',
        'Heacox, D. (2012). Differentiating Instruction in the Regular Classroom'
      ],
      relatedTopics: ['scaffolding', 'adaptief-onderwijs', 'inclusief-onderwijs']
    },
    clickableTerms: [
      {
        term: 'scaffolding',
        explanation: 'Tijdelijke ondersteuning die geleidelijk wordt weggenomen naarmate leerlingen zelfstandiger worden',
        deepDive: 'Scaffolding is gebaseerd op Vygotsky\'s Zone van Naaste Ontwikkeling en omvat modeling, guided practice en independent practice.'
      },
      {
        term: 'adaptief onderwijs',
        explanation: 'Onderwijs dat zich voortdurend aanpast aan de leerbehoeften van individuele leerlingen',
        deepDive: 'Adaptief onderwijs gebruikt data en observaties om real-time aanpassingen te maken in instructie, materialen en ondersteuning.'
      }
    ],
    modules: ['module4']
  },
  {
    id: 'inclusief-onderwijs',
    title: 'Inclusief Onderwijs',
    category: 'pedagogiek',
    shortDescription: 'Onderwijs waarin alle leerlingen volwaardig kunnen participeren',
    fullContent: {
      definitie: 'Inclusief onderwijs is een onderwijsbenadering waarbij alle leerlingen, ongeacht hun achtergrond, behoeften of mogelijkheden, volwaardig kunnen deelnemen aan het reguliere onderwijs en optimaal kunnen ontwikkelen.',
      kernprincipes: [
        'Gelijkwaardige participatie voor alle leerlingen',
        'Aanpassing van onderwijs aan leerling',
        'Waardering van diversiteit',
        'Samenwerking tussen professionals',
        'Ouderparticipatie en betrokkenheid'
      ],
      praktijktoepassing: [
        'Universeel ontwerp voor leren toepassen',
        'Individuele ondersteuningsplannen maken',
        'Assistive technologie inzetten',
        'Peer support organiseren',
        'Multidisciplinair samenwerken'
      ],
      voorbeelden: [
        'Visuele ondersteuning voor alle leerlingen',
        'Flexibele zitplekken in de klas',
        'Verschillende manieren van toetsen',
        'Buddy-systemen voor ondersteuning'
      ],
      literatuur: [
        'UNESCO (2005). Guidelines for Inclusion',
        'Ainscow, M. (2006). Improving Schools, Developing Inclusion',
        'Rose, D. (2006). Universal Design for Learning'
      ],
      relatedTopics: ['differentatie', 'ondersteuning', 'diversiteit']
    },
    clickableTerms: [
      {
        term: 'universeel ontwerp voor leren',
        explanation: 'Onderwijsontwerp dat van tevoren rekening houdt met de diversiteit van leerlingen',
        deepDive: 'UDL-principe met drie netwerken: herkenning (wat leren), strategisch (hoe leren) en affectief (waarom leren).'
      }
    ],
    modules: ['module4']
  },

  // MODULE 5: Data & Evaluatie
  {
    id: 'data-gedreven-besluitvorming',
    title: 'Data-gedreven Besluitvorming',
    category: 'kwaliteit',
    shortDescription: 'Het gebruik van data voor het nemen van onderbouwde beslissingen over onderwijs',
    fullContent: {
      definitie: 'Data-gedreven besluitvorming is het systematisch verzamelen, analyseren en interpreteren van data om onderbouwde beslissingen te nemen over onderwijspraktijken en -beleid.',
      kernprincipes: [
        'Systematische dataverzameling',
        'Objectieve analyse en interpretatie',
        'Koppeling van data aan actie',
        'Continue monitoring en evaluatie',
        'Transparantie en communicatie'
      ],
      praktijktoepassing: [
        'Cito-resultaten analyseren voor interventies',
        'Observatiedata gebruiken voor lesaanpassingen',
        'Leerlingvolgsysteem voor individuele begeleiding',
        'Tevredenheidsonderzoek voor schoolverbetering',
        'Absentiecijfers monitoren voor vroegsignalering'
      ],
      voorbeelden: [
        'PDCA-cyclus voor schoolontwikkeling',
        'Dashboard met key performance indicators',
        'Teambespreking met datavisualisatie',
        'Ouderrapportage met trendanalyse',
        'Interventieplan gebaseerd op toetsresultaten'
      ],
      literatuur: [
        'Schildkamp, K. (2019). Data-based Decision Making',
        'Mandinach, E. (2012). A Perfect Time for Data Use',
        'Datnow, A. (2013). Data-Driven Decision Making'
      ],
      relatedTopics: ['pdca-cyclus', 'kwaliteitszorg', 'evidence-based-practice']
    },
    clickableTerms: [
      {
        term: 'PDCA-cyclus',
        explanation: 'Plan-Do-Check-Act cyclus voor continue verbetering van processen',
        deepDive: 'De PDCA-cyclus helpt scholen systematisch te verbeteren door planning, uitvoering, evaluatie en bijstelling in een continue cyclus.'
      },
      {
        term: 'evidence-based practice',
        explanation: 'Praktijk gebaseerd op wetenschappelijk bewijs en data',
        deepDive: 'Evidence-based practice combineert wetenschappelijk onderzoek, professionele expertise en context-specifieke data voor optimale besluitvorming.'
      }
    ],
    modules: ['module5']
  },
  {
    id: 'formatieve-evaluatie',
    title: 'Formatieve Evaluatie',
    category: 'didactiek',
    shortDescription: 'Evaluatie tijdens het leerproces om leren te verbeteren',
    fullContent: {
      definitie: 'Formatieve evaluatie is het proces van het verzamelen van informatie over leerlingenvoortgang tijdens het leerproces om instructie aan te passen en leren te optimaliseren.',
      kernprincipes: [
        'Continue feedback tijdens leren',
        'Aanpassing van instructie op basis van data',
        'Betrokkenheid van leerlingen bij evaluatie',
        'Focus op leerproces, niet alleen resultaat',
        'Gebruik van diverse evaluatiemethoden'
      ],
      praktijktoepassing: [
        'Exit tickets na lessen gebruiken',
        'Peer feedback organiseren',
        'Zelfassessment instrumenten inzetten',
        'Observatie tijdens werkprocessen',
        'Tussentijdse checkpoints plannen'
      ],
      voorbeelden: [
        'Duim omhoog/omlaag voor begripscheck',
        'Leerlingen laten uitleggen aan elkaar',
        'Portfolio-gesprekken voeren',
        'Reflectieformulieren invullen'
      ],
      literatuur: [
        'Black, P. (1998). Assessment and Classroom Learning',
        'Wiliam, D. (2011). Embedded Formative Assessment',
        'Hattie, J. (2007). The Power of Feedback'
      ],
      relatedTopics: ['feedback', 'zelfregulatie', 'assessment']
    },
    clickableTerms: [
      {
        term: 'feedback',
        explanation: 'Informatie over prestaties die helpt bij verbetering van leren',
        deepDive: 'Effectieve feedback is specifiek, tijdig, begrijpelijk en gericht op verbetering van het leerproces.'
      }
    ],
    modules: ['module5']
  },

  // MODULE 6: 21e-eeuwse vaardigheden
  {
    id: '21e-eeuwse-vaardigheden',
    title: '21e-eeuwse Vaardigheden',
    category: 'innovatie',
    shortDescription: 'Vaardigheden die leerlingen nodig hebben voor de toekomst',
    fullContent: {
      definitie: '21e-eeuwse vaardigheden zijn de competenties die leerlingen nodig hebben om succesvol te zijn in de moderne, snel veranderende wereld, inclusief kritisch denken, creativiteit, communicatie en samenwerking.',
      kernprincipes: [
        'Kritisch denken en probleemoplossing',
        'Creativiteit en innovatie',
        'Communicatie en samenwerking',
        'Digitale geletterdheid',
        'Flexibiliteit en aanpassingsvermogen'
      ],
      praktijktoepassing: [
        'Projectgebaseerd leren organiseren',
        'Onderzoeksvaardigheden ontwikkelen',
        'Presentatievaardigheden trainen',
        'Digitale tools integreren',
        'Reflectie en metacognitie stimuleren'
      ],
      voorbeelden: [
        'Design thinking projecten',
        'Collaborative online platforms',
        'Maker education activiteiten',
        'Debat en discussie technieken'
      ],
      literatuur: [
        'Trilling, B. (2009). 21st Century Skills',
        'Wagner, T. (2008). The Global Achievement Gap',
        'Partnership for 21st Century Skills (2019)'
      ],
      relatedTopics: ['design-thinking', 'digitale-geletterdheid', 'creativiteit']
    },
    clickableTerms: [
      {
        term: 'design thinking',
        explanation: 'Creatieve probleemoplossingsmethode gericht op gebruikersbehoeften',
        deepDive: 'Iteratief proces van empathie, definiëren, ideeën genereren, prototypen en testen voor innovatieve oplossingen.'
      },
      {
        term: 'digitale geletterdheid',
        explanation: 'Het vermogen om digitale technologie effectief en verantwoord te gebruiken',
        deepDive: 'Omvat technische vaardigheden, informatievaardigheden, communicatie en digitaal burgerschap.'
      }
    ],
    modules: ['module6']
  },
  {
    id: 'computational-thinking',
    title: 'Computational Thinking',
    category: 'innovatie',
    shortDescription: 'Denkvaardigheden voor probleemoplossing en algoritmisch denken',
    fullContent: {
      definitie: 'Computational thinking is een probleemoplossingsmethode die concepten uit de informatica gebruikt, zoals decompositie, patroonherkenning, abstractie en algoritmen.',
      kernprincipes: [
        'Probleem decompositie',
        'Patroon herkenning',
        'Abstractie en generalisatie',
        'Algoritme ontwerp',
        'Evaluatie en debugging'
      ],
      praktijktoepassing: [
        'Stap-voor-stap instructies maken',
        'Patronen zoeken in data',
        'Problemen opdelen in kleinere delen',
        'Flowcharts en diagrammen gebruiken',
        'Programmeeractiviteiten zonder computer'
      ],
      voorbeelden: [
        'Unplugged coding activiteiten',
        'Scratch programmeerprojecten',
        'Robotica in de klas',
        'Algoritme-spellen spelen'
      ],
      literatuur: [
        'Wing, J. (2006). Computational Thinking',
        'Grover, S. (2013). Computational Thinking in K-12',
        'Brennan, K. (2012). New Frameworks for CT'
      ],
      relatedTopics: ['programmeren', 'logisch-denken', 'probleemoplossing']
    },
    clickableTerms: [
      {
        term: 'decompositie',
        explanation: 'Het opdelen van complexe problemen in kleinere, beheersbare delen',
        deepDive: 'Fundamentele vaardigheid om grote uitdagingen aan te pakken door ze op te splitsen in overzichtelijke stappen.'
      },
      {
        term: 'algoritme',
        explanation: 'Een stap-voor-stap procedure om een probleem op te lossen',
        deepDive: 'Duidelijke instructiereeks die tot een gewenst resultaat leidt, basis van alle computerprogramma\'s.'
      }
    ],
    modules: ['module6']
  },

  // MODULE 7: Schoolleiderschap
  {
    id: 'pedagogisch-leiderschap',
    title: 'Pedagogisch Leiderschap',
    category: 'leiderschap',
    shortDescription: 'Leiderschap gericht op verbetering van onderwijs en leren',
    fullContent: {
      definitie: 'Pedagogisch leiderschap is een vorm van leiderschap die zich richt op het verbeteren van de kwaliteit van onderwijs en leren door het beïnvloeden van onderwijspraktijken en het creëren van een lerende cultuur.',
      kernprincipes: [
        'Focus op leren en onderwijskwaliteit',
        'Gedeeld leiderschap en empowerment',
        'Continue professionele ontwikkeling',
        'Data-gedreven besluitvorming',
        'Cultuur van vertrouwen en samenwerking'
      ],
      praktijktoepassing: [
        'Instructional coaching implementeren',
        'Professionele leergemeenschappen faciliteren',
        'Klassenbezoeken en feedback geven',
        'Teamreflectie organiseren',
        'Innovatie en experimenteren stimuleren'
      ],
      voorbeelden: [
        'Lesson study cyclussen organiseren',
        'Peer observation programma\'s',
        'Actieonderzoek projecten',
        'Mentoring van nieuwe collega\'s'
      ],
      literatuur: [
        'Robinson, V. (2011). Student-Centered Leadership',
        'Fullan, M. (2014). The Principal: Three Keys',
        'Leithwood, K. (2004). How Leadership Influences Learning'
      ],
      relatedTopics: ['instructional-coaching', 'professionele-ontwikkeling', 'schoolcultuur']
    },
    clickableTerms: [
      {
        term: 'instructional coaching',
        explanation: 'Begeleiding van leerkrachten gericht op verbetering van onderwijspraktijk',
        deepDive: 'Systematische ondersteuning waarbij ervaren professionals collega\'s helpen hun lespraktijk te verbeteren door observatie, feedback en reflectie.'
      },
      {
        term: 'professionele leergemeenschap',
        explanation: 'Groep professionals die samen leren en werken aan verbetering',
        deepDive: 'Collaboratieve cultuur waarin leerkrachten gezamenlijk verantwoordelijkheid nemen voor leerlingenresultaten en elkaar ondersteunen in groei.'
      }
    ],
    modules: ['module7']
  },
  {
    id: 'verandermanagement',
    title: 'Verandermanagement',
    category: 'leiderschap',
    shortDescription: 'Het leiden en begeleiden van veranderingsprocessen in onderwijs',
    fullContent: {
      definitie: 'Verandermanagement in het onderwijs is het systematisch plannen, implementeren en begeleiden van veranderingen om onderwijsverbetering te realiseren met draagvlak van alle betrokkenen.',
      kernprincipes: [
        'Duidelijke visie en communicatie',
        'Participatie en betrokkenheid',
        'Gefaseerde implementatie',
        'Ondersteuning en begeleiding',
        'Monitoring en bijstelling'
      ],
      praktijktoepassing: [
        'Veranderplan opstellen',
        'Stakeholder analyse uitvoeren',
        'Communicatiestrategie ontwikkelen',
        'Pilotprojecten organiseren',
        'Weerstand herkennen en adresseren'
      ],
      voorbeelden: [
        'Invoering nieuwe lesmethode',
        'Digitale transformatie project',
        'Implementatie inclusief onderwijs',
        'Cultuurverandering naar data-gedreven werken'
      ],
      literatuur: [
        'Kotter, J. (1996). Leading Change',
        'Fullan, M. (2007). The New Meaning of Educational Change',
        'Hall, G. (2006). Implementing Change'
      ],
      relatedTopics: ['implementatie', 'communicatie', 'weerstand']
    },
    clickableTerms: [
      {
        term: 'stakeholder analyse',
        explanation: 'Het identificeren en analyseren van alle betrokkenen bij een verandering',
        deepDive: 'Systematische inventarisatie van personen en groepen die invloed hebben op of beïnvloed worden door de verandering.'
      },
      {
        term: 'weerstand',
        explanation: 'Natuurlijke reactie op verandering die begrip en begeleiding vraagt',
        deepDive: 'Weerstand ontstaat vaak uit onzekerheid, verlies van controle of gebrek aan begrip van de noodzaak tot verandering.'
      }
    ],
    modules: ['module7']
  },

  // MODULE 8: Burgerschap
  {
    id: 'burgerschapsonderwijs',
    title: 'Burgerschapsonderwijs',
    category: 'burgerschap',
    shortDescription: 'Onderwijs gericht op vorming van actieve, democratische burgers',
    fullContent: {
      definitie: 'Burgerschapsonderwijs is gericht op het ontwikkelen van kennis, vaardigheden en attitudes die leerlingen nodig hebben om actief, verantwoordelijk en democratisch te participeren in de samenleving.',
      kernprincipes: [
        'Democratische waarden en normen',
        'Actieve participatie in samenleving',
        'Respect voor diversiteit en mensenrechten',
        'Kritisch denken over maatschappelijke kwesties',
        'Sociale verantwoordelijkheid'
      ],
      praktijktoepassing: [
        'Klassenraad organiseren',
        'Maatschappelijke projecten uitvoeren',
        'Democratische besluitvorming oefenen',
        'Diversiteit vieren en bespreken',
        'Actuele gebeurtenissen analyseren'
      ],
      voorbeelden: [
        'Schoolparlement oprichten',
        'Buurtonderzoek uitvoeren',
        'Debat over maatschappelijke thema\'s',
        'Vrijwilligerswerk organiseren'
      ],
      literatuur: [
        'Eurydice (2017). Citizenship Education at School',
        'Veugelers, W. (2007). Creating Critical-Democratic Citizenship',
        'Ten Dam, G. (2011). Measuring Citizenship Competences'
      ],
      relatedTopics: ['democratie', 'diversiteit', 'sociale-cohesie']
    },
    clickableTerms: [
      {
        term: 'democratische participatie',
        explanation: 'Actieve deelname aan democratische processen en besluitvorming',
        deepDive: 'Het vermogen en de bereidheid om bij te dragen aan democratische processen op verschillende niveaus van de samenleving.'
      },
      {
        term: 'sociale cohesie',
        explanation: 'De mate waarin mensen zich verbonden voelen met hun gemeenschap',
        deepDive: 'Sociale samenhang die ontstaat door gedeelde waarden, vertrouwen en solidariteit tussen verschillende groepen.'
      }
    ],
    modules: ['module8']
  },
  {
    id: 'interculturele-competentie',
    title: 'Interculturele Competentie',
    category: 'burgerschap',
    shortDescription: 'Vaardigheden voor effectieve interactie tussen verschillende culturen',
    fullContent: {
      definitie: 'Interculturele competentie is het vermogen om effectief en respectvol te communiceren en samen te werken met mensen uit verschillende culturele achtergronden.',
      kernprincipes: [
        'Cultureel bewustzijn en zelfkennis',
        'Respect voor culturele verschillen',
        'Effectieve interculturele communicatie',
        'Empathie en perspectief nemen',
        'Flexibiliteit in gedrag en denken'
      ],
      praktijktoepassing: [
        'Culturele achtergronden van leerlingen waarderen',
        'Interculturele dialoog faciliteren',
        'Vooroordelen bespreekbaar maken',
        'Meertaligheid als kracht benutten',
        'Inclusieve leeromgeving creëren'
      ],
      voorbeelden: [
        'Cultuurmarkt organiseren',
        'Verhalen uit verschillende culturen delen',
        'Interculturele buddy-systemen',
        'Meertalige boeken in de klas'
      ],
      literatuur: [
        'Bennett, M. (1993). Towards Ethnorelativism',
        'Deardorff, D. (2006). Identification of Intercultural Competence',
        'Byram, M. (1997). Teaching and Assessing Intercultural Competence'
      ],
      relatedTopics: ['diversiteit', 'inclusie', 'communicatie']
    },
    clickableTerms: [
      {
        term: 'cultureel bewustzijn',
        explanation: 'Het besef van eigen culturele achtergrond en die van anderen',
        deepDive: 'Het vermogen om eigen culturele lens te herkennen en te begrijpen hoe cultuur gedrag en percepties beïnvloedt.'
      },
      {
        term: 'ethnocentrisme',
        explanation: 'De neiging om eigen cultuur als norm te beschouwen',
        deepDive: 'Onbewuste aanname dat eigen culturele waarden en normen universeel en superieur zijn aan die van andere culturen.'
      }
    ],
    modules: ['module8']
  },

  // MODULE 9: Schoolleider & Cito
  {
    id: 'cito-monitoring',
    title: 'Cito Monitoring & Analyse',
    category: 'kwaliteit',
    shortDescription: 'Systematische monitoring en analyse van Cito-resultaten voor schoolverbetering',
    fullContent: {
      definitie: 'Cito monitoring is het systematisch verzamelen, analyseren en interpreteren van Cito-toetsresultaten om de onderwijskwaliteit te bewaken en gerichte verbeteracties te ondernemen.',
      kernprincipes: [
        'Systematische dataverzameling',
        'Trendanalyse over meerdere jaren',
        'Vergelijking met landelijke normen',
        'Koppeling aan interventies',
        'Transparante communicatie'
      ],
      praktijktoepassing: [
        'Driemaal per jaar Cito-toetsen afnemen',
        'A-E en I-V niveaus analyseren',
        'Groei en ontwikkeling monitoren',
        'Interventieplannen opstellen',
        'Resultaten communiceren aan team en ouders'
      ],
      voorbeelden: [
        'Dashboard met Cito-trends per groep',
        'Interventieplan voor A/B-leerlingen',
        'Verrijkingsprogramma voor D/E-leerlingen',
        'Teambespreking met data-analyse'
      ],
      literatuur: [
        'Cito (2023). Handleiding LVS',
        'Schildkamp, K. (2019). Data Use in Schools',
        'Inspectie (2022). Kwaliteitsindicatoren'
      ],
      relatedTopics: ['leerlingvolgsysteem', 'interventies', 'kwaliteitszorg']
    },
    clickableTerms: [
      {
        term: 'A-E niveaus',
        explanation: 'Cito-classificatie van A (zeer zwak) tot E (zeer goed) prestaties',
        deepDive: 'Landelijke normering waarbij A=5%, B=20%, C=45%, D=25%, E=5% van de leerlingen valt, identiek aan I-V classificatie.'
      },
      {
        term: 'leerlingvolgsysteem',
        explanation: 'Systematische registratie van leerlingenvoortgang en -resultaten',
        deepDive: 'Digitaal systeem dat alle toetsresultaten, observaties en ontwikkelingsinformatie van leerlingen bijhoudt voor monitoring en planning.'
      }
    ],
    modules: ['module9']
  },
  {
    id: 'coordinatorrollen',
    title: 'Coördinator Rollen & Verantwoordelijkheden',
    category: 'organisatie',
    shortDescription: 'Rollen en taken van verschillende coördinatoren in de school',
    fullContent: {
      definitie: 'Coördinatorrollen zijn gespecialiseerde functies binnen de school waarbij leerkrachten specifieke verantwoordelijkheden hebben voor vakgebieden, bouwlagen of onderwijsprocessen.',
      kernprincipes: [
        'Specialisatie en expertise ontwikkeling',
        'Coördinatie tussen collega\'s',
        'Kwaliteitsbewaking per domein',
        'Professionele ontwikkeling faciliteren',
        'Verbinding tussen beleid en praktijk'
      ],
      praktijktoepassing: [
        'Vakcoördinatoren voor taal en rekenen',
        'Bouwcoördinatoren voor onder-, midden- en bovenbouw',
        'IB-er voor zorg en ondersteuning',
        'Kwaliteitscoördinator voor schoolontwikkeling',
        'ICT-coördinator voor digitalisering'
      ],
      voorbeelden: [
        'Taalcoördinator analyseert Cito-lezen resultaten',
        'Rekencoördinator organiseert nascholing',
        'Bovenbouwcoördinator begeleidt VO-overgang',
        'IB-er stelt handelingsplannen op'
      ],
      literatuur: [
        'PO-Raad (2020). Functieboek Primair Onderwijs',
        'Inspectie (2019). Kwaliteit van Schoolleiding',
        'AVS (2021). Coördinatie in het Onderwijs'
      ],
      relatedTopics: ['teamorganisatie', 'professionalisering', 'kwaliteitszorg']
    },
    clickableTerms: [
      {
        term: 'intern begeleider',
        explanation: 'Specialist voor zorg, ondersteuning en begeleiding van leerlingen',
        deepDive: 'IB-er coördineert alle zorgprocessen, stelt handelingsplannen op en is contactpersoon voor externe partners.'
      },
      {
        term: 'bouwcoördinator',
        explanation: 'Coördinator voor een specifieke bouwlaag (onder-, midden- of bovenbouw)',
        deepDive: 'Verantwoordelijk voor afstemming binnen de bouw, doorlopende leerlijnen en overgang tussen bouwlagen.'
      }
    ],
    modules: ['module9']
  }
]

interface ClickableTheoryViewerProps {
  moduleId?: string
}

export default function ClickableTheoryViewer({ moduleId }: ClickableTheoryViewerProps) {
  const [selectedTopic, setSelectedTopic] = useState<TheoryTopic | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<{term: string, explanation: string, deepDive?: string} | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter topics based on module
  const filteredTopics = theoryTopics.filter(topic => {
    const matchesModule = !moduleId || topic.modules.includes(moduleId)
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesModule && matchesSearch
  })

  const categories = Array.from(new Set(filteredTopics.map(t => t.category)))

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pedagogiek': return '👥'
      case 'didactiek': return '📚'
      case 'organisatie': return '🏢'
      case 'leiderschap': return '👑'
      case 'kwaliteit': return '⭐'
      case 'ontwikkeling': return '🌱'
      case 'sel': return '❤️'
      case 'burgerschap': return '🏛️'
      case 'innovatie': return '💡'
      default: return '📖'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pedagogiek': return 'bg-blue-500'
      case 'didactiek': return 'bg-green-500'
      case 'organisatie': return 'bg-purple-500'
      case 'leiderschap': return 'bg-red-500'
      case 'kwaliteit': return 'bg-yellow-500'
      case 'ontwikkeling': return 'bg-pink-500'
      case 'sel': return 'bg-orange-500'
      case 'burgerschap': return 'bg-indigo-500'
      case 'innovatie': return 'bg-teal-500'
      default: return 'bg-gray-500'
    }
  }

  const renderClickableText = (text: string, clickableTerms: any[]) => {
    let result = text
    clickableTerms.forEach(termObj => {
      const regex = new RegExp(`\\b${termObj.term}\\b`, 'gi')
      result = result.replace(regex, `<span class="clickable-term" data-term="${termObj.term}">${termObj.term}</span>`)
    })
    return result
  }

  const handleTermClick = (term: string) => {
    const termObj = selectedTopic?.clickableTerms.find(t => t.term.toLowerCase() === term.toLowerCase())
    if (termObj) {
      setSelectedTerm(termObj)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🔗 Klikbare Theorie Verdieping</h2>
        <p className="text-teal-100">
          {moduleId ? `Theorie-onderwerpen voor ${moduleId}` : 'Alle theorie-onderwerpen'} - Klik op onderstreepte termen voor diepere uitleg
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Zoek theorie onderwerpen:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Zoek op titel of beschrijving..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Topics Grid */}
      <div className="grid gap-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden transition-all ${
              selectedTopic?.id === topic.id ? 'border-teal-500' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${getCategoryColor(topic.category)} rounded-full flex items-center justify-center text-white text-xl`}>
                    {getCategoryIcon(topic.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-gray-600 text-sm capitalize">{topic.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTopic(selectedTopic?.id === topic.id ? null : topic)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {selectedTopic?.id === topic.id ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>

              <p className="text-gray-700 mb-4">{topic.shortDescription}</p>

              {selectedTopic?.id === topic.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                  {/* Definitie */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">📖 Definitie:</h4>
                    <div 
                      className="text-gray-700 leading-relaxed clickable-content"
                      dangerouslySetInnerHTML={{
                        __html: renderClickableText(topic.fullContent.definitie, topic.clickableTerms)
                      }}
                      onClick={(e) => {
                        const target = e.target as HTMLElement
                        if (target.classList.contains('clickable-term')) {
                          handleTermClick(target.dataset.term || '')
                        }
                      }}
                    />
                  </div>

                  {/* Kernprincipes */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🎯 Kernprincipes:</h4>
                    <ul className="space-y-2">
                      {topic.fullContent.kernprincipes.map((principe, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-teal-500 mt-0.5">•</span>
                          <span className="text-gray-700">{principe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Praktijktoepassing */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🛠️ Praktijktoepassing:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {topic.fullContent.praktijktoepassing.map((toepassing, index) => (
                        <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <span className="text-green-800 text-sm">{toepassing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Voorbeelden */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">💡 Concrete Voorbeelden:</h4>
                    <div className="space-y-2">
                      {topic.fullContent.voorbeelden.map((voorbeeld, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <span className="text-blue-800 text-sm">{voorbeeld}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gerelateerde onderwerpen */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🔗 Gerelateerde Onderwerpen:</h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.fullContent.relatedTopics.map((related, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const relatedTopic = theoryTopics.find(t => t.id === related)
                            if (relatedTopic) setSelectedTopic(relatedTopic)
                          }}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
                        >
                          {related.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Literatuur */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">📚 Literatuur:</h4>
                    <ul className="space-y-1">
                      {topic.fullContent.literatuur.map((bron, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="text-gray-400 mt-0.5">📖</span>
                          <span>{bron}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Term Explanation Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedTerm.term}</h3>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">💡 Uitleg:</h4>
                  <p className="text-gray-600">{selectedTerm.explanation}</p>
                </div>
                
                {selectedTerm.deepDive && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">🔍 Verdieping:</h4>
                    <p className="text-gray-600">{selectedTerm.deepDive}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Geen theorie-onderwerpen gevonden</h3>
          <p className="text-gray-500">Probeer een andere zoekterm</p>
        </div>
      )}

      {/* CSS for clickable terms */}
      <style jsx>{`
        .clickable-content .clickable-term {
          color: #0891b2;
          text-decoration: underline;
          cursor: pointer;
          font-weight: 500;
        }
        .clickable-content .clickable-term:hover {
          color: #0e7490;
          background-color: #f0f9ff;
          padding: 1px 2px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}