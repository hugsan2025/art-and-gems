'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DeliveryZone, Carrier } from '@/types'

interface ZonesPageProps {
  params: {
    id: string
  }
}

export default function ZonesPage({ params }: ZonesPageProps) {
  const [carrier, setCarrier] = useState<Carrier | null>(null)
  const [zones, setZones] = useState<DeliveryZone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCarrier = async () => {
    try {
      const response = await fetch(`/api/carriers/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch carrier')
      }
      const data = await response.json()
      setCarrier(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const fetchZones = async () => {
    try {
      const response = await fetch(`/api/carriers/${params.id}/zones`)
      if (!response.ok) {
        throw new Error('Failed to fetch zones')
      }
      const data = await response.json()
      setZones(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchCarrier()
      await fetchZones()
    }
    loadData()
  }, [params.id])

  const handleDelete = async (zoneId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta zona?')) {
      return
    }

    try {
      const response = await fetch(`/api/carriers/${params.id}/zones/${zoneId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete zone')
      }

      setZones(zones.filter(zone => zone.id !== zoneId))
    } catch (err) {
      console.error('Error deleting zone:', err)
      alert('Erro ao excluir zona')
    }
  }

  if (loading) {
    return <div className="p-4">Carregando...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">Erro: {error}</div>
  }

  if (!carrier) {
    return <div className="p-4">Transportadora não encontrada</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Zonas de Entrega - {carrier.name}
        </h1>
        <Link
          href={`/admin/transportadoras/${params.id}/zonas/nova`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nova Zona
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
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prazo (dias)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {zones.map((zone: DeliveryZone) => (
              <tr key={zone.id}>
                <td className="px-6 py-4 whitespace-nowrap">{zone.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(zone.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {zone.estimatedDays}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/transportadoras/${params.id}/zonas/${zone.id}/editar`}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(zone.id)}
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