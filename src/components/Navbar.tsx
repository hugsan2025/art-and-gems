'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navigation = [
    { name: 'Pedras', href: '/pedras' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Sobre', href: '/sobre' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-gray-800">Art</span>
              <span className="text-blue-500">And</span>
              <span className="text-gray-800">Gems</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-500"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/carrinho"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-purple-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-500"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/carrinho"
                className="block px-3 py-2 text-gray-700 hover:text-blue-500"
              >
                Carrinho
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 