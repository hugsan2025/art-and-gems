'use client'

import { useCart } from '@/contexts/CartContext'
import { toast } from 'react-hot-toast'
import { Product } from '@/contexts/CartContext'
import Image from 'next/image'
import { useState } from 'react'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product)
      toast.success('Produto adicionado ao carrinho!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={selectedImage || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Miniaturas */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detalhes do Produto */}
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-purple-600 mb-4">{product.name}</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-purple-600 mb-2">Descrição</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-purple-600">Detalhes</h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-gray-500">Preço</dt>
                    <dd className="text-2xl font-bold text-purple-600">
                      {new Intl.NumberFormat('pt-PT', {
                        style: 'currency',
                        currency: 'EUR'
                      }).format(product.price)}
                    </dd>
                  </div>

                  {product.gemFamily && (
                    <div>
                      <dt className="text-gray-500">Família</dt>
                      <dd className="font-semibold">{product.gemFamily}</dd>
                    </div>
                  )}

                  {product.origin && (
                    <div>
                      <dt className="text-gray-500">Origem</dt>
                      <dd className="font-semibold">{product.origin}</dd>
                    </div>
                  )}

                  {product.color && (
                    <div>
                      <dt className="text-gray-500">Cor</dt>
                      <dd className="font-semibold">{product.color}</dd>
                    </div>
                  )}

                  {product.clarity && (
                    <div>
                      <dt className="text-gray-500">Claridade</dt>
                      <dd className="font-semibold">{product.clarity}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-colors font-semibold"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 