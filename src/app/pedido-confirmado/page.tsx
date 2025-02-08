'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode.react'

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const bitcoinAddress = searchParams.get('address')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">
          Pedido Confirmado!
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Seu pedido #{orderId} foi registrado com sucesso.
          </p>
        </div>

        {bitcoinAddress && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Pagamento Bitcoin
            </h2>
            <div className="flex justify-center mb-4">
              <QRCode value={bitcoinAddress} size={200} />
            </div>
            <p className="text-sm text-gray-600 text-center mb-2">
              Envie o pagamento para o endereço:
            </p>
            <p className="text-sm bg-gray-100 p-3 rounded text-center font-mono break-all">
              {bitcoinAddress}
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700"
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  )
} 