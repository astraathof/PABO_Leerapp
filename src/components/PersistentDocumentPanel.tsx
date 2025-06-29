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
  mimeType?: string
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
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [hoveredDocument, setHoveredDocument] = useState<string | null>(null)

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
  }, [onDocumentsChange])

  // Save documents to localStorage
  useEffect(() => {
    try {
      if (documents.length > 0) {
        localStorage.setItem('pabo-documents', JSON.stringify(documents))
      } else {
        // If no documents, remove from localStorage
        localStorage.removeItem('pabo-documents')
      }
      
      onDocumentsChange?.(documents)
      
      // Dispatch custom event to notify other components
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
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        setUploadError(errorData.error || 'Upload failed')
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
        uploadDate: new Date(),
        mimeType: result.mimeType
      }

      // Update documents state
      setDocuments(prev => {
        const updated = [...prev, newDocument]
        return updated
      })
      
      // Reset file input
      event.target.value = ''
      
      // Hide upload area
      setShowUploadArea(false)
      
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error instanceof Error ? error.message : 'Onbekende fout bij uploaden')
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
        // Update state
        setDocuments(prev => {
          const updated = prev.filter(doc => doc.id !== documentId)
          return updated
        })
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('❌ Fout bij verwijderen van document. Probeer het opnieuw.')
    }
  }

  const getDocumentIcon = (detectedType: string, mimeType?: string) => {
    if (mimeType?.startsWith('image/')) return '🖼️'
    if (detectedType.includes('Schoolplan') || detectedType.includes('Schoolgids')) return '🏫'
    if (detectedType.includes('Curriculum')) return '📚'
    if (detectedType.includes('Observatie')) return '👁️'
    if (detectedType.includes('Resultaten')) return '📊'
    if (detectedType.includes('Burgerschap')) return '🤝'
    if (detectedType.includes('Visueel')) return '🖼️'
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
                {documents.length > 0 ? `${documents.length} document(en) inhoudelijk geanalyseerd` : 'Geen documenten geüpload'}
                {currentModule && documents.length > 0 && (
                  <span className="text-green-600 ml-2">• Actief voor {currentModule}</span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Quick Upload Button */}
            <div className="group relative">
              <button
                onClick={() => setShowUploadArea(!showUploadArea)}
                disabled={isUploading}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isUploading 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isUploading ? '⏳ Bezig...' : '📤 Upload'}
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                Upload een schooldocument voor AI-analyse
              </div>
            </div>
            
            {/* Expand/Collapse Button */}
            {documents.length > 0 && (
              <div className="group relative">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  {isExpanded ? '🔼 Inklappen' : '🔽 Bekijk alle'}
                </button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  {isExpanded ? "Verberg documenten" : "Toon alle documenten"}
                </div>
              </div>
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
                PDF, DOCX, TXT, JPG, PNG, GIF, WebP • Max 10MB
              </p>
              <input
                type="file"
                accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
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
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploaden & Analyseren...
                  </>
                ) : '📤 Selecteer Bestand'}
              </label>
              
              {/* Upload Error Message */}
              {uploadError && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200 text-red-700 text-xs">
                  <strong>❌ Fout:</strong> {uploadError}
                </div>
              )}
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
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border hover:bg-gray-100 transition-colors group"
                  onMouseEnter={() => setHoveredDocument(doc.id)}
                  onMouseLeave={() => setHoveredDocument(null)}
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className="text-lg">{getDocumentIcon(doc.detectedType, doc.mimeType)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{doc.fileName}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">{doc.detectedType}</p>
                        {doc.mimeType?.startsWith('image/') && (
                          <span className="text-xs text-purple-600">🔍 AI Vision</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    <div className="font-medium">{doc.fileName}</div>
                    <div className="text-gray-300">{doc.wordCount} woorden • {doc.detectedType}</div>
                    <div className="text-gray-300">Geüpload op {doc.uploadDate.toLocaleDateString()}</div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteDocument(doc.id)
                    }}
                    className={`p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors ${
                      hoveredDocument === doc.id ? 'opacity-100' : 'opacity-0'
                    }`}
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
                <div 
                  key={doc.id} 
                  className="border border-gray-200 rounded-lg p-3 bg-gradient-to-r from-green-50 to-blue-50 hover:shadow-md transition-all group"
                  onMouseEnter={() => setHoveredDocument(doc.id)}
                  onMouseLeave={() => setHoveredDocument(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-2xl">{getDocumentIcon(doc.detectedType, doc.mimeType)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{doc.fileName}</h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                          <span>📄 {doc.fileType}</span>
                          <span>🎯 {doc.detectedType}</span>
                          <span>📝 {doc.wordCount.toLocaleString()} woorden</span>
                          <span>📅 {doc.uploadDate.toLocaleDateString()}</span>
                          {doc.mimeType?.startsWith('image/') && (
                            <span className="text-purple-600">🔍 AI Vision</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-2 top-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      <div className="font-medium">{doc.fileName}</div>
                      <div className="text-gray-300">Inhoudelijk geanalyseerd met AI</div>
                      <div className="text-gray-300">Beschikbaar voor alle modules</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✅ Geanalyseerd
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteDocument(doc.id)
                        }}
                        className={`px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs ${
                          hoveredDocument === doc.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        title="Verwijder document"
                      >
                        🗑️ Verwijder
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
                <strong>💡 AI-analyse actief:</strong> Je documenten zijn inhoudelijk geanalyseerd en worden gebruikt voor de module "{currentModule}" 
                om gepersonaliseerde begeleiding te geven.
                {documents.some(doc => doc.mimeType?.startsWith('image/')) && (
                  <span className="block mt-1">
                    <strong>🔍 AI Vision:</strong> Afbeeldingen zijn geanalyseerd met Gemini Vision AI.
                  </span>
                )}
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
          <p className="text-xs text-gray-500 mb-3">
            Ondersteunt: PDF, Word, afbeeldingen en meer
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