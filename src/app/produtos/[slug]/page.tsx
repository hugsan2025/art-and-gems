'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useAnalytics } from '@/hooks/useAnalytics'
import { AnalyticsType } from '@/types/analytics'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent(AnalyticsType.PAGE_VIEW)
  }, [trackEvent])

  const handleClick = () => {
    trackEvent(AnalyticsType.CLICK)
  }

  const handlePurchase = () => {
    trackEvent(AnalyticsType.PURCHASE)
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/placeholder.jpg"
              alt="Produto"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{params.slug}</h1>
            <p className="text-gray-600 mb-6">
              Descrição do produto...
            </p>
            <div className="space-y-4">
              <button
                onClick={handleClick}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg"
              >
                Ver Detalhes
              </button>
              <button
                onClick={handlePurchase}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 