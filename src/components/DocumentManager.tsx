'use client'

import { useState, useEffect } from 'react'

interface UploadedDocument {
  id: string
  fileName: string
  fileType: string
  detectedType: string
  text: string
  wordCount: number
  uploadDate: Date
}

interface DocumentManagerProps {
  onDocumentsChange?: (documents: UploadedDocument[]) => void
}

export default function DocumentManager({ onDocumentsChange }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<UploadedDocument | null>(null)

  // Load documents from localStorage on mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('pabo-documents')
    if (savedDocs) {
      try {
        const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
          ...doc,
          uploadDate: new Date(doc.uploadDate)
        }))
        setDocuments(parsedDocs)
        onDocumentsChange?.(parsedDocs)
        console.log('Loaded documents:', parsedDocs)
      } catch (error) {
        console.error('Error loading documents:', error)
        localStorage.removeItem('pabo-documents')
      }
    }
  }, [])

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('pabo-documents', JSON.stringify(documents))
      onDocumentsChange?.(documents)
      console.log('Saved documents:', documents)
    }
  }, [documents, onDocumentsChange])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const result = await response.json()
      
      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        fileName: result.fileName,
        fileType: result.fileType,
        detectedType: result.detectedType,
        text: result.text,
        wordCount: result.wordCount,
        uploadDate: new Date()
      }

      setDocuments(prev => {
        const updated = [...prev, newDocument]
        return updated
      })
      
      // Reset file input
      event.target.value = ''
      
      alert(`✅ Document "${result.fileName}" succesvol geüpload!\n\nType: ${result.detectedType}\nWoorden: ${result.wordCount.toLocaleString()}`)
    } catch (error) {
      console.error('Upload error:', error)
      alert(`❌ Fout bij uploaden: ${error instanceof Error ? error.message : 'Onbekende fout'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const deleteDocument = (documentId: string) => {
    const docToDelete = documents.find(doc => doc.id === documentId)
    if (confirm(`Weet je zeker dat je "${docToDelete?.fileName}" wilt verwijderen?`)) {
      setDocuments(prev => {
        const updated = prev.filter(doc => doc.id !== documentId)
        if (updated.length === 0) {
          localStorage.removeItem('pabo-documents')
        }
        return updated
      })
      if (selectedDocument?.id === documentId) {
        setSelectedDocument(null)
      }
    }
  }

  const getDocumentIcon = (detectedType: string) => {
    if (detectedType.includes('Schoolplan') || detectedType.includes('Schoolgids')) return '🏫'
    if (detectedType.includes('Curriculum')) return '📚'
    if (detectedType.includes('Observatie')) return '👁️'
    if (detectedType.includes('Resultaten')) return '📊'
    if (detectedType.includes('Burgerschap')) return '🤝'
    return '📄'
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Mijn Schooldocumenten</h2>
        <p className="text-gray-600 mb-6">
          Upload hier alle documenten van jouw school. Deze kun je dan gebruiken in alle modules voor gepersonaliseerd leren.
        </p>
        
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Sleep je document hier of klik om te uploaden
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Ondersteunde formaten: PDF, DOCX, TXT (max 10MB)
              </p>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                } transition-colors`}
              >
                {isUploading ? '⏳ Uploaden...' : '📤 Selecteer Document'}
              </label>
            </div>
          </div>
        </div>

        {/* Document Types Info */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: '🏫', title: 'Schoolplan', desc: 'Visie & missie' },
            { icon: '📖', title: 'Schoolgids', desc: 'Praktische info' },
            { icon: '📋', title: 'Beleid', desc: 'Procedures' },
            { icon: '📊', title: 'Resultaten', desc: 'Cito & LVS' },
            { icon: '🎯', title: 'Jaarplan', desc: 'Curriculum' },
            { icon: '👥', title: 'Observatie', desc: 'Feedback' }
          ].map((type, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
              <div className="text-2xl mb-1">{type.icon}</div>
              <p className="font-medium text-blue-800 text-xs">{type.title}</p>
              <p className="text-blue-600 text-xs">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Library */}
      {documents.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">📂 Geüploade Documenten ({documents.length})</h3>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ✅ Beschikbaar voor AI-begeleiding
            </div>
          </div>
          
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getDocumentIcon(doc.detectedType)}</span>
                    <div>
                      <h4 className="font-medium text-gray-800">{doc.fileName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📄 {doc.fileType}</span>
                        <span>🎯 {doc.detectedType}</span>
                        <span>📝 {doc.wordCount.toLocaleString()} woorden</span>
                        <span>📅 {doc.uploadDate.toLocaleDateString()}</span>
                      </div>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          🤖 Klaar voor AI-analyse
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedDocument(selectedDocument?.id === doc.id ? null : doc)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    >
                      {selectedDocument?.id === doc.id ? '👁️ Verberg' : '👁️ Bekijk'}
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      🗑️ Verwijder
                    </button>
                  </div>
                </div>
                
                {selectedDocument?.id === doc.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-2">📄 Document Preview:</h5>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {doc.text.substring(0, 1000)}
                        {doc.text.length > 1000 && '...'}
                      </p>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <strong>💡 AI Tip:</strong> Dit document is nu beschikbaar in alle modules met AI-begeleiding. 
                        Ga naar een module en gebruik de AI-begeleiding om dit document te analyseren en te koppelen aan theorie!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-3">💡 Hoe gebruik je je documenten met AI?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">1️⃣</span>
              <span className="text-green-700">Upload hier al je schooldocumenten (schoolplan, beleid, etc.)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">2️⃣</span>
              <span className="text-green-700">Ga naar een module (bijv. Burgerschap & Diversiteit)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">3️⃣</span>
              <span className="text-green-700">Klik op "AI Begeleiding" in de module</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">4️⃣</span>
              <span className="text-green-700">Activeer "document-integratie" in de AI-chat</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">5️⃣</span>
              <span className="text-green-700">Selecteer je geüploade documenten</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">6️⃣</span>
              <span className="text-green-700">Stel vragen over je schoolplan en krijg gepersonaliseerde antwoorden!</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>🎯 Voorbeeld vraag:</strong> "Wat staat er in ons schoolplan over burgerschap en hoe kan ik dit concreet vormgeven in mijn klas?"
          </p>
        </div>
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nog geen documenten geüpload</h3>
          <p className="text-gray-500 text-sm mb-4">
            Upload je eerste schooldocument om gepersonaliseerd te leren met AI-begeleiding
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">💡 Welke documenten kun je uploaden?</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-700">
              <div>🏫 Schoolplan</div>
              <div>📖 Schoolgids</div>
              <div>📋 Beleidsplannen</div>
              <div>📊 Cito-resultaten</div>
              <div>🎯 Jaarplannen</div>
              <div>👥 Observatieformulieren</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}