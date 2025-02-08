'use client'

import { useState, useEffect } from 'react'
import { Truck } from 'lucide-react'

interface DeliveryZone {
  id: string
  name: string
  districts: string[]
  basePrice: number
  weightPrice: number
}

interface Carrier {
  id: string
  name: string
  deliveryZones: DeliveryZone[]
}

interface ShippingSelectorProps {
  weight: number // Peso total do pedido em gramas
  district: string // Distrito do cliente
  onSelect: (carrierId: string, price: number) => void
}

export default function ShippingSelector({ weight, district, onSelect }: ShippingSelectorProps) {
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCarrier, setSelectedCarrier] = useState<string>('')

  useEffect(() => {
    fetchCarriers()
  }, [])

  const fetchCarriers = async () => {
    try {
      const response = await fetch('/api/carriers/available')
      const data = await response.json()
      setCarriers(data)
    } catch (error) {
      console.error('Erro ao buscar transportadoras:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateShippingPrice = (carrier: Carrier) => {
    const zone = carrier.deliveryZones.find(zone => 
      zone.districts.includes(district)
    )

    if (!zone) return null

    const weightInKg = weight / 1000
    const additionalWeight = Math.max(0, weightInKg - 1) // Peso adicional além de 1kg
    return zone.basePrice + (zone.weightPrice * additionalWeight)
  }

  const handleCarrierSelect = (carrier: Carrier) => {
    const price = calculateShippingPrice(carrier)
    if (price !== null) {
      setSelectedCarrier(carrier.id)
      onSelect(carrier.id, price)
    }
  }

  if (loading) {
    return <div>A carregar opções de envio...</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Método de Envio</h3>
      
      <div className="space-y-2">
        {carriers.map(carrier => {
          const price = calculateShippingPrice(carrier)
          if (price === null) return null // Não mostra transportadoras que não entregam na zona

          return (
            <div
              key={carrier.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedCarrier === carrier.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleCarrierSelect(carrier)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{carrier.name}</p>
                    <p className="text-sm text-gray-500">
                      Entrega em 2-3 dias úteis
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">€{price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 