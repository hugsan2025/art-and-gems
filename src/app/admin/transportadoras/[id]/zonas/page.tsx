'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import type { DeliveryZone, Carrier } from '@/types'
import DeliveryZoneForm from '@/components/admin/DeliveryZoneForm'

interface PageProps {
  params: {
    id: string
  }
}

export default function CarrierZonesPage({ params }: PageProps) {
  const [zones, setZones] = useState<DeliveryZone[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null)

  const fetchZones = useCallback(async () => {
    try {
      const response = await fetch(`/api/carriers/${params.id}/zones`)
      const data = await response.json()
      setZones(data)
    } catch (error) {
      console.error('Error fetching zones:', error)
    }
  }, [params.id])

  useEffect(() => {
    fetchZones()
  }, [fetchZones])

  const handleSaveZone = useCallback(async (zone: DeliveryZone) => {
    try {
      const url = zone.id
        ? `/api/admin/carriers/${params.id}/zones/${zone.id}`
        : `/api/admin/carriers/${params.id}/zones`

      const response = await fetch(url, {
        method: zone.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zone),
      })

      if (response.ok) {
        await fetchCarrier()
        setShowForm(false)
        setEditingZone(null)
      }
    } catch (error) {
      console.error('Erro ao salvar zona:', error)
    }
  }, [params.id, fetchCarrier])

  const handleDeleteZone = useCallback(async (zoneId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta zona?')) return

    try {
      const response = await fetch(
        `/api/admin/carriers/${params.id}/zones/${zoneId}`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        await fetchCarrier()
      }
    } catch (error) {
      console.error('Erro ao excluir zona:', error)
    }
  }, [params.id, fetchCarrier])

  const handleCancelForm = useCallback(() => {
    setShowForm(false)
    setEditingZone(null)
  }, [])

  if (!carrier) {
    return <div>Carregando...</div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/admin/transportadoras/${params.id}`}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">
          Zonas de Entrega - {carrier.name}
        </h1>
      </div>

      {showForm || editingZone ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <DeliveryZoneForm
            zone={editingZone || undefined}
            onSave={handleSaveZone}
            onCancel={handleCancelForm}
          />
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Zona
          </button>

          <div className="grid gap-4">
            {carrier.deliveryZones.map(zone => (
              <div
                key={zone.id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{zone.name}</h3>
                    <p className="text-sm text-gray-500">
                      {zone.districts.join(', ')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingZone(zone)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteZone(zone.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Preço Base</p>
                    <p className="font-semibold">€{zone.basePrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Preço por Kg Adicional</p>
                    <p className="font-semibold">€{zone.weightPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
} 