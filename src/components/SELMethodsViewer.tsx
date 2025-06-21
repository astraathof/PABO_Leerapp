'use client'

import { useState } from 'react'

interface SELMethod {
  id: string
  naam: string
  organisatie: string
  doelgroep: string
  kerncompetenties: string[]
  methodiek: {
    aanpak: string
    materialen: string[]
    tijdsduur: string
    frequentie: string
  }
  voordelen: string[]
  uitdagingen: string[]
  praktijkvoorbeelden: {
    activiteit: string
    beschrijving: string
    leeftijd: string
  }[]
  implementatie: {
    stappen: string[]
    succesfactoren: string[]
    valkuilen: string[]
  }
  onderzoek: {
    effectiviteit: string
    bronnen: string[]
  }
}

const selMethoden: SELMethod[] = [
  {
    id: 'kanjertraining',
    naam: "Kanjertraining",
    organisatie: "Kanjertraining Nederland",
    doelgroep: "Groep 1-8, hele school",
    kerncompetenties: [
      "Zelfvertrouwen",
      "Sociale vaardigheden", 
      "Weerbaarheid",
      "Empathie",
      "Conflictoplossing"
    ],
    methodiek: {
      aanpak: "Positieve benadering met focus op krachten en talenten van kinderen",
      materialen: [
        "Kanjerboeken per groep",
        "Kanjerposter",
        "Kanjerkaarten",
        "Digitale ondersteuning"
      ],
      tijdsduur: "30 minuten per week",
      frequentie: "Wekelijks gedurende het hele schooljaar"
    },
    voordelen: [
      "Positieve schoolcultuur",
      "Minder pesten",
      "Meer zelfvertrouwen bij kinderen",
      "Betere klassensfeer",
      "Concrete handvatten voor leerkrachten"
    ],
    uitdagingen: [
      "Vraagt commitment van hele team",
      "Kosten voor materialen",
      "Training van leerkrachten nodig",
      "Tijd voor implementatie"
    ],
    praktijkvoorbeelden: [
      {
        activiteit: "Kanjermoment",
        beschrijving: "Dagelijks moment waarin kinderen elkaar complimenten geven en kanjerdaden bespreken",
        leeftijd: "Groep 1-8"
      },
      {
        activiteit: "Kanjerkaarten",
        beschrijving: "Kinderen geven elkaar kaarten bij kanjerdaden zoals helpen, troosten, of inclusief gedrag",
        leeftijd: "Groep 3-8"
      },
      {
        activiteit: "Kanjerkring",
        beschrijving: "Wekelijkse kring waarin sociale situaties besproken worden met focus op oplossingen",
        leeftijd: "Groep 1-8"
      }
    ],
    implementatie: {
      stappen: [
        "Teamscholing volgen",
        "Materialen aanschaffen",
        "Ouders informeren",
        "Geleidelijke invoering per groep",
        "Evaluatie en bijstelling"
      ],
      succesfactoren: [
        "Commitment van directie",
        "Enthousiasme van team",
        "Structurele inbedding",
        "Ouderbetrokkenheid"
      ],
      valkuilen: [
        "Te snel willen gaan",
        "Onvoldoende training",
        "Geen follow-up",
        "Weerstand van collega's"
      ]
    },
    onderzoek: {
      effectiviteit: "Positieve effecten op sociaal gedrag, zelfvertrouwen en klassenklimaat aangetoond",
      bronnen: [
        "Evaluatieonderzoek Universiteit Utrecht",
        "Praktijkonderzoek deelnemende scholen"
      ]
    }
  },
  {
    id: 'lions-quest',
    naam: "Lions Quest",
    organisatie: "Lions Clubs International",
    doelgroep: "Groep 6-8 (10-14 jaar)",
    kerncompetenties: [
      "Zelfbewustzijn",
      "Zelfregulatie",
      "Sociale bewustzijn",
      "Relatievaardigheden",
      "Verantwoordelijke besluitvorming"
    ],
    methodiek: {
      aanpak: "Systematisch curriculum met lessen, activiteiten en oudercomponent",
      materialen: [
        "Leerlingenboek",
        "Docentenhandleiding",
        "Ouderbrochures",
        "Online ondersteuning"
      ],
      tijdsduur: "45 minuten per les",
      frequentie: "1-2 lessen per week"
    },
    voordelen: [
      "Wetenschappelijk onderbouwd",
      "Complete curriculum",
      "Ouderbetrokkenheid",
      "Internationale ervaring",
      "Preventie van risicogedrag"
    ],
    uitdagingen: [
      "Intensieve training vereist",
      "Tijdsinvestering",
      "Culturele aanpassing nodig",
      "Kosten voor implementatie"
    ],
    praktijkvoorbeelden: [
      {
        activiteit: "Gevoelensthermometer",
        beschrijving: "Kinderen leren hun emoties herkennen en benoemen op een schaal van 1-10",
        leeftijd: "Groep 6-7"
      },
      {
        activiteit: "Vriendschapskwaliteiten",
        beschrijving: "Onderzoeken wat goede vriendschap inhoudt en eigen vriendschappen evalueren",
        leeftijd: "Groep 7-8"
      },
      {
        activiteit: "Besluitvormingsmodel",
        beschrijving: "Stappen leren voor het nemen van verantwoordelijke beslissingen",
        leeftijd: "Groep 8"
      }
    ],
    implementatie: {
      stappen: [
        "Teamtraining van 3 dagen",
        "Pilotfase met enkele groepen",
        "Evaluatie en aanpassing",
        "Schoolbrede implementatie",
        "Jaarlijkse opfriscursus"
      ],
      succesfactoren: [
        "Gedegen training",
        "Schoolleiderschap",
        "Structurele inbedding in curriculum",
        "Oudercommunicatie"
      ],
      valkuilen: [
        "Onvoldoende voorbereiding",
        "Gebrek aan tijd",
        "Weerstand tegen verandering",
        "Geen follow-up training"
      ]
    },
    onderzoek: {
      effectiviteit: "Significant positieve effecten op sociale vaardigheden en preventie van risicogedrag",
      bronnen: [
        "Meta-analyse internationale studies",
        "Longitudinaal onderzoek VS en Europa"
      ]
    }
  },
  {
    id: 'taakspel',
    naam: "Het Taakspel",
    organisatie: "Centrum voor Jeugd en Gezin",
    doelgroep: "Groep 1-8",
    kerncompetenties: [
      "Samenwerking",
      "Verantwoordelijkheid",
      "Zelfstandigheid",
      "Sociale vaardigheden",
      "Probleemoplossing"
    ],
    methodiek: {
      aanpak: "Spelenderwijs leren door taken en uitdagingen in teams",
      materialen: [
        "Taakkaarten",
        "Beloningssysteem",
        "Evaluatieformulieren",
        "Handleiding"
      ],
      tijdsduur: "Flexibel, 15-45 minuten",
      frequentie: "Dagelijks of wekelijks"
    },
    voordelen: [
      "Speelse aanpak",
      "Flexibel inzetbaar",
      "Stimuleert samenwerking",
      "Ontwikkelt verantwoordelijkheid",
      "Eenvoudig te implementeren"
    ],
    uitdagingen: [
      "Vraagt goede organisatie",
      "Kan chaotisch worden",
      "Niet alle kinderen houden van competitie",
      "Evaluatie kan tijdrovend zijn"
    ],
    praktijkvoorbeelden: [
      {
        activiteit: "Klassendiensten",
        beschrijving: "Kinderen krijgen wekelijks verschillende taken in de klas en worden beloond voor goede uitvoering",
        leeftijd: "Groep 3-8"
      },
      {
        activiteit: "Hulpteams",
        beschrijving: "Teams van kinderen helpen elkaar bij leren en sociale problemen",
        leeftijd: "Groep 4-8"
      },
      {
        activiteit: "Projectgroepen",
        beschrijving: "Kinderen werken in wisselende teams aan verschillende projecten",
        leeftijd: "Groep 5-8"
      }
    ],
    implementatie: {
      stappen: [
        "Introductie aan team",
        "Pilot in één groep",
        "Aanpassing aan schoolcontext",
        "Uitbreiding naar andere groepen",
        "Evaluatie en verbetering"
      ],
      succesfactoren: [
        "Duidelijke regels",
        "Consequente uitvoering",
        "Positieve benadering",
        "Regelmatige evaluatie"
      ],
      valkuilen: [
        "Te ingewikkeld maken",
        "Inconsistentie",
        "Te veel focus op beloning",
        "Geen tijd voor evaluatie"
      ]
    },
    onderzoek: {
      effectiviteit: "Positieve effecten op samenwerking en verantwoordelijkheidsgevoel",
      bronnen: [
        "Praktijkonderzoek deelnemende scholen",
        "Evaluaties door GGD"
      ]
    }
  },
  {
    id: 'rots-water',
    naam: "Rots en Water",
    organisatie: "Rots en Water Nederland",
    doelgroep: "Groep 1-8",
    kerncompetenties: [
      "Weerbaarheid",
      "Zelfvertrouwen",
      "Lichaamsbesef",
      "Grenzen stellen",
      "Zelfverdediging"
    ],
    methodiek: {
      aanpak: "Fysieke en mentale training gecombineerd met filosofische principes",
      materialen: [
        "Trainingsmateriaal",
        "Instructievideo's",
        "Ouderinformatie",
        "Certificaten"
      ],
      tijdsduur: "60-90 minuten per les",
      frequentie: "Wekelijks gedurende 6-8 weken"
    },
    voordelen: [
      "Praktische vaardigheden",
      "Verhoogt zelfvertrouwen",
      "Lichamelijke component",
      "Preventie van pesten",
      "Filosofische diepgang"
    ],
    uitdagingen: [
      "Externe trainer nodig",
      "Kosten per cursus",
      "Fysieke ruimte vereist",
      "Niet alle ouders enthousiast",
      "Beperkte duur"
    ],
    praktijkvoorbeelden: [
      {
        activiteit: "Rots-houding",
        beschrijving: "Kinderen leren een sterke, zelfverzekerde houding aan te nemen",
        leeftijd: "Groep 1-8"
      },
      {
        activiteit: "Water-beweging",
        beschrijving: "Soepele bewegingen om uit conflictsituaties te komen",
        leeftijd: "Groep 3-8"
      },
      {
        activiteit: "Grenzen stellen",
        beschrijving: "Oefenen met 'nee' zeggen en grenzen aangeven",
        leeftijd: "Groep 4-8"
      }
    ],
    implementatie: {
      stappen: [
        "Contact met Rots en Water trainer",
        "Planning van lessen",
        "Ouderinformatie",
        "Uitvoering cursus",
        "Evaluatie en follow-up"
      ],
      succesfactoren: [
        "Goede trainer",
        "Ondersteuning van school",
        "Oudercommunicatie",
        "Follow-up in klas"
      ],
      valkuilen: [
        "Eenmalige actie",
        "Geen integratie in curriculum",
        "Weerstand van ouders",
        "Onvoldoende ruimte"
      ]
    },
    onderzoek: {
      effectiviteit: "Positieve effecten op zelfvertrouwen en weerbaarheid",
      bronnen: [
        "Evaluatieonderzoek deelnemende scholen",
        "Ouder- en kindtevredenheidsonderzoek"
      ]
    }
  },
  {
    id: 'mindfulness',
    naam: "Mindfulness op School",
    organisatie: "Diverse aanbieders",
    doelgroep: "Groep 1-8",
    kerncompetenties: [
      "Zelfregulatie",
      "Aandacht en concentratie",
      "Emotieregulatie",
      "Stressmanagement",
      "Zelfbewustzijn"
    ],
    methodiek: {
      aanpak: "Aandachtstraining door ademhaling, meditatie en bewustzijnsoefeningen",
      materialen: [
        "Meditatie-audio's",
        "Ademhalingsoefeningen",
        "Mindfulness spellen",
        "Docententraining"
      ],
      tijdsduur: "10-20 minuten per sessie",
      frequentie: "Dagelijks of meerdere keren per week"
    },
    voordelen: [
      "Verbetert concentratie",
      "Vermindert stress",
      "Betere emotieregulatie",
      "Eenvoudig te integreren",
      "Wetenschappelijk onderbouwd"
    ],
    uitdagingen: [
      "Vraagt discipline",
      "Niet alle kinderen reageren positief",
      "Training van leerkrachten nodig",
      "Culturele weerstand mogelijk",
      "Tijd vinden in druk programma"
    ],
    praktijkvoorbeelden: [
      {
        activiteit: "Ademhalingsoefening",
        beschrijving: "Kinderen leren bewust ademhalen om tot rust te komen",
        leeftijd: "Groep 1-8"
      },
      {
        activiteit: "Body scan",
        beschrijving: "Aandacht richten op verschillende lichaamsdelen",
        leeftijd: "Groep 4-8"
      },
      {
        activiteit: "Mindful luisteren",
        beschrijving: "Bewust luisteren naar geluiden in de omgeving",
        leeftijd: "Groep 2-6"
      }
    ],
    implementatie: {
      stappen: [
        "Training voor leerkrachten",
        "Start met korte oefeningen",
        "Geleidelijke uitbreiding",
        "Integratie in dagritme",
        "Evaluatie en aanpassing"
      ],
      succesfactoren: [
        "Eigen ervaring leerkracht",
        "Regelmatige praktijk",
        "Positieve benadering",
        "Aanpassing aan leeftijd"
      ],
      valkuilen: [
        "Te ambitieus beginnen",
        "Forceren bij weerstand",
        "Onvoldoende training",
        "Inconsistente uitvoering"
      ]
    },
    onderzoek: {
      effectiviteit: "Bewezen effecten op aandacht, emotieregulatie en welzijn",
      bronnen: [
        "Meta-analyses internationale studies",
        "Neurobiologisch onderzoek",
        "Schoolpraktijk evaluaties"
      ]
    }
  }
]

export default function SELMethodsViewer() {
  const [selectedMethod, setSelectedMethod] = useState<SELMethod | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])

  const filteredMethods = selMethoden.filter(method => {
    const matchesSearch = method.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.organisatie.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.kerncompetenties.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const speakText = (text: string, methodId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      if (isPlaying === methodId) {
        setIsPlaying(null)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'nl-NL'
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(methodId)
      utterance.onend = () => setIsPlaying(null)
      utterance.onerror = () => setIsPlaying(null)

      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleComparison = (methodId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(methodId) 
        ? prev.filter(id => id !== methodId)
        : prev.length < 3 ? [...prev, methodId] : prev
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🤝 SEL-Methodieken Vergelijker</h2>
        <p className="text-green-100">
          Ontdek en vergelijk verschillende sociaal-emotionele leermethodieken voor het basisonderwijs
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Zoeken in methodieken:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Zoek op naam, organisatie of competentie..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={compareMode}
                onChange={(e) => {
                  setCompareMode(e.target.checked)
                  if (!e.target.checked) setSelectedForComparison([])
                }}
                className="rounded border-green-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Vergelijkmodus</span>
            </label>
            
            {compareMode && selectedForComparison.length > 1 && (
              <button
                onClick={() => {/* Scroll to comparison */}}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Vergelijk ({selectedForComparison.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Methods Grid */}
      <div className="grid gap-6">
        {filteredMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all ${
              selectedForComparison.includes(method.id) ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{method.naam}</h3>
                    {compareMode && (
                      <button
                        onClick={() => toggleComparison(method.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedForComparison.includes(method.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                        }`}
                      >
                        {selectedForComparison.includes(method.id) ? '✓ Geselecteerd' : 'Selecteer'}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">📍 {method.organisatie}</p>
                  <p className="text-gray-600">🎯 {method.doelgroep}</p>
                </div>
                
                {/* Audio Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => speakText(`${method.naam} van ${method.organisatie}. Kerncompetenties: ${method.kerncompetenties.join(', ')}`, method.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isPlaying === method.id
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {isPlaying === method.id ? '🛑' : '🔊'}
                  </button>
                  <button
                    onClick={() => setSelectedMethod(selectedMethod?.id === method.id ? null : method)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {selectedMethod?.id === method.id ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Kerncompetenties */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Kerncompetenties:</h4>
                <div className="flex flex-wrap gap-2">
                  {method.kerncompetenties.map((competentie, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {competentie}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs font-medium text-blue-700">Tijdsduur</p>
                  <p className="text-sm text-blue-800">{method.methodiek.tijdsduur}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs font-medium text-purple-700">Frequentie</p>
                  <p className="text-sm text-purple-800">{method.methodiek.frequentie}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs font-medium text-green-700">Voordelen</p>
                  <p className="text-sm text-green-800">{method.voordelen.length} punten</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs font-medium text-orange-700">Effectiviteit</p>
                  <p className="text-sm text-orange-800">{method.onderzoek.effectiviteit.split(' ').slice(0, 3).join(' ')}...</p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedMethod?.id === method.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                  {/* Methodiek */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🛠️ Methodiek:</h4>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-3">
                      <p className="text-blue-800">{method.methodiek.aanpak}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Materialen:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {method.methodiek.materialen.map((materiaal, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="text-blue-500">📦</span>
                            <span>{materiaal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Praktijkvoorbeelden */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">💡 Praktijkvoorbeelden:</h4>
                    <div className="space-y-3">
                      {method.praktijkvoorbeelden.map((voorbeeld, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-800">{voorbeeld.activiteit}</h5>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {voorbeeld.leeftijd}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{voorbeeld.beschrijving}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Voor- en nadelen */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">✅ Voordelen:</h4>
                      <div className="space-y-2">
                        {method.voordelen.map((voordeel, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span className="text-gray-700 text-sm">{voordeel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">⚠️ Uitdagingen:</h4>
                      <div className="space-y-2">
                        {method.uitdagingen.map((uitdaging, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-orange-500 mt-0.5">⚠</span>
                            <span className="text-gray-700 text-sm">{uitdaging}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Implementatie */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🚀 Implementatie:</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Stappen:</h5>
                        <ol className="space-y-1">
                          {method.implementatie.stappen.map((stap, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-blue-500 font-medium">{index + 1}.</span>
                              <span>{stap}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Succesfactoren:</h5>
                        <ul className="space-y-1">
                          {method.implementatie.succesfactoren.map((factor, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Valkuilen:</h5>
                        <ul className="space-y-1">
                          {method.implementatie.valkuilen.map((valkuil, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                              <span className="text-red-500 mt-0.5">✗</span>
                              <span>{valkuil}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Onderzoek */}
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">📊 Onderzoek & Effectiviteit:</h4>
                    <p className="text-purple-700 mb-3">{method.onderzoek.effectiviteit}</p>
                    <div>
                      <h5 className="font-medium text-purple-700 mb-1">Bronnen:</h5>
                      <ul className="space-y-1">
                        {method.onderzoek.bronnen.map((bron, index) => (
                          <li key={index} className="text-sm text-purple-600 flex items-start space-x-2">
                            <span className="text-purple-500 mt-0.5">📚</span>
                            <span>{bron}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Section */}
      {compareMode && selectedForComparison.length > 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Methodiek Vergelijking</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Aspect</th>
                  {selectedForComparison.map(methodId => {
                    const method = selMethoden.find(m => m.id === methodId)
                    return (
                      <th key={methodId} className="border border-gray-200 p-3 text-left font-medium text-gray-700">
                        {method?.naam}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Organisatie</td>
                  {selectedForComparison.map(methodId => {
                    const method = selMethoden.find(m => m.id === methodId)
                    return (
                      <td key={methodId} className="border border-gray-200 p-3 text-sm">
                        {method?.organisatie}
                      </td>
                    )
                  })}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">Doelgroep</td>
                  {selectedForComparison.map(methodId => {
                    const method = selMethoden.find(m => m.id === methodId)
                    return (
                      <td key={methodId} className="border border-gray-200 p-3 text-sm">
                        {method?.doelgroep}
                      </td>
                    )
                  })}
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Tijdsduur</td>
                  {selectedForComparison.map(methodId => {
                    const method = selMethoden.find(m => m.id === methodId)
                    return (
                      <td key={methodId} className="border border-gray-200 p-3 text-sm">
                        {method?.methodiek.tijdsduur}
                      </td>
                    )
                  })}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">Kerncompetenties</td>
                  {selectedForComparison.map(methodId => {
                    const method = selMethoden.find(m => m.id === methodId)
                    return (
                      <td key={methodId} className="border border-gray-200 p-3 text-sm">
                        {method?.kerncompetenties.slice(0, 3).join(', ')}
                        {method && method.kerncompetenties.length > 3 && '...'}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMethods.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Geen methodieken gevonden</h3>
          <p className="text-gray-500">Probeer een andere zoekterm</p>
        </div>
      )}
    </div>
  )
}