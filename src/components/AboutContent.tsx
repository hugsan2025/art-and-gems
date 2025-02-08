'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
        const response = await fetch('/api/content?section=about')
        const json = await response.json()
        if (json.success) {
          setContents(json.data)
        }
      } catch (error) {
        console.error('Erro ao buscar conteúdos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {contents.map(content => (
        <div key={content.id} className="space-y-4">
          {content.type === 'image' ? (
            <div className="relative aspect-video">
              <Image
                src={content.url}
                alt={content.description || 'Imagem sobre a Art And Gems'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg shadow-lg"
                priority={contents.indexOf(content) < 2}
              />
            </div>
          ) : (
            <video
              src={content.url}
              controls
              className="w-full aspect-video rounded-lg shadow-lg"
            />
          )}
          {content.description && (
            <p className="text-gray-600 text-sm">{content.description}</p>
          )}
        </div>
      ))}
    </div>
  )
} 