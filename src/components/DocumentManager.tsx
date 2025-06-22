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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Load documents from localStorage on mount
  useEffect(() => {
    const loadDocuments = () => {
      try {
        const savedDocs = localStorage.getItem('pabo-documents')
        console.log('Loading documents from localStorage:', savedDocs)
        
        if (savedDocs) {
          const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
            ...doc,
            uploadDate: new Date(doc.uploadDate)
          }))
          console.log('Parsed documents:', parsedDocs)
          setDocuments(parsedDocs)
          onDocumentsChange?.(parsedDocs)
        }
      } catch (error) {
        console.error('Error loading documents:', error)
        localStorage.removeItem('pabo-documents')
      }
    }

    loadDocuments()
  }, [onDocumentsChange])

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    try {
      if (documents.length > 0) {
        localStorage.setItem('pabo-documents', JSON.stringify(documents))
        console.log('DocumentManager: Saved documents to localStorage:', documents)
      } else {
        // If no documents, remove from localStorage
        localStorage.removeItem('pabo-documents')
        console.log('DocumentManager: Removed documents from localStorage (empty)')
      }
      
      onDocumentsChange?.(documents)
      
      // Dispatch custom event to notify other components
      const event = new CustomEvent('documentUploaded', { 
        detail: { documents, count: documents.length } 
      })
      if (typeof window !== 'undefined') {
        window.dispatchEvent(event)
      }
      console.log('DocumentManager: Dispatched documentUploaded event')
    } catch (error) {
      console.error('Error saving documents:', error)
    }
  }, [documents, onDocumentsChange])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('Starting file upload for:', file.name)
    setIsUploading(true)
    setUploadSuccess(false)

    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('Sending upload request...')
      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData
      })

      console.log('Upload response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Upload failed with error:', errorData)
        throw new Error(errorData.error || 'Upload failed')
      }

      const result = await response.json()
      console.log('Upload successful, result:', result)
      
      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        fileName: result.fileName,
        fileType: result.fileType,
        detectedType: result.detectedType,
        text: result.text,
        wordCount: result.wordCount,
        uploadDate: new Date()
      }

      console.log('Creating new document object:', newDocument)

      // Update documents state
      setDocuments(prev => {
        const updated = [...prev, newDocument]
        console.log('Updated documents array:', updated)
        return updated
      })
      
      // Reset file input
      event.target.value = ''
      
      // Show success message
      setUploadSuccess(true)
      setShowSuccessMessage(true)
      
      console.log('Upload process completed successfully')
      
    } catch (error) {
      console.error('Upload error:', error)
      alert(`❌ Fout bij uploaden: ${error instanceof Error ? error.message : 'Onbekende fout'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const deleteDocument = (documentId: string) => {
    try {
      const docToDelete = documents.find(doc => doc.id === documentId)
      if (!docToDelete) {
        console.warn('Document not found for deletion:', documentId)
        return
      }

      if (confirm(`Weet je zeker dat je "${docToDelete.fileName}" wilt verwijderen?`)) {
        console.log('Deleting document:', documentId)
        
        // Update state
        setDocuments(prev => {
          const updated = prev.filter(doc => doc.id !== documentId)
          console.log('Documents after deletion:', updated)
          return updated
        })
        
        // Clear selected document if it was the deleted one
        if (selectedDocument?.id === documentId) {
          setSelectedDocument(null)
        }
        
        console.log('Document deletion completed successfully')
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('❌ Fout bij verwijderen van document. Probeer het opnieuw.')
    }
  }

  const deleteAllDocuments = () => {
    try {
      if (confirm(`Weet je zeker dat je alle ${documents.length} document(en) wilt verwijderen?`)) {
        console.log('Deleting all documents')
        setDocuments([])
        setSelectedDocument(null)
        console.log('All documents deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting all documents:', error)
      alert('❌ Fout bij verwijderen van alle documenten. Probeer het opnieuw.')
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

  const getFileSize = (wordCount: number) => {
    const estimatedBytes = wordCount * 6 // Rough estimate
    if (estimatedBytes < 1024) return `${estimatedBytes} B`
    if (estimatedBytes < 1024 * 1024) return `${Math.round(estimatedBytes / 1024)} KB`
    return `${Math.round(estimatedBytes / (1024 * 1024))} MB`
  }

  const startAIChat = () => {
    console.log('Starting AI Chat with documents:', documents)
    // Navigate to main page and trigger chat
    if (typeof window !== 'undefined') {
      window.location.href = '/#start-chat'
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Message - NO AUTO-CHAT */}
      {uploadSuccess && showSuccessMessage && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🎉 Document succesvol geüpload!</h3>
              <p className="text-green-100 mb-3">
                Je document is verwerkt en toegevoegd aan je bibliotheek. Je kunt het nu gebruiken in alle modules.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                <p className="text-sm">
                  💡 <strong>Tip:</strong> Ga naar een module om AI-analyse te krijgen op basis van dit document!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-100 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowSuccessMessage(false)
                if (typeof window !== 'undefined') {
                  window.location.href = '/'
                }
              }}
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              📚 Ga naar Modules
            </button>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors font-semibold"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Mijn Schooldocumenten</h2>
        <p className="text-gray-600 mb-6">
          Upload en beheer hier alle documenten van jouw school. Deze kun je dan gebruiken in alle modules voor gepersonaliseerd leren.
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
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploaden...
                  </>
                ) : (
                  <>📤 Selecteer Document</>
                )}
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">📂 Mijn Document Bibliotheek</h3>
              <p className="text-gray-600 text-sm">{documents.length} document(en) • Klaar voor gebruik in modules</p>
            </div>
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  ☰ Lijst
                </button>
              </div>
              
              {/* Action Buttons */}
              <button
                onClick={startAIChat}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                💬 Start AI Chat
              </button>
              <button
                onClick={deleteAllDocuments}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                🗑️ Alles Verwijderen
              </button>
            </div>
          </div>
          
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-br from-green-50 to-blue-50 hover:scale-105">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getDocumentIcon(doc.detectedType)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{doc.fileName}</h4>
                        <p className="text-xs text-gray-500">{doc.fileType}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteDocument(doc.id)
                      }}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Verwijder document"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-800">{doc.detectedType}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Woorden:</span>
                      <span className="font-medium text-gray-800">{doc.wordCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Grootte:</span>
                      <span className="font-medium text-gray-800">{getFileSize(doc.wordCount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Datum:</span>
                      <span className="font-medium text-gray-800">{doc.uploadDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ✅ Beschikbaar
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDocument(selectedDocument?.id === doc.id ? null : doc)
                      }}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs"
                    >
                      {selectedDocument?.id === doc.id ? '👁️ Verberg' : '👁️ Bekijk'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <span className="text-2xl">{getDocumentIcon(doc.detectedType)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800">{doc.fileName}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>📄 {doc.fileType}</span>
                          <span>🎯 {doc.detectedType}</span>
                          <span>📝 {doc.wordCount.toLocaleString()} woorden</span>
                          <span>📅 {doc.uploadDate.toLocaleDateString()}</span>
                          <span>💾 {getFileSize(doc.wordCount)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✅ Beschikbaar
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDocument(selectedDocument?.id === doc.id ? null : doc)
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        {selectedDocument?.id === doc.id ? '👁️ Verberg' : '👁️ Bekijk'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteDocument(doc.id)
                        }}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        🗑️ Verwijder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Document Preview */}
          {selectedDocument && (
            <div className="mt-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-gray-700">📄 Document Preview: {selectedDocument.fileName}</h5>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto border">
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {selectedDocument.text.substring(0, 2000)}
                  {selectedDocument.text.length > 2000 && '...'}
                </p>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>💡 Gebruik in modules:</strong> Dit document is beschikbaar in alle modules met AI-begeleiding. 
                  Ga naar een module om specifieke analyse te krijgen!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Start with Documents */}
      {documents.length > 0 && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3">🚀 Klaar om te Leren met je Documenten!</h3>
          <p className="text-purple-100 mb-4">
            Je hebt {documents.length} document(en) in je bibliotheek. Kies een module om specifieke AI-analyse te krijgen!
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/'
                }
              }}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              📚 Bekijk Alle Modules
            </button>
            <button
              onClick={startAIChat}
              className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors font-semibold"
            >
              💬 Direct AI Chat
            </button>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-3">💡 Hoe gebruik je je documenten?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">1️⃣</span>
              <span className="text-green-700">Upload hier al je schooldocumenten (schoolplan, beleid, etc.)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">2️⃣</span>
              <span className="text-green-700">Ga naar een module die je wilt leren</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">3️⃣</span>
              <span className="text-green-700">Start AI-begeleiding - documenten worden automatisch geanalyseerd</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">4️⃣</span>
              <span className="text-green-700">Krijg gepersonaliseerde antwoorden op basis van jouw school</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">5️⃣</span>
              <span className="text-green-700">Beheer je documenten hier: bekijk, verwijder, voeg toe</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">6️⃣</span>
              <span className="text-green-700">Koppel theorie aan jouw specifieke schoolsituatie</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>🎯 Voorbeeld:</strong> Upload je schoolplan → Ga naar module "Burgerschap" → AI analyseert automatisch hoe jullie burgerschap vormgeven!
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