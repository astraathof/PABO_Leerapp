'use client'

import { useState } from 'react'

interface CitoLevel {
  letter: string
  roman: string
  description: string
  percentage: number
  skills: string[]
  interventions: string[]
}

interface MonitoringTool {
  name: string
  groups: string
  frequency: string
  purpose: string
  examples: string[]
  dataFlow: string
}

interface CoordinatorRole {
  title: string
  responsibilities: string[]
  citoTasks: string[]
  monitoringRole: string
  collaboration: string[]
}

const citoLevels: CitoLevel[] = [
  {
    letter: 'A',
    roman: 'I',
    description: 'Zeer zwak - Ernstige leerachterstand',
    percentage: 5,
    skills: [
      'Basisvaardigheden onvoldoende',
      'Grote moeite met eenvoudige taken',
      'Intensieve ondersteuning nodig'
    ],
    interventions: [
      'Individueel handelingsplan',
      'Externe ondersteuning',
      'Aangepast curriculum',
      'Extra tijd en begeleiding'
    ]
  },
  {
    letter: 'B',
    roman: 'II',
    description: 'Zwak - Leerachterstand',
    percentage: 20,
    skills: [
      'Onder verwacht niveau',
      'Moeite met standaard taken',
      'Extra ondersteuning gewenst'
    ],
    interventions: [
      'Gerichte bijles',
      'Kleinere groepen',
      'Extra oefenmateriaal',
      'Regelmatige monitoring'
    ]
  },
  {
    letter: 'C',
    roman: 'III',
    description: 'Gemiddeld - Voldoende niveau',
    percentage: 45,
    skills: [
      'Voldoet aan basisverwachtingen',
      'Kan standaard taken uitvoeren',
      'Normale voortgang'
    ],
    interventions: [
      'Regulier onderwijs',
      'Standaard differentiatie',
      'Monitoring van voortgang',
      'Preventieve maatregelen'
    ]
  },
  {
    letter: 'D',
    roman: 'IV',
    description: 'Goed - Boven gemiddeld',
    percentage: 25,
    skills: [
      'Boven verwacht niveau',
      'Goede beheersing vaardigheden',
      'Zelfstandig werken'
    ],
    interventions: [
      'Verrijkingsactiviteiten',
      'Uitdagende opdrachten',
      'Projectwerk',
      'Mentorrol voor anderen'
    ]
  },
  {
    letter: 'E',
    roman: 'V',
    description: 'Zeer goed - Excellent niveau',
    percentage: 5,
    skills: [
      'Uitzonderlijk niveau',
      'Complexe taken beheersen',
      'Creatief en analytisch'
    ],
    interventions: [
      'Hoogbegaafdheidsondersteuning',
      'Versnelling overwegen',
      'Externe verrijking',
      'Onderzoeksprojecten'
    ]
  }
]

const monitoringTools: MonitoringTool[] = [
  {
    name: 'Mijn Kleutergroep',
    groups: 'Groep 1-2',
    frequency: '3x per jaar',
    purpose: 'Ontwikkeling kleuters volgen',
    examples: [
      'Taal- en spraakontwikkeling',
      'Motorische ontwikkeling',
      'Sociaal-emotionele ontwikkeling',
      'Cognitieve ontwikkeling'
    ],
    dataFlow: 'Doorstroom naar groep 3 met ontwikkelingsrapport'
  },
  {
    name: 'KIJK! (Kleuter Instrument)',
    groups: 'Groep 1-2',
    frequency: 'Doorlopend',
    purpose: 'Observatie en signalering',
    examples: [
      'Spelgedrag observeren',
      'Taalontwikkeling signaleren',
      'Motoriek beoordelen',
      'Sociale vaardigheden'
    ],
    dataFlow: 'Input voor groep 3 startpositie'
  },
  {
    name: 'Cito Rekenen-Wiskunde',
    groups: 'Groep 3-8',
    frequency: '3x per jaar (sept, jan, juni)',
    purpose: 'Rekenvaardigheden meten',
    examples: [
      'Getalbegrip',
      'Bewerkingen',
      'Meten en meetkunde',
      'Verhoudingen'
    ],
    dataFlow: 'Trend analyse en interventies'
  },
  {
    name: 'Cito Begrijpend Lezen',
    groups: 'Groep 4-8',
    frequency: '2x per jaar (jan, juni)',
    purpose: 'Leesvaardigheid meten',
    examples: [
      'Tekstbegrip',
      'Woordenschat',
      'Leesstrategieën',
      'Informatief lezen'
    ],
    dataFlow: 'Leesonderwijs aanpassing'
  },
  {
    name: 'Cito Spelling',
    groups: 'Groep 4-8',
    frequency: '2x per jaar',
    purpose: 'Spellingvaardigheid',
    examples: [
      'Werkwoordspelling',
      'Meervoudsvorming',
      'Leestekens',
      'Woordkennis'
    ],
    dataFlow: 'Spellingonderwijs differentiatie'
  },
  {
    name: 'B8 Toets (Basisschool 8)',
    groups: 'Groep 8',
    frequency: '1x per jaar (april)',
    purpose: 'Eindniveau bepaling',
    examples: [
      'Rekenen',
      'Taal',
      'Studievaardigheden',
      'Wereldoriëntatie'
    ],
    dataFlow: 'VO-advies en schoolkeuze'
  },
  {
    name: 'Doorstroomtoets',
    groups: 'Groep 8',
    frequency: 'Na B8 toets',
    purpose: 'Bevestiging VO-advies',
    examples: [
      'Verificatie B8 resultaat',
      'Aanpassing advies mogelijk',
      'Extra zekerheid',
      'Kwaliteitsborging'
    ],
    dataFlow: 'Definitief VO-advies'
  }
]

const coordinatorRoles: CoordinatorRole[] = [
  {
    title: 'Taalcoördinator',
    responsibilities: [
      'Taalbeleid ontwikkelen en implementeren',
      'Leesmethode selectie en evaluatie',
      'Teamscholing organiseren',
      'Taalvaardigheid monitoren'
    ],
    citoTasks: [
      'Cito Begrijpend Lezen analyseren',
      'Cito Spelling resultaten interpreteren',
      'Interventies voorstellen bij achterstanden',
      'Trendanalyse per groep en school'
    ],
    monitoringRole: 'Coördineert alle taalmonitoring van groep 1-8',
    collaboration: [
      'IB-er voor zorgleerlingen',
      'Bouwcoördinatoren voor afstemming',
      'Externe begeleiders',
      'Ouders bij zorgen'
    ]
  },
  {
    title: 'Rekencoördinator',
    responsibilities: [
      'Rekenbeleid vormgeven',
      'Rekenmethode beheren',
      'Nascholing coördineren',
      'Rekenresultaten monitoren'
    ],
    citoTasks: [
      'Cito Rekenen-Wiskunde analyseren',
      'A-E niveau verdeling bewaken',
      'Interventieplan opstellen',
      'Voortgang bijhouden'
    ],
    monitoringRole: 'Verantwoordelijk voor rekenmonitoring groep 1-8',
    collaboration: [
      'IB-er voor rekenondersteuning',
      'Bouwcoördinatoren',
      'Remedial teaching',
      'Ouders informeren'
    ]
  },
  {
    title: 'Onderbouwcoördinator (Groep 1-4)',
    responsibilities: [
      'Onderbouwbeleid ontwikkelen',
      'Overgang kleuteronderwijs-groep 3',
      'Teamcoaching onderbouw',
      'Ontwikkeling monitoren'
    ],
    citoTasks: [
      'Startpositie groep 3 analyseren',
      'Eerste Cito resultaten interpreteren',
      'Vroege interventies organiseren',
      'Doorstroom naar middenbouw'
    ],
    monitoringRole: 'Mijn Kleutergroep en KIJK! coördineren',
    collaboration: [
      'Kleuterleerkrachten',
      'IB-er voor signalering',
      'Externe partners (logopedie)',
      'Ouders intensief'
    ]
  },
  {
    title: 'Middenbouwcoördinator (Groep 5-6)',
    responsibilities: [
      'Middenbouwcurriculum bewaken',
      'Overgang onderbouw-middenbouw',
      'Teamondersteuning',
      'Leerresultaten monitoren'
    ],
    citoTasks: [
      'Cito resultaten groep 5-6 analyseren',
      'Tussentijdse bijsturing organiseren',
      'Voorbereiding bovenbouw',
      'Trendanalyse uitvoeren'
    ],
    monitoringRole: 'Alle Cito toetsen groep 5-6 coördineren',
    collaboration: [
      'Onderbouw en bovenbouwcoördinator',
      'IB-er voor zorgtrajecten',
      'Vakcoördinatoren',
      'Ouders bij zorgen'
    ]
  },
  {
    title: 'Bovenbouwcoördinator (Groep 7-8)',
    responsibilities: [
      'Bovenbouwprogramma leiden',
      'VO-overgang voorbereiden',
      'Eindresultaten bewaken',
      'Schooladvies coördineren'
    ],
    citoTasks: [
      'B8 toets organiseren en analyseren',
      'Doorstroomtoets coördineren',
      'VO-advies onderbouwen met data',
      'Eindresultaten evalueren'
    ],
    monitoringRole: 'B8 en doorstroomtoets volledig verantwoordelijk',
    collaboration: [
      'VO-scholen voor afstemming',
      'IB-er voor complexe adviezen',
      'Ouders bij schoolkeuze',
      'Externe adviseurs'
    ]
  },
  {
    title: 'Intern Begeleider (IB-er)',
    responsibilities: [
      'Zorgstructuur coördineren',
      'Handelingsplannen opstellen',
      'Externe contacten onderhouden',
      'Zorgleerlingen begeleiden'
    ],
    citoTasks: [
      'Alle Cito data analyseren voor zorgleerlingen',
      'Interventies evalueren',
      'Externe toetsing organiseren',
      'Rapportage aan team en ouders'
    ],
    monitoringRole: 'Integrale zorgmonitoring alle groepen',
    collaboration: [
      'Alle coördinatoren',
      'Externe zorgpartners',
      'Ouders intensief',
      'Schoolleiding'
    ]
  },
  {
    title: 'Kwaliteitscoördinator',
    responsibilities: [
      'Kwaliteitszorg organiseren',
      'Data-analyse coördineren',
      'Schoolontwikkeling leiden',
      'Evaluaties organiseren'
    ],
    citoTasks: [
      'Alle Cito data schoolbreed analyseren',
      'Benchmarking met andere scholen',
      'Jaarrapportage opstellen',
      'Verbeterplannen ontwikkelen'
    ],
    monitoringRole: 'Overkoepelende data-analyse en kwaliteitsbewaking',
    collaboration: [
      'Schoolleiding',
      'Alle coördinatoren',
      'Bestuur',
      'Inspectie'
    ]
  }
]

export default function CitoMonitoringViewer() {
  const [activeTab, setActiveTab] = useState<'levels' | 'monitoring' | 'coordinators' | 'dataflow'>('levels')
  const [selectedLevel, setSelectedLevel] = useState<CitoLevel | null>(null)
  const [selectedTool, setSelectedTool] = useState<MonitoringTool | null>(null)
  const [selectedRole, setSelectedRole] = useState<CoordinatorRole | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📊 Complete Cito & Monitoring Gids</h2>
        <p className="text-indigo-100">
          Uitgebreide informatie over Cito-niveaus, monitoring groep 1-8 en coördinatorrollen
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'levels', label: '📊 Cito A-E & I-V', icon: '📊' },
            { id: 'monitoring', label: '🔍 Monitoring Tools', icon: '🔍' },
            { id: 'coordinators', label: '👥 Coördinatorrollen', icon: '👥' },
            { id: 'dataflow', label: '🔄 Data Doorstroom', icon: '🔄' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Cito Levels Tab */}
          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">📚 Cito Niveaus Uitgelegd</h3>
                <p className="text-blue-700 text-sm">
                  Cito gebruikt zowel letters (A-E) als Romeinse cijfers (I-V) om prestaties aan te duiden. 
                  Beide systemen zijn identiek: A=I (zwakst) tot E=V (sterkst).
                </p>
              </div>

              <div className="grid gap-4">
                {citoLevels.map((level, index) => (
                  <div
                    key={level.letter}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedLevel?.letter === level.letter
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLevel(selectedLevel?.letter === level.letter ? null : level)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-orange-500' :
                          index === 2 ? 'bg-yellow-500' :
                          index === 3 ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {level.letter} / {level.roman}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{level.description}</h4>
                          <p className="text-gray-600 text-sm">Landelijk gemiddeld: {level.percentage}% van leerlingen</p>
                        </div>
                      </div>
                      <div className="text-2xl">
                        {selectedLevel?.letter === level.letter ? '👁️‍🗨️' : '👁️'}
                      </div>
                    </div>

                    {selectedLevel?.letter === level.letter && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">🎯 Kenmerken:</h5>
                            <ul className="space-y-1">
                              {level.skills.map((skill, skillIndex) => (
                                <li key={skillIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <span className="text-indigo-500 mt-0.5">•</span>
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">🛠️ Interventies:</h5>
                            <ul className="space-y-1">
                              {level.interventions.map((intervention, intIndex) => (
                                <li key={intIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <span className="text-green-500 mt-0.5">→</span>
                                  <span>{intervention}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-purple-50 rounded p-3 border border-purple-200">
                          <p className="text-sm text-purple-700">
                            <strong>💡 Schoolleider tip:</strong> Niveau {level.letter}/{level.roman} leerlingen hebben specifieke begeleiding nodig. 
                            Monitor hun voortgang extra en stem af met de {level.letter === 'A' || level.letter === 'B' ? 'IB-er' : level.letter === 'D' || level.letter === 'E' ? 'begaafdheidscoördinator' : 'groepsleerkracht'}.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Belangrijke Aandachtspunten</h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• <strong>B8 Toets:</strong> Eindtoets groep 8 voor VO-advies (april)</li>
                  <li>• <strong>Doorstroomtoets:</strong> Verificatie B8 resultaat (mei/juni)</li>
                  <li>• <strong>Referentieniveaus:</strong> 1F (basis), 1S (streef), 2F (HAVO/VWO)</li>
                  <li>• <strong>Trend analyse:</strong> Vergelijk september → januari → juni</li>
                </ul>
              </div>
            </div>
          )}

          {/* Monitoring Tools Tab */}
          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🔍 Monitoring Doorlopende Lijn</h3>
                <p className="text-green-700 text-sm">
                  Van groep 1 tot 8 monitoren we systematisch de ontwikkeling. Elke fase bouwt voort op de vorige.
                </p>
              </div>

              <div className="grid gap-4">
                {monitoringTools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTool?.name === tool.name
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTool(selectedTool?.name === tool.name ? null : tool)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center space-x-1">
                            <span>🎯</span>
                            <span>{tool.groups}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>📅</span>
                            <span>{tool.frequency}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl">
                        {selectedTool?.name === tool.name ? '👁️‍🗨️' : '👁️'}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-3">{tool.purpose}</p>

                    {selectedTool?.name === tool.name && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">📋 Wat wordt gemeten:</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {tool.examples.map((example, exIndex) => (
                              <div key={exIndex} className="bg-white rounded p-2 border border-gray-200 text-sm">
                                {example}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded p-3 border border-blue-200">
                          <h5 className="font-medium text-blue-700 mb-1">🔄 Data Doorstroom:</h5>
                          <p className="text-sm text-blue-600">{tool.dataFlow}</p>
                        </div>

                        <div className="bg-purple-50 rounded p-3 border border-purple-200">
                          <p className="text-sm text-purple-700">
                            <strong>🎯 Schoolleider actie:</strong> {
                              tool.groups.includes('1-2') ? 'Zorg voor goede overdracht naar groep 3 met ontwikkelingsrapport' :
                              tool.name.includes('B8') ? 'Organiseer teambespreking voor VO-advies afstemming' :
                              'Analyseer resultaten met vakcoördinator en stel interventies bij'
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators Tab */}
          {activeTab === 'coordinators' && (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">👥 Coördinatorrollen & Verantwoordelijkheden</h3>
                <p className="text-purple-700 text-sm">
                  Elke coördinator heeft specifieke taken rond Cito-monitoring en data-analyse. Samenwerking is cruciaal.
                </p>
              </div>

              <div className="grid gap-4">
                {coordinatorRoles.map((role, index) => (
                  <div
                    key={role.title}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRole?.title === role.title
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole(selectedRole?.title === role.title ? null : role)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{role.title}</h4>
                        <p className="text-gray-600 text-sm">{role.monitoringRole}</p>
                      </div>
                      <div className="text-2xl">
                        {selectedRole?.title === role.title ? '👁️‍🗨️' : '👁️'}
                      </div>
                    </div>

                    {selectedRole?.title === role.title && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">📋 Algemene Taken:</h5>
                            <ul className="space-y-1">
                              {role.responsibilities.map((resp, respIndex) => (
                                <li key={respIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <span className="text-purple-500 mt-0.5">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">📊 Cito-specifieke Taken:</h5>
                            <ul className="space-y-1">
                              {role.citoTasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <span className="text-indigo-500 mt-0.5">📈</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">🤝 Samenwerking:</h5>
                          <div className="flex flex-wrap gap-2">
                            {role.collaboration.map((collab, collabIndex) => (
                              <span key={collabIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {collab}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-orange-50 rounded p-3 border border-orange-200">
                          <p className="text-sm text-orange-700">
                            <strong>🎯 Schoolleider tip:</strong> {
                              role.title.includes('Taal') ? 'Organiseer maandelijks overleg tussen taal- en rekencoördinator voor integrale aanpak' :
                              role.title.includes('Reken') ? 'Zorg voor directe lijn tussen rekencoördinator en IB-er voor snelle interventies' :
                              role.title.includes('Onderbouw') ? 'Plan structureel overleg met kleuterleerkrachten voor soepele overgang' :
                              role.title.includes('Middenbouw') ? 'Coördineer met onder- en bovenbouw voor doorlopende leerlijn' :
                              role.title.includes('Bovenbouw') ? 'Start VO-overleg al in oktober voor tijdige voorbereiding' :
                              role.title.includes('IB') ? 'Geef IB-er tijd voor grondige data-analyse en rapportage' :
                              'Zorg voor maandelijkse rapportage aan schoolleiding en bestuur'
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Flow Tab */}
          {activeTab === 'dataflow' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <h3 className="font-semibold text-indigo-800 mb-2">🔄 Data Doorstroom Groep 1-8</h3>
                <p className="text-indigo-700 text-sm">
                  Visualisatie van hoe monitoring data doorstroomt van kleuteronderwijs naar voortgezet onderwijs.
                </p>
              </div>

              {/* Flow Diagram */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-8">
                  {/* Groep 1-2 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                      Groep 1-2
                    </div>
                    <div className="flex-1 bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">Kleutermonitoring</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="bg-white rounded p-2">Mijn Kleutergroep</span>
                        <span className="bg-white rounded p-2">KIJK! Observatie</span>
                      </div>
                      <p className="text-xs text-green-600 mt-2">→ Ontwikkelingsrapport naar groep 3</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">⬇️</div>
                  </div>

                  {/* Groep 3-4 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      Groep 3-4
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">Onderbouw Cito</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="bg-white rounded p-2">Rekenen 3x/jaar</span>
                        <span className="bg-white rounded p-2">Spelling (gr 4)</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">→ Eerste interventies + doorstroom middenbouw</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">⬇️</div>
                  </div>

                  {/* Groep 5-6 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      Groep 5-6
                    </div>
                    <div className="flex-1 bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-medium text-purple-800 mb-2">Middenbouw Intensief</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <span className="bg-white rounded p-2">Rekenen 3x</span>
                        <span className="bg-white rounded p-2">Begr. Lezen 2x</span>
                        <span className="bg-white rounded p-2">Spelling 2x</span>
                      </div>
                      <p className="text-xs text-purple-600 mt-2">→ Trendanalyse + voorbereiding bovenbouw</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">⬇️</div>
                  </div>

                  {/* Groep 7-8 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                      Groep 7-8
                    </div>
                    <div className="flex-1 bg-red-50 rounded-lg p-4 border border-red-200">
                      <h4 className="font-medium text-red-800 mb-2">Bovenbouw + Eindtoets</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <span className="bg-white rounded p-2">Alle Cito toetsen</span>
                        <span className="bg-white rounded p-2">B8 Toets (april)</span>
                        <span className="bg-white rounded p-2">Doorstroomtoets</span>
                      </div>
                      <p className="text-xs text-red-600 mt-2">→ VO-advies + schoolkeuze</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">⬇️</div>
                  </div>

                  {/* VO */}
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold">
                      VO
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Voortgezet Onderwijs</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="bg-white rounded p-2">VMBO / HAVO / VWO</span>
                        <span className="bg-white rounded p-2">Terugkoppeling resultaten</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">→ Evaluatie kwaliteit BO-onderwijs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔑 Kritieke Overgangsmomenten</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• <strong>Groep 2 → 3:</strong> Ontwikkelingsrapport + startpositie</li>
                    <li>• <strong>Groep 4 → 5:</strong> Eerste Cito trends + interventies</li>
                    <li>• <strong>Groep 6 → 7:</strong> VO-voorbereiding start</li>
                    <li>• <strong>Groep 8 → VO:</strong> Definitief advies + evaluatie</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">📈 Data-analyse Cyclus</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• <strong>September:</strong> Startpositie + planning</li>
                    <li>• <strong>Januari:</strong> Tussentijdse evaluatie + bijsturing</li>
                    <li>• <strong>Juni:</strong> Eindresultaten + jaarrapportage</li>
                    <li>• <strong>Augustus:</strong> Teambespreking + nieuwe doelen</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}