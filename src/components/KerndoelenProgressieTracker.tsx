'use client'

import { useState } from 'react'

interface KerndoelProgressie {
  nummer: number
  titel: string
  vakgebied: string
  groepen: {
    groep: string
    niveau: 'basis' | 'voldoende' | 'goed' | 'uitstekend'
    activiteiten: string[]
    mijlpalen: string[]
    assessment: string
  }[]
}

const kerndoelenProgressie: KerndoelProgressie[] = [
  {
    nummer: 1,
    titel: "Mondeling taalgebruik",
    vakgebied: "Nederlandse taal",
    groepen: [
      {
        groep: "Groep 1-2",
        niveau: "basis",
        activiteiten: [
          "Luisteren naar verhalen",
          "Eenvoudige vragen beantwoorden",
          "Gevoelens uiten",
          "Samen zingen en rijmen"
        ],
        mijlpalen: [
          "Luistert 5 minuten naar verhaal",
          "Beantwoordt wie/wat vragen",
          "Gebruikt 50+ woorden actief",
          "Volgt eenvoudige instructies"
        ],
        assessment: "Observatie tijdens spel en kring"
      },
      {
        groep: "Groep 3-4",
        niveau: "voldoende",
        activiteiten: [
          "Verhaal navertellen",
          "Klasgesprek deelnemen",
          "Instructies geven",
          "Presentatie voor groep"
        ],
        mijlpalen: [
          "Vertelt verhaal in logische volgorde",
          "Stelt relevante vragen",
          "Luistert naar anderen",
          "Spreekt in volledige zinnen"
        ],
        assessment: "Spreekbeurt en gespreksobservatie"
      },
      {
        groep: "Groep 5-6",
        niveau: "goed",
        activiteiten: [
          "Discussie leiden",
          "Argumenten geven",
          "Interview afnemen",
          "Toneelstuk opvoeren"
        ],
        mijlpalen: [
          "Geeft onderbouwde mening",
          "Reageert adequaat op anderen",
          "Past taalgebruik aan situatie",
          "Spreekt 5 minuten over onderwerp"
        ],
        assessment: "Debat en presentatie-rubric"
      },
      {
        groep: "Groep 7-8",
        niveau: "uitstekend",
        activiteiten: [
          "Formele presentatie",
          "Debat organiseren",
          "Interview met expert",
          "Podcast maken"
        ],
        mijlpalen: [
          "Overtuigt met argumenten",
          "Gebruikt retorische middelen",
          "Anticipeert op vragen",
          "Spreekt voor groot publiek"
        ],
        assessment: "Portfolio en peer-assessment"
      }
    ]
  },
  {
    nummer: 6,
    titel: "Getallen en bewerkingen",
    vakgebied: "Rekenen en wiskunde",
    groepen: [
      {
        groep: "Groep 1-2",
        niveau: "basis",
        activiteiten: [
          "Tellen met voorwerpen",
          "Getallen herkennen 1-10",
          "Meer/minder vergelijken",
          "Eenvoudig optellen"
        ],
        mijlpalen: [
          "Telt tot 20",
          "Herkent cijfers 1-10",
          "Begrijpt meer/minder",
          "Telt voorwerpen correct"
        ],
        assessment: "Spelletjes en manipulatiemateriaal"
      },
      {
        groep: "Groep 3-4",
        niveau: "voldoende",
        activiteiten: [
          "Optellen en aftrekken tot 100",
          "Tafels van 1, 2, 5, 10",
          "Getallenlijn gebruiken",
          "Woordsommen maken"
        ],
        mijlpalen: [
          "Rekent vlot tot 20",
          "Kent tafels van 2, 5, 10",
          "Lost eenvoudige woordsommen op",
          "Gebruikt rekenstrategieën"
        ],
        assessment: "Cito-toetsen en rekentoetsen"
      },
      {
        groep: "Groep 5-6",
        niveau: "goed",
        activiteiten: [
          "Alle tafels automatiseren",
          "Delen met rest",
          "Breuken introduceren",
          "Complexe woordsommen"
        ],
        mijlpalen: [
          "Kent alle tafels automatisch",
          "Rekent met breuken",
          "Lost meertrapsommen op",
          "Controleert eigen werk"
        ],
        assessment: "Tempo-toetsen en projecten"
      },
      {
        groep: "Groep 7-8",
        niveau: "uitstekend",
        activiteiten: [
          "Procenten en verhoudingen",
          "Negatieve getallen",
          "Algebra-voorbereiding",
          "Realistische contexten"
        ],
        mijlpalen: [
          "Rekent met procenten",
          "Begrijpt negatieve getallen",
          "Lost complexe problemen op",
          "Kiest juiste strategie"
        ],
        assessment: "Eindtoets en praktijkopdrachten"
      }
    ]
  },
  {
    nummer: 20,
    titel: "Identiteit",
    vakgebied: "Oriëntatie op jezelf en de wereld",
    groepen: [
      {
        groep: "Groep 1-2",
        niveau: "basis",
        activiteiten: [
          "Zichzelf tekenen",
          "Familie bespreken",
          "Gevoelens herkennen",
          "Eigen naam schrijven"
        ],
        mijlpalen: [
          "Weet eigen naam en leeftijd",
          "Herkent familieleden",
          "Benoemt basis gevoelens",
          "Toont trots op eigen werk"
        ],
        assessment: "Portfolio en observatie"
      },
      {
        groep: "Groep 3-4",
        niveau: "voldoende",
        activiteiten: [
          "Stamboom maken",
          "Hobby's presenteren",
          "Cultuur delen",
          "Vriendschap bespreken"
        ],
        mijlpalen: [
          "Beschrijft eigen eigenschappen",
          "Vertelt over tradities",
          "Respecteert verschillen",
          "Maakt bewuste keuzes"
        ],
        assessment: "Presentaties en reflectie"
      },
      {
        groep: "Groep 5-6",
        niveau: "goed",
        activiteiten: [
          "Identiteitskaart maken",
          "Rolmodellen onderzoeken",
          "Toekomstdromen delen",
          "Waarden bespreken"
        ],
        mijlpalen: [
          "Reflecteert op eigen gedrag",
          "Stelt doelen voor zichzelf",
          "Waardeert diversiteit",
          "Toont empathie"
        ],
        assessment: "Zelfassessment en portfolio"
      },
      {
        groep: "Groep 7-8",
        niveau: "uitstekend",
        activiteiten: [
          "Persoonlijk manifest",
          "Maatschappelijke rol",
          "Ethische dilemma's",
          "Toekomstvisie"
        ],
        mijlpalen: [
          "Articuleert eigen waarden",
          "Neemt verantwoordelijkheid",
          "Denkt kritisch na",
          "Plant eigen toekomst"
        ],
        assessment: "Reflectieverslagen en projecten"
      }
    ]
  }
]

export default function KerndoelenProgressieTracker() {
  const [selectedKerndoel, setSelectedKerndoel] = useState<KerndoelProgressie | null>(null)
  const [selectedGroep, setSelectedGroep] = useState<string>('alle')

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'basis': return 'bg-red-100 text-red-800 border-red-200'
      case 'voldoende': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'goed': return 'bg-green-100 text-green-800 border-green-200'
      case 'uitstekend': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getNiveauIcon = (niveau: string) => {
    switch (niveau) {
      case 'basis': return '🌱'
      case 'voldoende': return '🌿'
      case 'goed': return '🌳'
      case 'uitstekend': return '🏆'
      default: return '📊'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📈 Kerndoel Progressie Tracker</h2>
        <p className="text-blue-100">
          Volg de ontwikkeling van kerndoelen van groep 1 tot 8 met concrete mijlpalen
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            🎯 Filter op groep:
          </label>
          <select
            value={selectedGroep}
            onChange={(e) => setSelectedGroep(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="alle">Alle groepen</option>
            <option value="Groep 1-2">Groep 1-2</option>
            <option value="Groep 3-4">Groep 3-4</option>
            <option value="Groep 5-6">Groep 5-6</option>
            <option value="Groep 7-8">Groep 7-8</option>
          </select>
        </div>
      </div>

      {/* Kerndoelen Grid */}
      <div className="grid gap-6">
        {kerndoelenProgressie.map((kerndoel) => (
          <div
            key={kerndoel.nummer}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Kerndoel {kerndoel.nummer}: {kerndoel.titel}
                  </h3>
                  <p className="text-gray-600">{kerndoel.vakgebied}</p>
                </div>
                <button
                  onClick={() => setSelectedKerndoel(selectedKerndoel?.nummer === kerndoel.nummer ? null : kerndoel)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {selectedKerndoel?.nummer === kerndoel.nummer ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>

              {/* Progressie Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-blue-300"></div>
                
                {kerndoel.groepen
                  .filter(groep => selectedGroep === 'alle' || groep.groep === selectedGroep)
                  .map((groep, index) => (
                  <div key={index} className="relative flex items-start space-x-4 pb-8">
                    {/* Niveau circle */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 ${getNiveauColor(groep.niveau)}`}>
                      <span className="text-lg">{getNiveauIcon(groep.niveau)}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-800">{groep.groep}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getNiveauColor(groep.niveau)}`}>
                          {groep.niveau}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <h5 className="font-medium text-green-800 mb-2">🎯 Activiteiten:</h5>
                          <ul className="space-y-1">
                            {groep.activiteiten.map((activiteit, aIndex) => (
                              <li key={aIndex} className="text-sm text-green-700 flex items-start space-x-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>{activiteit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <h5 className="font-medium text-blue-800 mb-2">🏆 Mijlpalen:</h5>
                          <ul className="space-y-1">
                            {groep.mijlpalen.map((mijlpaal, mIndex) => (
                              <li key={mIndex} className="text-sm text-blue-700 flex items-start space-x-2">
                                <span className="text-blue-500 mt-0.5">✓</span>
                                <span>{mijlpaal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-3 bg-purple-50 rounded p-2 border border-purple-200">
                        <p className="text-sm text-purple-700">
                          <strong>📊 Assessment:</strong> {groep.assessment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Details */}
              {selectedKerndoel?.nummer === kerndoel.nummer && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Implementatie Tips:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-yellow-700 mb-1">🎯 Differentiatie:</h5>
                        <ul className="space-y-1 text-yellow-600">
                          <li>• Pas activiteiten aan per niveau</li>
                          <li>• Gebruik verschillende materialen</li>
                          <li>• Bied keuzemogelijkheden</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-700 mb-1">📊 Monitoring:</h5>
                        <ul className="space-y-1 text-yellow-600">
                          <li>• Observeer regelmatig</li>
                          <li>• Documenteer voortgang</li>
                          <li>• Bespreek met team</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">📊 Niveau Uitleg:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { niveau: 'basis', beschrijving: 'Eerste kennismaking', icon: '🌱' },
            { niveau: 'voldoende', beschrijving: 'Basisvaardigheden', icon: '🌿' },
            { niveau: 'goed', beschrijving: 'Zelfstandige toepassing', icon: '🌳' },
            { niveau: 'uitstekend', beschrijving: 'Meesterschap', icon: '🏆' }
          ].map((item, index) => (
            <div key={index} className={`rounded-lg p-3 border ${getNiveauColor(item.niveau)}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium capitalize">{item.niveau}</span>
              </div>
              <p className="text-xs">{item.beschrijving}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}