'use client'

import { useState, useRef } from 'react'

interface UploadedFile {
  id: string
  file: File
  type: 'image' | 'audio' | 'document' | 'video'
  preview?: string
  transcription?: string
  analysis?: string
}

interface MultiModalUploadProps {
  onFilesChange: (files: UploadedFile[]) => void
  maxFiles?: number
}

export default function MultiModalUpload({ onFilesChange, maxFiles = 5 }: MultiModalUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileType = (file: File): 'image' | 'audio' | 'document' | 'video' => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('audio/')) return 'audio'
    if (file.type.startsWith('video/')) return 'video'
    return 'document'
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️'
      case 'audio': return '🎵'
      case 'video': return '🎥'
      case 'document': return '📄'
      default: return '📎'
    }
  }

  const handleFileSelect = async (files: FileList) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`Maximaal ${maxFiles} bestanden toegestaan`)
      return
    }

    setIsProcessing(true)
    const newFiles: UploadedFile[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileType = getFileType(file)
      
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + i,
        file,
        type: fileType
      }

      // Generate preview for images
      if (fileType === 'image') {
        uploadedFile.preview = await createImagePreview(file)
      }

      // Process audio files
      if (fileType === 'audio') {
        try {
          uploadedFile.transcription = await transcribeAudio(file)
        } catch (error) {
          console.error('Audio transcription failed:', error)
        }
      }

      newFiles.push(uploadedFile)
    }

    const updatedFiles = [...uploadedFiles, ...newFiles]
    setUploadedFiles(updatedFiles)
    onFilesChange(updatedFiles)
    setIsProcessing(false)
  }

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
  }

  const transcribeAudio = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('audio', file)

    const response = await fetch('/api/transcribe-audio', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Transcription failed')
    }

    const result = await response.json()
    return result.transcription
  }

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId)
    setUploadedFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-3">
          <div className="text-4xl">📎</div>
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Sleep bestanden hier of klik om te uploaden
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Ondersteund: Afbeeldingen, Audio, Video, Documenten
            </p>
            <p className="text-xs text-gray-400">
              Maximaal {maxFiles} bestanden • Max 25MB per bestand
            </p>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,audio/*,video/*,.pdf,.docx,.txt"
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-blue-700">Bestanden verwerken...</span>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">📎 Geüploade bestanden ({uploadedFiles.length}/{maxFiles})</h4>
          
          <div className="grid gap-3">
            {uploadedFiles.map((uploadedFile) => (
              <div key={uploadedFile.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getFileIcon(uploadedFile.type)}</span>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-800 truncate">{uploadedFile.file.name}</h5>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>{uploadedFile.type}</span>
                        <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                      
                      {/* Image Preview */}
                      {uploadedFile.type === 'image' && uploadedFile.preview && (
                        <img 
                          src={uploadedFile.preview} 
                          alt="Preview" 
                          className="mt-2 w-20 h-20 object-cover rounded border"
                        />
                      )}
                      
                      {/* Audio Transcription */}
                      {uploadedFile.type === 'audio' && uploadedFile.transcription && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                          <p className="text-xs font-medium text-blue-700 mb-1">🎙️ Transcriptie:</p>
                          <p className="text-sm text-blue-800">{uploadedFile.transcription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="ml-3 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Type Guide */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-700 mb-3">💡 Wat kun je uploaden?</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <span>🖼️</span>
            <span className="text-gray-600">Afbeeldingen voor analyse</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🎵</span>
            <span className="text-gray-600">Audio voor transcriptie</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🎥</span>
            <span className="text-gray-600">Video's voor analyse</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📄</span>
            <span className="text-gray-600">Documenten voor tekst</span>
          </div>
        </div>
      </div>
    </div>
  )
}