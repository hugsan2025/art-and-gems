'use client'

import { useCart } from '@/contexts/CartContext'
import { toast } from 'react-hot-toast'
import { Product } from '@prisma/client'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product)
      toast.success('Produto adicionado ao carrinho!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Imagem do Produto */}
          <div className="md:flex-shrink-0 md:w-1/2">
            {product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
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