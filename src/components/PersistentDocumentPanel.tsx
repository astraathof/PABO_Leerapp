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
  const [isExpanded, setIsExpanded] = useState(true) // Default to expanded (list view)
  const [showUploadArea, setShowUploadArea] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [hoveredDocument, setHoveredDocument] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

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

    console.log('Starting file upload for:', file.name, 'Type:', file.type)
    setIsUploading(true)
    setUploadError(null)

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
        setUploadError(errorData.error || 'Upload failed')
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
        uploadDate: new Date(),
        mimeType: result.mimeType
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
      
      // Hide upload area
      setShowUploadArea(false)
      
      console.log('Upload process completed successfully')
      
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error instanceof Error ? error.message : 'Onbekende fout bij uploaden')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
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
      
      setDocuments(prev => [...prev, newDocument])
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
        console.log('Deleting document:', documentId)
        
        // Update state
        setDocuments(prev => {
          const updated = prev.filter(doc => doc.id !== documentId)
          console.log('Documents after deletion:', updated)
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

  const navigateToDocuments = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/documenten'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header with improved document management options */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📚</div>
            <div>
              <h3 className="font-semibold text-gray-800">Mijn Schooldocumenten</h3>
              <div className="flex items-center text-sm">
                <span className="text-gray-600 mr-2">
                  {documents.length} document{documents.length !== 1 ? 'en' : ''} geanalyseerd
                </span>
                {currentModule && documents.length > 0 && (
                  <span className="text-green-600 flex items-center">
                    • <span className="inline-flex items-center ml-1">Actief voor {currentModule}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Document Management Buttons */}
            <a
              href="/documenten"
              onClick={(e) => {
                e.preventDefault();
                navigateToDocuments();
              }}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center space-x-1"
            >
              <span className="text-blue-700">📂</span>
              <span>Beheer</span>
            </a>
            
            {/* Upload Button - Clearly a button */}
            <button
              onClick={() => setShowUploadArea(!showUploadArea)}
              disabled={isUploading}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                isUploading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <span>{isUploading ? '⏳' : '📤'}</span>
              <span>{isUploading ? 'Bezig...' : 'Upload'}</span>
            </button>
            
            {/* View Toggle Button */}
            {documents.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center space-x-1"
                aria-label={isExpanded ? "Compact weergave" : "Uitgebreide weergave"}
              >
                <span>{isExpanded ? '🔼' : '🔽'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Upload Area */}
      {showUploadArea && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div 
            className={`border-2 ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-dashed border-blue-300'} rounded-lg p-4 text-center hover:border-blue-400 transition-colors`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="space-y-3">
              <div className="text-3xl">{isDragging ? '📥' : '📁'}</div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {isDragging ? 'Laat los om te uploaden' : 'Sleep je document hier of klik om te uploaden'}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Ondersteunde formaten: PDF, DOCX, TXT, JPG, PNG, GIF, WebP (max 10MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className={`inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    isUploading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  } transition-colors`}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploaden & Analyseren...
                    </>
                  ) : (
                    <>📤 Selecteer Document</>
                  )}
                </label>
              </div>
              
              {/* Upload Error Message */}
              {uploadError && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200 text-red-700 text-xs">
                  <strong>❌ Fout bij uploaden:</strong> {uploadError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Documents List - Default to List View */}
      {documents.length > 0 && (
        <div className="p-4">
          {/* List View (Default) */}
          {isExpanded && (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div 
                  key={doc.id} 
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all bg-gradient-to-r from-green-50 to-blue-50"
                  onMouseEnter={() => setHoveredDocument(doc.id)}
                  onMouseLeave={() => setHoveredDocument(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-2xl">{getDocumentIcon(doc.detectedType, doc.mimeType)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">{doc.fileName}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">📄 {doc.fileType}</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">🎯 {doc.detectedType}</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">📝 {doc.wordCount.toLocaleString()} woorden</span>
                          {doc.mimeType?.startsWith('image/') && (
                            <span className="bg-purple-100 px-2 py-0.5 rounded-full text-xs text-purple-600">🔍 AI Vision</span>
                          )}
                        </div>
                      </div>
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
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        aria-label="Verwijder document"
                      >
                        🗑️ Verwijder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compact View */}
          {!isExpanded && (
            <div className="space-y-2">
              {documents.slice(0, 3).map((doc) => (
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border hover:bg-gray-100 transition-colors"
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
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteDocument(doc.id)
                    }}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                    title="Verwijder document"
                    aria-label="Verwijder document"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              {documents.length > 3 && (
                <div className="text-center py-2">
                  <span className="text-sm text-gray-500">
                    +{documents.length - 3} meer document(en)
                  </span>
                </div>
              )}
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

      {/* Empty State - Clear Call to Action */}
      {documents.length === 0 && !showUploadArea && (
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">📚</div>
          <p className="text-gray-600 text-sm mb-3">
            Upload je schooldocumenten voor gepersonaliseerde AI-begeleiding
          </p>
          <div className="flex justify-center space-x-3">
            <a
              href="/documenten"
              onClick={(e) => {
                e.preventDefault();
                navigateToDocuments();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
            >
              <span>📂</span>
              <span>Beheer Documenten</span>
            </a>
            <button
              onClick={() => setShowUploadArea(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-1"
            >
              <span>📤</span>
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}