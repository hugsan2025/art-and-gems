'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadToCloudinary } from '@/lib/cloudinary'

interface ImageUploadProps {
  onUpload: (url: string) => void
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const result = await uploadToCloudinary(file)
      onUpload(result.secure_url)
    } catch (error) {
      console.error('Erro no upload:', error)
      setError('Erro ao fazer upload da imagem')
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
          accept="image/*"
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