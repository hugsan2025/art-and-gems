'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  type: string
  createdAt: string
  category: {
    name: string
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const json = await response.json()
      setProducts(json.data || [])
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      setError('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
      } else {
        throw new Error('Erro ao excluir produto')
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
      alert('Erro ao excluir produto')
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Imagem</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Categoria</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Preço</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Data</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">
                  {product.category?.name || 'Sem categoria'}
                </td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(product.price)}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(product.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/produtos/${product.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Pencil className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 