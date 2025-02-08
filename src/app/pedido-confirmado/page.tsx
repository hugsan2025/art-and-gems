'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmedPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Pedido Confirmado!
        </h1>
        <p className="text-gray-600 mb-8">
          Obrigado pela sua compra. Você receberá um email com os detalhes do seu pedido.
        </p>
        <div className="space-y-4">
          <Link
            href="/pedras"
            className="block w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-colors"
          >
            Continuar Comprando
          </Link>
          <Link
            href="/meus-pedidos"
            className="block w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Ver Meus Pedidos
          </Link>
        </div>
      </div>
    </div>
  )
} 