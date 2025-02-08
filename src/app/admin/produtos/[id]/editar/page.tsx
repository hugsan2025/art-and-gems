'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

interface ProductForm {
  name: string
  description: string
  price: string
  stock: string
  type: 'STONE' | 'COURSE'
  images: string[]
  weight?: string
  origin?: string
  color?: string
  clarity?: string
  duration?: string
  level?: string
  startDate?: string
  maxStudents?: string
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: 'STONE',
    images: []
  })

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const product = await response.json()

      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        type: product.type,
        images: product.images,
        weight: product.weight?.toString(),
        origin: product.origin,
        color: product.color,
        clarity: product.clarity,
        duration: product.duration?.toString(),
        level: product.level,
        startDate: product.startDate ? new Date(product.startDate).toISOString().split('T')[0] : undefined,
        maxStudents: product.maxStudents?.toString()
      })
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar produto')
      }

      router.push('/admin/produtos')
      router.refresh()
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Usar o mesmo JSX do formulário de criação, apenas mudando o título
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      {/* Resto do JSX igual ao formulário de criação */}
    </div>
  )
} 