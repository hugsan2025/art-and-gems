'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface CarrierForm {
  name: string
  nif: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
}

export default function NewCarrierPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CarrierForm>({
    name: '',
    nif: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateNIF = (nif: string) => {
    nif = nif.replace(/[\s-]/g, '')
    
    if (!/^[125689]\d{8}$/.test(nif)) {
      return false
    }

    const checkDigit = parseInt(nif.slice(-1))
    const nifWithoutCheckDigit = nif.slice(0, -1)
    
    let sum = 0
    for (let i = 0; i < 8; i++) {
      sum += parseInt(nifWithoutCheckDigit[i]) * (9 - i)
    }
    
    const calculatedCheckDigit = 11 - (sum % 11)
    return checkDigit === (calculatedCheckDigit > 9 ? 0 : calculatedCheckDigit)
  }

  const validatePostalCode = (code: string) => {
    return /^\d{4}-\d{3}$/.test(code)
  }

  const formatPhoneNumber = (phone: string) => {
    phone = phone.replace(/\D/g, '')
    if (!phone.startsWith('351') && phone.length === 9) {
      phone = '351' + phone
    }
    return phone
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateNIF(formData.nif)) {
      alert('NIF inválido')
      return
    }

    if (!validatePostalCode(formData.postalCode)) {
      alert('Código Postal inválido (formato: 1234-567)')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/carriers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/transportadoras')
      }
    } catch (error) {
      console.error('Erro ao criar transportadora:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/transportadoras"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Nova Transportadora</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIF
            </label>
            <input
              type="text"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              placeholder="123456789"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Morada
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="1234-567"
                required
                className="w-full border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/admin/transportadoras"
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
} 