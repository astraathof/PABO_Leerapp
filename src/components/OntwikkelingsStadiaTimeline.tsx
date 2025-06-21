'use client'

import { useState } from 'react'

interface OntwikkelingsStadium {
  leeftijd: string
  cognitief: {
    stadium: string
    kenmerken: string[]
    voorbeelden: string[]
    onderwijsimplicaties: string[]
  }
  sociaalEmotioneel: {
    stadium: string
    kenmerken: string[]
    voorbeelden: string[]
    onderwijsimplicaties: string[]
  }
  fysiek: {
    ontwikkeling: string[]
    motoriek: string[]
    onderwijsimplicaties: string[]
  }
  taal: {
    ontwikkeling: string[]
    mijlpalen: string[]
    onderwijsimplicaties: string[]
  }
}

const ontwikkelingsStadia: OntwikkelingsStadium[] = [
  {
    leeftijd: "4-5 jaar (Groep 1-2)",
    cognitief: {
      stadium: "Preoperationeel (Piaget)",
      kenmerken: [
        "Symbolisch denken ontwikkelt",
        "Egocentrisme",
        "Animisme (objecten hebben gevoelens)",
        "Geen begrip van behoud"
      ],
      voorbeelden: [
        "Doen-alsof spelen",
        "Denken dat maan hen volgt",
        "Meer water in hoog glas",
        "Tekeningen als werkelijkheid"
      ],
      onderwijsimplicaties: [
        "Veel concreet materiaal",
        "Spel als leermedium",
        "Korte activiteiten",
        "Visuele ondersteuning"
      ]
    },
    sociaalEmotioneel: {
      stadium: "Initiatief vs. Schuld (Erikson)",
      kenmerken: [
        "Willen plannen maken",
        "Leiderschap tonen",
        "Sociale vaardigheden ontwikkelen",
        "Schuldgevoelens bij mislukking"
      ],
      voorbeelden: [
        "Spel organiseren",
        "Nieuwe activiteiten bedenken",
        "Vriendschappen sluiten",
        "Hulp aanbieden"
      ],
      onderwijsimplicaties: [
        "Keuzemogelijkheden bieden",
        "Initiatief waarderen",
        "Positieve bekrachtiging",
        "Sociale vaardigheden oefenen"
      ]
    },
    fysiek: {
      ontwikkeling: [
        "Grove motoriek verfijnt",
        "Fijne motoriek ontwikkelt",
        "Coördinatie verbetert",
        "Balans en ritme"
      ],
      motoriek: [
        "Rennen, springen, klimmen",
        "Tekenen en knippen",
        "Puzzels maken",
        "Ballen vangen"
      ],
      onderwijsimplicaties: [
        "Veel bewegingsmogelijkheden",
        "Fijne motoriek oefenen",
        "Creatieve activiteiten",
        "Buitenspel stimuleren"
      ]
    },
    taal: {
      ontwikkeling: [
        "Woordenschat groeit snel",
        "Grammatica ontwikkelt",
        "Verhalen begrijpen",
        "Vragen stellen"
      ],
      mijlpalen: [
        "1000+ woorden actief",
        "Volledige zinnen",
        "Verhaal navertellen",
        "Rijmen herkennen"
      ],
      onderwijsimplicaties: [
        "Veel voorlezen",
        "Woordenschat uitbreiden",
        "Gesprekken voeren",
        "Taalspelletjes"
      ]
    }
  },
  {
    leeftijd: "6-7 jaar (Groep 3-4)",
    cognitief: {
      stadium: "Overgang naar Concreet Operationeel",
      kenmerken: [
        "Logisch denken met concrete objecten",
        "Begrip van behoud ontwikkelt",
        "Classificatie mogelijk",
        "Minder egocentrisme"
      ],
      voorbeelden: [
        "Water overschenken begrijpen",
        "Objecten sorteren",
        "Eenvoudige regels volgen",
        "Oorzaak-gevolg zien"
      ],
      onderwijsimplicaties: [
        "Concreet naar abstract",
        "Hands-on activiteiten",
        "Stapsgewijze instructie",
        "Experimenteren stimuleren"
      ]
    },
    sociaalEmotioneel: {
      stadium: "Vlijt vs. Minderwaardigheid (Erikson)",
      kenmerken: [
        "Competentie willen ontwikkelen",
        "Vergelijken met anderen",
        "Prestaties belangrijk",
        "Zelfvertrouwen opbouwen"
      ],
      voorbeelden: [
        "Trots op schoolwerk",
        "Vaardigheden oefenen",
        "Complimenten waarderen",
        "Hulp vragen bij moeilijkheden"
      ],
      onderwijsimplicaties: [
        "Succeservaringen creëren",
        "Individuele vooruitgang vieren",
        "Positieve feedback geven",
        "Uitdagingen op maat"
      ]
    },
    fysiek: {
      ontwikkeling: [
        "Fijne motoriek verfijnt",
        "Oog-hand coördinatie",
        "Uithoudingsvermogen groeit",
        "Lichaamsbesef ontwikkelt"
      ],
      motoriek: [
        "Schrijven en tekenen",
        "Knippen en plakken",
        "Sportactiviteiten",
        "Muziekinstrumenten"
      ],
      onderwijsimplicaties: [
        "Schrijfmotoriek oefenen",
        "Creatieve expressie",
        "Bewegingspauzes",
        "Handvaardigheid stimuleren"
      ]
    },
    taal: {
      ontwikkeling: [
        "Lezen en schrijven beginnen",
        "Fonologisch bewustzijn",
        "Woordherkenning",
        "Begrijpend lezen"
      ],
      mijlpalen: [
        "Letters herkennen",
        "Eenvoudige woorden lezen",
        "Eigen naam schrijven",
        "Verhaal begrijpen"
      ],
      onderwijsimplicaties: [
        "Systematisch leesonderwijs",
        "Fonemisch bewustzijn",
        "Veel oefenen",
        "Leesplezier stimuleren"
      ]
    }
  }
]

export default function OntwikkelingsStadiaTimeline() {
  const [selectedStadium, setSelectedStadium] = useState<OntwikkelingsStadium | null>(null)
  const [selectedDomein, setSelectedDomein] = useState<'cognitief' | 'sociaalEmotioneel' | 'fysiek' | 'taal'>('cognitief')

  const getDomeinIcon = (domein: string) => {
    switch (domein) {
      case 'cognitief': return '🧠'
      case 'sociaalEmotioneel': return '❤️'
      case 'fysiek': return '💪'
      case 'taal': return '💬'
      default: return '📊'
    }
  }

  const getDomeinColor = (domein: string) => {
    switch (domein) {
      case 'cognitief': return 'bg-blue-500'
      case 'sociaalEmotioneel': return 'bg-red-500'
      case 'fysiek': return 'bg-green-500'
      case 'taal': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🌱 Ontwikkelingsstadia Timeline</h2>
        <p className="text-purple-100">
          Interactieve timeline van cognitieve, sociaal-emotionele, fysieke en taalontwikkeling
        </p>
      </div>

      {/* Domain Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">🎯 Selecteer ontwikkelingsdomein:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'cognitief', label: 'Cognitief', desc: 'Denken & Leren' },
            { id: 'sociaalEmotioneel', label: 'Sociaal-Emotioneel', desc: 'Gevoelens & Relaties' },
            { id: 'fysiek', label: 'Fysiek', desc: 'Motoriek & Groei' },
            { id: 'taal', label: 'Taal', desc: 'Communicatie' }
          ].map((domein) => (
            <button
              key={domein.id}
              onClick={() => setSelectedDomein(domein.id as any)}
              className={`p-4 rounded-lg text-center transition-all ${
                selectedDomein === domein.id
                  ? `${getDomeinColor(domein.id)} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{getDomeinIcon(domein.id)}</div>
              <div className="font-medium text-sm">{domein.label}</div>
              <div className="text-xs opacity-80">{domein.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {getDomeinIcon(selectedDomein)} {selectedDomein === 'cognitief' ? 'Cognitieve' : 
             selectedDomein === 'sociaalEmotioneel' ? 'Sociaal-Emotionele' :
             selectedDomein === 'fysiek' ? 'Fysieke' : 'Taal'} Ontwikkeling
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-purple-300"></div>
            
            {ontwikkelingsStadia.map((stadium, index) => (
              <div key={index} className="relative flex items-start space-x-4 pb-8">
                {/* Age circle */}
                <div className={`relative z-10 w-12 h-12 ${getDomeinColor(selectedDomein)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{stadium.leeftijd}</h4>
                    <button
                      onClick={() => setSelectedStadium(selectedStadium?.leeftijd === stadium.leeftijd ? null : stadium)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {selectedStadium?.leeftijd === stadium.leeftijd ? '👁️‍🗨️' : '👁️'}
                    </button>
                  </div>
                  
                  {/* Domain specific content */}
                  <div className={`rounded-lg p-4 border-2 ${
                    selectedDomein === 'cognitief' ? 'bg-blue-50 border-blue-200' :
                    selectedDomein === 'sociaalEmotioneel' ? 'bg-red-50 border-red-200' :
                    selectedDomein === 'fysiek' ? 'bg-green-50 border-green-200' :
                    'bg-purple-50 border-purple-200'
                  }`}>
                    {selectedDomein === 'cognitief' && (
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">{stadium.cognitief.stadium}</h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <h6 className="text-sm font-medium text-blue-700 mb-1">Kenmerken:</h6>
                            <ul className="space-y-1">
                              {stadium.cognitief.kenmerken.slice(0, 2).map((kenmerk, kIndex) => (
                                <li key={kIndex} className="text-xs text-blue-600 flex items-start space-x-1">
                                  <span>•</span>
                                  <span>{kenmerk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-blue-700 mb-1">Voorbeelden:</h6>
                            <ul className="space-y-1">
                              {stadium.cognitief.voorbeelden.slice(0, 2).map((voorbeeld, vIndex) => (
                                <li key={vIndex} className="text-xs text-blue-600 flex items-start space-x-1">
                                  <span>→</span>
                                  <span>{voorbeeld}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDomein === 'sociaalEmotioneel' && (
                      <div>
                        <h5 className="font-medium text-red-800 mb-2">{stadium.sociaalEmotioneel.stadium}</h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <h6 className="text-sm font-medium text-red-700 mb-1">Kenmerken:</h6>
                            <ul className="space-y-1">
                              {stadium.sociaalEmotioneel.kenmerken.slice(0, 2).map((kenmerk, kIndex) => (
                                <li key={kIndex} className="text-xs text-red-600 flex items-start space-x-1">
                                  <span>•</span>
                                  <span>{kenmerk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-red-700 mb-1">Voorbeelden:</h6>
                            <ul className="space-y-1">
                              {stadium.sociaalEmotioneel.voorbeelden.slice(0, 2).map((voorbeeld, vIndex) => (
                                <li key={vIndex} className="text-xs text-red-600 flex items-start space-x-1">
                                  <span>→</span>
                                  <span>{voorbeeld}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDomein === 'fysiek' && (
                      <div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <h6 className="text-sm font-medium text-green-700 mb-1">Ontwikkeling:</h6>
                            <ul className="space-y-1">
                              {stadium.fysiek.ontwikkeling.slice(0, 2).map((ontwikkeling, oIndex) => (
                                <li key={oIndex} className="text-xs text-green-600 flex items-start space-x-1">
                                  <span>•</span>
                                  <span>{ontwikkeling}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-green-700 mb-1">Motoriek:</h6>
                            <ul className="space-y-1">
                              {stadium.fysiek.motoriek.slice(0, 2).map((motoriek, mIndex) => (
                                <li key={mIndex} className="text-xs text-green-600 flex items-start space-x-1">
                                  <span>→</span>
                                  <span>{motoriek}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedDomein === 'taal' && (
                      <div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <h6 className="text-sm font-medium text-purple-700 mb-1">Ontwikkeling:</h6>
                            <ul className="space-y-1">
                              {stadium.taal.ontwikkeling.slice(0, 2).map((ontwikkeling, oIndex) => (
                                <li key={oIndex} className="text-xs text-purple-600 flex items-start space-x-1">
                                  <span>•</span>
                                  <span>{ontwikkeling}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-purple-700 mb-1">Mijlpalen:</h6>
                            <ul className="space-y-1">
                              {stadium.taal.mijlpalen.slice(0, 2).map((mijlpaal, mIndex) => (
                                <li key={mIndex} className="text-xs text-purple-600 flex items-start space-x-1">
                                  <span>✓</span>
                                  <span>{mijlpaal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {selectedStadium?.leeftijd === stadium.leeftijd && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h5 className="font-medium text-yellow-800 mb-2">🎯 Onderwijsimplicaties:</h5>
                        <ul className="space-y-1">
                          {(selectedDomein === 'cognitief' ? stadium.cognitief.onderwijsimplicaties :
                            selectedDomein === 'sociaalEmotioneel' ? stadium.sociaalEmotioneel.onderwijsimplicaties :
                            selectedDomein === 'fysiek' ? stadium.fysiek.onderwijsimplicaties :
                            stadium.taal.onderwijsimplicaties).map((implicatie, iIndex) => (
                            <li key={iIndex} className="text-sm text-yellow-700 flex items-start space-x-2">
                              <span className="text-yellow-600 mt-0.5">→</span>
                              <span>{implicatie}</span>
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
        </div>
      </div>
    </div>
  )
}