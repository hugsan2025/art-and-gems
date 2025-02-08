'use client'

import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { uploadToCloudinary } from '@/lib/cloudinary'

interface ContentUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: () => void
}

export default function ContentUploadModal({ isOpen, onClose, onUploadComplete }: ContentUploadModalProps) {
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [section, setSection] = useState('about')

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', file.type.startsWith('image/') ? 'image' : 'video')
      formData.append('description', description)
      formData.append('section', section)

      const response = await fetch('/api/admin/content/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        onUploadComplete()
        onClose()
      }
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setUploading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Adicionar Conteúdo</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Arquivo (Imagem ou Vídeo)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Seção
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="about">Sobre</option>
              <option value="gallery">Galeria</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
} 