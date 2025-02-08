'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Order {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch('/api/admin/recent-orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Erro ao buscar pedidos recentes:', error)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Pedido</th>
            <th className="text-left py-3">Cliente</th>
            <th className="text-left py-3">Data</th>
            <th className="text-left py-3">Status</th>
            <th className="text-right py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3">#{order.id.slice(-6)}</td>
              <td className="py-3">{order.customerName}</td>
              <td className="py-3">
                {format(new Date(order.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded text-sm ${
                  order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status === 'COMPLETED' ? 'Concluído' :
                   order.status === 'PENDING' ? 'Pendente' :
                   'Cancelado'}
                </span>
              </td>
              <td className="py-3 text-right">R$ {order.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 