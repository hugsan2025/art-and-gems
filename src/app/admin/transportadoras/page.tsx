'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Carrier {
  id: string
  name: string
  nif: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  active: boolean
}

export default function CarriersPage() {
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCarriers()
  }, [])

  const fetchCarriers = async () => {
    try {
      const response = await fetch('/api/carriers')
      const data = await response.json()
      
      if (data.success) {
        setCarriers(data.carriers)
      } else {
        throw new Error(data.error || 'Erro ao carregar transportadoras')
      }
    } catch (error) {
      console.error('Erro ao carregar transportadoras:', error)
      toast.error('Erro ao carregar transportadoras')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transportadora?')) {
      return
    }

    try {
      const response = await fetch(`/api/carriers/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Transportadora excluída com sucesso')
        fetchCarriers()
      } else {
        throw new Error(data.error || 'Erro ao excluir transportadora')
      }
    } catch (error) {
      console.error('Erro ao excluir transportadora:', error)
      toast.error('Erro ao excluir transportadora')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transportadoras</h1>
        <Link
          href="/admin/transportadoras/nova"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nova Transportadora
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NIF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(carriers) && carriers.length > 0 ? (
              carriers.map((carrier) => (
                <tr key={carrier.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {carrier.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {carrier.nif}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {carrier.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {carrier.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        carrier.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {carrier.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/transportadoras/${carrier.id}/editar`}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(carrier.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Nenhuma transportadora encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
} 