'use client'

import { useState, useRef, useEffect } from 'react'
import ContextAwareChat from './ContextAwareChat'
import MultiModalUpload from './MultiModalUpload'

interface Opdracht {
  titel: string
  beschrijving: string
  type: 'reflectie' | 'analyse' | 'ontwerp' | 'toepassing'
  startVraag: string
  context: string
}

interface UploadedDocument {
  id: string
  fileName: string
  fileType: string
  detectedType: string
  text: string
  wordCount: number
  uploadDate: Date
}

interface UploadedFile {
  id: string
  file: File
  type: 'image' | 'audio' | 'document' | 'video'
  preview?: string
  transcription?: string
  analysis?: string
}

interface SocraticChatBotProps {
  module: string
  opdrachten: Opdracht[]
}

export default function SocraticChatBot({ module, opdrachten }: SocraticChatBotProps) {
  const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null)
  const [studentLevel, setStudentLevel] = useState<'beginnend' | 'gevorderd' | 'expert'>('beginnend')
  const [availableDocuments, setAvailableDocuments] = useState<UploadedDocument[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [useDocuments, setUseDocuments] = useState(true) // STANDAARD AAN
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [useMultiModal, setUseMultiModal] = useState(true) // STANDAARD AAN
  const [showDirectChat, setShowDirectChat] = useState(false)

  // Load documents from localStorage
  useEffect(() => {
    const savedDocs = localStorage.getItem('pabo-documents')
    if (savedDocs) {
      try {
        const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
          ...doc,
          uploadDate: new Date(doc.uploadDate)
        }))
        setAvailableDocuments(parsedDocs)
        // Auto-select all documents
        setSelectedDocuments(parsedDocs.map((doc: any) => doc.id))
        console.log('Auto-selected documents:', parsedDocs)
      } catch (error) {
        console.error('Error loading documents:', error)
      }
    }
  }, [])

  const startOpdracht = (opdracht: Opdracht) => {
    setSelectedOpdracht(opdracht)
  }

  const startDirectChat = () => {
    setShowDirectChat(true)
    setSelectedOpdracht({
      titel: "Vrije Chat met AI",
      beschrijving: "Chat direct met de AI over je schooldocumenten en PABO-onderwerpen",
      type: "reflectie",
      startVraag: "Hoe kan ik je helpen met je PABO-studie?",
      context: `Je bent een ervaren PABO-docent die studenten helpt met vragen over hun studie en schoolpraktijk. Gebruik de socratische methode om studenten zelf tot inzichten te laten komen.`
    })
  }

  const resetChat = () => {
    setSelectedOpdracht(null)
    setShowDirectChat(false)
  }

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  if (!selectedOpdracht) {
    return (
      <div className="space-y-6">
        {/* Quick Start - Direct Chat */}
        {availableDocuments.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 Start Direct met Chatten!</h3>
                <p className="text-green-100 mb-4">
                  Je hebt {availableDocuments.length} document(en) geüpload. Begin direct met chatten over je schoolpraktijk!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {availableDocuments.slice(0, 3).map((doc, index) => (
                    <span key={index} className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      📄 {doc.fileName}
                    </span>
                  ))}
                  {availableDocuments.length > 3 && (
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      +{availableDocuments.length - 3} meer
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={startDirectChat}
                className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                💬 Start Chat
              </button>
            </div>
          </div>
        )}

        {/* Student Level Selector */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">🎯 Stel je niveau in</h3>
          <div className="flex space-x-3">
            {[
              { id: 'beginnend', label: '🌱 Beginnend', desc: 'Eerste jaar PABO' },
              { id: 'gevorderd', label: '🌿 Gevorderd', desc: 'Tweede/derde jaar' },
              { id: 'expert', label: '🌳 Expert', desc: 'Vierde jaar/ervaren' }
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => setStudentLevel(level.id as any)}
                className={`flex-1 p-3 rounded-lg text-center transition-all ${
                  studentLevel === level.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-xs opacity-80">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Modal Upload - STANDAARD ACTIEF */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-purple-800">🎭 Multi-Modal Learning</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-purple-700">Actief</span>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-purple-700 text-sm">
              Upload afbeeldingen, audio, video's en documenten voor rijkere AI-interacties:
            </p>
            <MultiModalUpload
              onFilesChange={setUploadedFiles}
              maxFiles={5}
            />
          </div>
        </div>

        {/* Document Integration - STANDAARD ACTIEF */}
        {availableDocuments.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-800">📚 Je Schooldocumenten</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-700">Actief</span>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-green-700 text-sm mb-3">
                ✅ Alle documenten zijn automatisch geselecteerd voor AI-begeleiding:
              </p>
              <div className="grid gap-2 max-h-32 overflow-y-auto">
                {availableDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center space-x-2 p-2 bg-white rounded border border-green-200">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleDocumentSelection(doc.id)}
                      className="rounded border-green-300 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">📄</span>
                        <span className="font-medium text-green-800 text-sm truncate">{doc.fileName}</span>
                      </div>
                      <div className="text-xs text-green-600">{doc.detectedType} • {doc.wordCount.toLocaleString()} woorden</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 p-2 bg-green-100 rounded text-sm text-green-700">
                ✅ {selectedDocuments.length} document(en) klaar voor AI-analyse
              </div>
            </div>
          </div>
        )}

        {/* No Documents - Upload Prompt */}
        {availableDocuments.length === 0 && (
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-yellow-800 mb-2">Geen schooldocumenten gevonden</h3>
            <p className="text-yellow-700 text-sm mb-4">
              Upload eerst je schooldocumenten voor gepersonaliseerde AI-begeleiding
            </p>
            <button
              onClick={() => window.location.href = '#documents'}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              📤 Upload Documenten
            </button>
          </div>
        )}

        {/* Opdracht Selector */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🛠️ Of kies een gestructureerde opdracht</h3>
          <div className="grid gap-4">
            {opdrachten.map((opdracht, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer bg-white hover:bg-gray-50"
                onClick={() => startOpdracht(opdracht)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{opdracht.titel}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    opdracht.type === 'reflectie' ? 'bg-purple-100 text-purple-800' :
                    opdracht.type === 'analyse' ? 'bg-blue-100 text-blue-800' :
                    opdracht.type === 'ontwerp' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {opdracht.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{opdracht.beschrijving}</p>
                <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-700 mb-1">🤔 Startvraag:</p>
                  <p className="text-blue-800 italic">"{opdracht.startVraag}"</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">🤖</span>
                    <span>AI-begeleiding met socratische methode</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    {selectedDocuments.length > 0 && (
                      <div className="flex items-center text-green-600">
                        <span className="mr-1">📚</span>
                        <span>{selectedDocuments.length} docs</span>
                      </div>
                    )}
                    {uploadedFiles.length > 0 && (
                      <div className="flex items-center text-purple-600">
                        <span className="mr-1">🎭</span>
                        <span>{uploadedFiles.length} files</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Info Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">🧠 Geavanceerde AI-begeleiding</h3>
          <p className="text-purple-700 text-sm mb-3">
            Deze AI-mentor gebruikt de socratische methode en is uitgerust met geavanceerde features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🎙️</span>
              <span className="text-purple-700">Spraakherkenning voor hands-free interactie</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">⚡</span>
              <span className="text-purple-700">Real-time feedback tijdens het typen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🧠</span>
              <span className="text-purple-700">Context-bewuste responses</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🎭</span>
              <span className="text-purple-700">Multi-modal learning (tekst, audio, video)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">📚</span>
              <span className="text-purple-700">Automatische integratie schooldocumenten</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">🌊</span>
              <span className="text-purple-700">Streaming responses voor real-time ervaring</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">🤖 Geavanceerde AI Socratische Begeleiding</h3>
            <p className="text-blue-100 text-sm">
              {showDirectChat ? 'Vrije Chat' : `Opdracht: ${selectedOpdracht.titel}`}
            </p>
            <div className="flex items-center space-x-3 mt-1">
              {selectedDocuments.length > 0 && (
                <p className="text-blue-100 text-xs">📚 Met {selectedDocuments.length} schooldocument(en)</p>
              )}
              {uploadedFiles.length > 0 && (
                <p className="text-blue-100 text-xs">🎭 Met {uploadedFiles.length} multi-modal bestand(en)</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              studentLevel === 'beginnend' ? 'bg-green-500' :
              studentLevel === 'gevorderd' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {studentLevel === 'beginnend' ? '🌱' : studentLevel === 'gevorderd' ? '🌿' : '🌳'} {studentLevel}
            </span>
            <button
              onClick={resetChat}
              className="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-sm hover:bg-opacity-30 transition-colors"
            >
              {showDirectChat ? 'Terug naar opties' : 'Nieuwe opdracht'}
            </button>
          </div>
        </div>
      </div>

      {/* Context-Aware Chat Component */}
      <ContextAwareChat
        module={module}
        context={selectedOpdracht.context}
        studentLevel={studentLevel}
        availableDocuments={availableDocuments}
        selectedDocuments={selectedDocuments}
      />
    </div>
  )
}