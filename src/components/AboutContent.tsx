'use client'

import { useState, useEffect } from 'react'

interface Content {
  id: string
  type: 'image' | 'video'
  url: string
  description?: string
}

export default function AboutContent() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/admin/content')
        const json = await response.json()
        setContents(json.data || [])
      } catch (error) {
        console.error('Erro ao buscar conteúdos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [])

  if (loading) return null

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {contents.map(content => (
        <div key={content.id} className="space-y-4">
          {content.type === 'image' ? (
            <img
              src={content.url}
              alt={content.description || ''}
              className="w-full h-64 object-cover rounded-lg"
            />
          ) : (
            <video
              src={content.url}
              controls
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          {content.description && (
            <p className="text-gray-600">{content.description}</p>
          )}
        </div>
      ))}
    </div>
  )
} 