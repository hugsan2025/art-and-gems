'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface TopProduct {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
}

export default function TopProducts() {
  const [products, setProducts] = useState<TopProduct[]>([])

  useEffect(() => {
    fetchTopProducts()
  }, [])

  const fetchTopProducts = async () => {
    try {
      const response = await fetch('/api/admin/top-products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Erro ao buscar produtos mais vendidos:', error)
    }
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.sales} vendas</p>
          </div>
          <p className="font-semibold">R$ {product.revenue.toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
} 