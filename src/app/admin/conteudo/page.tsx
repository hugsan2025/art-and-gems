'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import ContentUploadModal from '@/components/admin/ContentUploadModal'

interface Content {
  id: string
  type: string
  url: string
  description: string | null
  section: string
  createdAt: string
  updatedAt: string
}

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      if (data.success) {
        setContents(data.data)
      }
    } catch (error) {
      console.error('Erro ao buscar conteúdos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContents()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este conteúdo?')) {
      try {
        const response = await fetch(`/api/admin/content/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          setContents(contents.filter(content => content.id !== id))
        }
      } catch (error) {
        console.error('Erro ao excluir conteúdo:', error)
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Conteúdo</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Conteúdo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => (
          <div key={content.id} className="bg-white rounded-lg shadow p-4">
            <div className="relative aspect-video mb-4">
              {content.type === 'image' ? (
                <Image
                  src={content.url}
                  alt={content.description || ''}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <video
                  src={content.url}
                  controls
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{content.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {content.section}
              </span>
              <button
                onClick={() => handleDelete(content.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ContentUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={fetchContents}
      />
    </div>
  )
} 