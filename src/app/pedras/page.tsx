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

interface FilterState {
  weight: string[]
  clarity: string[]
  cut: string[]
}

export default function PedrasPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<FilterState>({
    weight: [],
    clarity: [],
    cut: []
  })
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'todas'
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?category=stones')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const applyFilters = () => {
    let filtered = products

    if (filters.weight.length > 0) {
      filtered = filtered.filter(product => 
        product.weight && filters.weight.includes(product.weight.toString())
      )
    }

    if (filters.clarity.length > 0) {
      filtered = filtered.filter(product => 
        product.clarity && filters.clarity.includes(product.clarity)
      )
    }

    if (filters.cut.length > 0) {
      filtered = filtered.filter(product => 
        product.cut && filters.cut.includes(product.cut)
      )
    }

    setFilteredProducts(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[type]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      
      return {
        ...prev,
        [type]: updated
      }
    })
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-600">Erro: {error}</div>
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

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peso (ct)
          </label>
          <select
            value={filters.weight.join(',')}
            onChange={(e) => toggleFilter('weight', e.target.value)}
            className="w-full rounded-md border-gray-300"
          >
            <option value="all">Todos</option>
            {Array.from(new Set(products.map(p => p.weight))).sort().map(weight => (
              <option key={weight} value={weight?.toString()}>
                {weight} ct
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Claridade
          </label>
          <select
            value={filters.clarity.join(',')}
            onChange={(e) => toggleFilter('clarity', e.target.value)}
            className="w-full rounded-md border-gray-300"
          >
            <option value="all">Todas</option>
            {Array.from(new Set(products.map(p => p.clarity))).sort().map(clarity => (
              <option key={clarity} value={clarity}>
                {clarity}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lapidação
          </label>
          <select
            value={filters.cut.join(',')}
            onChange={(e) => toggleFilter('cut', e.target.value)}
            className="w-full rounded-md border-gray-300"
          >
            <option value="all">Todas</option>
            {Array.from(new Set(products.map(p => p.cut))).sort().map(cut => (
              <option key={cut} value={cut}>
                {cut}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="border rounded-lg p-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                  priority
                />
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
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