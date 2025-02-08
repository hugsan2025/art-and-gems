'use client'

import Link from 'next/link'
import { routes } from '@/config/routes'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Art And Gems</h3>
          <p className="text-gray-400">
            Transformando pedras brutas em obras de arte
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href={routes.pedras} className="hover:text-blue-400">
                Pedras
              </Link>
            </li>
            <li>
              <Link href={routes.cursos} className="hover:text-blue-400">
                Cursos
              </Link>
            </li>
            <li>
              <Link href={routes.sobre} className="hover:text-blue-400">
                Sobre
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contato</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="mailto:josehenriques2025@icloud.com" className="hover:text-blue-400">
                josehenriques2025@icloud.com
              </a>
            </li>
            <li>
              <a href="tel:+351912345678" className="hover:text-blue-400">
                +351 912 345 678
              </a>
            </li>
            <li className="leading-relaxed">
              Rua Engenheiro Ferry Borges 6 A<br />
              1600-237 Lisboa<br />
              Portugal
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Art And Gems. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
} 