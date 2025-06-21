'use client'

import { useState } from 'react'

interface Module {
  id: number
  title: string
  subtitle: string
  leerdoelen: string[]
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
    inhoud: "Wettelijk kader burgerschapsopdracht • Inspectie 'Burgerschap en Sociale Veiligheid' (vanaf 2025) • Mediawijsheid Competentiemodel • UNESCO AI Literacy framework • Digitale geletterdheid (SLO) • Datagebruik en reflectie.",
    bronnen: ["SLO Burgerschapscurriculum (https://slo.nl)", "Mediawijsheid.nl (competentiemodel)", "UNESCO \"AI and Education — Guidance for Educators\" (2024)"],
    completed: false,
    progress: 0
  }
]

export default function PABOLeerApp() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
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
              onClick={() => setSelectedModule(module)}
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
        <div className="max-w-4xl mx-auto">
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

            {/* Module Complete Button */}
            {selectedModule.progress === 100 && (
              <div className="text-center">
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