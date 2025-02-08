'use client'

import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Order, OrderItem } from '@/types'
import { useRouter } from 'next/navigation'

interface OrderDetailsProps {
  params: {
    id: string
  }
}

interface OrderWithItems extends Order {
  items: OrderItem[]
}

const statusOptions = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'PAID', label: 'Pago' },
  { value: 'COMPLETED', label: 'Concluído' },
  { value: 'CANCELLED', label: 'Cancelado' }
]

export default function OrderDetails({ params }: OrderDetailsProps) {
  const router = useRouter()
  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch order')
      }
      const data = await response.json()
      setOrder(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedOrder = await response.json()
        setOrder(updatedOrder)
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  if (loading) {
    return <div className="p-4">Carregando...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">Erro: {error}</div>
  }

  if (!order) {
    return <div className="p-4">Pedido não encontrado</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Detalhes do Pedido</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">ID do Pedido</p>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="font-semibold">{order.status}</p>
          </div>
          <div>
            <p className="text-gray-600">Data</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Endereço de Entrega</p>
            <p className="font-semibold">{order.shippingAddress || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Itens do Pedido</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item: OrderItem) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-right">
          <p className="text-xl font-bold">
            Total: {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(order.total)}
          </p>
        </div>
      </div>
    </div>
  )
} 