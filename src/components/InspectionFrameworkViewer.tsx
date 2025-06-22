import { useState } from 'react'

interface InspectionStandard {
  id: string
  nummer: string
  titel: string
  beschrijving: string
  afkorting: string
  indicatoren: string[]
  bronnen: string[]
  kwaliteitsniveau: 'basis' | 'goed' | 'excellent'
  praktijkvoorbeelden: {
    situatie: string
    bewijs: string[]
    verbeterpunten: string[]
  }[]
  zelfevaluatie: {
    vragen: string[]
    checklist: string[]
  }
}

const inspectieStandaarden: InspectionStandard[] = [
  {
    id: 'onderwijsproces',
    nummer: '1',
    titel: 'Onderwijsproces',
    afkorting: 'OP1',
    beschrijving: 'De school biedt een samenhangend onderwijsaanbod dat uitdaagt tot leren en bijdraagt aan de brede vorming van leerlingen.',
    indicatoren: [
      'Het onderwijsaanbod sluit aan bij de onderwijsbehoeften van leerlingen',
      'Het onderwijs daagt leerlingen uit en motiveert tot leren',
      'Het onderwijs is gericht op de brede vorming van leerlingen',
      'De school hanteert een doorgaande leerlijn',
      'Het onderwijs wordt afgestemd op de verschillende leerlingen'
    ],
    bronnen: [
      'Lesbezoeken en observaties',
      'Gesprekken met leerlingen en leerkrachten',
      'Analyse van lesmaterialen en methoden',
      'Schooldocumenten (jaarplan, leerlingenvolgsysteem)'
    ],
    kwaliteitsniveau: 'goed',
    praktijkvoorbeelden: [
      {
        situatie: 'Differentiatie in de praktijk',
        bewijs: [
          'Verschillende niveaugroepen binnen de klas',
          'Aangepaste opdrachten per leerling',
          'Gebruik van digitale leermiddelen voor individualisering',
          'Flexibele groepsindelingen'
        ],
        verbeterpunten: [
          'Meer systematische monitoring van individuele voortgang',
          'Betere afstemming tussen leerkrachten over differentiatie',
          'Uitbreiding van materialen voor hoogbegaafde leerlingen'
        ]
      },
      {
        situatie: 'Doorgaande leerlijnen',
        bewijs: [
          'Afspraken tussen bouwlagen over leerstof',
          'Overdracht van leerlinginformatie tussen groepen',
          'Gezamenlijke evaluatie van leerresultaten',
          'Afstemming van toetsing tussen groepen'
        ],
        verbeterpunten: [
          'Versterking van de overdracht tussen groep 2 en 3',
          'Meer structurele evaluatie van leerlijnen',
          'Betere documentatie van gemaakte afspraken'
        ]
      }
    ],
    zelfevaluatie: {
      vragen: [
        'Hoe zorgen we ervoor dat ons onderwijs aansluit bij de behoeften van alle leerlingen?',
        'Op welke manier dagen we leerlingen uit om te leren?',
        'Hoe bewaken we de doorgaande leerlijnen in onze school?',
        'Welke vormen van differentiatie passen we toe?'
      ],
      checklist: [
        'Lesmethoden zijn afgestemd op leerlingpopulatie',
        'Er wordt gedifferentieerd naar niveau en tempo',
        'Leerlijnen zijn uitgewerkt en bekend bij team',
        'Leerlingen worden uitgedaagd op hun niveau',
        'Brede vorming krijgt aandacht in het curriculum'
      ]
    }
  },
  {
    id: 'leeropbrengsten',
    nummer: '2',
    titel: 'Leeropbrengsten',
    afkorting: 'OP2',
    beschrijving: 'De leerlingen behalen resultaten die passen bij hun mogelijkheden en de school realiseert haar eigen doelen.',
    indicatoren: [
      'De leerresultaten zijn in overeenstemming met de mogelijkheden van leerlingen',
      'De leerlingen maken voldoende voortgang',
      'De school realiseert de eigen doelen voor leerresultaten',
      'De resultaten op de centrale eindtoets zijn toereikend',
      'De adviezen voor vervolgonderwijs zijn passend'
    ],
    bronnen: [
      'Cito-resultaten en trendanalyses',
      'Leerlingvolgsysteem gegevens',
      'Centrale eindtoets resultaten',
      'VO-doorstroom gegevens',
      'Schooleigen toetsen en evaluaties'
    ],
    kwaliteitsniveau: 'goed',
    praktijkvoorbeelden: [
      {
        situatie: 'Analyse van Cito-resultaten',
        bewijs: [
          'Systematische analyse van A-E niveaus per groep',
          'Vergelijking met landelijke gemiddelden',
          'Trendanalyse over meerdere jaren',
          'Koppeling van resultaten aan interventies'
        ],
        verbeterpunten: [
          'Meer gedetailleerde analyse per kerndoel',
          'Betere monitoring van individuele leerlijnen',
          'Structurelere evaluatie van interventies'
        ]
      },
      {
        situatie: 'VO-doorstroom monitoring',
        bewijs: [
          'Jaarlijkse evaluatie van VO-adviezen',
          'Contact met VO-scholen over leerlingprestaties',
          'Analyse van doorstroom naar verschillende niveaus',
          'Bijstelling van adviesbeleid op basis van resultaten'
        ],
        verbeterpunten: [
          'Meer systematisch contact met VO-scholen',
          'Betere documentatie van doorstroom gegevens',
          'Uitbreiding van monitoring naar tweede jaar VO'
        ]
      }
    ],
    zelfevaluatie: {
      vragen: [
        'Hoe beoordelen we of onze leerresultaten toereikend zijn?',
        'Welke interventies zetten we in bij achterblijvende resultaten?',
        'Hoe monitoren we de voortgang van individuele leerlingen?',
        'Op welke manier evalueren we onze VO-adviezen?'
      ],
      checklist: [
        'Leerresultaten worden systematisch geanalyseerd',
        'Er zijn duidelijke streefwaarden geformuleerd',
        'Interventies worden ingezet bij achterstanden',
        'VO-adviezen zijn gebaseerd op meerdere bronnen',
        'Doorstroom naar VO wordt gemonitord'
      ]
    }
  },
  {
    id: 'schoolklimaat',
    nummer: '3',
    titel: 'Schoolklimaat',
    afkorting: 'OP3',
    beschrijving: 'De school biedt een veilige en stimulerende omgeving waarin leerlingen zich kunnen ontwikkelen.',
    indicatoren: [
      'De school biedt een veilige omgeving',
      'Het pedagogisch klimaat is gericht op leren en ontwikkeling',
      'De school heeft een positieve en stimulerende sfeer',
      'Er is sprake van een respectvolle omgang',
      'De school gaat adequaat om met gedragsproblemen'
    ],
    bronnen: [
      'Observaties van schoolklimaat',
      'Gesprekken met leerlingen, ouders en personeel',
      'Tevredenheidsonderzoeken',
      'Registraties van incidenten',
      'Beleidsdocumenten over veiligheid'
    ],
    kwaliteitsniveau: 'goed',
    praktijkvoorbeelden: [
      {
        situatie: 'Sociale veiligheid',
        bewijs: [
          'Anti-pestprotocol is bekend en wordt toegepast',
          'Leerlingen voelen zich veilig op school',
          'Er zijn duidelijke regels en afspraken',
          'Incidenten worden adequaat afgehandeld'
        ],
        verbeterpunten: [
          'Meer preventieve activiteiten rond pesten',
          'Betere training van personeel in signalering',
          'Uitbreiding van leerlingenparticipatie in veiligheidsbeleid'
        ]
      },
      {
        situatie: 'Pedagogisch klimaat',
        bewijs: [
          'Positieve benadering van leerlingen',
          'Stimulerende leeromgeving in alle lokalen',
          'Waardering voor prestaties en inzet',
          'Aandacht voor sociaal-emotionele ontwikkeling'
        ],
        verbeterpunten: [
          'Meer systematische aandacht voor SEL',
          'Uitbreiding van positieve bekrachtiging',
          'Betere afstemming over pedagogische aanpak'
        ]
      }
    ],
    zelfevaluatie: {
      vragen: [
        'Hoe zorgen we voor een veilige omgeving voor alle leerlingen?',
        'Op welke manier stimuleren we een positief leerklimaat?',
        'Hoe gaan we om met gedragsproblemen?',
        'Welke rol spelen leerlingen bij het schoolklimaat?'
      ],
      checklist: [
        'Er is een actueel veiligheidsbeleid',
        'Personeel is getraind in omgaan met incidenten',
        'Leerlingen participeren in schoolregels',
        'Er is aandacht voor sociaal-emotionele ontwikkeling',
        'Het schoolklimaat wordt regelmatig geëvalueerd'
      ]
    }
  },
  {
    id: 'schoolorganisatie',
    nummer: '4',
    titel: 'Schoolorganisatie',
    afkorting: 'OP4',
    beschrijving: 'De schoolorganisatie is ingericht op het realiseren van de onderwijsdoelen en het bieden van een veilige omgeving.',
    indicatoren: [
      'De organisatie is gericht op het realiseren van de onderwijsdoelen',
      'Er is sprake van planmatig handelen',
      'De organisatie van het onderwijs is doelmatig',
      'De school evalueert systematisch de kwaliteit',
      'De school heeft een adequate personeelsvoorziening'
    ],
    bronnen: [
      'Schoolplan en jaarplannen',
      'Organisatiestructuur en functiebeschrijvingen',
      'Kwaliteitszorgsysteem',
      'Personeelsbeleid en -planning',
      'Evaluatierapporten en verbeterplannen'
    ],
    kwaliteitsniveau: 'goed',
    praktijkvoorbeelden: [
      {
        situatie: 'Kwaliteitszorg',
        bewijs: [
          'Systematische evaluatie van onderwijsresultaten',
          'Jaarlijkse evaluatie van schoolplan',
          'Verbeterplannen met concrete acties',
          'Monitoring van voortgang verbeteracties'
        ],
        verbeterpunten: [
          'Meer betrokkenheid van personeel bij evaluaties',
          'Uitbreiding van externe evaluaties',
          'Betere documentatie van verbeterprocessen'
        ]
      },
      {
        situatie: 'Personeelsbeleid',
        bewijs: [
          'Functieprofielen zijn actueel en bekend',
          'Er is een systematiek voor functioneringsgesprekken',
          'Professionalisering wordt gestimuleerd',
          'Werkdruk wordt gemonitord en aangepakt'
        ],
        verbeterpunten: [
          'Meer structurele aandacht voor loopbaanontwikkeling',
          'Uitbreiding van coaching en begeleiding',
          'Betere afstemming tussen functie en bekwaamheid'
        ]
      }
    ],
    zelfevaluatie: {
      vragen: [
        'Hoe is onze organisatie ingericht om onderwijsdoelen te realiseren?',
        'Op welke manier evalueren we systematisch onze kwaliteit?',
        'Hoe zorgen we voor adequate personeelsvoorziening?',
        'Welke verbeteracties ondernemen we naar aanleiding van evaluaties?'
      ],
      checklist: [
        'Er is een actueel schoolplan met concrete doelen',
        'Kwaliteitszorg is systematisch georganiseerd',
        'Personeelsbeleid is gericht op professionalisering',
        'Organisatiestructuur ondersteunt onderwijsdoelen',
        'Verbeterplannen worden gemonitord en bijgesteld'
      ]
    }
  },
  {
    id: 'kwaliteitszorg',
    nummer: '5',
    titel: 'Kwaliteitszorg',
    afkorting: 'OP5',
    beschrijving: 'De school werkt systematisch aan de bewaking en verbetering van de kwaliteit van het onderwijs.',
    indicatoren: [
      'De school evalueert systematisch de kwaliteit van het onderwijs',
      'De school gebruikt de resultaten van evaluaties voor verbetering',
      'Er is sprake van een cyclische aanpak van kwaliteitszorg',
      'Alle betrokkenen zijn betrokken bij kwaliteitszorg',
      'De school heeft zicht op de eigen kwaliteit'
    ],
    bronnen: [
      'Kwaliteitszorgsysteem en -procedures',
      'Evaluatierapporten en analyses',
      'Verbeterplannen en voortgangsrapportages',
      'Zelfevaluatie instrumenten',
      'Externe evaluaties en audits'
    ],
    kwaliteitsniveau: 'goed',
    praktijkvoorbeelden: [
      {
        situatie: 'PDCA-cyclus',
        bewijs: [
          'Jaarlijkse planning van evaluaties',
          'Systematische uitvoering van metingen',
          'Analyse van resultaten met team',
          'Concrete verbeteracties geformuleerd'
        ],
        verbeterpunten: [
          'Meer betrokkenheid van leerlingen bij evaluaties',
          'Uitbreiding van peer review tussen scholen',
          'Betere monitoring van effectiviteit verbeteracties'
        ]
      },
      {
        situatie: 'Zelfevaluatie',
        bewijs: [
          'Gebruik van zelfevaluatie-instrumenten',
          'Regelmatige teamreflectie op kwaliteit',
          'Betrokkenheid van ouders bij evaluaties',
          'Koppeling van zelfevaluatie aan schoolontwikkeling'
        ],
        verbeterpunten: [
          'Meer systematische aanpak van zelfevaluatie',
          'Uitbreiding van externe validatie',
          'Betere documentatie van evaluatieresultaten'
        ]
      }
    ],
    zelfevaluatie: {
      vragen: [
        'Hoe evalueren we systematisch de kwaliteit van ons onderwijs?',
        'Op welke manier gebruiken we evaluatieresultaten voor verbetering?',
        'Hoe betrekken we alle stakeholders bij kwaliteitszorg?',
        'Welke instrumenten gebruiken we voor zelfevaluatie?'
      ],
      checklist: [
        'Er is een systematische aanpak van kwaliteitszorg',
        'Evaluaties leiden tot concrete verbeteracties',
        'Alle betrokkenen participeren in kwaliteitszorg',
        'Er wordt gebruik gemaakt van externe evaluaties',
        'Kwaliteitszorg is cyclisch georganiseerd'
      ]
    }
  }
]

export default function InspectionFrameworkViewer() {
  const [selectedStandard, setSelectedStandard] = useState<InspectionStandard | null>(null)
  const [activeTab, setActiveTab] = useState<'overzicht' | 'zelfevaluatie' | 'praktijk' | 'voorbereiding' | 'afkortingen'>('overzicht')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStandards = inspectieStandaarden.filter(standard =>
    standard.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    standard.beschrijving.toLowerCase().includes(searchTerm.toLowerCase()) ||
    standard.afkorting.toLowerCase().includes(searchTerm.toLowerCase()) ||
    standard.indicatoren.some(indicator => indicator.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getKwaliteitColor = (niveau: string) => {
    switch (niveau) {
      case 'basis': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'goed': return 'bg-green-100 text-green-800 border-green-200'
      case 'excellent': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🔍 Inspectie Onderzoekskader 2021</h2>
        <p className="text-indigo-100">
          Complete gids voor schoolleiders: standaarden, indicatoren en praktische voorbereiding op inspectiebezoek
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Zoek in onderzoekskader:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Zoek op standaard, afkorting, indicator of trefwoord..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'overzicht', label: '📋 Standaarden Overzicht', icon: '📋' },
            { id: 'afkortingen', label: '🔤 Afkortingen & Codes', icon: '🔤' },
            { id: 'zelfevaluatie', label: '🔍 Zelfevaluatie Tools', icon: '🔍' },
            { id: 'praktijk', label: '💼 Praktijkvoorbeelden', icon: '💼' },
            { id: 'voorbereiding', label: '📝 Inspectie Voorbereiding', icon: '📝' }
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
          {/* Afkortingen Tab */}
          {activeTab === 'afkortingen' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🔤 Inspectie Afkortingen & Codes</h3>
                <p className="text-blue-700 text-sm">
                  De inspectie gebruikt specifieke afkortingen en codes in rapporten en communicatie. 
                  Hieronder vind je de belangrijkste codes die je moet kennen.
                </p>
              </div>

              {/* Standaard Afkortingen */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">📊 Onderwijsproces Standaarden (OP)</h4>
                </div>
                <div className="p-4">
                  <div className="grid gap-4">
                    {inspectieStandaarden.map((standard) => (
                      <div key={standard.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {standard.afkorting}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">{standard.titel}</h5>
                          <p className="text-gray-600 text-sm mt-1">{standard.beschrijving}</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Standaard {standard.nummer}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getKwaliteitColor(standard.kwaliteitsniveau)}`}>
                              {standard.kwaliteitsniveau}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Andere Afkortingen */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800">🎯 Kwaliteitsoordelen</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { code: 'V', betekenis: 'Voldoende', beschrijving: 'Standaard wordt voldoende gerealiseerd' },
                      { code: 'O', betekenis: 'Onvoldoende', beschrijving: 'Standaard wordt onvoldoende gerealiseerd' },
                      { code: 'G', betekenis: 'Goed', beschrijving: 'Standaard wordt goed gerealiseerd' },
                      { code: 'Z', betekenis: 'Zeer Zwak', beschrijving: 'Standaard wordt zeer zwak gerealiseerd' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {item.code}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.betekenis}</p>
                          <p className="text-gray-600 text-sm">{item.beschrijving}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800">📋 Overige Codes</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { code: 'LVS', betekenis: 'Leerling Volg Systeem', beschrijving: 'Systeem voor monitoring leerlingvoortgang' },
                      { code: 'VO', betekenis: 'Voortgezet Onderwijs', beschrijving: 'Vervolgonderwijs na basisschool' },
                      { code: 'PO', betekenis: 'Primair Onderwijs', beschrijving: 'Basisonderwijs groep 1-8' },
                      { code: 'IB', betekenis: 'Intern Begeleider', beschrijving: 'Zorgcoördinator van de school' },
                      { code: 'RT', betekenis: 'Remedial Teaching', beschrijving: 'Extra ondersteuning voor leerlingen' },
                      { code: 'SEL', betekenis: 'Sociaal Emotioneel Leren', beschrijving: 'Ontwikkeling sociale vaardigheden' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="px-2 py-1 bg-green-600 rounded text-white font-bold text-xs min-w-fit">
                          {item.code}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.betekenis}</p>
                          <p className="text-gray-600 text-sm">{item.beschrijving}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inspectie Proces Codes */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">🔍 Inspectieproces Afkortingen</h4>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { code: 'VTI', betekenis: 'Vierjaarlijks Toezicht Inspectie', beschrijving: 'Regulier inspectiebezoek elke 4 jaar' },
                      { code: 'TGO', betekenis: 'Toezicht op Grond van Onderzoek', beschrijving: 'Extra toezicht bij zorgen' },
                      { code: 'HTO', betekenis: 'Herstelopdracht Toezicht', beschrijving: 'Intensief toezicht bij tekortkomingen' },
                      { code: 'BTO', betekenis: 'Bestuurlijk Toezicht', beschrijving: 'Toezicht op bestuursniveau' },
                      { code: 'RTC', betekenis: 'Risico Toezicht Cyclus', beschrijving: 'Risicogerichte toezichtaanpak' },
                      { code: 'KTO', betekenis: 'Kwaliteits Toezicht Onderzoek', beschrijving: 'Onderzoek naar onderwijskwaliteit' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-bold text-indigo-600 mb-1">{item.code}</div>
                        <div className="font-medium text-gray-800 text-sm">{item.betekenis}</div>
                        <div className="text-gray-600 text-xs mt-1">{item.beschrijving}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Standaarden Overzicht */}
          {activeTab === 'overzicht' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">📚 Onderzoekskader Primair Onderwijs 2021</h3>
                <p className="text-blue-700 text-sm">
                  Het onderzoekskader bestaat uit 5 standaarden (OP1-OP5) die samen de kwaliteit van het onderwijs bepalen. 
                  Elke standaard heeft specifieke indicatoren waarop de inspectie beoordeelt.
                </p>
              </div>

              <div className="grid gap-4">
                {filteredStandards.map((standard) => (
                  <div
                    key={standard.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                      selectedStandard?.id === standard.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                    }`}
                    onClick={() => setSelectedStandard(selectedStandard?.id === standard.id ? null : standard)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {standard.nummer}
                          </div>
                          <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold">
                            {standard.afkorting}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">{standard.titel}</h3>
                        </div>
                        <p className="text-gray-700 mb-3">{standard.beschrijving}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getKwaliteitColor(standard.kwaliteitsniveau)}`}>
                          Verwacht niveau: {standard.kwaliteitsniveau}
                        </span>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        selectedStandard?.id === standard.id 
                          ? 'bg-indigo-600 text-white shadow-lg scale-110' 
                          : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:scale-105'
                      }`}>
                        <span className="text-xl">
                          {selectedStandard?.id === standard.id ? '👁️‍🗨️' : '👁️'}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedStandard?.id === standard.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                        {/* Indicatoren */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">🎯 Kwaliteitsindicatoren:</h4>
                          <div className="space-y-2">
                            {standard.indicatoren.map((indicator, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                                <span className="text-indigo-500 mt-0.5 font-bold">{index + 1}.</span>
                                <span className="text-gray-700">{indicator}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bronnen */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">📊 Informatiebronnen:</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {standard.bronnen.map((bron, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                                <span className="text-yellow-600">📋</span>
                                <span className="text-yellow-800 text-sm">{bron}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Zelfevaluatie Tools */}
          {activeTab === 'zelfevaluatie' && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🔍 Zelfevaluatie Instrumenten</h3>
                <p className="text-green-700 text-sm">
                  Gebruik deze tools om je school voor te bereiden op een inspectiebezoek en de kwaliteit systematisch te evalueren.
                </p>
              </div>

              {inspectieStandaarden.map((standard) => (
                <div key={standard.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    {standard.afkorting} - {standard.titel}
                  </h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Reflectievragen */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-3">🤔 Reflectievragen:</h5>
                      <div className="space-y-3">
                        {standard.zelfevaluatie.vragen.map((vraag, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800 text-sm font-medium">{vraag}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Checklist */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-3">✅ Kwaliteitschecklist:</h5>
                      <div className="space-y-2">
                        {standard.zelfevaluatie.checklist.map((item, index) => (
                          <label key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                            <input
                              type="checkbox"
                              className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Praktijkvoorbeelden */}
          {activeTab === 'praktijk' && (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">💼 Praktijkvoorbeelden uit het Veld</h3>
                <p className="text-purple-700 text-sm">
                  Concrete voorbeelden van hoe scholen invulling geven aan de kwaliteitsstandaarden en wat inspecteurs zoeken.
                </p>
              </div>

              {inspectieStandaarden.map((standard) => (
                <div key={standard.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    {standard.afkorting} - {standard.titel}
                  </h4>

                  <div className="space-y-6">
                    {standard.praktijkvoorbeelden.map((voorbeeld, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-3">📍 {voorbeeld.situatie}</h5>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium text-green-700 mb-2">✅ Wat werkt goed (bewijs):</h6>
                            <ul className="space-y-1">
                              {voorbeeld.bewijs.map((item, bIndex) => (
                                <li key={bIndex} className="text-sm text-green-600 flex items-start space-x-2">
                                  <span className="text-green-500 mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h6 className="font-medium text-orange-700 mb-2">🔧 Verbeterpunten:</h6>
                            <ul className="space-y-1">
                              {voorbeeld.verbeterpunten.map((punt, pIndex) => (
                                <li key={pIndex} className="text-sm text-orange-600 flex items-start space-x-2">
                                  <span className="text-orange-500 mt-0.5">→</span>
                                  <span>{punt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inspectie Voorbereiding */}
          {activeTab === 'voorbereiding' && (
            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">📝 Inspectiebezoek Voorbereiding</h3>
                <p className="text-red-700 text-sm">
                  Praktische checklist en tips voor een succesvolle voorbereiding op het inspectiebezoek.
                </p>
              </div>

              {/* Voorbereidingschecklist */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">📋 Voorbereidingschecklist</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">📄 Documentatie:</h5>
                    <div className="space-y-2">
                      {[
                        'Actueel schoolplan en jaarplan',
                        'Leerlingvolgsysteem gegevens',
                        'Cito-resultaten en analyses',
                        'Kwaliteitszorgdocumenten',
                        'Personeelsdossiers en bekwaamheden',
                        'Veiligheidsbeleid en protocollen',
                        'Financiële verantwoording',
                        'Oudertevredenheidsonderzoeken'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-700 mb-3">👥 Team Voorbereiding:</h5>
                    <div className="space-y-2">
                      {[
                        'Teambijeenkomst over inspectiebezoek',
                        'Rolverdeling tijdens bezoek',
                        'Afspraken over lessen en observaties',
                        'Voorbereiding gesprekken met inspecteurs',
                        'Briefing van ondersteunend personeel',
                        'Communicatie met ouders en leerlingen',
                        'Back-up plannen voor afwezigheid',
                        'Evaluatie na inspectiebezoek'
                      ].map((item, index) => (
                        <label key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips voor gesprekken */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">💬 Tips voor Gesprekken met Inspecteurs</h4>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">✅ Wel doen:</h5>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Wees open en eerlijk</li>
                      <li>• Geef concrete voorbeelden</li>
                      <li>• Toon verbeterpunten en plannen</li>
                      <li>• Verwijs naar documentatie</li>
                      <li>• Luister goed naar vragen</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h5 className="font-semibold text-red-800 mb-2">❌ Niet doen:</h5>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Verdedigend reageren</li>
                      <li>• Problemen ontkennen</li>
                      <li>• Te veel praten</li>
                      <li>• Collega's bekritiseren</li>
                      <li>• Excuses zoeken</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">💡 Handige tips:</h5>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Bereid kernpunten voor</li>
                      <li>• Oefen gesprekken met team</li>
                      <li>• Maak notities tijdens gesprek</li>
                      <li>• Vraag om verduidelijking</li>
                      <li>• Blijf kalm en professioneel</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Timeline inspectiebezoek */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">⏰ Timeline Inspectiebezoek</h4>
                
                <div className="space-y-4">
                  {[
                    { fase: 'Aankondiging', tijd: '2 weken voor bezoek', activiteiten: ['Ontvangst aankondigingsbrief', 'Team informeren', 'Documentatie verzamelen'] },
                    { fase: 'Voorbereiding', tijd: '1 week voor bezoek', activiteiten: ['Laatste controle documenten', 'Teambespreking', 'Lessen plannen'] },
                    { fase: 'Dag 1', tijd: 'Eerste dag bezoek', activiteiten: ['Startgesprek directie', 'Documentenanalyse', 'Eerste observaties'] },
                    { fase: 'Dag 2', tijd: 'Tweede dag bezoek', activiteiten: ['Lesbezoeken', 'Gesprekken team', 'Gesprekken leerlingen/ouders'] },
                    { fase: 'Afsluiting', tijd: 'Einde bezoek', activiteiten: ['Eindgesprek', 'Voorlopige bevindingen', 'Vervolgafspraken'] }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{item.fase}</h5>
                        <p className="text-sm text-gray-600 mb-2">{item.tijd}</p>
                        <ul className="space-y-1">
                          {item.activiteiten.map((activiteit, aIndex) => (
                            <li key={aIndex} className="text-sm text-gray-700 flex items-start space-x-2">
                              <span className="text-indigo-500 mt-0.5">•</span>
                              <span>{activiteit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference Card */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-3">⚡ Quick Reference: De 5 Standaarden</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {inspectieStandaarden.map((standard, index) => (
            <div key={index} className="text-center p-3 bg-white rounded-lg border border-yellow-200">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                {standard.nummer}
              </div>
              <div className="text-xs font-bold text-yellow-600 mb-1">{standard.afkorting}</div>
              <h4 className="font-medium text-yellow-800 text-sm">{standard.titel}</h4>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-yellow-700">
            💡 <strong>Onthoud:</strong> Alle standaarden zijn even belangrijk en worden integraal beoordeeld
          </p>
        </div>
      </div>
    </div>
  )
}