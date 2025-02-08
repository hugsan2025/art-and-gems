'use client'

import { default as NextLink } from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NextLink href="/" className="text-xl font-bold">
          <Image src="/logo.png" alt="Art And Gems" width={120} height={40} />
        </NextLink>
        <nav className="flex items-center gap-6">
          <NextLink href="/pedras" className="hover:text-purple-600">
            Pedras
          </NextLink>
          <NextLink href="/cursos" className="hover:text-purple-600">
            Cursos
          </NextLink>
          <NextLink href="/sobre" className="hover:text-purple-600">
            Sobre
          </NextLink>
        </nav>
      </div>
    </header>
  )
}