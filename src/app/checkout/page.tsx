'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Bitcoin, CreditCard, X, Copy, Info } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import type { PaymentData } from '@/types'

interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

const BitcoinPaymentModal = ({ 
  isOpen, 
  onClose, 
  paymentData 
}: { 
  isOpen: boolean
  onClose: () => void
  paymentData: PaymentData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Pagamento Bitcoin</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Endereço Bitcoin */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Endereço Bitcoin:</p>
            <div className="relative">
              <div className="p-3 bg-gray-50 rounded-lg break-all font-mono text-sm">
                {paymentData.bitcoinAddress}
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(paymentData.bitcoinAddress);
                  toast.success('Endereço copiado!');
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                title="Copiar endereço"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Valor */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Valor a pagar:</p>
            <p className="text-2xl font-bold">
              {paymentData.amount.toFixed(8)} BTC
              <span className="text-sm text-gray-500 ml-2">
                (≈ €{(paymentData.amount * 40000).toFixed(2)})
              </span>
            </p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center py-4">
            <p className="text-sm text-gray-600 mb-4">Escaneie o QR Code:</p>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="w-48 h-48 flex items-center justify-center bg-white">
                <QRCodeSVG
                  value={paymentData.qrCodeData}
                  size={192}
                  level="L"
                  includeMargin={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Após o envio do pagamento, aguarde a confirmação da transação. 
                Você receberá um email quando o pagamento for confirmado.
              </p>
            </div>
          </div>

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [showBitcoinModal, setShowBitcoinModal] = useState(false)
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Portugal'
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push('/carrinho')
    }
  }, [items, router])

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  const handlePayPalApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture()
      // Processar o pedido
      toast.success('Pagamento realizado com sucesso!')
      clearCart()
      router.push('/pedido-confirmado')
    } catch (error) {
      toast.error('Erro ao processar pagamento')
      console.error('Erro PayPal:', error)
    }
  }

  const handleBitcoinPayment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/bitcoin/generate-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: total,
          items
        })
      })

      const data = await response.json()
      if (data.success) {
        setPaymentData(data)
        setShowBitcoinModal(true)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast.error('Erro ao gerar endereço Bitcoin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da esquerda - Endereço */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={address.email}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da direita - Resumo e Pagamento */}
        <div className="space-y-6">
          {/* Resumo do Pedido */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b">
                  {item.image && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Opções de Pagamento */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
            <div className="space-y-4 relative z-10">
              {/* PayPal */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: total.toString()
                        }
                      }]
                    })
                  }}
                  onApprove={handlePayPalApprove}
                />
              </div>

              {/* Cartão */}
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                <CreditCard className="w-5 h-5" />
                Cartão de débito ou crédito
              </button>

              {/* Bitcoin */}
              <button
                onClick={handleBitcoinPayment}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                <Bitcoin className="w-5 h-5" />
                {loading ? 'Gerando endereço...' : 'Pagar com Bitcoin'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Bitcoin com z-index maior */}
      <div className="relative z-50">
        <BitcoinPaymentModal 
          isOpen={showBitcoinModal}
          onClose={() => setShowBitcoinModal(false)}
          paymentData={paymentData}
        />
      </div>
    </div>
  )
} 