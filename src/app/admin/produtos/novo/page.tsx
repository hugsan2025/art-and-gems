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
    type: 'STONE',
    gemFamily: 'CITRINE',
    origin: '',
    color: '',
  })

  const gemTypes = [
    { id: 'CITRINE', name: 'Citrino' },
    { id: 'EMERALD', name: 'Esmeralda' },
    { id: 'RUBY', name: 'Rubi' },
    { id: 'KUNZITE', name: 'Kunzita' },
    { id: 'SAPPHIRE', name: 'Safira' },
    { id: 'OPAL', name: 'Opala' },
    { id: 'GARNET', name: 'Granada' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Erro ao criar produto')
      
      toast.success('Produto criado com sucesso!')
      router.push('/admin/produtos')
    } catch (error) {
      console.error('Erro:', error)
      toast.error('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Produto
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="STONE">Pedra</option>
            <option value="COURSE">Curso</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagens
          </label>
          <ImageUpload
            onUpload={(url) => 
              setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), url]
              }))
            }
          />
          {formData.images && formData.images.length > 0 && (
            <div className="mt-2 flex gap-2">
              {formData.images.map((url, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={url}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>

          {formData.type === 'STONE' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Pedra
                </label>
                <select
                  name="gemFamily"
                  value={formData.gemFamily}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm"
                  required
                >
                  {gemTypes.map(gem => (
                    <option key={gem.id} value={gem.id}>
                      {gem.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origem
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cor
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço (€)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
        </div>

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