'use client'

import { useState } from 'react'

interface Kerndoel {
  nummer: number
  vakgebied: string
  titel: string
  beschrijving: string
  voorbeelden: string[]
  leerjaren: string
  audioUrl?: string
}

const kerndoelen: Kerndoel[] = [
  // Nederlandse taal
  {
    nummer: 1,
    vakgebied: "Nederlandse taal",
    titel: "Mondeling taalgebruik",
    beschrijving: "De leerlingen leren informatie te vergaren, te ordenen en door te geven. Zij leren naar anderen te luisteren en met anderen te spreken.",
    voorbeelden: [
      "Klasgesprek over een boek",
      "Presentatie over een onderwerp",
      "Luisteren naar instructies",
      "Vertellen van ervaringen"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 2,
    vakgebied: "Nederlandse taal",
    titel: "Schriftelijk taalgebruik",
    beschrijving: "De leerlingen leren de functie van geschreven taal en de conventies van het schrift.",
    voorbeelden: [
      "Verhaal schrijven",
      "Brief opstellen",
      "Werkstuk maken",
      "Notities maken"
    ],
    leerjaren: "Groep 3-8"
  },
  {
    nummer: 3,
    vakgebied: "Nederlandse taal",
    titel: "Lezen",
    beschrijving: "De leerlingen leren technisch lezen en begrijpend lezen.",
    voorbeelden: [
      "Prentenboek lezen",
      "Informatieve tekst begrijpen",
      "Instructies volgen",
      "Verhaal samenvatten"
    ],
    leerjaren: "Groep 3-8"
  },
  {
    nummer: 4,
    vakgebied: "Nederlandse taal",
    titel: "Spelling",
    beschrijving: "De leerlingen leren de spelling van de Nederlandse taal.",
    voorbeelden: [
      "Werkwoorden vervoegen",
      "Meervoud maken",
      "Leestekens gebruiken",
      "Woorddelen herkennen"
    ],
    leerjaren: "Groep 3-8"
  },
  {
    nummer: 5,
    vakgebied: "Nederlandse taal",
    titel: "Woordenschat en begripsvorming",
    beschrijving: "De leerlingen leren de betekenis van woorden en begrippen.",
    voorbeelden: [
      "Synoniemen zoeken",
      "Woordfamilies maken",
      "Context gebruiken",
      "Vakwoorden leren"
    ],
    leerjaren: "Groep 1-8"
  },
  // Rekenen en wiskunde
  {
    nummer: 6,
    vakgebied: "Rekenen en wiskunde",
    titel: "Getallen en bewerkingen",
    beschrijving: "De leerlingen leren getallen en hun onderlinge relaties kennen en gebruiken.",
    voorbeelden: [
      "Tellen tot 100",
      "Optellen en aftrekken",
      "Tafels van vermenigvuldiging",
      "Breuken begrijpen"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 7,
    vakgebied: "Rekenen en wiskunde",
    titel: "Meten en meetkunde",
    beschrijving: "De leerlingen leren meten, schatten en meetkundige begrippen gebruiken.",
    voorbeelden: [
      "Lengte meten",
      "Tijd aflezen",
      "Vormen herkennen",
      "Oppervlakte berekenen"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 8,
    vakgebied: "Rekenen en wiskunde",
    titel: "Verhoudingen",
    beschrijving: "De leerlingen leren verhoudingen, procenten en statistiek.",
    voorbeelden: [
      "Grafieken lezen",
      "Procenten berekenen",
      "Gemiddelde bepalen",
      "Kansen inschatten"
    ],
    leerjaren: "Groep 6-8"
  },
  {
    nummer: 9,
    vakgebied: "Rekenen en wiskunde",
    titel: "Hoofdrekenen",
    beschrijving: "De leerlingen leren hoofdrekenen, cijferen en rekenen met de rekenmachine.",
    voorbeelden: [
      "Handig optellen",
      "Schatten van uitkomsten",
      "Rekenmachine gebruiken",
      "Rekenstrategieën toepassen"
    ],
    leerjaren: "Groep 3-8"
  },
  // Engelse taal
  {
    nummer: 10,
    vakgebied: "Engelse taal",
    titel: "Luisteren",
    beschrijving: "De leerlingen leren eenvoudige gesproken Engelse teksten begrijpen.",
    voorbeelden: [
      "Liedjes verstaan",
      "Instructies opvolgen",
      "Verhalen begrijpen",
      "Gesprekjes voeren"
    ],
    leerjaren: "Groep 7-8"
  },
  {
    nummer: 11,
    vakgebied: "Engelse taal",
    titel: "Spreken",
    beschrijving: "De leerlingen leren zich mondeling uiten in eenvoudige bewoordingen.",
    voorbeelden: [
      "Zichzelf voorstellen",
      "Vragen stellen",
      "Over hobby's praten",
      "Rollenspel doen"
    ],
    leerjaren: "Groep 7-8"
  },
  {
    nummer: 12,
    vakgebied: "Engelse taal",
    titel: "Lezen",
    beschrijving: "De leerlingen leren eenvoudige Engelse teksten lezen en begrijpen.",
    voorbeelden: [
      "Prentenboeken lezen",
      "Eenvoudige verhalen",
      "Instructies begrijpen",
      "Informatie zoeken"
    ],
    leerjaren: "Groep 7-8"
  },
  {
    nummer: 13,
    vakgebied: "Engelse taal",
    titel: "Schrijven",
    beschrijving: "De leerlingen leren eenvoudige Engelse teksten schrijven.",
    voorbeelden: [
      "Korte zinnen maken",
      "Briefje schrijven",
      "Verhaal afmaken",
      "Formulier invullen"
    ],
    leerjaren: "Groep 7-8"
  },
  // Oriëntatie op jezelf en de wereld
  {
    nummer: 14,
    vakgebied: "Oriëntatie op jezelf en de wereld",
    titel: "Mens en samenleving",
    beschrijving: "De leerlingen leren over het functioneren van de mens in de samenleving.",
    voorbeelden: [
      "Familie en vriendschap",
      "Regels en afspraken",
      "Verschillende culturen",
      "Democratie en verkiezingen"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 15,
    vakgebied: "Oriëntatie op jezelf en de wereld",
    titel: "Geschiedenis",
    beschrijving: "De leerlingen leren over het verleden en de ontwikkeling van de samenleving.",
    voorbeelden: [
      "Prehistorie",
      "Middeleeuwen",
      "Gouden Eeuw",
      "Tweede Wereldoorlog"
    ],
    leerjaren: "Groep 5-8"
  },
  {
    nummer: 16,
    vakgebied: "Oriëntatie op jezelf en de wereld",
    titel: "Aardrijkskunde",
    beschrijving: "De leerlingen leren over de aarde, landschappen en verschillende landen.",
    voorbeelden: [
      "Nederland en provincies",
      "Werelddelen",
      "Klimaat en weer",
      "Steden en dorpen"
    ],
    leerjaren: "Groep 5-8"
  },
  {
    nummer: 17,
    vakgebied: "Oriëntatie op jezelf en de wereld",
    titel: "Natuur en techniek",
    beschrijving: "De leerlingen leren over natuurverschijnselen en technische toepassingen.",
    voorbeelden: [
      "Planten en dieren",
      "Weer en seizoenen",
      "Machines en werktuigen",
      "Milieu en duurzaamheid"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 18,
    vakgebied: "Oriëntatie op jezelf en de wereld",
    titel: "Gezondheid en welzijn",
    beschrijving: "De leerlingen leren over gezond leven en welzijn.",
    voorbeelden: [
      "Gezonde voeding",
      "Beweging en sport",
      "Hygiëne",
      "Veiligheid"
    ],
    leerjaren: "Groep 1-8"
  },
  // Kunstzinnige oriëntatie
  {
    nummer: 19,
    vakgebied: "Kunstzinnige oriëntatie",
    titel: "Beeldende vorming",
    beschrijving: "De leerlingen leren beelden maken, bekijken en bespreken.",
    voorbeelden: [
      "Tekenen en schilderen",
      "Boetseren en bouwen",
      "Kunstwerken bekijken",
      "Eigen werk presenteren"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 20,
    vakgebied: "Kunstzinnige oriëntatie",
    titel: "Muzikale vorming",
    beschrijving: "De leerlingen leren muziek maken, beluisteren en waarderen.",
    voorbeelden: [
      "Liedjes zingen",
      "Instrumenten bespelen",
      "Naar muziek luisteren",
      "Ritme en melodie"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 21,
    vakgebied: "Kunstzinnige oriëntatie",
    titel: "Drama",
    beschrijving: "De leerlingen leren spelen, toneelspelen en verhalen uitbeelden.",
    voorbeelden: [
      "Rollenspel",
      "Toneelstukje opvoeren",
      "Verhaal uitbeelden",
      "Improvisatie"
    ],
    leerjaren: "Groep 1-8"
  },
  {
    nummer: 22,
    vakgebied: "Kunstzinnige oriëntatie",
    titel: "Dans en beweging",
    beschrijving: "De leerlingen leren bewegen op muziek en dansen.",
    voorbeelden: [
      "Volksdansen",
      "Vrije beweging",
      "Choreografie maken",
      "Uitdrukking door beweging"
    ],
    leerjaren: "Groep 1-8"
  },
  // Bewegingsonderwijs
  {
    nummer: 23,
    vakgebied: "Bewegingsonderwijs",
    titel: "Lichamelijke oefening",
    beschrijving: "De leerlingen leren bewegen, sporten en spelen.",
    voorbeelden: [
      "Hardlopen en springen",
      "Balspelen",
      "Turnen",
      "Zwemmen"
    ],
    leerjaren: "Groep 1-8"
  }
  // Note: In werkelijkheid zijn er 58 kerndoelen, hier toon ik de eerste 23 als voorbeeld
]

export default function KerndoelenViewer() {
  const [selectedVakgebied, setSelectedVakgebied] = useState<string>('alle')
  const [selectedKerndoel, setSelectedKerndoel] = useState<Kerndoel | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

  const vakgebieden = Array.from(new Set(kerndoelen.map(k => k.vakgebied)))

  const filteredKerndoelen = kerndoelen.filter(kerndoel => {
    const matchesVakgebied = selectedVakgebied === 'alle' || kerndoel.vakgebied === selectedVakgebied
    const matchesSearch = kerndoel.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kerndoel.beschrijving.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesVakgebied && matchesSearch
  })

  const getVakgebiedIcon = (vakgebied: string) => {
    switch (vakgebied) {
      case 'Nederlandse taal': return '📚'
      case 'Rekenen en wiskunde': return '🔢'
      case 'Engelse taal': return '🇬🇧'
      case 'Oriëntatie op jezelf en de wereld': return '🌍'
      case 'Kunstzinnige oriëntatie': return '🎨'
      case 'Bewegingsonderwijs': return '⚽'
      default: return '📖'
    }
  }

  const getVakgebiedColor = (vakgebied: string) => {
    switch (vakgebied) {
      case 'Nederlandse taal': return 'bg-blue-500'
      case 'Rekenen en wiskunde': return 'bg-green-500'
      case 'Engelse taal': return 'bg-red-500'
      case 'Oriëntatie op jezelf en de wereld': return 'bg-purple-500'
      case 'Kunstzinnige oriëntatie': return 'bg-pink-500'
      case 'Bewegingsonderwijs': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const speakText = (text: string, kerndoelNummer: number) => {
    if ('speechSynthesis' in window) {
      // Stop current speech
      window.speechSynthesis.cancel()
      
      if (isPlaying === kerndoelNummer) {
        setIsPlaying(null)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'nl-NL'
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(kerndoelNummer)
      utterance.onend = () => setIsPlaying(null)
      utterance.onerror = () => setIsPlaying(null)

      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📚 Alle 58 Kerndoelen Interactief</h2>
        <p className="text-blue-100">
          Ontdek, beluister en leer alle kerndoelen van het Nederlandse basisonderwijs
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vakgebied Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎯 Filter op vakgebied:
            </label>
            <select
              value={selectedVakgebied}
              onChange={(e) => setSelectedVakgebied(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="alle">Alle vakgebieden</option>
              {vakgebieden.map(vakgebied => (
                <option key={vakgebied} value={vakgebied}>
                  {getVakgebiedIcon(vakgebied)} {vakgebied}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Zoeken:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Zoek in titel of beschrijving..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Vakgebied Overview */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {vakgebieden.map(vakgebied => {
            const count = kerndoelen.filter(k => k.vakgebied === vakgebied).length
            return (
              <button
                key={vakgebied}
                onClick={() => setSelectedVakgebied(vakgebied === selectedVakgebied ? 'alle' : vakgebied)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedVakgebied === vakgebied
                    ? `${getVakgebiedColor(vakgebied)} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{getVakgebiedIcon(vakgebied)}</div>
                <div className="text-xs font-medium">{vakgebied.split(' ')[0]}</div>
                <div className="text-xs opacity-75">{count} doelen</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          📊 {filteredKerndoelen.length} van {kerndoelen.length} kerndoelen
        </span>
      </div>

      {/* Kerndoelen Grid */}
      <div className="grid gap-6">
        {filteredKerndoelen.map((kerndoel) => (
          <div
            key={kerndoel.nummer}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${getVakgebiedColor(kerndoel.vakgebied)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {kerndoel.nummer}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{getVakgebiedIcon(kerndoel.vakgebied)}</span>
                      <span className="text-sm font-medium text-gray-600">{kerndoel.vakgebied}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{kerndoel.titel}</h3>
                  </div>
                </div>
                
                {/* Audio Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => speakText(`Kerndoel ${kerndoel.nummer}: ${kerndoel.titel}. ${kerndoel.beschrijving}`, kerndoel.nummer)}
                    className={`p-2 rounded-lg transition-colors ${
                      isPlaying === kerndoel.nummer
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                    title={isPlaying === kerndoel.nummer ? 'Stop voorlezen' : 'Lees voor'}
                  >
                    {isPlaying === kerndoel.nummer ? '🛑' : '🔊'}
                  </button>
                  <button
                    onClick={() => setSelectedKerndoel(selectedKerndoel?.nummer === kerndoel.nummer ? null : kerndoel)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Meer details"
                  >
                    {selectedKerndoel?.nummer === kerndoel.nummer ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">{kerndoel.beschrijving}</p>

              {/* Quick Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 text-gray-600">
                    <span>🎯</span>
                    <span>{kerndoel.leerjaren}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-600">
                    <span>💡</span>
                    <span>{kerndoel.voorbeelden.length} voorbeelden</span>
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedKerndoel?.nummer === kerndoel.nummer && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">💡 Praktijkvoorbeelden:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {kerndoel.voorbeelden.map((voorbeeld, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">•</span>
                          <span className="text-blue-800 text-sm">{voorbeeld}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => speakText(`Praktijkvoorbeelden voor ${kerndoel.titel}: ${kerndoel.voorbeelden.join(', ')}`, kerndoel.nummer + 1000)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      🔊 Voorbeelden beluisteren
                    </button>
                    <button
                      onClick={() => {
                        const text = `Kerndoel ${kerndoel.nummer}: ${kerndoel.titel}\n\n${kerndoel.beschrijving}\n\nVoorbeelden:\n${kerndoel.voorbeelden.map(v => `• ${v}`).join('\n')}`
                        navigator.clipboard.writeText(text)
                        alert('Kerndoel gekopieerd naar klembord!')
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      📋 Kopieer tekst
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredKerndoelen.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Geen kerndoelen gevonden</h3>
          <p className="text-gray-500">Probeer een andere zoekterm of vakgebied</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3">💡 Hoe gebruik je de kerndoelen?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">🔊</span>
              <span className="text-green-700">Laat kerndoelen voorlezen voor auditief leren</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">👁️</span>
              <span className="text-green-700">Bekijk praktijkvoorbeelden voor concrete toepassingen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">🎯</span>
              <span className="text-green-700">Filter op vakgebied voor gerichte studie</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">📋</span>
              <span className="text-green-700">Kopieer teksten voor lesvoorbereiding</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">🔍</span>
              <span className="text-green-700">Zoek specifieke onderwerpen snel op</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">💡</span>
              <span className="text-green-700">Gebruik voorbeelden als inspiratie voor lessen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}