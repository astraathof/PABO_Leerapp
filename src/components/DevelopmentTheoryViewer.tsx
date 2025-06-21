'use client'

import { useState } from 'react'

interface DevelopmentTheory {
  id: string
  naam: string
  auteur: string
  categorie: 'cognitief' | 'sociaal-emotioneel' | 'moreel' | 'fysiek' | 'taal'
  kernprincipes: string[]
  stadia: {
    naam: string
    leeftijd: string
    kenmerken: string[]
    voorbeelden: string[]
  }[]
  praktijktoepassingen: string[]
  kritiekpunten: string[]
  relevantieVoorPABO: string
}

const ontwikkelingstheorieen: DevelopmentTheory[] = [
  {
    id: 'piaget',
    naam: "Cognitieve Ontwikkelingstheorie",
    auteur: "Jean Piaget",
    categorie: 'cognitief',
    kernprincipes: [
      "Kinderen construeren actief hun kennis",
      "Ontwikkeling verloopt in vaste stadia",
      "Assimilatie en accommodatie",
      "Evenwicht tussen denken en omgeving"
    ],
    stadia: [
      {
        naam: "Sensomotorisch stadium",
        leeftijd: "0-2 jaar",
        kenmerken: [
          "Leren door zintuigen en beweging",
          "Objectpermanentie ontwikkelt zich",
          "Geen symbolisch denken"
        ],
        voorbeelden: [
          "Baby grijpt naar speelgoed",
          "Kiekeboe spelen",
          "Voorwerpen in mond stoppen"
        ]
      },
      {
        naam: "Preoperationeel stadium",
        leeftijd: "2-7 jaar (groep 1-4)",
        kenmerken: [
          "Symbolisch denken ontstaat",
          "Egocentrisme",
          "Geen logisch denken",
          "Problemen met behoud"
        ],
        voorbeelden: [
          "Doen alsof spelen",
          "Denken dat de maan hen volgt",
          "Water in hoog glas = meer water",
          "Animisme (auto heeft pijn)"
        ]
      },
      {
        naam: "Concreet operationeel stadium",
        leeftijd: "7-11 jaar (groep 5-8)",
        kenmerken: [
          "Logisch denken met concrete objecten",
          "Begrip van behoud",
          "Classificatie en seriatie",
          "Nog geen abstract denken"
        ],
        voorbeelden: [
          "Begrijpen dat 5+3=8 en 8-3=5",
          "Objecten sorteren op eigenschappen",
          "Begrip van tijd en ruimte",
          "Regels van spellen begrijpen"
        ]
      },
      {
        naam: "Formeel operationeel stadium",
        leeftijd: "11+ jaar (voortgezet onderwijs)",
        kenmerken: [
          "Abstract en hypothetisch denken",
          "Wetenschappelijk redeneren",
          "Idealisme en kritiek op volwassenen"
        ],
        voorbeelden: [
          "Hypotheses opstellen",
          "Filosofische vragen stellen",
          "Complexe wiskundige problemen",
          "Toekomstplanning"
        ]
      }
    ],
    praktijktoepassingen: [
      "Gebruik concreet materiaal in groep 3-6",
      "Respecteer egocentrisme in jonge kinderen",
      "Bied hands-on ervaringen",
      "Pas abstractie geleidelijk toe",
      "Laat kinderen zelf ontdekken"
    ],
    kritiekpunten: [
      "Te rigide stadia",
      "Onderschat jonge kinderen",
      "Culturele verschillen niet meegenomen",
      "Sociale aspecten onderbelicht"
    ],
    relevantieVoorPABO: "Essentieel voor begrijpen van denkontwikkeling en aanpassen van onderwijs aan cognitieve mogelijkheden van kinderen."
  },
  {
    id: 'vygotsky',
    naam: "Socioculturele Ontwikkelingstheorie",
    auteur: "Lev Vygotsky",
    categorie: 'cognitief',
    kernprincipes: [
      "Sociale interactie drijft ontwikkeling",
      "Zone van Naaste Ontwikkeling (ZNO)",
      "Scaffolding door meer kundige anderen",
      "Taal is cruciaal voor denken"
    ],
    stadia: [
      {
        naam: "Sociale spraak",
        leeftijd: "0-3 jaar",
        kenmerken: [
          "Communicatie met anderen",
          "Taal voor sociale doelen",
          "Nog geen innerlijke spraak"
        ],
        voorbeelden: [
          "Vragen stellen aan ouders",
          "Samen spelen met woorden",
          "Instructies opvolgen"
        ]
      },
      {
        naam: "Egocentristische spraak",
        leeftijd: "3-7 jaar",
        kenmerken: [
          "Hardop denken",
          "Zelfregulatie door spraak",
          "Overgang naar innerlijke spraak"
        ],
        voorbeelden: [
          "Hardop vertellen wat ze doen",
          "Zichzelf instructies geven",
          "Commentaar tijdens spel"
        ]
      },
      {
        naam: "Innerlijke spraak",
        leeftijd: "7+ jaar",
        kenmerken: [
          "Denken in woorden",
          "Zelfregulatie geïnternaliseerd",
          "Complexe probleemoplossing"
        ],
        voorbeelden: [
          "Stil nadenken over problemen",
          "Plannen maken in gedachten",
          "Zelfcontrole door innerlijke dialoog"
        ]
      }
    ],
    praktijktoepassingen: [
      "Werk in de ZNO van elk kind",
      "Gebruik scaffolding technieken",
      "Stimuleer samenwerking tussen kinderen",
      "Moedig hardop denken aan",
      "Gebruik taal als leermiddel"
    ],
    kritiekpunten: [
      "Moeilijk meetbaar concept (ZNO)",
      "Overschat rol van sociale interactie",
      "Weinig aandacht voor individuele verschillen"
    ],
    relevantieVoorPABO: "Fundamenteel voor begrijpen van scaffolding, differentiatie en het belang van sociale interactie in leren."
  },
  {
    id: 'erikson',
    naam: "Psychosociale Ontwikkelingstheorie",
    auteur: "Erik Erikson",
    categorie: 'sociaal-emotioneel',
    kernprincipes: [
      "Ontwikkeling duurt het hele leven",
      "Elke fase heeft een crisis/conflict",
      "Succesvolle oplossing leidt tot deugd",
      "Sociale omgeving is cruciaal"
    ],
    stadia: [
      {
        naam: "Vertrouwen vs. Wantrouwen",
        leeftijd: "0-1 jaar",
        kenmerken: [
          "Basis vertrouwen ontwikkelen",
          "Afhankelijk van verzorging",
          "Fundament voor latere relaties"
        ],
        voorbeelden: [
          "Huilen wordt beantwoord",
          "Regelmatige voeding en zorg",
          "Veilige hechting"
        ]
      },
      {
        naam: "Autonomie vs. Schaamte",
        leeftijd: "1-3 jaar",
        kenmerken: [
          "Zelfstandigheid ontwikkelen",
          "Eigen wil tonen",
          "Grenzen verkennen"
        ],
        voorbeelden: [
          "Zelf willen aankleden",
          "Nee zeggen",
          "Zindelijkheidstraining"
        ]
      },
      {
        naam: "Initiatief vs. Schuld",
        leeftijd: "3-6 jaar (groep 1-2)",
        kenmerken: [
          "Plannen maken en uitvoeren",
          "Leiderschap tonen",
          "Sociale vaardigheden"
        ],
        voorbeelden: [
          "Spel organiseren",
          "Nieuwe activiteiten bedenken",
          "Vriendschappen sluiten"
        ]
      },
      {
        naam: "Vlijt vs. Minderwaardigheid",
        leeftijd: "6-12 jaar (groep 3-8)",
        kenmerken: [
          "Competentie ontwikkelen",
          "Vergelijken met leeftijdsgenoten",
          "Prestaties belangrijk"
        ],
        voorbeelden: [
          "Trots op schoolwerk",
          "Hobby's ontwikkelen",
          "Teamsporten",
          "Vaardigheden oefenen"
        ]
      }
    ],
    praktijktoepassingen: [
      "Bouw vertrouwensrelatie met leerlingen",
      "Geef kinderen keuzemogelijkheden",
      "Stimuleer initiatief en creativiteit",
      "Erken en vier prestaties",
      "Help bij omgaan met teleurstellingen"
    ],
    kritiekpunten: [
      "Cultureel bepaalde normen",
      "Te algemene beschrijvingen",
      "Moeilijk toetsbaar"
    ],
    relevantieVoorPABO: "Cruciaal voor begrijpen van sociaal-emotionele behoeften en het creëren van een veilige leeromgeving."
  },
  {
    id: 'kohlberg',
    naam: "Morele Ontwikkelingstheorie",
    auteur: "Lawrence Kohlberg",
    categorie: 'moreel',
    kernprincipes: [
      "Morele redenering ontwikkelt in stadia",
      "Universele principes bestaan",
      "Cognitieve ontwikkeling voorafgaand aan morele",
      "Dilemma's stimuleren groei"
    ],
    stadia: [
      {
        naam: "Preconventioneel niveau",
        leeftijd: "4-10 jaar (groep 1-6)",
        kenmerken: [
          "Vermijden van straf",
          "Eigen belang centraal",
          "Externe autoriteit leidend"
        ],
        voorbeelden: [
          "Niet liegen om straf te vermijden",
          "Delen om iets terug te krijgen",
          "Regels volgen uit angst"
        ]
      },
      {
        naam: "Conventioneel niveau",
        leeftijd: "10-16 jaar (groep 7-8+)",
        kenmerken: [
          "Goedkeuring van anderen zoeken",
          "Sociale normen volgen",
          "Wet en orde respecteren"
        ],
        voorbeelden: [
          "Aardig zijn om geliefd te worden",
          "Regels volgen omdat het hoort",
          "Autoriteit respecteren"
        ]
      },
      {
        naam: "Postconventioneel niveau",
        leeftijd: "16+ jaar (volwassenheid)",
        kenmerken: [
          "Universele principes",
          "Eigen geweten leidend",
          "Abstracte rechtvaardigheid"
        ],
        voorbeelden: [
          "Burgerlijke ongehoorzaamheid",
          "Mensenrechten verdedigen",
          "Eigen morele principes"
        ]
      }
    ],
    praktijktoepassingen: [
      "Gebruik morele dilemma's in de klas",
      "Bespreek 'waarom' van regels",
      "Stimuleer perspectief nemen",
      "Creëer democratische klassenregels",
      "Model moreel gedrag"
    ],
    kritiekpunten: [
      "Westerse, mannelijke bias",
      "Onderschat emotie en empathie",
      "Culturele verschillen genegeerd"
    ],
    relevantieVoorPABO: "Belangrijk voor burgerschapsonderwijs en het begrijpen van morele redenering bij kinderen."
  },
  {
    id: 'bandura',
    naam: "Sociale Leertheorie",
    auteur: "Albert Bandura",
    categorie: 'sociaal-emotioneel',
    kernprincipes: [
      "Leren door observatie en imitatie",
      "Zelfeffectiviteit (self-efficacy)",
      "Wederkerige determinisme",
      "Cognitieve processen belangrijk"
    ],
    stadia: [
      {
        naam: "Aandacht",
        leeftijd: "Alle leeftijden",
        kenmerken: [
          "Focus op model",
          "Selectieve waarneming",
          "Interesse en motivatie"
        ],
        voorbeelden: [
          "Kijken naar leerkracht",
          "Luisteren naar verhaal",
          "Observeren van gedrag"
        ]
      },
      {
        naam: "Behoud",
        leeftijd: "Alle leeftijden",
        kenmerken: [
          "Informatie onthouden",
          "Mentale representatie",
          "Symbolische codering"
        ],
        voorbeelden: [
          "Procedure onthouden",
          "Gedrag in geheugen opslaan",
          "Mentaal herhalen"
        ]
      },
      {
        naam: "Reproductie",
        leeftijd: "Alle leeftijden",
        kenmerken: [
          "Gedrag uitvoeren",
          "Motorische vaardigheden",
          "Oefening en herhaling"
        ],
        voorbeelden: [
          "Gedrag nabootsen",
          "Vaardigheden oefenen",
          "Feedback verwerken"
        ]
      },
      {
        naam: "Motivatie",
        leeftijd: "Alle leeftijden",
        kenmerken: [
          "Reden om te leren",
          "Verwachte gevolgen",
          "Intrinsieke/extrinsieke motivatie"
        ],
        voorbeelden: [
          "Beloning verwachten",
          "Plezier in activiteit",
          "Sociale goedkeuring"
        ]
      }
    ],
    praktijktoepassingen: [
      "Wees een positief rolmodel",
      "Gebruik peer learning",
      "Versterk zelfeffectiviteit",
      "Geef constructieve feedback",
      "Creëer succeservaringen"
    ],
    kritiekpunten: [
      "Onderschat biologische factoren",
      "Te veel nadruk op imitatie",
      "Complexiteit van leren gereduceerd"
    ],
    relevantieVoorPABO: "Essentieel voor begrijpen van modelgedrag, zelfvertrouwen opbouwen en sociale leerprocessen."
  }
]

export default function DevelopmentTheoryViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('alle')
  const [selectedTheory, setSelectedTheory] = useState<DevelopmentTheory | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)

  const categories = Array.from(new Set(ontwikkelingstheorieen.map(t => t.categorie)))

  const filteredTheories = ontwikkelingstheorieen.filter(theory => {
    const matchesCategory = selectedCategory === 'alle' || theory.categorie === selectedCategory
    const matchesSearch = theory.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theory.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theory.kernprincipes.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cognitief': return '🧠'
      case 'sociaal-emotioneel': return '❤️'
      case 'moreel': return '⚖️'
      case 'fysiek': return '💪'
      case 'taal': return '💬'
      default: return '📚'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cognitief': return 'bg-blue-500'
      case 'sociaal-emotioneel': return 'bg-red-500'
      case 'moreel': return 'bg-purple-500'
      case 'fysiek': return 'bg-green-500'
      case 'taal': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const speakText = (text: string, theoryId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      if (isPlaying === theoryId) {
        setIsPlaying(null)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'nl-NL'
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(theoryId)
      utterance.onend = () => setIsPlaying(null)
      utterance.onerror = () => setIsPlaying(null)

      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🧠 Ontwikkelingstheorieën Interactief</h2>
        <p className="text-purple-100">
          Ontdek de belangrijkste theorieën over kindontwikkeling voor PABO-studenten
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎯 Filter op categorie:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="alle">Alle categorieën</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Zoeken:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Zoek op naam, auteur of principe..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Overview */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map(category => {
            const count = ontwikkelingstheorieen.filter(t => t.categorie === category).length
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? 'alle' : category)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedCategory === category
                    ? `${getCategoryColor(category)} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
                <div className="text-xs font-medium capitalize">{category}</div>
                <div className="text-xs opacity-75">{count} theorieën</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          📊 {filteredTheories.length} van {ontwikkelingstheorieen.length} theorieën
        </span>
      </div>

      {/* Theories Grid */}
      <div className="grid gap-6">
        {filteredTheories.map((theory) => (
          <div
            key={theory.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${getCategoryColor(theory.categorie)} rounded-full flex items-center justify-center text-white text-xl`}>
                    {getCategoryIcon(theory.categorie)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{theory.naam}</h3>
                    <p className="text-gray-600">door {theory.auteur}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(theory.categorie)} text-white`}>
                      {theory.categorie}
                    </span>
                  </div>
                </div>
                
                {/* Audio Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => speakText(`${theory.naam} door ${theory.auteur}. Kernprincipes: ${theory.kernprincipes.join(', ')}`, theory.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isPlaying === theory.id
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    {isPlaying === theory.id ? '🛑' : '🔊'}
                  </button>
                  <button
                    onClick={() => setSelectedTheory(selectedTheory?.id === theory.id ? null : theory)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {selectedTheory?.id === theory.id ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Kernprincipes */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Kernprincipes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {theory.kernprincipes.map((principe, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-2 border border-purple-200">
                      <span className="text-purple-800 text-sm">{principe}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PABO Relevantie */}
              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                <p className="text-sm font-medium text-blue-700 mb-1">🎓 PABO Relevantie:</p>
                <p className="text-blue-800 text-sm">{theory.relevantieVoorPABO}</p>
              </div>

              {/* Expanded Details */}
              {selectedTheory?.id === theory.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                  {/* Stadia */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">📈 Ontwikkelingsstadia:</h4>
                    <div className="space-y-4">
                      {theory.stadia.map((stadium, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-800">{stadium.naam}</h5>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {stadium.leeftijd}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="text-sm font-medium text-gray-700 mb-1">Kenmerken:</h6>
                              <ul className="space-y-1">
                                {stadium.kenmerken.map((kenmerk, kIndex) => (
                                  <li key={kIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                    <span className="text-purple-500 mt-0.5">•</span>
                                    <span>{kenmerk}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h6 className="text-sm font-medium text-gray-700 mb-1">Voorbeelden:</h6>
                              <ul className="space-y-1">
                                {stadium.voorbeelden.map((voorbeeld, vIndex) => (
                                  <li key={vIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>{voorbeeld}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Praktijktoepassingen */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🛠️ Praktijktoepassingen:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {theory.praktijktoepassingen.map((toepassing, index) => (
                        <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <span className="text-green-800 text-sm">{toepassing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kritiekpunten */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">⚠️ Kritiekpunten:</h4>
                    <div className="space-y-2">
                      {theory.kritiekpunten.map((kritiek, index) => (
                        <div key={index} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                          <span className="text-yellow-800 text-sm">{kritiek}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => speakText(`Praktijktoepassingen: ${theory.praktijktoepassingen.join(', ')}`, theory.id + '-praktijk')}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      🔊 Praktijktips beluisteren
                    </button>
                    <button
                      onClick={() => {
                        const text = `${theory.naam} - ${theory.auteur}\n\nKernprincipes:\n${theory.kernprincipes.map(p => `• ${p}`).join('\n')}\n\nPraktijktoepassingen:\n${theory.praktijktoepassingen.map(p => `• ${p}`).join('\n')}`
                        navigator.clipboard.writeText(text)
                        alert('Theorie gekopieerd naar klembord!')
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      📋 Kopieer samenvatting
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTheories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Geen theorieën gevonden</h3>
          <p className="text-gray-500">Probeer een andere zoekterm of categorie</p>
        </div>
      )}
    </div>
  )
}