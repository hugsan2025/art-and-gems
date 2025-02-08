'use client'

import { useCart } from '@/contexts/CartContext'
import { toast } from 'react-hot-toast'
import { Product } from '@prisma/client'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleClick = () => {
    try {
      addToCart(product)
      toast.success('Produto adicionado ao carrinho!')
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      toast.error('Erro ao adicionar ao carrinho')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
    >
      Comprar
    </button>
  )
} 