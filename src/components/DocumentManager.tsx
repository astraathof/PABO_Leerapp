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
      const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
        ...doc,
        uploadDate: new Date(doc.uploadDate)
      }))
      setDocuments(parsedDocs)
      onDocumentsChange?.(parsedDocs)
    }
  }, [])

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    localStorage.setItem('pabo-documents', JSON.stringify(documents))
    onDocumentsChange?.(documents)
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
        throw new Error('Upload failed')
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
      
      // Reset file input
      event.target.value = ''
    } catch (error) {
      console.error('Upload error:', error)
      alert('Er is een fout opgetreden bij het uploaden van het document')
    } finally {
      setIsUploading(false)
    }
  }

  const deleteDocument = (documentId: string) => {
    if (confirm('Weet je zeker dat je dit document wilt verwijderen?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId))
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">📂 Geüploade Documenten ({documents.length})</h3>
          
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
                        {doc.text.substring(0, 500)}
                        {doc.text.length > 500 && '...'}
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
        <h3 className="text-lg font-bold text-green-800 mb-3">💡 Hoe gebruik je je documenten?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">1️⃣</span>
              <span className="text-green-700">Upload hier al je schooldocumenten</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">2️⃣</span>
              <span className="text-green-700">Ga naar een module die je wilt leren</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">3️⃣</span>
              <span className="text-green-700">Gebruik AI-begeleiding met jouw documenten</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">4️⃣</span>
              <span className="text-green-700">Koppel theorie aan jouw schoolpraktijk</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">5️⃣</span>
              <span className="text-green-700">Krijg gepersonaliseerde feedback</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">6️⃣</span>
              <span className="text-green-700">Ontwikkel je PABO-competenties</span>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {documents.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nog geen documenten geüpload</h3>
          <p className="text-gray-500 text-sm">
            Upload je eerste schooldocument om gepersonaliseerd te leren met AI-begeleiding
          </p>
        </div>
      )}
    </div>
  )
}