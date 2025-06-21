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
  const [useDocuments, setUseDocuments] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [useMultiModal, setUseMultiModal] = useState(false)

  // Load documents from localStorage
  useEffect(() => {
    const savedDocs = localStorage.getItem('pabo-documents')
    if (savedDocs) {
      const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
        ...doc,
        uploadDate: new Date(doc.uploadDate)
      }))
      setAvailableDocuments(parsedDocs)
    }
  }, [])

  const startOpdracht = (opdracht: Opdracht) => {
    setSelectedOpdracht(opdracht)
  }

  const resetChat = () => {
    setSelectedOpdracht(null)
    setSelectedDocuments([])
    setUseDocuments(false)
    setUploadedFiles([])
    setUseMultiModal(false)
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

        {/* Multi-Modal Upload */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-purple-800">🎭 Multi-Modal Learning</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useMultiModal}
                onChange={(e) => setUseMultiModal(e.target.checked)}
                className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-purple-700 text-sm">Activeer multi-modal upload</span>
            </label>
          </div>
          
          {useMultiModal && (
            <div className="space-y-3">
              <p className="text-purple-700 text-sm">
                Upload afbeeldingen, audio, video's en documenten voor rijkere AI-interacties:
              </p>
              <MultiModalUpload
                onFilesChange={setUploadedFiles}
                maxFiles={5}
              />
            </div>
          )}
        </div>

        {/* Document Integration */}
        {availableDocuments.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-800">📚 Gebruik je schooldocumenten</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useDocuments}
                  onChange={(e) => setUseDocuments(e.target.checked)}
                  className="rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-green-700 text-sm">Activeer document-integratie</span>
              </label>
            </div>
            
            {useDocuments && (
              <div className="space-y-2">
                <p className="text-green-700 text-sm mb-3">
                  Selecteer documenten die je wilt gebruiken in de AI-begeleiding:
                </p>
                <div className="grid gap-2 max-h-40 overflow-y-auto">
                  {availableDocuments.map((doc) => (
                    <label key={doc.id} className="flex items-center space-x-2 p-2 bg-white rounded border border-green-200 hover:bg-green-25 cursor-pointer">
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
                    </label>
                  ))}
                </div>
                {selectedDocuments.length > 0 && (
                  <div className="mt-2 p-2 bg-green-100 rounded text-sm text-green-700">
                    ✅ {selectedDocuments.length} document(en) geselecteerd voor AI-begeleiding
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Opdracht Selector */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🛠️ Kies een interactieve opdracht</h3>
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
                    {useDocuments && selectedDocuments.length > 0 && (
                      <div className="flex items-center text-green-600">
                        <span className="mr-1">📚</span>
                        <span>{selectedDocuments.length} docs</span>
                      </div>
                    )}
                    {useMultiModal && uploadedFiles.length > 0 && (
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
              <span className="text-purple-700">Integratie met schooldocumenten</span>
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
            <p className="text-blue-100 text-sm">Opdracht: {selectedOpdracht.titel}</p>
            <div className="flex items-center space-x-3 mt-1">
              {useDocuments && selectedDocuments.length > 0 && (
                <p className="text-blue-100 text-xs">📚 Met {selectedDocuments.length} schooldocument(en)</p>
              )}
              {useMultiModal && uploadedFiles.length > 0 && (
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
              Nieuwe opdracht
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