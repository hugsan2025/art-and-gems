'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface CarrierForm {
  name: string
  cnpj: string
  email: string
  phone: string
  active: boolean
}

export default function EditCarrierPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CarrierForm>({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    active: true
  })
  const [carrier, setCarrier] = useState(null)

  const fetchCarrier = useCallback(async () => {
    try {
      const response = await fetch(`/api/carriers/${params.id}`)
      const data = await response.json()
      setCarrier(data)
      setFormData(data)
    } catch (error) {
      console.error('Error fetching carrier:', error)
    }
  }, [params.id])

  useEffect(() => {
    fetchCarrier()
  }, [fetchCarrier])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/carriers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/transportadoras')
      }
    } catch (error) {
      console.error('Erro ao atualizar transportadora:', error)
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
        <h1 className="text-2xl font-bold">Editar Transportadora</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome
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
              CNPJ
            </label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm"
            />
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <label className="text-sm font-medium text-gray-700">
              Transportadora ativa
            </label>
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