'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import type { Product } from '@/types'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    images: [],
    type: 'STONE'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Produto criado com sucesso!')
        router.push('/admin/produtos')
      } else {
        throw new Error(data.error || 'Erro ao criar produto')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Form fields */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>
    </div>
  )
} 