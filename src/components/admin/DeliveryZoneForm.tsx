'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface DeliveryZone {
  id?: string
  name: string
  districts: string[]
  basePrice: number
  weightPrice: number
}

interface DeliveryZoneFormProps {
  zone?: DeliveryZone
  onSave: (zone: DeliveryZone) => void
  onCancel: () => void
}

const DISTRICTS = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco',
  'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa',
  'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Viana do Castelo',
  'Vila Real', 'Viseu', 'Açores', 'Madeira'
]

export default function DeliveryZoneForm({ zone, onSave, onCancel }: DeliveryZoneFormProps) {
  const [formData, setFormData] = useState<DeliveryZone>(zone || {
    name: '',
    districts: [],
    basePrice: 0,
    weightPrice: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') ? parseFloat(value) : value
    }))
  }

  const handleDistrictToggle = (district: string) => {
    setFormData(prev => ({
      ...prev,
      districts: prev.districts.includes(district)
        ? prev.districts.filter(d => d !== district)
        : [...prev.districts, district]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome da Zona
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-gray-300 rounded-lg shadow-sm"
          placeholder="Ex: Norte, Sul, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Distritos
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {DISTRICTS.map(district => (
            <label
              key={district}
              className={`flex items-center p-2 rounded cursor-pointer ${
                formData.districts.includes(district)
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-gray-50 border-gray-300'
              } border`}
            >
              <input
                type="checkbox"
                checked={formData.districts.includes(district)}
                onChange={() => handleDistrictToggle(district)}
                className="mr-2"
              />
              {district}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço Base (€)
          </label>
          <input
            type="number"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço por Kg Adicional (€)
          </label>
          <input
            type="number"
            name="weightPrice"
            value={formData.weightPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Salvar
        </button>
      </div>
    </form>
  )
} 