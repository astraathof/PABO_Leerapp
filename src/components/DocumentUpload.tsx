'use client'

import { useState } from 'react'

interface UploadedDocument {
  fileName: string
  fileType: string
  detectedType: string
  text: string
  wordCount: number
  uploadDate: Date
}

interface DocumentAnalysis {
  analysis: string
  analysisType: string
}

interface DocumentUploadProps {
  module: string
  onDocumentAnalyzed?: (analysis: DocumentAnalysis, document: UploadedDocument) => void
}

export default function DocumentUpload({ module, onDocumentAnalyzed }: DocumentUploadProps) {
  const [uploadedDocument, setUploadedDocument] = useState<UploadedDocument | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null)
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>('schoolplan-analyse')

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadedDocument(null)
    setAnalysis(null)

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
      
      const document: UploadedDocument = {
        fileName: result.fileName,
        fileType: result.fileType,
        detectedType: result.detectedType,
        text: result.text,
        wordCount: result.wordCount,
        uploadDate: new Date()
      }

      setUploadedDocument(document)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Er is een fout opgetreden bij het uploaden van het document')
    } finally {
      setIsUploading(false)
    }
  }

  const analyzeDocument = async (analysisType: string) => {
    if (!uploadedDocument) return

    setIsAnalyzing(true)
    setSelectedAnalysisType(analysisType)

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          documentText: uploadedDocument.text,
          documentType: uploadedDocument.detectedType,
          analysisType: analysisType,
          module: module
        })
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      const analysisResult: DocumentAnalysis = {
        analysis: result.analysis,
        analysisType: result.analysisType
      }

      setAnalysis(analysisResult)
      
      if (onDocumentAnalyzed) {
        onDocumentAnalyzed(analysisResult, uploadedDocument)
      }
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Er is een fout opgetreden bij het analyseren van het document')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analysisTypes = [
    {
      id: 'schoolplan-analyse',
      title: '🏫 Schoolplan Analyse',
      description: 'Analyseer visie, missie, onderwijskundige uitgangspunten en organisatie'
    },
    {
      id: 'curriculum-koppeling',
      title: '📚 Curriculum Koppeling',
      description: 'Koppel aan kerndoelen, leerlijnen en PABO-theorie'
    },
    {
      id: 'praktijk-reflectie',
      title: '🤔 Praktijk Reflectie',
      description: 'Reflecteer op de praktijk met socratische begeleiding'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📄 Upload Schooldocument</h3>
        
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🏫', title: 'Schoolplan', desc: 'Visie, missie, doelen' },
            { icon: '📖', title: 'Schoolgids', desc: 'Praktische informatie' },
            { icon: '📋', title: 'Beleidsdocumenten', desc: 'Procedures, protocollen' },
            { icon: '📊', title: 'Resultatenrapportages', desc: 'Cito, LVS data' },
            { icon: '🎯', title: 'Jaarplanningen', desc: 'Curriculum, leerlijnen' },
            { icon: '👥', title: 'Observatieformulieren', desc: 'Lesobservatie, feedback' }
          ].map((type, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{type.icon}</span>
                <div>
                  <p className="font-medium text-blue-800 text-sm">{type.title}</p>
                  <p className="text-blue-600 text-xs">{type.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Document Info */}
      {uploadedDocument && (
        <div className="bg-green-50 rounded-xl shadow-lg p-6 border border-green-200">
          <h3 className="text-lg font-bold text-green-800 mb-4">✅ Document Geüpload</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-green-700">📄 Bestand:</span>
                <span className="text-green-800">{uploadedDocument.fileName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-green-700">📊 Type:</span>
                <span className="text-green-800">{uploadedDocument.fileType}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-green-700">🎯 Gedetecteerd:</span>
                <span className="text-green-800">{uploadedDocument.detectedType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-green-700">📝 Woorden:</span>
                <span className="text-green-800">{uploadedDocument.wordCount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Analysis Type Selector */}
          <div className="space-y-4">
            <h4 className="font-semibold text-green-800">🔍 Kies Analyse Type:</h4>
            <div className="grid gap-3">
              {analysisTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => analyzeDocument(type.id)}
                  disabled={isAnalyzing}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedAnalysisType === type.id && analysis
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-800">{type.title}</h5>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {isAnalyzing && selectedAnalysisType === type.id ? (
                      <div className="text-blue-600">⏳</div>
                    ) : (
                      <div className="text-blue-600">→</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🧠 AI Analyse: {analysisTypes.find(t => t.id === analysis.analysisType)?.title}
          </h3>
          
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {analysis.analysis}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setAnalysis(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              🔄 Nieuwe Analyse
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(analysis.analysis)
                alert('Analyse gekopieerd naar klembord!')
              }}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              📋 Kopieer Analyse
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-800 mb-3">💡 Tips voor Document Analyse</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-purple-700">Upload het meest recente schoolplan voor actuele informatie</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-purple-700">Vergelijk verschillende scholen om patronen te herkennen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-purple-700">Koppel de analyse aan je PABO-modules voor dieper begrip</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-purple-700">Gebruik de analyse als basis voor reflectiegesprekken</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-purple-700">Stel kritische vragen bij wat je leest</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-purple-700">Denk na over praktische implementatie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}