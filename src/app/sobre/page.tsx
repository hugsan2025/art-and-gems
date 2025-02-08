'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Shield, Award, GraduationCap, Users } from 'lucide-react'
import TrustBadges from '@/components/TrustBadges'

interface Content {
  id: string
  type: 'image' | 'video'
  url: string
  description?: string
}

export default function AboutPage() {
  const [contents, setContents] = useState<Content[]>([])

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/admin/content')
        const data = await response.json()
        if (data.data) {
          setContents(data.data)
        }
      } catch (error) {
        console.error('Erro ao carregar conteúdo:', error)
      }
    }

    fetchContents()
  }, [])

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Sobre a Art & Gems</h1>
        
        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="Nossa História"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-16">
          <p className="mb-6">
            A Art & Gems nasceu da paixão por pedras preciosas e da arte da lapidação.
            Nossa missão é compartilhar conhecimento e oferecer as mais belas pedras
            preciosas do Brasil e do mundo.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Nossa Missão</h2>
          <p className="mb-6">
            Buscamos democratizar o acesso ao conhecimento sobre pedras preciosas
            e formar novos profissionais através de nossos cursos especializados.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Compromisso com Qualidade</h2>
          <p className="mb-6">
            Todas as nossas pedras são criteriosamente selecionadas e certificadas,
            garantindo a mais alta qualidade aos nossos clientes.
          </p>
        </div>

        {/* Símbolos de Confiança */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Por que nos escolher?</h2>
          <TrustBadges />
        </div>

        {/* Galeria de Conteúdo */}
        {contents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa Galeria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contents.map((content) => (
                <div key={content.id} className="rounded-lg overflow-hidden shadow-lg">
                  {content.type === 'image' ? (
                    <div className="relative h-64">
                      <Image
                        src={content.url}
                        alt={content.description || 'Imagem da Art & Gems'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <video
                      src={content.url}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  )}
                  {content.description && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-600">{content.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 