'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  type: 'image' | 'video'
  url: string
  description?: string
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/api/content?section=gallery')
        const data = await response.json()
        
        if (data.success) {
          setItems(data.data)
        }
      } catch (error) {
        console.error('Erro ao carregar galeria:', error)
        setError('Erro ao carregar imagens')
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Carregando galeria...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>
  }

  if (items.length === 0) {
    return <div className="text-center py-8">Nenhuma imagem na galeria</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id} className="relative aspect-square">
          {item.type === 'image' ? (
            <Image
              src={item.url}
              alt={item.description || 'Imagem da galeria'}
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <video
              src={item.url}
              controls
              className="w-full h-full rounded-lg object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
} 