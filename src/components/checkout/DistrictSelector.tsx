'use client'

interface DistrictSelectorProps {
  value: string
  onChange: (district: string) => void
}

const DISTRICTS = [
  'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco',
  'Coimbra', 'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa',
  'Portalegre', 'Porto', 'Santarém', 'Setúbal', 'Viana do Castelo',
  'Vila Real', 'Viseu', 'Açores', 'Madeira'
]

export default function DistrictSelector({ value, onChange }: DistrictSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Distrito de Entrega
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-gray-300 rounded-lg shadow-sm"
        required
      >
        <option value="">Selecione um distrito</option>
        {DISTRICTS.map(district => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  )
} 