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

interface PersistentDocumentPanelProps {
  onDocumentsChange?: (documents: UploadedDocument[]) => void
  currentModule?: string
}

export default function PersistentDocumentPanel({ onDocumentsChange, currentModule }: PersistentDocumentPanelProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showUploadArea, setShowUploadArea] = useState(false)

  // Load documents from localStorage on mount
  useEffect(() => {
    const loadDocuments = () => {
      try {
        const savedDocs = localStorage.getItem('pabo-documents')
        if (savedDocs) {
          const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
            ...doc,
            uploadDate: new Date(doc.uploadDate)
          }))
          setDocuments(parsedDocs)
          onDocumentsChange?.(parsedDocs)
        }
      } catch (error) {
        console.error('Error loading documents:', error)
        localStorage.removeItem('pabo-documents')
      }
    }

    loadDocuments()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pabo-documents') {
        loadDocuments()
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [onDocumentsChange])

  // Save documents to localStorage
  useEffect(() => {
    try {
      if (documents.length > 0) {
        localStorage.setItem('pabo-documents', JSON.stringify(documents))
      } else {
        localStorage.removeItem('pabo-documents')
      }
      onDocumentsChange?.(documents)
      
      // Dispatch event for other components
      const event = new CustomEvent('documentUploaded', { 
        detail: { documents, count: documents.length } 
      })
      if (typeof window !== 'undefined') {
        window.dispatchEvent(event)
      }
    } catch (error) {
      console.error('Error saving documents:', error)
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

      setDocuments(prev => [...prev, newDocument])
      event.target.value = ''
      setShowUploadArea(false)
      
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
        setDocuments(prev => prev.filter(doc => doc.id !== documentId))
        console.log('Document deleted successfully from PersistentDocumentPanel')
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('❌ Fout bij verwijderen van document. Probeer het opnieuw.')
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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header - Always Visible */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl">📚</span>
            <div>
              <h3 className="font-semibold text-gray-800">Mijn Schooldocumenten</h3>
              <p className="text-sm text-gray-600">
                {documents.length > 0 ? `${documents.length} document(en) beschikbaar` : 'Geen documenten geüpload'}
                {currentModule && documents.length > 0 && (
                  <span className="text-green-600 ml-2">• Actief voor {currentModule}</span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Quick Upload Button */}
            <button
              onClick={() => setShowUploadArea(!showUploadArea)}
              disabled={isUploading}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isUploading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isUploading ? '⏳' : '📤'} Upload
            </button>
            
            {/* Expand/Collapse Button */}
            {documents.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                {isExpanded ? '🔼 Inklappen' : '🔽 Bekijk alle'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Upload Area */}
      {showUploadArea && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl">📁</div>
              <p className="text-sm font-medium text-gray-700">
                Sleep document hier of klik om te uploaden
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOCX, TXT • Max 10MB
              </p>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="quick-document-upload"
              />
              <label
                htmlFor="quick-document-upload"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white transition-colors cursor-pointer ${
                  isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isUploading ? 'Uploaden...' : '📤 Selecteer Bestand'}
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="p-4">
          {/* Compact View - First 2 documents */}
          {!isExpanded && (
            <div className="space-y-2">
              {documents.slice(0, 2).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className="text-lg">{getDocumentIcon(doc.detectedType)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{doc.fileName}</p>
                      <p className="text-xs text-gray-500">{doc.detectedType}</p>
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
              ))}
              {documents.length > 2 && (
                <div className="text-center py-2">
                  <span className="text-sm text-gray-500">
                    +{documents.length - 2} meer document(en)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Expanded View - All documents */}
          {isExpanded && (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-2xl">{getDocumentIcon(doc.detectedType)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{doc.fileName}</h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                          <span>📄 {doc.fileType}</span>
                          <span>🎯 {doc.detectedType}</span>
                          <span>📝 {doc.wordCount.toLocaleString()} woorden</span>
                          <span>📅 {doc.uploadDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✅ Actief
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteDocument(doc.id)
                        }}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Module Context Info */}
          {currentModule && documents.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>💡 AI-analyse actief:</strong> Je documenten worden automatisch geanalyseerd voor de module "{currentModule}" 
                om gepersonaliseerde begeleiding te geven.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {documents.length === 0 && !showUploadArea && (
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">📚</div>
          <p className="text-gray-600 text-sm mb-3">
            Upload je schooldocumenten voor gepersonaliseerde AI-begeleiding
          </p>
          <button
            onClick={() => setShowUploadArea(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            📤 Upload Eerste Document
          </button>
        </div>
      )}
    </div>
  )
}