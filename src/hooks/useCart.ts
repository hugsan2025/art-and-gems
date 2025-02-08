import { useState, useEffect } from 'react'
import type { Product, CartItem } from '@/types'

const CART_STORAGE_KEY = 'art-and-gems:cart'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  // Carregar itens do carrinho
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prev => 
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    totalItems
  }
} 