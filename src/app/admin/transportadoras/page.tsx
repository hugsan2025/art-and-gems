'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Carrier } from '@/types'

export default function CarriersAdmin() {
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCarriers()
  }, [])

  const fetchCarriers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/carriers')
      if (!response.ok) {
        throw new Error('Failed to fetch carriers')
      }
      const data = await response.json()
      setCarriers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (carrierId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transportadora?')) {
      return
    }

    try {
      const response = await fetch(`/api/carriers/${carrierId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete carrier')
      }

      setCarriers(carriers.filter(carrier => carrier.id !== carrierId))
    } catch (err) {
      console.error('Error deleting carrier:', err)
      alert('Erro ao excluir transportadora')
    }
  }

  if (loading) {
    return <div className="p-4">Carregando...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">Erro: {error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Transportadoras</h1>
        <Link 
          href="/admin/transportadoras/nova" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nova Transportadora
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carriers.map((carrier) => (
              <tr key={carrier.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {carrier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {carrier.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {carrier.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/transportadoras/${carrier.id}/editar`}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/admin/transportadoras/${carrier.id}/zonas`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Zonas
                  </Link>
                  <button
                    onClick={() => handleDelete(carrier.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 