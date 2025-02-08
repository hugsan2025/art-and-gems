'use client'
import { default as NextLink } from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NextLink href="/" className="text-xl font-bold">Art & Gems</NextLink>
          <div className="space-x-4">
            <NextLink href="/pedras" className="hover:text-gray-600">Pedras</NextLink>
            <NextLink href="/produtos" className="hover:text-gray-600">Produtos</NextLink>
            <NextLink href="/sobre" className="hover:text-gray-600">Sobre</NextLink>
          </div>
        </div>
      </nav>
    </header>
  )
}