'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Product } from '@prisma/client'
import AddToCartButton from '@/components/AddToCartButton'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            {product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <div className="mb-4 text-gray-600 whitespace-pre-wrap">
                {product.description}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {new Intl.NumberFormat('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(product.price)}
                </span>
                <AddToCartButton product={product} />
              </div>
              <Link
                href={`/pedras/${product.id}`}
                className="mt-2 block text-center text-purple-600 hover:text-purple-700"
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 