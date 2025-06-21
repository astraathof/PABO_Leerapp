'use client'

import { useState } from 'react'

interface TheoryTopic {
  id: string
  title: string
  category: 'pedagogiek' | 'didactiek' | 'organisatie' | 'leiderschap' | 'kwaliteit'
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
}

const theoryTopics: TheoryTopic[] = [
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
      },
      {
        term: 'groepsdynamiek',
        explanation: 'De processen en patronen van interactie binnen een groep die het gedrag van individuele leden beïnvloeden',
        deepDive: 'Groepsdynamiek in de klas omvat rollen, normen, communicatiepatronen en machtsverhoudingen die ontstaan tussen leerlingen.'
      }
    ]
  },
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
      },
      {
        term: 'inclusief onderwijs',
        explanation: 'Onderwijs waarin alle leerlingen, ongeacht hun achtergrond of behoeften, volwaardig kunnen deelnemen',
        deepDive: 'Inclusief onderwijs gaat verder dan integratie en streeft naar volledige participatie en succes voor alle leerlingen.'
      }
    ]
  },
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
        term: 'kwaliteitszorg',
        explanation: 'Systematische aanpak om de kwaliteit van onderwijs te waarborgen en te verbeteren',
        deepDive: 'Kwaliteitszorg omvat beleid, procedures, monitoring en evaluatie om continue verbetering van onderwijskwaliteit te realiseren.'
      },
      {
        term: 'evidence-based practice',
        explanation: 'Praktijk gebaseerd op wetenschappelijk bewijs en data',
        deepDive: 'Evidence-based practice combineert wetenschappelijk onderzoek, professionele expertise en context-specifieke data voor optimale besluitvorming.'
      }
    ]
  }
]

export default function ClickableTheoryViewer() {
  const [selectedTopic, setSelectedTopic] = useState<TheoryTopic | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<{term: string, explanation: string, deepDive?: string} | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = Array.from(new Set(theoryTopics.map(t => t.category)))

  const filteredTopics = theoryTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pedagogiek': return '👥'
      case 'didactiek': return '📚'
      case 'organisatie': return '🏢'
      case 'leiderschap': return '👑'
      case 'kwaliteit': return '⭐'
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
          Klik op onderstreepte termen voor diepere uitleg en verdieping
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