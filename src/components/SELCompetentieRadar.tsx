'use client'

import { useState } from 'react'

interface SELCompetentie {
  naam: string
  definitie: string
  subvaardigheden: string[]
  leeftijdsniveaus: {
    groep: string
    niveau: number
    voorbeelden: string[]
    activiteiten: string[]
  }[]
}

const selCompetenties: SELCompetentie[] = [
  {
    naam: "Zelfbewustzijn",
    definitie: "Het vermogen om eigen emoties, gedachten en waarden te herkennen en begrijpen",
    subvaardigheden: [
      "Emoties herkennen",
      "Zelfperceptie",
      "Sterke punten identificeren",
      "Zelfvertrouwen"
    ],
    leeftijdsniveaus: [
      {
        groep: "Groep 1-2",
        niveau: 2,
        voorbeelden: [
          "Basisemoties benoemen (blij, boos, verdrietig)",
          "Eigen voorkeuren uitspreken",
          "Trots tonen op prestaties"
        ],
        activiteiten: [
          "Gevoelenskaarten gebruiken",
          "Spiegel-spel voor zelfherkenning",
          "Emotie-liedjies zingen"
        ]
      },
      {
        groep: "Groep 3-4",
        niveau: 3,
        voorbeelden: [
          "Complexere emoties herkennen",
          "Eigen gedrag reflecteren",
          "Sterke punten benoemen"
        ],
        activiteiten: [
          "Gevoelendagboek bijhouden",
          "Zelfportret met eigenschappen",
          "Complimenten-cirkel"
        ]
      },
      {
        groep: "Groep 5-6",
        niveau: 4,
        voorbeelden: [
          "Emoties en oorzaken koppelen",
          "Zelfbeeld ontwikkelen",
          "Doelen stellen"
        ],
        activiteiten: [
          "Emotie-triggers identificeren",
          "Persoonlijke missie schrijven",
          "Zelfassessment tools"
        ]
      },
      {
        groep: "Groep 7-8",
        niveau: 4,
        voorbeelden: [
          "Waarden en overtuigingen benoemen",
          "Zelfkritisch reflecteren",
          "Identiteit verkennen"
        ],
        activiteiten: [
          "Waardenkaart maken",
          "Reflectiejournal",
          "Toekomstvisie ontwikkelen"
        ]
      }
    ]
  },
  {
    naam: "Zelfregulatie",
    definitie: "Het vermogen om emoties, gedachten en gedrag effectief te managen",
    subvaardigheden: [
      "Impulsbeheer",
      "Stressmanagement",
      "Zelfmotivatie",
      "Doelen nastreven"
    ],
    leeftijdsniveaus: [
      {
        groep: "Groep 1-2",
        niveau: 2,
        voorbeelden: [
          "Wachten op beurt",
          "Rustig worden na boosheid",
          "Eenvoudige regels volgen"
        ],
        activiteiten: [
          "Ademhalingsoefeningen",
          "Rustige hoek inrichten",
          "Visuele dagstructuur"
        ]
      },
      {
        groep: "Groep 3-4",
        niveau: 3,
        voorbeelden: [
          "Frustratie hanteren",
          "Taken afmaken",
          "Hulp vragen wanneer nodig"
        ],
        activiteiten: [
          "Stop-denk-doe strategie",
          "Zelfregulatie thermometer",
          "Mindfulness oefeningen"
        ]
      },
      {
        groep: "Groep 5-6",
        niveau: 4,
        voorbeelden: [
          "Emoties reguleren in groep",
          "Plannen maken en volgen",
          "Zelfmotivatie tonen"
        ],
        activiteiten: [
          "Coping strategieën oefenen",
          "Doelen stellen en monitoren",
          "Zelfcontrole spellen"
        ]
      },
      {
        groep: "Groep 7-8",
        niveau: 4,
        voorbeelden: [
          "Stress effectief hanteren",
          "Lange termijn doelen nastreven",
          "Zelfstandig problemen oplossen"
        ],
        activiteiten: [
          "Stressmanagement technieken",
          "Projectplanning",
          "Zelfmonitoring tools"
        ]
      }
    ]
  },
  {
    naam: "Sociale Bewustzijn",
    definitie: "Het vermogen om anderen te begrijpen en empathie te tonen",
    subvaardigheden: [
      "Empathie",
      "Perspectief nemen",
      "Diversiteit waarderen",
      "Sociale normen begrijpen"
    ],
    leeftijdsniveaus: [
      {
        groep: "Groep 1-2",
        niveau: 2,
        voorbeelden: [
          "Verdriet van anderen opmerken",
          "Hulp aanbieden",
          "Verschillende gezichten herkennen"
        ],
        activiteiten: [
          "Emoties van anderen benoemen",
          "Troost-knuffels geven",
          "Verhalen over gevoelens"
        ]
      },
      {
        groep: "Groep 3-4",
        niveau: 3,
        voorbeelden: [
          "Begrijpen waarom anderen boos zijn",
          "Verschillende meningen respecteren",
          "Inclusief gedrag tonen"
        ],
        activiteiten: [
          "Perspectief-wissel spellen",
          "Diversiteit vieren",
          "Empathie-verhalen lezen"
        ]
      },
      {
        groep: "Groep 5-6",
        niveau: 4,
        voorbeelden: [
          "Complexe emoties bij anderen herkennen",
          "Culturele verschillen waarderen",
          "Sociale situaties analyseren"
        ],
        activiteiten: [
          "Rollenspel verschillende perspectieven",
          "Interculturele projecten",
          "Sociale dilemma's bespreken"
        ]
      },
      {
        groep: "Groep 7-8",
        niveau: 5,
        voorbeelden: [
          "Subtiele sociale signalen oppikken",
          "Maatschappelijke kwesties begrijpen",
          "Vooroordelen herkennen"
        ],
        activiteiten: [
          "Maatschappelijke debatten",
          "Vooroordelen onderzoeken",
          "Community service projecten"
        ]
      }
    ]
  },
  {
    naam: "Relatievaardigheden",
    definitie: "Het vermogen om gezonde relaties op te bouwen en te onderhouden",
    subvaardigheden: [
      "Communicatie",
      "Samenwerking",
      "Conflictoplossing",
      "Hulp zoeken en geven"
    ],
    leeftijdsniveaus: [
      {
        groep: "Groep 1-2",
        niveau: 2,
        voorbeelden: [
          "Samen spelen",
          "Delen met anderen",
          "Vriendelijk zijn"
        ],
        activiteiten: [
          "Samen-spel activiteiten",
          "Deel-rituelen",
          "Vriendschap-liedjies"
        ]
      },
      {
        groep: "Groep 3-4",
        niveau: 3,
        voorbeelden: [
          "Vriendschappen sluiten",
          "Samenwerken aan taken",
          "Conflicten oplossen met hulp"
        ],
        activiteiten: [
          "Vriendschap-recepten maken",
          "Teamwork projecten",
          "Vredeshoek gebruiken"
        ]
      },
      {
        groep: "Groep 5-6",
        niveau: 4,
        voorbeelden: [
          "Duurzame vriendschappen onderhouden",
          "Effectief communiceren",
          "Zelfstandig conflicten oplossen"
        ],
        activiteiten: [
          "Communicatie-training",
          "Peer mediation",
          "Groepsprojecten leiden"
        ]
      },
      {
        groep: "Groep 7-8",
        niveau: 4,
        voorbeelden: [
          "Complexe sociale netwerken navigeren",
          "Leiderschap tonen",
          "Anderen ondersteunen"
        ],
        activiteiten: [
          "Leiderschap rollen",
          "Mentoring programma's",
          "Sociale netwerk analyse"
        ]
      }
    ]
  },
  {
    naam: "Verantwoordelijke Besluitvorming",
    definitie: "Het vermogen om constructieve keuzes te maken over gedrag en sociale interacties",
    subvaardigheden: [
      "Probleem identificeren",
      "Alternatieven overwegen",
      "Gevolgen inschatten",
      "Ethische keuzes maken"
    ],
    leeftijdsniveaus: [
      {
        groep: "Groep 1-2",
        niveau: 1,
        voorbeelden: [
          "Keuzes maken tussen activiteiten",
          "Goed en fout onderscheiden",
          "Gevolgen van acties begrijpen"
        ],
        activiteiten: [
          "Keuze-borden gebruiken",
          "Verhalen over goed/fout",
          "Consequentie-spellen"
        ]
      },
      {
        groep: "Groep 3-4",
        niveau: 2,
        voorbeelden: [
          "Problemen herkennen",
          "Hulp vragen bij moeilijke keuzes",
          "Regels begrijpen en volgen"
        ],
        activiteiten: [
          "Probleem-oplossing stappenplan",
          "Morele dilemma verhalen",
          "Klassenregels maken"
        ]
      },
      {
        groep: "Groep 5-6",
        niveau: 3,
        voorbeelden: [
          "Verschillende oplossingen bedenken",
          "Voor- en nadelen afwegen",
          "Verantwoordelijkheid nemen"
        ],
        activiteiten: [
          "Besluitvormings-matrix",
          "Ethische dilemma's bespreken",
          "Consequentie-mapping"
        ]
      },
      {
        groep: "Groep 7-8",
        niveau: 4,
        voorbeelden: [
          "Complexe problemen analyseren",
          "Lange termijn gevolgen overwegen",
          "Morele principes toepassen"
        ],
        activiteiten: [
          "Ethiek-debatten",
          "Maatschappelijke keuzes analyseren",
          "Persoonlijke waarden-oefeningen"
        ]
      }
    ]
  }
]

export default function SELCompetentieRadar() {
  const [selectedGroep, setSelectedGroep] = useState<string>('Groep 5-6')
  const [selectedCompetentie, setSelectedCompetentie] = useState<SELCompetentie | null>(null)

  const groepen = ['Groep 1-2', 'Groep 3-4', 'Groep 5-6', 'Groep 7-8']

  const getCompetentieData = (competentie: SELCompetentie) => {
    const groepData = competentie.leeftijdsniveaus.find(niveau => niveau.groep === selectedGroep)
    return groepData ? groepData.niveau : 0
  }

  const getCompetentieColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500'
    ]
    return colors[index] || 'bg-gray-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🎯 SEL Competentie Radar</h2>
        <p className="text-pink-100">
          Visualiseer en analyseer sociaal-emotionele competenties per leeftijdsgroep
        </p>
      </div>

      {/* Group Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">👥 Selecteer leeftijdsgroep:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {groepen.map((groep) => (
            <button
              key={groep}
              onClick={() => setSelectedGroep(groep)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedGroep === groep
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{groep}</div>
              <div className="text-xs opacity-80">
                {groep === 'Groep 1-2' ? '4-6 jaar' :
                 groep === 'Groep 3-4' ? '6-8 jaar' :
                 groep === 'Groep 5-6' ? '8-10 jaar' : '10-12 jaar'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          📊 SEL Competenties voor {selectedGroep}
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar visualization */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              {/* Concentric circles */}
              {[1, 2, 3, 4, 5].map(level => (
                <div
                  key={level}
                  className="absolute border border-gray-200 rounded-full"
                  style={{
                    width: `${level * 20}%`,
                    height: `${level * 20}%`,
                    top: `${50 - (level * 10)}%`,
                    left: `${50 - (level * 10)}%`
                  }}
                ></div>
              ))}
              
              {/* Level labels */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-xs text-gray-500">5</div>
              <div className="absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2 text-xs text-gray-500">5</div>
              
              {/* Competentie points and lines */}
              {selCompetenties.map((competentie, index) => {
                const angle = (index / selCompetenties.length) * 2 * Math.PI - Math.PI / 2
                const niveau = getCompetentieData(competentie)
                const radius = (niveau / 5) * 40 // 40% max radius
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                
                // Label position (outside circle)
                const labelRadius = 45
                const labelX = 50 + labelRadius * Math.cos(angle)
                const labelY = 50 + labelRadius * Math.sin(angle)
                
                return (
                  <div key={index}>
                    {/* Data point */}
                    <div
                      className={`absolute w-4 h-4 ${getCompetentieColor(index)} rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => setSelectedCompetentie(selectedCompetentie?.naam === competentie.naam ? null : competentie)}
                      title={`${competentie.naam}: ${niveau}/5`}
                    ></div>
                    
                    {/* Label */}
                    <div
                      className="absolute text-xs font-medium text-gray-700 transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer"
                      style={{ 
                        left: `${labelX}%`, 
                        top: `${labelY}%`,
                        width: '60px'
                      }}
                      onClick={() => setSelectedCompetentie(selectedCompetentie?.naam === competentie.naam ? null : competentie)}
                    >
                      {competentie.naam.split(' ')[0]}
                    </div>
                  </div>
                )
              })}
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {selCompetenties.map((competentie, index) => {
                  const nextIndex = (index + 1) % selCompetenties.length
                  const angle1 = (index / selCompetenties.length) * 2 * Math.PI - Math.PI / 2
                  const angle2 = (nextIndex / selCompetenties.length) * 2 * Math.PI - Math.PI / 2
                  const niveau1 = getCompetentieData(competentie)
                  const niveau2 = getCompetentieData(selCompetenties[nextIndex])
                  const radius1 = (niveau1 / 5) * 40
                  const radius2 = (niveau2 / 5) * 40
                  const x1 = 50 + radius1 * Math.cos(angle1)
                  const y1 = 50 + radius1 * Math.sin(angle1)
                  const x2 = 50 + radius2 * Math.cos(angle2)
                  const y2 = 50 + radius2 * Math.sin(angle2)
                  
                  return (
                    <line
                      key={index}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#ec4899"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )
                })}
              </svg>
            </div>
          </div>
          
          {/* Competenties list */}
          <div className="space-y-3">
            {selCompetenties.map((competentie, index) => {
              const groepData = competentie.leeftijdsniveaus.find(niveau => niveau.groep === selectedGroep)
              return (
                <div 
                  key={index} 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCompetentie?.naam === competentie.naam ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCompetentie(selectedCompetentie?.naam === competentie.naam ? null : competentie)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{competentie.naam}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-pink-600">{groepData?.niveau || 0}/5</span>
                      <div className={`w-4 h-4 ${getCompetentieColor(index)} rounded-full`}></div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${getCompetentieColor(index)}`}
                      style={{ width: `${((groepData?.niveau || 0) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{competentie.definitie}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selected Competentie Details */}
        {selectedCompetentie && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
              <h4 className="text-xl font-bold text-pink-800 mb-4">{selectedCompetentie.naam} - {selectedGroep}</h4>
              
              {(() => {
                const groepData = selectedCompetentie.leeftijdsniveaus.find(niveau => niveau.groep === selectedGroep)
                if (!groepData) return null
                
                return (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-semibold text-pink-700 mb-3">🎯 Subvaardigheden:</h5>
                      <ul className="space-y-2">
                        {selectedCompetentie.subvaardigheden.map((vaardigheid, index) => (
                          <li key={index} className="text-sm text-pink-600 flex items-start space-x-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>{vaardigheid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-pink-700 mb-3">💡 Voorbeelden:</h5>
                      <ul className="space-y-2">
                        {groepData.voorbeelden.map((voorbeeld, index) => (
                          <li key={index} className="text-sm text-pink-600 flex items-start space-x-2">
                            <span className="text-pink-500 mt-0.5">→</span>
                            <span>{voorbeeld}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-pink-700 mb-3">🛠️ Activiteiten:</h5>
                      <ul className="space-y-2">
                        {groepData.activiteiten.map((activiteit, index) => (
                          <li key={index} className="text-sm text-pink-600 flex items-start space-x-2">
                            <span className="text-pink-500 mt-0.5">✓</span>
                            <span>{activiteit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Development Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">📈 Ontwikkeling Over Tijd:</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-3 text-left">Competentie</th>
                {groepen.map(groep => (
                  <th key={groep} className="border border-gray-200 p-3 text-center">{groep}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selCompetenties.map((competentie, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{competentie.naam}</td>
                  {groepen.map(groep => {
                    const groepData = competentie.leeftijdsniveaus.find(niveau => niveau.groep === groep)
                    const niveau = groepData?.niveau || 0
                    return (
                      <td key={groep} className="border border-gray-200 p-3 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-bold">{niveau}</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <div
                                key={star}
                                className={`w-2 h-2 rounded-full ${
                                  star <= niveau ? getCompetentieColor(index) : 'bg-gray-300'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}