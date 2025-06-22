'use client'

import { useState } from 'react'

interface MRBevoegdheid {
  id: string
  onderwerp: string
  type: 'instemming' | 'advies' | 'informatie' | 'initiatief'
  artikel: string
  beschrijving: string
  voorbeelden: string[]
  procedure: {
    stappen: string[]
    termijnen: string[]
    documenten: string[]
  }
  borgingsmechanismen: string[]
  praktijktips: string[]
  valkuilen: string[]
  sjablonen: string[]
}

interface WMSArtikel {
  artikel: string
  titel: string
  inhoud: string
  praktijktoepassing: string[]
  relatedBevoegdheden: string[]
}

const mrBevoegdheden: MRBevoegdheid[] = [
  {
    id: 'schoolplan',
    onderwerp: 'Schoolplan',
    type: 'instemming',
    artikel: 'Art. 10 lid 1a WMS',
    beschrijving: 'De MR heeft instemmingsrecht bij vaststelling of wijziging van het schoolplan',
    voorbeelden: [
      'Nieuwe visie en missie van de school',
      'Wijziging onderwijskundige uitgangspunten',
      'Aanpassing van schooldoelen',
      'Verandering in pedagogisch-didactische aanpak',
      'Nieuwe profilering van de school'
    ],
    procedure: {
      stappen: [
        'Directie stelt concept schoolplan op',
        'Concept wordt voorgelegd aan MR',
        'MR krijgt 30 dagen bedenktijd',
        'MR geeft instemming of weigert gemotiveerd',
        'Bij weigering: overleg en eventueel aanpassing',
        'Definitieve vaststelling na instemming'
      ],
      termijnen: [
        '30 dagen bedenktijd voor MR',
        'Redelijke termijn voor overleg bij geschil',
        'Schoolplan geldt voor 4 jaar'
      ],
      documenten: [
        'Concept schoolplan',
        'Toelichting op wijzigingen',
        'Instemming- of weigeringsbesluit MR',
        'Eventuele aanpassingen na overleg'
      ]
    },
    borgingsmechanismen: [
      'Vastleggen in MR-vergadernotulen',
      'Schriftelijke instemming bewaren',
      'Communicatie naar team en ouders',
      'Opname in schoolgids',
      'Jaarlijkse evaluatie voortgang'
    ],
    praktijktips: [
      'Betrek MR vroeg in het proces',
      'Organiseer informatiebijeenkomst vooraf',
      'Geef heldere toelichting op wijzigingen',
      'Plan voldoende tijd voor beraad',
      'Documenteer alle stappen zorgvuldig'
    ],
    valkuilen: [
      'Te laat betrekken van MR',
      'Onvoldoende toelichting geven',
      'Termijnen niet respecteren',
      'Informele afspraken zonder documentatie',
      'Doorvoeren zonder instemming'
    ],
    sjablonen: [
      'Voorstel schoolplan aan MR',
      'Instemming-/weigeringsformulier',
      'Overlegverslag bij geschil',
      'Communicatiebrief aan ouders'
    ]
  },
  {
    id: 'schoolreglement',
    onderwerp: 'Schoolreglement',
    type: 'instemming',
    artikel: 'Art. 10 lid 1b WMS',
    beschrijving: 'De MR heeft instemmingsrecht bij vaststelling of wijziging van het schoolreglement',
    voorbeelden: [
      'Huisregels en gedragscode',
      'Regels over veiligheid en orde',
      'Sanctiebeleid en maatregelen',
      'Regels over gebruik faciliteiten',
      'Procedures bij incidenten'
    ],
    procedure: {
      stappen: [
        'Directie stelt concept reglement op',
        'Voorlegging aan MR met toelichting',
        'MR bespreekt in vergadering',
        'Eventueel aanvullende informatie opvragen',
        'Besluitvorming binnen 30 dagen',
        'Implementatie na instemming'
      ],
      termijnen: [
        '30 dagen bedenktijd voor MR',
        'Implementatie na instemming',
        'Jaarlijkse evaluatie'
      ],
      documenten: [
        'Concept schoolreglement',
        'Vergelijking met huidig reglement',
        'MR-besluit met motivatie',
        'Definitief reglement'
      ]
    },
    borgingsmechanismen: [
      'Publicatie op website',
      'Uitreiking aan nieuwe ouders',
      'Bespreking in teamvergadering',
      'Opname in schoolgids',
      'Jaarlijkse evaluatie effectiviteit'
    ],
    praktijktips: [
      'Maak reglement praktisch en uitvoerbaar',
      'Zorg voor heldere en begrijpelijke taal',
      'Betrek ervaringen van leerkrachten',
      'Test haalbaarheid in praktijk',
      'Communiceer wijzigingen helder'
    ],
    valkuilen: [
      'Te gedetailleerd of te algemeen',
      'Niet uitvoerbaar in praktijk',
      'Onduidelijke sancties',
      'Geen evaluatie van effectiviteit',
      'Slechte communicatie naar ouders'
    ],
    sjablonen: [
      'Schoolreglement template',
      'Vergelijkingstabel oud-nieuw',
      'Communicatiebrief wijzigingen',
      'Evaluatieformulier'
    ]
  },
  {
    id: 'begroting',
    onderwerp: 'Begroting',
    type: 'advies',
    artikel: 'Art. 10 lid 2a WMS',
    beschrijving: 'De MR heeft adviesrecht over de begroting en meerjarenraming',
    voorbeelden: [
      'Jaarlijkse schoolbegroting',
      'Meerjarenraming 4 jaar',
      'Grote investeringen',
      'Besteding reserves',
      'Wijzigingen in begrotingsjaar'
    ],
    procedure: {
      stappen: [
        'Directie stelt concept begroting op',
        'Presentatie aan MR met toelichting',
        'MR krijgt gelegenheid voor vragen',
        'MR brengt advies uit binnen termijn',
        'Directie neemt advies in overweging',
        'Motivatie bij afwijken van advies'
      ],
      termijnen: [
        '30 dagen voor advies MR',
        'Voor 1 oktober definitieve begroting',
        'Tussentijdse rapportage per kwartaal'
      ],
      documenten: [
        'Concept begroting met toelichting',
        'Meerjarenraming',
        'Advies MR',
        'Reactie directie op advies'
      ]
    },
    borgingsmechanismen: [
      'Kwartaalrapportages aan MR',
      'Jaarrekening met toelichting',
      'Vergelijking begroting-realisatie',
      'Rapportage aan bestuur',
      'Externe accountantscontrole'
    ],
    praktijktips: [
      'Geef heldere financiële toelichting',
      'Gebruik begrijpelijke grafieken',
      'Leg verbinding met onderwijsdoelen',
      'Toon meerjarig perspectief',
      'Wees transparant over keuzes'
    ],
    valkuilen: [
      'Te technische presentatie',
      'Geen koppeling aan onderwijs',
      'Onduidelijke prioriteiten',
      'Geen ruimte voor vragen',
      'Negeren van MR-advies'
    ],
    sjablonen: [
      'Begrotingspresentatie MR',
      'Adviesformulier MR',
      'Kwartaalrapportage template',
      'Toelichting bij afwijkingen'
    ]
  },
  {
    id: 'personeel',
    onderwerp: 'Personeelsbeleid',
    type: 'advies',
    artikel: 'Art. 10 lid 2b WMS',
    beschrijving: 'De MR heeft adviesrecht over het algemene personeelsbeleid',
    voorbeelden: [
      'Werving en selectiebeleid',
      'Professionalisering en scholing',
      'Werkdrukbeleid',
      'Arbo-beleid en veiligheid',
      'Beoordelings- en functioneringsgesprekken'
    ],
    procedure: {
      stappen: [
        'Directie formuleert personeelsbeleid',
        'Voorlegging aan MR met onderbouwing',
        'Bespreking in MR-vergadering',
        'Eventueel aanvullend overleg',
        'MR brengt schriftelijk advies uit',
        'Directie reageert op advies'
      ],
      termijnen: [
        '30 dagen voor MR-advies',
        'Jaarlijkse evaluatie beleid',
        'Bijstelling indien nodig'
      ],
      documenten: [
        'Personeelsbeleidsnota',
        'Onderbouwing en motivatie',
        'MR-advies met argumentatie',
        'Reactie directie'
      ]
    },
    borgingsmechanismen: [
      'Jaarlijkse personeelsmonitor',
      'Medewerkerstevredenheidsonderzoek',
      'Rapportage ziekteverzuim',
      'Evaluatie scholingsplan',
      'Arbo-risico-inventarisatie'
    ],
    praktijktips: [
      'Betrek personeelservaringen',
      'Gebruik data en cijfers',
      'Koppel aan schooldoelen',
      'Plan implementatie zorgvuldig',
      'Communiceer helder naar team'
    ],
    valkuilen: [
      'Beleid zonder praktijktoets',
      'Geen betrokkenheid personeel',
      'Onduidelijke uitvoering',
      'Geen evaluatie effectiviteit',
      'Slechte communicatie'
    ],
    sjablonen: [
      'Personeelsbeleid template',
      'Adviesaanvraag MR',
      'Evaluatieformulier beleid',
      'Communicatieplan team'
    ]
  },
  {
    id: 'fusie-opheffing',
    onderwerp: 'Fusie/Opheffing',
    type: 'advies',
    artikel: 'Art. 10 lid 2c WMS',
    beschrijving: 'De MR heeft adviesrecht bij voorgenomen fusie of opheffing van de school',
    voorbeelden: [
      'Fusie met andere school',
      'Opheffing van de school',
      'Splitsing van school',
      'Overdracht aan ander bestuur',
      'Grote organisatorische wijzigingen'
    ],
    procedure: {
      stappen: [
        'Bestuur informeert MR over voornemens',
        'Uitgebreide toelichting en onderbouwing',
        'MR krijgt ruime tijd voor beraad',
        'Eventueel externe advisering',
        'MR brengt zwaarwegend advies uit',
        'Bestuur motiveert besluit uitgebreid'
      ],
      termijnen: [
        'Minimaal 3 maanden bedenktijd',
        'Ruime tijd voor informatieverzameling',
        'Zorgvuldige besluitvorming'
      ],
      documenten: [
        'Voornemen met onderbouwing',
        'Financiële onderbouwing',
        'Gevolgen voor onderwijs',
        'MR-advies',
        'Bestuursbesluit met motivatie'
      ]
    ],
    borgingsmechanismen: [
      'Externe advisering mogelijk',
      'Hoger beroep bij geschillencommissie',
      'Transparante communicatie',
      'Zorgvuldige implementatie',
      'Evaluatie na uitvoering'
    ],
    praktijktips: [
      'Vroeg en transparant communiceren',
      'Alle belangen in kaart brengen',
      'Externe expertise inschakelen',
      'Ruime tijd voor beraad nemen',
      'Zorgvuldige implementatie plannen'
    ],
    valkuilen: [
      'Te late betrokkenheid MR',
      'Onvolledige informatie',
      'Onderschatting impact',
      'Gehaaste besluitvorming',
      'Slechte communicatie'
    ],
    sjablonen: [
      'Informatiedossier MR',
      'Adviesaanvraag template',
      'Impact-analyse format',
      'Communicatieplan'
    ]
  },
  {
    id: 'vakanties',
    onderwerp: 'Vakantierooster',
    type: 'instemming',
    artikel: 'Art. 10 lid 1c WMS',
    beschrijving: 'De MR heeft instemmingsrecht bij vaststelling van het vakantierooster',
    voorbeelden: [
      'Jaarlijks vakantierooster',
      'Studiedagen en vrije dagen',
      'Afwijkingen van regionaal rooster',
      'Extra vrije dagen',
      'Compensatiedagen'
    ],
    procedure: {
      stappen: [
        'Directie stelt concept rooster op',
        'Rekening houden met regionale afspraken',
        'Voorlegging aan MR',
        'Bespreking praktische gevolgen',
        'MR-besluit binnen termijn',
        'Communicatie naar ouders'
      ],
      termijnen: [
        '30 dagen bedenktijd MR',
        'Voor 1 april vaststelling volgend jaar',
        'Tijdige communicatie aan ouders'
      ],
      documenten: [
        'Concept vakantierooster',
        'Vergelijking met regio',
        'MR-besluit',
        'Definitief rooster'
      ]
    },
    borgingsmechanismen: [
      'Publicatie op website',
      'Opname in schoolgids',
      'Communicatie via nieuwsbrief',
      'Afstemming met kinderopvang',
      'Evaluatie na schooljaar'
    ],
    praktijktips: [
      'Houd rekening met regionale afspraken',
      'Denk aan kinderopvang consequenties',
      'Communiceer tijdig naar ouders',
      'Overleg met personeel over studiedagen',
      'Plan evaluatie na afloop'
    ],
    valkuilen: [
      'Te late vaststelling',
      'Geen afstemming met regio',
      'Onduidelijke communicatie',
      'Geen rekening met kinderopvang',
      'Wijzigingen zonder overleg'
    ],
    sjablonen: [
      'Vakantierooster template',
      'Communicatiebrief ouders',
      'Vergelijking regio-overzicht',
      'Evaluatieformulier'
    ]
  }
]

const wmsArtikelen: WMSArtikel[] = [
  {
    artikel: 'Art. 3',
    titel: 'Samenstelling MR',
    inhoud: 'De MR bestaat uit vertegenwoordigers van ouders en personeel in gelijke aantallen',
    praktijktoepassing: [
      'Minimaal 4 leden (2 ouders, 2 personeel)',
      'Verkiezingen elke 3 jaar',
      'Voorzitter en secretaris kiezen',
      'Eventueel deskundige leden'
    ],
    relatedBevoegdheden: ['alle']
  },
  {
    artikel: 'Art. 10',
    titel: 'Bevoegdheden MR',
    inhoud: 'Instemmings- en adviesrechten van de MR',
    praktijktoepassing: [
      'Instemmingsrecht: schoolplan, reglement, vakanties',
      'Adviesrecht: begroting, personeel, fusie',
      'Informatierecht: alle schoolzaken',
      'Initiatiefrecht: voorstellen doen'
    ],
    relatedBevoegdheden: ['schoolplan', 'schoolreglement', 'begroting', 'personeel', 'fusie-opheffing', 'vakanties']
  },
  {
    artikel: 'Art. 12',
    titel: 'Informatierechten',
    inhoud: 'De MR heeft recht op alle informatie die nodig is voor de taakuitoefening',
    praktijktoepassing: [
      'Jaarlijkse informatieverstrekking',
      'Financiële rapportages',
      'Personeelsinformatie',
      'Onderwijsresultaten'
    ],
    relatedBevoegdheden: ['begroting', 'personeel']
  },
  {
    artikel: 'Art. 13',
    titel: 'Overlegverplichtingen',
    inhoud: 'Regelmatig overleg tussen directie en MR',
    praktijktoepassing: [
      'Minimaal 3x per jaar vergaderen',
      'Agenda 7 dagen van tevoren',
      'Notulen binnen 14 dagen',
      'Jaarverslag MR'
    ],
    relatedBevoegdheden: ['alle']
  },
  {
    artikel: 'Art. 14',
    titel: 'Faciliteiten MR',
    inhoud: 'De school verschaft faciliteiten voor MR-werkzaamheden',
    praktijktoepassing: [
      'Vergaderruimte beschikbaar stellen',
      'Administratieve ondersteuning',
      'Kosten voor scholing',
      'Communicatiemiddelen'
    ],
    relatedBevoegdheden: ['alle']
  }
]

export default function MRWMSViewer() {
  const [activeTab, setActiveTab] = useState<'overzicht' | 'bevoegdheden' | 'procedures' | 'wet' | 'praktijk' | 'sjablonen'>('overzicht')
  const [selectedBevoegdheid, setSelectedBevoegdheid] = useState<MRBevoegdheid | null>(null)
  const [selectedType, setSelectedType] = useState<string>('alle')

  const getBevoegdheidColor = (type: string) => {
    switch (type) {
      case 'instemming': return 'bg-red-100 text-red-800 border-red-200'
      case 'advies': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'informatie': return 'bg-green-100 text-green-800 border-green-200'
      case 'initiatief': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getBevoegdheidIcon = (type: string) => {
    switch (type) {
      case 'instemming': return '✋'
      case 'advies': return '💡'
      case 'informatie': return '📊'
      case 'initiatief': return '🚀'
      default: return '📋'
    }
  }

  const filteredBevoegdheden = selectedType === 'alle' 
    ? mrBevoegdheden 
    : mrBevoegdheden.filter(b => b.type === selectedType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🏛️ MR & WMS Gids voor Schoolleiders</h2>
        <p className="text-indigo-100">
          Complete praktijkgids voor Medezeggenschapsraad en Wet Medezeggenschap Scholen
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'overzicht', label: '📋 Overzicht & Quick Reference', icon: '📋' },
            { id: 'bevoegdheden', label: '⚖️ Bevoegdheden & Rechten', icon: '⚖️' },
            { id: 'procedures', label: '🔄 Procedures & Processen', icon: '🔄' },
            { id: 'wet', label: '📜 WMS Artikelen', icon: '📜' },
            { id: 'praktijk', label: '💼 Praktijktips & Valkuilen', icon: '💼' },
            { id: 'sjablonen', label: '📝 Sjablonen & Checklists', icon: '📝' }
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
          {/* Overzicht Tab */}
          {activeTab === 'overzicht' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Quick Reference MR-Bevoegdheden</h3>
                <p className="text-blue-700 text-sm">
                  Overzicht van alle MR-rechten volgens de Wet Medezeggenschap Scholen (WMS)
                </p>
              </div>

              {/* Quick Reference Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { type: 'instemming', count: mrBevoegdheden.filter(b => b.type === 'instemming').length, desc: 'MR moet instemmen' },
                  { type: 'advies', count: mrBevoegdheden.filter(b => b.type === 'advies').length, desc: 'MR geeft advies' },
                  { type: 'informatie', count: 1, desc: 'MR krijgt informatie' },
                  { type: 'initiatief', count: 1, desc: 'MR kan voorstellen' }
                ].map((item) => (
                  <div key={item.type} className={`rounded-lg p-4 border ${getBevoegdheidColor(item.type)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getBevoegdheidIcon(item.type)}</span>
                      <span className="font-semibold capitalize">{item.type}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{item.count}</div>
                    <div className="text-sm opacity-80">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Belangrijkste Termijnen */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">⏰ Belangrijkste Termijnen</h4>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { termijn: '30 dagen', beschrijving: 'Bedenktijd MR voor instemming/advies' },
                      { termijn: '7 dagen', beschrijving: 'Agenda versturen voor vergadering' },
                      { termijn: '14 dagen', beschrijving: 'Notulen versturen na vergadering' },
                      { termijn: '3x per jaar', beschrijving: 'Minimaal aantal vergaderingen' },
                      { termijn: '1 april', beschrijving: 'Vakantierooster vaststellen' },
                      { termijn: '1 oktober', beschrijving: 'Begroting definitief vaststellen' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                        <div className="font-bold text-yellow-800 min-w-fit">{item.termijn}</div>
                        <div className="text-yellow-700 text-sm">{item.beschrijving}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proces Flowchart */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">🔄 Standaard MR-Proces</h4>
                </div>
                <div className="p-4">
                  <div className="flex flex-col space-y-4">
                    {[
                      { stap: '1', titel: 'Voorstel Directie', beschrijving: 'Directie formuleert voorstel met onderbouwing' },
                      { stap: '2', titel: 'Voorlegging MR', beschrijving: 'Voorstel wordt voorgelegd aan MR met alle informatie' },
                      { stap: '3', titel: 'Beraad MR', beschrijving: 'MR bespreekt voorstel (max 30 dagen bedenktijd)' },
                      { stap: '4', titel: 'Besluit MR', beschrijving: 'MR geeft instemming/advies of weigert gemotiveerd' },
                      { stap: '5', titel: 'Reactie Directie', beschrijving: 'Directie neemt besluit en motiveert bij afwijking' },
                      { stap: '6', titel: 'Implementatie', beschrijving: 'Uitvoering en communicatie naar betrokkenen' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {item.stap}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800">{item.titel}</h5>
                          <p className="text-gray-600 text-sm">{item.beschrijving}</p>
                        </div>
                        {index < 5 && (
                          <div className="text-gray-400">↓</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bevoegdheden Tab */}
          {activeTab === 'bevoegdheden' && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">⚖️ MR Bevoegdheden & Rechten</h3>
                <p className="text-green-700 text-sm">
                  Alle bevoegdheden van de MR volgens de WMS met praktische uitleg en voorbeelden
                </p>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filter op type:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="alle">Alle bevoegdheden</option>
                  <option value="instemming">Instemmingsrecht</option>
                  <option value="advies">Adviesrecht</option>
                  <option value="informatie">Informatierecht</option>
                  <option value="initiatief">Initiatiefrecht</option>
                </select>
              </div>

              {/* Bevoegdheden Grid */}
              <div className="grid gap-4">
                {filteredBevoegdheden.map((bevoegdheid) => (
                  <div
                    key={bevoegdheid.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                      selectedBevoegdheid?.id === bevoegdheid.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                    }`}
                    onClick={() => setSelectedBevoegdheid(selectedBevoegdheid?.id === bevoegdheid.id ? null : bevoegdheid)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getBevoegdheidIcon(bevoegdheid.type)}</span>
                          <h3 className="text-xl font-bold text-gray-800">{bevoegdheid.onderwerp}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBevoegdheidColor(bevoegdheid.type)}`}>
                            {bevoegdheid.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{bevoegdheid.beschrijving}</p>
                        <p className="text-sm text-gray-500">{bevoegdheid.artikel}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        selectedBevoegdheid?.id === bevoegdheid.id 
                          ? 'bg-indigo-600 text-white shadow-lg scale-110' 
                          : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:scale-105'
                      }`}>
                        <span className="text-xl">
                          {selectedBevoegdheid?.id === bevoegdheid.id ? '👁️‍🗨️' : '👁️'}
                        </span>
                      </div>
                    </div>

                    {/* Voorbeelden */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">💡 Voorbeelden:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {bevoegdheid.voorbeelden.slice(0, 4).map((voorbeeld, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 rounded p-2">
                            • {voorbeeld}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedBevoegdheid?.id === bevoegdheid.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                        {/* Procedure */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">🔄 Procedure:</h4>
                          <div className="space-y-3">
                            {bevoegdheid.procedure.stappen.map((stap, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700 text-sm">{stap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Termijnen */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">⏰ Termijnen:</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {bevoegdheid.procedure.termijnen.map((termijn, index) => (
                              <div key={index} className="bg-yellow-50 rounded p-3 border border-yellow-200">
                                <span className="text-yellow-800 text-sm">{termijn}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Borgingsmechanismen */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">🔒 Borgingsmechanismen:</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {bevoegdheid.borgingsmechanismen.map((mechanisme, index) => (
                              <div key={index} className="bg-green-50 rounded p-3 border border-green-200">
                                <span className="text-green-800 text-sm">{mechanisme}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Praktijktips */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">✅ Praktijktips:</h4>
                            <ul className="space-y-2">
                              {bevoegdheid.praktijktips.map((tip, index) => (
                                <li key={index} className="text-sm text-green-700 flex items-start space-x-2">
                                  <span className="text-green-500 mt-0.5">✓</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">⚠️ Valkuilen:</h4>
                            <ul className="space-y-2">
                              {bevoegdheid.valkuilen.map((valkuil, index) => (
                                <li key={index} className="text-sm text-red-700 flex items-start space-x-2">
                                  <span className="text-red-500 mt-0.5">⚠</span>
                                  <span>{valkuil}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Procedures Tab */}
          {activeTab === 'procedures' && (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">🔄 MR Procedures & Processen</h3>
                <p className="text-purple-700 text-sm">
                  Stap-voor-stap procedures voor alle MR-processen met checklists en borgingsmechanismen
                </p>
              </div>

              {/* Procedure Types */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-red-500 mr-2">✋</span>
                    Instemmingsprocedure
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Directie stelt voorstel op',
                      'Voorlegging aan MR met volledige informatie',
                      'MR krijgt 30 dagen bedenktijd',
                      'MR geeft instemming of weigert gemotiveerd',
                      'Bij weigering: overleg en eventuele aanpassing',
                      'Implementatie alleen na instemming'
                    ].map((stap, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 text-sm">{stap}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
                    <p className="text-red-700 text-sm font-medium">
                      ⚠️ Zonder instemming mag het voorstel NIET worden uitgevoerd!
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-blue-500 mr-2">💡</span>
                    Adviesprocedure
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Directie formuleert voorstel',
                      'Voorlegging aan MR met onderbouwing',
                      'MR krijgt 30 dagen voor advies',
                      'MR brengt schriftelijk advies uit',
                      'Directie neemt advies in overweging',
                      'Motivatie vereist bij afwijken van advies'
                    ].map((stap, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 text-sm">{stap}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-blue-700 text-sm font-medium">
                      💡 Advies is niet bindend, maar motivatie vereist bij afwijking
                    </p>
                  </div>
                </div>
              </div>

              {/* Geschillenprocedure */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">⚖️ Geschillenprocedure</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded border border-yellow-200">
                    <div className="text-2xl mb-2">🤝</div>
                    <h5 className="font-medium text-yellow-800 mb-2">Stap 1: Intern Overleg</h5>
                    <p className="text-yellow-700 text-sm">Probeer geschil intern op te lossen door overleg tussen directie en MR</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded border border-orange-200">
                    <div className="text-2xl mb-2">🧑‍⚖️</div>
                    <h5 className="font-medium text-orange-800 mb-2">Stap 2: Mediatie</h5>
                    <p className="text-orange-700 text-sm">Externe mediator inschakelen voor bemiddeling tussen partijen</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded border border-red-200">
                    <div className="text-2xl mb-2">⚖️</div>
                    <h5 className="font-medium text-red-800 mb-2">Stap 3: Geschillencommissie</h5>
                    <p className="text-red-700 text-sm">Bindende uitspraak door landelijke geschillencommissie WMS</p>
                  </div>
                </div>
              </div>

              {/* Jaarplanning MR */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">📅 Jaarplanning MR-Activiteiten</h4>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { periode: 'September', activiteiten: ['Begroting bespreken', 'Jaarplan evalueren', 'Nieuwe leden installeren'] },
                      { periode: 'December', activiteiten: ['Vakantierooster volgend jaar', 'Tussenrapportage financiën', 'Schoolplan evaluatie'] },
                      { periode: 'Maart', activiteiten: ['Definitieve begroting', 'Personeelsbeleid', 'Voorbereidingen nieuw jaar'] },
                      { periode: 'Juni', activiteiten: ['Jaarverslag MR', 'Evaluatie samenwerking', 'Verkiezingen nieuwe MR'] }
                    ].map((item, index) => (
                      <div key={index} className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                        <h5 className="font-medium text-indigo-800 mb-2">{item.periode}</h5>
                        <ul className="space-y-1">
                          {item.activiteiten.map((activiteit, aIndex) => (
                            <li key={aIndex} className="text-indigo-700 text-sm flex items-start space-x-1">
                              <span>•</span>
                              <span>{activiteit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WMS Artikelen Tab */}
          {activeTab === 'wet' && (
            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">📜 Wet Medezeggenschap Scholen (WMS)</h3>
                <p className="text-red-700 text-sm">
                  Belangrijkste artikelen uit de WMS met praktische uitleg voor schoolleiders
                </p>
              </div>

              {/* WMS Artikelen */}
              <div className="space-y-4">
                {wmsArtikelen.map((artikel, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{artikel.artikel}: {artikel.titel}</h4>
                        <p className="text-gray-600 mt-2">{artikel.inhoud}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {artikel.artikel.split(' ')[1]}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">🔧 Praktijktoepassing:</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        {artikel.praktijktoepassing.map((toepassing, tIndex) => (
                          <div key={tIndex} className="bg-blue-50 rounded p-3 border border-blue-200">
                            <span className="text-blue-800 text-sm">{toepassing}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {artikel.relatedBevoegdheden.length > 0 && artikel.relatedBevoegdheden[0] !== 'alle' && (
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-700 mb-2">🔗 Gerelateerde bevoegdheden:</h5>
                        <div className="flex flex-wrap gap-2">
                          {artikel.relatedBevoegdheden.map((bevoegdheid, bIndex) => (
                            <span key={bIndex} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              {mrBevoegdheden.find(b => b.id === bevoegdheid)?.onderwerp || bevoegdheid}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Belangrijke Definities */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">📖 Belangrijke WMS Definities</h4>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { term: 'Instemmingsrecht', definitie: 'MR moet instemmen voordat besluit kan worden uitgevoerd. Zonder instemming geen uitvoering.' },
                      { term: 'Adviesrecht', definitie: 'MR geeft advies dat zwaarwegend moet worden meegenomen. Afwijking vereist motivatie.' },
                      { term: 'Informatierecht', definitie: 'MR heeft recht op alle informatie die nodig is voor goede taakuitoefening.' },
                      { term: 'Initiatiefrecht', definitie: 'MR kan zelf voorstellen doen aan directie/bestuur over schoolzaken.' },
                      { term: 'Geschillencommissie', definitie: 'Onafhankelijke commissie die bindende uitspraken doet bij geschillen.' },
                      { term: 'Faciliteiten', definitie: 'School moet MR voorzien van ruimte, tijd en middelen voor taakuitoefening.' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-1">{item.term}</h5>
                        <p className="text-gray-600 text-sm">{item.definitie}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Praktijk Tab */}
          {activeTab === 'praktijk' && (
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-2">💼 Praktijktips & Valkuilen</h3>
                <p className="text-orange-700 text-sm">
                  Praktische adviezen voor succesvolle samenwerking met de MR en veelvoorkomende valkuilen
                </p>
              </div>

              {/* Do's and Don'ts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    Do's - Wat werkt goed
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Betrek MR vroeg in het proces',
                      'Geef volledige en heldere informatie',
                      'Respecteer de bedenktijd van 30 dagen',
                      'Documenteer alle stappen zorgvuldig',
                      'Communiceer transparant over besluiten',
                      'Investeer in goede relatie met MR',
                      'Organiseer regelmatig informele overleggen',
                      'Bied scholing aan voor MR-leden',
                      'Maak gebruik van MR-expertise',
                      'Evalueer samenwerking jaarlijks'
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                    <span className="text-red-500 mr-2">❌</span>
                    Don'ts - Veelvoorkomende valkuilen
                  </h4>
                  <div className="space-y-3">
                    {[
                      'MR pas achteraf informeren',
                      'Onvolledige informatie verstrekken',
                      'Termijnen niet respecteren',
                      'Informele afspraken zonder documentatie',
                      'Besluiten doorvoeren zonder instemming',
                      'MR-advies negeren zonder motivatie',
                      'Alleen formeel contact onderhouden',
                      'MR zien als obstakel',
                      'Geen tijd maken voor uitleg',
                      'Geschillen laten escaleren'
                    ].map((valkuil, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-red-500 mt-0.5">✗</span>
                        <span className="text-gray-700 text-sm">{valkuil}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Succesfactoren */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">🏆 Succesfactoren voor goede MR-samenwerking</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      titel: 'Vertrouwen',
                      beschrijving: 'Bouw wederzijds vertrouwen op door transparantie en betrouwbaarheid',
                      tips: ['Houd afspraken na', 'Wees eerlijk over dilemma\'s', 'Deel ook slecht nieuws tijdig']
                    },
                    {
                      titel: 'Communicatie',
                      beschrijving: 'Zorg voor heldere, tijdige en volledige communicatie',
                      tips: ['Gebruik begrijpelijke taal', 'Geef context bij besluiten', 'Luister actief naar MR']
                    },
                    {
                      titel: 'Samenwerking',
                      beschrijving: 'Zie MR als partner in schoolontwikkeling, niet als tegenstander',
                      tips: ['Vraag om input bij plannen', 'Gebruik MR-expertise', 'Vier successen samen']
                    }
                  ].map((factor, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-2">{factor.titel}</h5>
                      <p className="text-blue-700 text-sm mb-3">{factor.beschrijving}</p>
                      <ul className="space-y-1">
                        {factor.tips.map((tip, tIndex) => (
                          <li key={tIndex} className="text-blue-600 text-xs flex items-start space-x-1">
                            <span>•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conflictpreventie */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">🛡️ Conflictpreventie</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">🔍 Vroege signalen herkennen:</h5>
                    <ul className="space-y-2">
                      {[
                        'MR stelt steeds meer kritische vragen',
                        'Langere beraadtijd nodig voor besluiten',
                        'Informele gesprekken worden minder',
                        'MR vraagt om externe advisering',
                        'Toon van vergaderingen wordt formeler'
                      ].map((signaal, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                          <span className="text-orange-500 mt-0.5">⚠</span>
                          <span>{signaal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">🤝 Preventieve maatregelen:</h5>
                    <ul className="space-y-2">
                      {[
                        'Regelmatige informele gesprekken',
                        'Proactief informatie delen',
                        'MR betrekken bij planvorming',
                        'Jaarlijkse evaluatie samenwerking',
                        'Externe begeleiding bij complexe zaken'
                      ].map((maatregel, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{maatregel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sjablonen Tab */}
          {activeTab === 'sjablonen' && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">📝 Sjablonen & Checklists</h3>
                <p className="text-green-700 text-sm">
                  Praktische sjablonen en checklists voor alle MR-processen
                </p>
              </div>

              {/* Sjablonen per categorie */}
              <div className="grid gap-6">
                {[
                  {
                    categorie: 'Instemmingsprocedures',
                    sjablonen: [
                      { naam: 'Voorstel schoolplan aan MR', beschrijving: 'Template voor voorlegging schoolplan met alle benodigde informatie' },
                      { naam: 'Instemming-/weigeringsformulier', beschrijving: 'Standaardformulier voor MR-besluit met motivatie' },
                      { naam: 'Voorstel schoolreglement', beschrijving: 'Template voor wijzigingen schoolreglement' },
                      { naam: 'Vakantierooster voorstel', beschrijving: 'Overzicht vakantierooster met vergelijking regio' }
                    ]
                  },
                  {
                    categorie: 'Adviesprocedures',
                    sjablonen: [
                      { naam: 'Begrotingspresentatie MR', beschrijving: 'PowerPoint template voor begrotingsuitleg aan MR' },
                      { naam: 'Adviesaanvraag personeelsbeleid', beschrijving: 'Standaard aanvraag MR-advies over personeelszaken' },
                      { naam: 'Fusie/opheffing informatiedossier', beschrijving: 'Complete informatievoorziening bij grote wijzigingen' },
                      { naam: 'MR-advies template', beschrijving: 'Standaardformat voor MR om advies te formuleren' }
                    ]
                  },
                  {
                    categorie: 'Vergaderorganisatie',
                    sjablonen: [
                      { naam: 'Agenda template MR-vergadering', beschrijving: 'Standaard agenda-indeling met alle vaste onderdelen' },
                      { naam: 'Notulen template', beschrijving: 'Format voor vergadernotulen met besluitenlijst' },
                      { naam: 'Actielijst template', beschrijving: 'Overzicht afspraken en vervolgacties' },
                      { naam: 'Jaarplanning MR', beschrijving: 'Overzicht alle MR-activiteiten per schooljaar' }
                    ]
                  },
                  {
                    categorie: 'Communicatie',
                    sjablonen: [
                      { naam: 'Communicatiebrief ouders', beschrijving: 'Template voor communicatie MR-besluiten naar ouders' },
                      { naam: 'Nieuwsbrief MR', beschrijving: 'Periodieke communicatie MR-activiteiten' },
                      { naam: 'Jaarverslag MR', beschrijving: 'Overzicht MR-werkzaamheden en resultaten' },
                      { naam: 'Informatiebrief nieuwe ouders', beschrijving: 'Uitleg MR-rol voor nieuwe schoolgemeenschap' }
                    ]
                  }
                ].map((categorie, cIndex) => (
                  <div key={cIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-800">{categorie.categorie}</h4>
                    </div>
                    <div className="p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {categorie.sjablonen.map((sjabloon, sIndex) => (
                          <div key={sIndex} className="p-4 bg-blue-50 rounded border border-blue-200">
                            <h5 className="font-medium text-blue-800 mb-2">{sjabloon.naam}</h5>
                            <p className="text-blue-700 text-sm mb-3">{sjabloon.beschrijving}</p>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                              📥 Download sjabloon
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklists */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">✅ Praktische Checklists</h4>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-3">📋 Checklist Instemmingsprocedure:</h5>
                      <div className="space-y-2">
                        {[
                          'Voorstel compleet en onderbouwd',
                          'Alle relevante informatie bijgevoegd',
                          'Termijn van 30 dagen gerespecteerd',
                          'MR-vergadering ingepland',
                          'Besluit schriftelijk vastgelegd',
                          'Communicatie naar betrokkenen',
                          'Implementatie na instemming'
                        ].map((item, index) => (
                          <label key={index} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-3">📋 Checklist Adviesprocedure:</h5>
                      <div className="space-y-2">
                        {[
                          'Adviesaanvraag helder geformuleerd',
                          'Achtergrond en context toegelicht',
                          'Relevante documenten bijgevoegd',
                          'Termijn voor advies afgesproken',
                          'MR-advies ontvangen en bestudeerd',
                          'Reactie op advies geformuleerd',
                          'Motivatie bij afwijking gegeven'
                        ].map((item, index) => (
                          <label key={index} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}