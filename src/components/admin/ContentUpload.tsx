'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadToCloudinary } from '@/lib/cloudinary'

interface ContentUploadProps {
  onUploadComplete: (url: string) => void
  section?: string
}

export default function ContentUpload({ onUploadComplete, section = 'about' }: ContentUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      // Upload para o Cloudinary
      const result = await uploadToCloudinary(file)

      // Salvar no banco de dados
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', file.type.startsWith('video/') ? 'video' : 'image')
      formData.append('section', section)
      formData.append('url', result.secure_url)

      const response = await fetch('/api/admin/content/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Erro ao salvar conteúdo')

      const data = await response.json()
      onUploadComplete(data.data.url)
    } catch (error) {
      console.error('Erro no upload:', error)
      setError('Erro ao fazer upload do arquivo')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${uploading ? 'text-gray-400 animate-pulse' : 'text-gray-500'}`} />
          <p className="text-sm text-gray-500">
            {uploading ? 'Enviando...' : 'Clique para fazer upload'}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={handleUpload}
          accept="image/*,video/*"
          disabled={uploading}
        />
      </label>

      {error && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-red-100 text-red-600 text-sm rounded-b-lg">
          {error}
          <button
            onClick={() => setError('')}
            className="absolute right-2 top-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
} 