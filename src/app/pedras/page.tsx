'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Product } from '@/types'
import Image from 'next/image'

const gemCategories = [
  { id: 'todas', name: 'Todas' },
  { id: 'CITRINE', name: 'Citrinos' },
  { id: 'EMERALD', name: 'Esmeralda' },
  { id: 'RUBY', name: 'Rubi' },
  { id: 'KUNZITE', name: 'Kunzita' },
  { id: 'SAPPHIRE', name: 'Safira' },
  { id: 'OPAL', name: 'Opala' },
  { id: 'GARNET', name: 'Granada' }
]

export default function PedrasPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'todas'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const filteredProducts = category === 'todas'
    ? products
    : products.filter(product => product.gemFamily === category)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-8 text-center">
        Pedras Preciosas
      </h1>

      {/* Categorias */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {gemCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/pedras${cat.id === 'todas' ? '' : `?category=${cat.id}`}`}
            className={`px-4 py-2 rounded-full transition-colors ${
              category === cat.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-purple-100'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-purple-600 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-purple-600">
                  {new Intl.NumberFormat('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(product.price)}
                </span>
                <Link
                  href={`/pedras/${product.id}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Nenhuma pedra encontrada nesta categoria.
        </p>
      )}

      {/* Modal de Detalhes */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-purple-600">{selectedProduct.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedProduct.images[0] && (
                <div className="mb-6">
                  <Image
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-purple-600 mb-2">Descrição</h3>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-2">Detalhes</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-gray-500">Preço</dt>
                        <dd className="font-semibold">
                          {new Intl.NumberFormat('pt-PT', {
                            style: 'currency',
                            currency: 'EUR'
                          }).format(selectedProduct.price)}
                        </dd>
                      </div>
                      
                      {selectedProduct.gemFamily && (
                        <div>
                          <dt className="text-gray-500">Família</dt>
                          <dd className="font-semibold">{selectedProduct.gemFamily}</dd>
                        </div>
                      )}
                      
                      {selectedProduct.weight && (
                        <div>
                          <dt className="text-gray-500">Peso</dt>
                          <dd className="font-semibold">{selectedProduct.weight}g</dd>
                        </div>
                      )}
                      
                      {selectedProduct.origin && (
                        <div>
                          <dt className="text-gray-500">Origem</dt>
                          <dd className="font-semibold">{selectedProduct.origin}</dd>
                        </div>
                      )}
                      
                      {selectedProduct.color && (
                        <div>
                          <dt className="text-gray-500">Cor</dt>
                          <dd className="font-semibold">{selectedProduct.color}</dd>
                        </div>
                      )}
                      
                      {selectedProduct.clarity && (
                        <div>
                          <dt className="text-gray-500">Claridade</dt>
                          <dd className="font-semibold">{selectedProduct.clarity}</dd>
                        </div>
                      )}
                      
                      {selectedProduct.cut && (
                        <div>
                          <dt className="text-gray-500">Lapidação</dt>
                          <dd className="font-semibold">{selectedProduct.cut}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-2">Certificação</h3>
                    <p className="text-gray-600">
                      Todas as nossas pedras são certificadas e passam por rigoroso controle de qualidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {/* Adicionar lógica do carrinho aqui */}}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 