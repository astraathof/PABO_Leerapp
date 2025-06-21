'use client'

import { useState } from 'react'
import SocraticChatBot from './SocraticChatBot'
import DocumentManager from './DocumentManager'
import KerndoelenViewer from './KerndoelenViewer'
import DevelopmentTheoryViewer from './DevelopmentTheoryViewer'
import SELMethodsViewer from './SELMethodsViewer'
import ClickableTheoryViewer from './ClickableTheoryViewer'
import CitoMonitoringViewer from './CitoMonitoringViewer'
import KerndoelenProgressieTracker from './KerndoelenProgressieTracker'
import OntwikkelingsStadiaTimeline from './OntwikkelingsStadiaTimeline'
import SELCompetentieRadar from './SELCompetentieRadar'
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
  id: string
  title: string
  description: string
  icon: string
  color: string
  specialViewers: string[]
  clickable: boolean
  opdrachten: {
    titel: string
    beschrijving: string
    type: 'reflectie' | 'analyse' | 'ontwerp' | 'toepassing'
    startVraag: string
    context: string
  }[]
}

const modules: Module[] = [
  {
    id: 'module1',
    title: 'Curriculum & Kerndoelen',
    description: 'Leer de 58 kerndoelen kennen en hoe je deze implementeert in je lespraktijk',
    icon: '📚',
    color: 'bg-blue-600',
    specialViewers: ['kerndoelen', 'curriculum-mapping', 'kerndoel-progressie', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Kerndoel Implementatie Plan',
        beschrijving: 'Ontwikkel een concreet plan om een kerndoel te implementeren in je groep',
        type: 'ontwerp',
        startVraag: 'Welk kerndoel wil je implementeren en waarom is dit belangrijk voor jouw leerlingen?',
        context: 'Je bent bezig met het plannen van lessen voor de komende periode. Kies een kerndoel dat je nog niet goed hebt uitgewerkt en maak een implementatieplan.'
      },
      {
        titel: 'Curriculum Mapping Analyse',
        beschrijving: 'Analyseer de samenhang tussen kerndoelen in jouw curriculum',
        type: 'analyse',
        startVraag: 'Welke verbanden zie je tussen verschillende kerndoelen in jouw vakgebied?',
        context: 'Bekijk het curriculum van jouw groep en onderzoek hoe kerndoelen met elkaar samenhangen en elkaar versterken.'
      }
    ]
  },
  {
    id: 'module2',
    title: 'Ontwikkelingspsychologie',
    description: 'Begrijp hoe kinderen zich ontwikkelen en pas je onderwijs hierop aan',
    icon: '🧠',
    color: 'bg-purple-600',
    specialViewers: ['ontwikkelingstheorieen', 'ontwikkelingsstadia-timeline', 'sel-development', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Ontwikkelingsgericht Lesgeven',
        beschrijving: 'Ontwerp een les die aansluit bij het ontwikkelingsniveau van je leerlingen',
        type: 'ontwerp',
        startVraag: 'Hoe kun je een les aanpassen aan het cognitieve ontwikkelingsniveau van je leerlingen?',
        context: 'Je merkt dat sommige leerlingen moeite hebben met abstract denken. Hoe pas je je les aan op hun ontwikkelingsniveau?'
      },
      {
        titel: 'Observatie en Ontwikkeling',
        beschrijving: 'Reflecteer op observaties van leerlingenontwikkeling',
        type: 'reflectie',
        startVraag: 'Wat observeer je bij de ontwikkeling van je leerlingen en hoe interpreteer je dit?',
        context: 'Je hebt een week lang systematisch geobserveerd. Welke ontwikkelingspatronen zie je en wat betekent dit voor je onderwijs?'
      }
    ]
  },
  {
    id: 'module3',
    title: 'SEL & Klassenmanagement',
    description: 'Creëer een positief klassenklimaat en ontwikkel sociale vaardigheden',
    icon: '❤️',
    color: 'bg-red-600',
    specialViewers: ['sel-methodieken', 'sel-competentie-radar', 'klassenklimaat', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'SEL Programma Implementatie',
        beschrijving: 'Kies en implementeer een SEL-methodiek in je klas',
        type: 'toepassing',
        startVraag: 'Welke SEL-methodiek past het beste bij jouw klas en waarom?',
        context: 'Je wilt het sociale klimaat in je klas verbeteren. Onderzoek verschillende SEL-methodieken en kies er één om te implementeren.'
      },
      {
        titel: 'Klassenklimaat Analyse',
        beschrijving: 'Analyseer het huidige klassenklimaat en stel verbeteringen voor',
        type: 'analyse',
        startVraag: 'Hoe zou je het huidige klassenklimaat beschrijven en wat wil je verbeteren?',
        context: 'Je merkt spanningen in de klas. Analyseer de situatie en bedenk concrete stappen voor verbetering.'
      }
    ]
  },
  {
    id: 'module4',
    title: 'Differentiatie & Inclusie',
    description: 'Leer onderwijs aan te passen aan verschillende leerbehoeften',
    icon: '🎯',
    color: 'bg-green-600',
    specialViewers: ['differentiatie-matrix', 'inclusief-onderwijs', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Differentiatie Strategieën',
        beschrijving: 'Ontwikkel concrete differentiatie strategieën voor je lessen',
        type: 'ontwerp',
        startVraag: 'Hoe kun je je lessen beter afstemmen op de verschillende niveaus in je klas?',
        context: 'Je hebt leerlingen met zeer verschillende niveaus. Ontwerp een aanpak om iedereen passend onderwijs te bieden.'
      },
      {
        titel: 'Inclusie in de Praktijk',
        beschrijving: 'Reflecteer op inclusieve praktijken in je onderwijs',
        type: 'reflectie',
        startVraag: 'Hoe zorg je ervoor dat alle leerlingen zich welkom en gewaardeerd voelen?',
        context: 'Je hebt een diverse klas met leerlingen uit verschillende achtergronden. Hoe creëer je een inclusieve omgeving?'
      }
    ]
  },
  {
    id: 'module5',
    title: 'Data & Evaluatie',
    description: 'Gebruik data om je onderwijs te verbeteren en leerlingen te volgen',
    icon: '📊',
    color: 'bg-indigo-600',
    specialViewers: ['cito-scores', 'lvs-trends', 'data-analyse-dashboard', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Data-gedreven Besluitvorming',
        beschrijving: 'Analyseer leerlingdata en neem onderbouwde beslissingen',
        type: 'analyse',
        startVraag: 'Welke patronen zie je in de data van je leerlingen en wat betekent dit voor je onderwijs?',
        context: 'Je hebt de laatste Cito-resultaten binnen. Analyseer deze data en bepaal je vervolgstappen.'
      },
      {
        titel: 'Evaluatie Instrumenten',
        beschrijving: 'Ontwerp effectieve evaluatie-instrumenten voor je lessen',
        type: 'ontwerp',
        startVraag: 'Hoe kun je beter meten of je leerlingen de leerdoelen hebben bereikt?',
        context: 'Je wilt je evaluatiemethoden verbeteren. Ontwerp nieuwe instrumenten die beter aansluiten bij je doelen.'
      }
    ]
  },
  {
    id: 'module6',
    title: '21e-eeuwse Vaardigheden',
    description: 'Ontwikkel vaardigheden die leerlingen nodig hebben voor de toekomst',
    icon: '💡',
    color: 'bg-yellow-600',
    specialViewers: ['skills-radar', 'innovation-cycle', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: '21e-eeuwse Vaardigheden Project',
        beschrijving: 'Ontwerp een project dat 21e-eeuwse vaardigheden ontwikkelt',
        type: 'ontwerp',
        startVraag: 'Welke 21e-eeuwse vaardigheden wil je ontwikkelen en hoe ga je dit aanpakken?',
        context: 'Je wilt een project starten dat leerlingen voorbereidt op de toekomst. Welke vaardigheden zijn belangrijk en hoe ontwikkel je deze?'
      },
      {
        titel: 'Digitale Geletterdheid',
        beschrijving: 'Reflecteer op het ontwikkelen van digitale vaardigheden',
        type: 'reflectie',
        startVraag: 'Hoe bereid je leerlingen voor op een digitale samenleving?',
        context: 'Technologie speelt een steeds grotere rol. Hoe zorg je ervoor dat leerlingen digitaal vaardig en kritisch worden?'
      }
    ]
  },
  {
    id: 'module7',
    title: 'Schoolleiderschap',
    description: 'Ontwikkel leiderschapsvaardigheden voor onderwijsvernieuwing',
    icon: '👑',
    color: 'bg-orange-600',
    specialViewers: ['leadership-dashboard', 'verandermanagement', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Pedagogisch Leiderschap',
        beschrijving: 'Ontwikkel een visie op pedagogisch leiderschap',
        type: 'reflectie',
        startVraag: 'Wat betekent pedagogisch leiderschap voor jou en hoe ga je dit vormgeven?',
        context: 'Je krijgt meer verantwoordelijkheden in school. Hoe ga je pedagogisch leiderschap invullen?'
      },
      {
        titel: 'Verandering Leiden',
        beschrijving: 'Plan een veranderingsproces in je school',
        type: 'ontwerp',
        startVraag: 'Welke verandering wil je doorvoeren en hoe ga je dit aanpakken?',
        context: 'Je ziet mogelijkheden voor verbetering in je school. Hoe leid je een veranderingsproces?'
      }
    ]
  },
  {
    id: 'module8',
    title: 'Burgerschap & Diversiteit',
    description: 'Vorm actieve burgers en vier diversiteit in je onderwijs',
    icon: '🏛️',
    color: 'bg-teal-600',
    specialViewers: ['citizenship-competency', 'diversiteit', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Burgerschapsproject',
        beschrijving: 'Ontwerp een project dat burgerschap ontwikkelt',
        type: 'ontwerp',
        startVraag: 'Hoe kun je leerlingen voorbereiden op hun rol als actieve burgers?',
        context: 'Je wilt burgerschapsonderwijs meer vorm geven. Ontwerp een project dat democratische vaardigheden ontwikkelt.'
      },
      {
        titel: 'Diversiteit Vieren',
        beschrijving: 'Reflecteer op het omgaan met diversiteit in je klas',
        type: 'reflectie',
        startVraag: 'Hoe maak je diversiteit tot een kracht in je onderwijs?',
        context: 'Je hebt een zeer diverse klas. Hoe zorg je ervoor dat alle achtergronden gewaardeerd worden?'
      }
    ]
  },
  {
    id: 'module9',
    title: 'Schoolleider & Cito',
    description: 'Leer over schoolleiderschap, Cito-monitoring en kwaliteitszorg',
    icon: '🎓',
    color: 'bg-gray-600',
    specialViewers: ['cito-monitoring', 'coordinatorrollen', 'klikbare-theorie'],
    clickable: true,
    opdrachten: [
      {
        titel: 'Cito Data Analyse',
        beschrijving: 'Analyseer Cito-resultaten en stel verbeteracties voor',
        type: 'analyse',
        startVraag: 'Wat vertellen de Cito-resultaten over de kwaliteit van het onderwijs en welke acties zijn nodig?',
        context: 'Als schoolleider krijg je de jaarlijkse Cito-resultaten. Hoe interpreteer je deze en welke vervolgstappen neem je?'
      },
      {
        titel: 'Coördinator Rol Ontwikkeling',
        beschrijving: 'Ontwikkel je rol als coördinator in de school',
        type: 'ontwerp',
        startVraag: 'Hoe ga je je rol als coördinator invullen om de onderwijskwaliteit te verbeteren?',
        context: 'Je wordt gevraagd een coördinatorrol op je te nemen. Hoe ga je deze rol vormgeven en wat zijn je prioriteiten?'
      }
    ]
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [activeView, setActiveView] = useState<string>('overzicht')

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module)
    setActiveView('overzicht')
  }

  const renderSpecialViewer = (viewerType: string, moduleId?: string) => {
    switch (viewerType) {
      case 'kerndoelen':
        return <KerndoelenViewer />
      case 'curriculum-mapping':
        return (
          <CurriculumMappingChart 
            subjects={[
              {
                name: "Nederlandse Taal",
                coverage: 95,
                alignment: 88,
                gaps: ["Meer aandacht voor woordenschat", "Schrijfvaardigheid groep 7-8"]
              },
              {
                name: "Rekenen & Wiskunde", 
                coverage: 92,
                alignment: 94,
                gaps: ["Meetkunde uitbreiden", "Meer realistische contexten"]
              },
              {
                name: "Wereldoriëntatie",
                coverage: 78,
                alignment: 82,
                gaps: ["ICT-vaardigheden onderbouwd", "Meer aandacht voor techniek", "Burgerschap concreter maken"]
              }
            ]}
          />
        )
      case 'kerndoel-progressie':
        return <KerndoelenProgressieTracker />
      case 'ontwikkelingstheorieen':
        return <DevelopmentTheoryViewer />
      case 'ontwikkelingsstadia-timeline':
        return <OntwikkelingsStadiaTimeline />
      case 'sel-development':
        return (
          <SELDevelopmentChart 
            stages={[
              {
                age: "4-6 jaar",
                stage: "Basis emotieherkenning",
                characteristics: ["Basisemoties benoemen", "Eigen behoeften uiten", "Eenvoudige sociale regels"],
                interventions: ["Gevoelenskaarten", "Modelgedrag", "Duidelijke structuur"]
              },
              {
                age: "6-8 jaar", 
                stage: "Sociale vaardigheden",
                characteristics: ["Empathie ontwikkelen", "Samenwerken", "Conflicten herkennen"],
                interventions: ["Rollenspel", "Groepsactiviteiten", "Conflictoplossing"]
              },
              {
                age: "8-10 jaar",
                stage: "Zelfregulatie",
                characteristics: ["Emoties reguleren", "Doelen stellen", "Verantwoordelijkheid nemen"],
                interventions: ["Zelfmonitoring", "Doelen stellen", "Reflectie-activiteiten"]
              },
              {
                age: "10-12 jaar",
                stage: "Sociale complexiteit",
                characteristics: ["Complexe relaties", "Moreel redeneren", "Identiteit vorming"],
                interventions: ["Ethische dilemma's", "Peer mediation", "Identiteitsprojecten"]
              }
            ]}
          />
        )
      case 'sel-methodieken':
        return <SELMethodsViewer />
      case 'sel-competentie-radar':
        return <SELCompetentieRadar />
      case 'klassenklimaat':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🏫 Klassenklimaat Analyse</h3>
              <p className="text-blue-700 mb-4">
                Een positief klassenklimaat is de basis voor effectief leren. Hier zijn de belangrijkste componenten:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🔑 Kerncomponenten:</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Veiligheid en vertrouwen</li>
                    <li>• Positieve relaties</li>
                    <li>• Duidelijke verwachtingen</li>
                    <li>• Inclusiviteit</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 Meetinstrumenten:</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Leerling enquêtes</li>
                    <li>• Observatie protocollen</li>
                    <li>• Klassenklimaat thermometer</li>
                    <li>• 360-graden feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      case 'differentiatie-matrix':
        return (
          <DifferentiationMatrix 
            activities={[
              {
                level: "Groep 3",
                must: "Getallen 1-20 herkennen",
                should: "Optellen tot 10",
                could: "Woordsommen maken"
              },
              {
                level: "Groep 4",
                must: "Tafels van 2, 5, 10",
                should: "Alle tafels tot 5",
                could: "Tafels tot 10 automatiseren"
              },
              {
                level: "Groep 5",
                must: "Breuken herkennen",
                should: "Breuken vergelijken",
                could: "Breuken optellen"
              },
              {
                level: "Groep 6",
                must: "Procenten begrijpen",
                should: "Procenten berekenen",
                could: "Procenten toepassen"
              }
            ]}
          />
        )
      case 'inclusief-onderwijs':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">🤝 Inclusief Onderwijs Framework</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">🎯 Principes:</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Gelijkwaardige participatie</li>
                    <li>• Aanpassing aan leerling</li>
                    <li>• Waardering diversiteit</li>
                    <li>• Samenwerking professionals</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">🛠️ Strategieën:</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Universeel ontwerp</li>
                    <li>• Assistive technologie</li>
                    <li>• Peer support</li>
                    <li>• Flexibele groepering</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">📊 Monitoring:</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Individuele plannen</li>
                    <li>• Voortgangsmonitoring</li>
                    <li>• Teamoverleg</li>
                    <li>• Ouderparticipatie</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      case 'cito-scores':
        return (
          <CitoScoreChart 
            title="Cito Rekenen Resultaten Groep 6"
            data={[
              { level: "A", percentage: 8, national: 5, color: "bg-red-500" },
              { level: "B", percentage: 15, national: 20, color: "bg-orange-500" },
              { level: "C", percentage: 45, national: 45, color: "bg-yellow-500" },
              { level: "D", percentage: 25, national: 25, color: "bg-green-500" },
              { level: "E", percentage: 7, national: 5, color: "bg-blue-500" }
            ]}
            explanation="De school scoort iets lager op niveau B, maar hoger op A en E. Dit wijst op meer spreiding in prestaties."
          />
        )
      case 'lvs-trends':
        return (
          <LVSTrendChart 
            subject="Begrijpend Lezen"
            data={[
              { month: "Sep", percentage: 72, target: 75 },
              { month: "Jan", percentage: 78, target: 80 },
              { month: "Jun", percentage: 82, target: 85 }
            ]}
          />
        )
      case 'data-analyse-dashboard':
        return (
          <DataAnalysisDashboard 
            datasets={[
              {
                name: "Cito Trends 3 jaar",
                type: "trend",
                data: { "2022": 78, "2023": 82, "2024": 85 },
                insights: [
                  "Stijgende trend in alle vakgebieden",
                  "Grootste groei in rekenen (+7%)",
                  "Spelling blijft aandachtspunt"
                ]
              },
              {
                name: "Groepsvergelijking",
                type: "comparison", 
                data: { "Groep 3": 75, "Groep 4": 78, "Groep 5": 82 },
                insights: [
                  "Groep 5 presteert bovengemiddeld",
                  "Groep 3 heeft extra ondersteuning nodig",
                  "Doorlopende lijn zichtbaar"
                ]
              }
            ]}
          />
        )
      case 'skills-radar':
        return (
          <SkillsRadarChart 
            skills={[
              { name: "Kritisch Denken", level: 4, description: "Analyseren en evalueren van informatie" },
              { name: "Creativiteit", level: 3, description: "Originele ideeën en oplossingen bedenken" },
              { name: "Communicatie", level: 4, description: "Effectief communiceren in verschillende contexten" },
              { name: "Samenwerking", level: 5, description: "Productief samenwerken in teams" },
              { name: "Digitale Geletterdheid", level: 3, description: "Effectief gebruik van digitale tools" }
            ]}
          />
        )
      case 'innovation-cycle':
        return (
          <InnovationCycleVisualizer 
            phases={[
              {
                name: "Empathie",
                description: "Begrijp de gebruiker en hun behoeften",
                activities: ["Interviews afnemen", "Observeren", "Empathy maps maken"],
                tools: ["Persona's", "Journey maps", "Stakeholder analysis"]
              },
              {
                name: "Definiëren", 
                description: "Formuleer het probleem helder",
                activities: ["Probleem statement", "How might we vragen", "Doelgroep bepalen"],
                tools: ["Problem statement", "Point of view", "Design challenge"]
              },
              {
                name: "Ideeën",
                description: "Genereer creatieve oplossingen",
                activities: ["Brainstormen", "Schetsen", "Ideeën combineren"],
                tools: ["Brainstorm technieken", "Mind mapping", "SCAMPER methode"]
              },
              {
                name: "Prototype",
                description: "Maak tastbare versies van ideeën",
                activities: ["Snelle prototypes", "Materialen testen", "Itereren"],
                tools: ["Papier prototypes", "Digitale mockups", "Role playing"]
              },
              {
                name: "Testen",
                description: "Test oplossingen met gebruikers",
                activities: ["Gebruikerstests", "Feedback verzamelen", "Verbeteren"],
                tools: ["Test protocollen", "Feedback forms", "Observatie"]
              }
            ]}
          />
        )
      case 'leadership-dashboard':
        return (
          <LeadershipDashboard 
            metrics={[
              { title: "Teamtevredenheid", value: "8.2/10", trend: "up", color: "bg-green-500" },
              { title: "Leerlingenresultaten", value: "+5%", trend: "up", color: "bg-blue-500" },
              { title: "Innovatieprojecten", value: "12", trend: "up", color: "bg-purple-500" },
              { title: "Oudertevredenheid", value: "7.8/10", trend: "stable", color: "bg-orange-500" }
            ]}
          />
        )
      case 'verandermanagement':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4">🔄 Verandermanagement Model</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">📋 Kotter's 8 Stappen:</h4>
                  <ol className="space-y-2 text-sm text-orange-600">
                    <li>1. Urgentie creëren</li>
                    <li>2. Coalitie vormen</li>
                    <li>3. Visie ontwikkelen</li>
                    <li>4. Visie communiceren</li>
                    <li>5. Empowerment</li>
                    <li>6. Korte termijn successen</li>
                    <li>7. Consolideren</li>
                    <li>8. Verankeren</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">⚠️ Veelgemaakte Fouten:</h4>
                  <ul className="space-y-2 text-sm text-orange-600">
                    <li>• Te snel willen gaan</li>
                    <li>• Onvoldoende communicatie</li>
                    <li>• Weerstand negeren</li>
                    <li>• Geen follow-up</li>
                    <li>• Top-down benadering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      case 'citizenship-competency':
        return (
          <CitizenshipCompetencyMatrix 
            competencies={[
              {
                domain: "Democratische Participatie",
                skills: [
                  { name: "Stemrecht begrijpen", level: 3, examples: ["Klassenraad", "Schoolparlement", "Verkiezingen simuleren"] },
                  { name: "Meningen uiten", level: 4, examples: ["Debatteren", "Petities", "Democratische besluitvorming"] }
                ]
              },
              {
                domain: "Sociale Cohesie",
                skills: [
                  { name: "Samenwerken", level: 5, examples: ["Groepsprojecten", "Conflictoplossing", "Teambuilding"] },
                  { name: "Diversiteit waarderen", level: 4, examples: ["Cultuurmarkt", "Interculturele dialoog", "Inclusie"] }
                ]
              },
              {
                domain: "Kritisch Burgerschap",
                skills: [
                  { name: "Media literacy", level: 3, examples: ["Nepnieuws herkennen", "Bronnen checken", "Kritisch lezen"] },
                  { name: "Maatschappelijke betrokkenheid", level: 4, examples: ["Vrijwilligerswerk", "Buurtprojecten", "Activisme"] }
                ]
              }
            ]}
          />
        )
      case 'diversiteit':
        return (
          <div className="space-y-6">
            <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
              <h3 className="text-xl font-bold text-teal-800 mb-4">🌍 Diversiteit & Inclusie Framework</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded p-4 border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">🎭 Culturele Diversiteit:</h4>
                  <ul className="space-y-1 text-sm text-teal-700">
                    <li>• Verschillende tradities vieren</li>
                    <li>• Meertaligheid als kracht</li>
                    <li>• Interculturele competentie</li>
                    <li>• Vooroordelen bespreekbaar maken</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4 border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">🧠 Cognitieve Diversiteit:</h4>
                  <ul className="space-y-1 text-sm text-teal-700">
                    <li>• Verschillende leerstijlen</li>
                    <li>• Multiple intelligences</li>
                    <li>• Neurodiversiteit</li>
                    <li>• Individuele talenten</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4 border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">🤝 Sociale Diversiteit:</h4>
                  <ul className="space-y-1 text-sm text-teal-700">
                    <li>• Verschillende gezinsvormen</li>
                    <li>• Socio-economische achtergronden</li>
                    <li>• Gender identiteit</li>
                    <li>• Religieuze overtuigingen</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      case 'cito-monitoring':
        return <CitoMonitoringViewer />
      case 'coordinatorrollen':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Coördinator Rollen & Verantwoordelijkheden</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    rol: "Taalcoördinator",
                    taken: ["Taalbeleid ontwikkelen", "Cito-lezen analyseren", "Leesmethode evalueren", "Teamscholing"],
                    focus: "Nederlandse taal kerndoelen 1-5"
                  },
                  {
                    rol: "Rekencoördinator", 
                    taken: ["Rekenbeleid vormgeven", "Cito-rekenen monitoren", "Nascholing organiseren", "Interventies"],
                    focus: "Rekenen kerndoelen 6-15"
                  },
                  {
                    rol: "IB-er",
                    taken: ["Zorgstructuur leiden", "Handelingsplannen", "Externe contacten", "Data-analyse zorg"],
                    focus: "Alle leerlingen met extra behoeften"
                  },
                  {
                    rol: "Onderbouwcoördinator",
                    taken: ["Groep 1-4 beleid", "Overgang kleuteronderwijs", "Startpositie groep 3", "Vroege interventies"],
                    focus: "Fundament leggen"
                  },
                  {
                    rol: "Bovenbouwcoördinator",
                    taken: ["Groep 7-8 programma", "VO-overgang", "B8 toets organiseren", "Schooladvies"],
                    focus: "Voorbereiding voortgezet onderwijs"
                  },
                  {
                    rol: "Kwaliteitscoördinator",
                    taken: ["Schoolontwikkeling", "Data-analyse schoolbreed", "Evaluaties", "Verbeterplannen"],
                    focus: "Onderwijskwaliteit bewaken"
                  }
                ].map((coordinator, index) => (
                  <div key={index} className="bg-white rounded p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">{coordinator.rol}</h4>
                    <p className="text-sm text-gray-600 mb-3 italic">{coordinator.focus}</p>
                    <ul className="space-y-1">
                      {coordinator.taken.map((taak, tIndex) => (
                        <li key={tIndex} className="text-sm text-gray-700 flex items-start space-x-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{taak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'klikbare-theorie':
        return <ClickableTheoryViewer moduleId={moduleId} />
      default:
        return <div>Viewer niet gevonden</div>
    }
  }

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className={`${selectedModule.color} text-white p-6`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  ← Terug
                </button>
                <div className="text-4xl">{selectedModule.icon}</div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedModule.title}</h1>
                  <p className="opacity-90">{selectedModule.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveView('overzicht')}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeView === 'overzicht'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Overzicht
              </button>
              <button
                onClick={() => setActiveView('ai-begeleiding')}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeView === 'ai-begeleiding'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🤖 AI Begeleiding
              </button>
              {selectedModule.specialViewers.map((viewer) => {
                const viewerLabels: { [key: string]: string } = {
                  'kerndoelen': '📚 Alle Kerndoelen',
                  'curriculum-mapping': '🗺️ Curriculum Mapping',
                  'kerndoel-progressie': '📈 Kerndoel Progressie',
                  'ontwikkelingstheorieen': '🧠 Ontwikkelingstheorieën',
                  'ontwikkelingsstadia-timeline': '🌱 Ontwikkelingsstadia',
                  'sel-development': '❤️ SEL Ontwikkeling',
                  'sel-methodieken': '🤝 SEL Methodieken',
                  'sel-competentie-radar': '🎯 SEL Competenties',
                  'klassenklimaat': '🏫 Klassenklimaat',
                  'differentiatie-matrix': '🎯 Differentiatie Matrix',
                  'inclusief-onderwijs': '🤝 Inclusief Onderwijs',
                  'cito-scores': '📊 Cito Scores',
                  'lvs-trends': '📈 LVS Trends',
                  'data-analyse-dashboard': '📊 Data Dashboard',
                  'skills-radar': '🌟 21e-eeuwse Vaardigheden',
                  'innovation-cycle': '🔄 Design Thinking',
                  'leadership-dashboard': '👑 Leadership Dashboard',
                  'verandermanagement': '🔄 Verandermanagement',
                  'citizenship-competency': '🏛️ Burgerschap Matrix',
                  'diversiteit': '🌍 Diversiteit',
                  'cito-monitoring': '📊 Complete Cito Gids',
                  'coordinatorrollen': '👥 Coördinator Rollen',
                  'klikbare-theorie': '🔗 Klikbare Theorie'
                }
                
                return (
                  <button
                    key={viewer}
                    onClick={() => setActiveView(viewer)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeView === viewer
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {viewerLabels[viewer] || viewer}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          {activeView === 'overzicht' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedModule.icon} {selectedModule.title}
                </h2>
                <p className="text-gray-600 mb-6">{selectedModule.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Wat ga je leren?</h3>
                    <ul className="space-y-2">
                      {selectedModule.specialViewers.slice(0, 4).map((viewer, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-600">
                          <span className="text-green-500">✓</span>
                          <span>
                            {viewer === 'kerndoelen' && 'Alle 58 kerndoelen begrijpen en toepassen'}
                            {viewer === 'curriculum-mapping' && 'Curriculum samenhang analyseren'}
                            {viewer === 'kerndoel-progressie' && 'Progressie volgen van groep 1-8'}
                            {viewer === 'ontwikkelingstheorieen' && 'Belangrijkste ontwikkelingstheorieën'}
                            {viewer === 'ontwikkelingsstadia-timeline' && 'Ontwikkelingsstadia per leeftijd'}
                            {viewer === 'sel-development' && 'Sociaal-emotionele ontwikkeling'}
                            {viewer === 'sel-methodieken' && 'SEL-programma\'s vergelijken en kiezen'}
                            {viewer === 'sel-competentie-radar' && 'SEL-competenties per leeftijd'}
                            {viewer === 'klassenklimaat' && 'Positief klassenklimaat creëren'}
                            {viewer === 'differentiatie-matrix' && 'Effectief differentiëren'}
                            {viewer === 'inclusief-onderwijs' && 'Inclusieve praktijken implementeren'}
                            {viewer === 'cito-scores' && 'Cito-resultaten analyseren'}
                            {viewer === 'lvs-trends' && 'Leerlingvolgsysteem optimaliseren'}
                            {viewer === 'data-analyse-dashboard' && 'Data-gedreven beslissingen nemen'}
                            {viewer === 'skills-radar' && '21e-eeuwse vaardigheden ontwikkelen'}
                            {viewer === 'innovation-cycle' && 'Design thinking toepassen'}
                            {viewer === 'leadership-dashboard' && 'Pedagogisch leiderschap tonen'}
                            {viewer === 'verandermanagement' && 'Verandering succesvol leiden'}
                            {viewer === 'citizenship-competency' && 'Burgerschapscompetenties ontwikkelen'}
                            {viewer === 'diversiteit' && 'Diversiteit als kracht benutten'}
                            {viewer === 'cito-monitoring' && 'Complete Cito-monitoring beheersen'}
                            {viewer === 'coordinatorrollen' && 'Coördinatorrol effectief invullen'}
                            {viewer === 'klikbare-theorie' && 'Theorie verdiepen met klikbare concepten'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🛠️ Beschikbare Tools</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-blue-500">🤖</span>
                        <span>AI-begeleiding met socratische methode</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-purple-500">📊</span>
                        <span>Interactieve visualisaties en tools</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-green-500">📚</span>
                        <span>Koppeling met je schooldocumenten</span>
                      </div>
                      {selectedModule.clickable && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <span className="text-teal-500">🔗</span>
                          <span>Klikbare theorie voor verdieping</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">🚀 Start met AI-begeleiding</h3>
                  <p className="text-blue-700 mb-4">
                    Krijg persoonlijke begeleiding bij het leren van deze module
                  </p>
                  <button
                    onClick={() => setActiveView('ai-begeleiding')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start AI-begeleiding
                  </button>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">📊 Verken Tools</h3>
                  <p className="text-purple-700 mb-4">
                    Ontdek de interactieve tools en visualisaties
                  </p>
                  <button
                    onClick={() => setActiveView(selectedModule.specialViewers[0])}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Verken Tools
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'ai-begeleiding' && (
            <SocraticChatBot module={selectedModule.title} opdrachten={selectedModule.opdrachten} />
          )}

          {selectedModule.specialViewers.includes(activeView) && (
            renderSpecialViewer(activeView, selectedModule.id)
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">🎓 PABO Leerapp</h1>
          <p className="text-xl text-blue-100 mb-6">
            Interactieve leerapp voor PABO-studenten met AI-begeleiding
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span>AI-begeleiding</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span>Visueel leren</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔗</span>
              <span>Klikbare theorie</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span>Document-integratie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveView('modules')}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === 'modules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📚 Modules
            </button>
            <button
              onClick={() => setActiveView('documenten')}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === 'documenten'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📄 Mijn Documenten
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeView === 'modules' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Kies een module om te starten</h2>
              <p className="text-gray-600">Elke module bevat AI-begeleiding, visuele tools en klikbare theorie</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className={`${module.color} p-6 text-white`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{module.icon}</span>
                      <h3 className="text-xl font-bold">{module.title}</h3>
                    </div>
                    <p className="text-sm opacity-90">{module.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-blue-500">🤖</span>
                        <span>AI-begeleiding beschikbaar</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-purple-500">📊</span>
                        <span>{module.specialViewers.length} interactieve tools</span>
                      </div>
                      {module.clickable && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="text-teal-500">🔗</span>
                          <span>Klikbare theorie verdieping</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-green-500">📝</span>
                        <span>{module.opdrachten.length} praktijkopdrachten</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Start Module →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'documenten' && <DocumentManager />}
      </div>
    </div>
  )
}