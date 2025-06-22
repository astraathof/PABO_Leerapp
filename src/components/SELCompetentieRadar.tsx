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

      {/* Competenties list */}
      <div className="space-y-3">
        {selCompetenties.map((competentie, index) => {
          const groepData = competentie.leeftijdsniveaus.find(niveau => niveau.groep === selectedGroep)
          return (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg border-2 p-4 cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] ${
                selectedCompetentie?.naam === competentie.naam ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
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

              {/* Selected Competentie Details */}
              {selectedCompetentie?.naam === competentie.naam && groepData && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-pink-700 mb-2">🎯 Subvaardigheden:</h5>
                      <ul className="space-y-1">
                        {competentie.subvaardigheden.map((vaardigheid, vIndex) => (
                          <li key={vIndex} className="text-sm text-pink-600 flex items-start space-x-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>{vaardigheid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-pink-700 mb-2">💡 Voorbeelden:</h5>
                      <ul className="space-y-1">
                        {groepData.voorbeelden.map((voorbeeld, vIndex) => (
                          <li key={vIndex} className="text-sm text-pink-600 flex items-start space-x-2">
                            <span className="text-pink-500 mt-0.5">→</span>
                            <span>{voorbeeld}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-pink-700 mb-2">🛠️ Activiteiten:</h5>
                      <ul className="space-y-1">
                        {groepData.activiteiten.map((activiteit, aIndex) => (
                          <li key={aIndex} className="text-sm text-pink-600 flex items-start space-x-2">
                            <span className="text-pink-500 mt-0.5">✓</span>
                            <span>{activiteit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}