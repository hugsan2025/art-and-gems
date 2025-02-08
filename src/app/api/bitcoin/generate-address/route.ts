import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const BLOCKCYPHER_API_URL = 'https://api.blockcypher.com/v1/btc/main'
const BLOCKCYPHER_TOKEN = process.env.BLOCKCYPHER_TOKEN
const BTC_EUR_RATE = 40000 // Você deve buscar isso de uma API de câmbio em produção

interface CreateOrderRequest {
  amount: number // em EUR
  items: any[]
  address: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

export async function POST(request: Request) {
  try {
    const { amount, items, address }: CreateOrderRequest = await request.json()

    // Validações
    if (!amount || amount <= 0) throw new Error('Valor inválido')
    if (!items?.length) throw new Error('Carrinho vazio')
    if (!address) throw new Error('Endereço não fornecido')

    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode', 'country']
    for (const field of requiredFields) {
      if (!address[field]) {
        throw new Error(`Campo ${field} é obrigatório`)
      }
    }

    // Converter EUR para BTC
    const btcAmount = amount / BTC_EUR_RATE

    // Gerar endereço Bitcoin
    const response = await fetch(`${BLOCKCYPHER_API_URL}/addrs?token=${BLOCKCYPHER_TOKEN}`, {
      method: 'POST'
    })

    if (!response.ok) {
      console.error('Erro BlockCypher:', await response.text())
      throw new Error('Erro ao gerar endereço Bitcoin')
    }

    const data = await response.json()
    const bitcoinAddress = data.address

    // Criar pedido
    const order = await prisma.order.create({
      data: {
        total: amount,
        status: 'PENDING',
        paymentMethod: 'BITCOIN',
        bitcoinAddress,
        customerName: address.fullName,
        customerEmail: address.email,
        customerPhone: address.phone,
        shippingAddress: address.address,
        shippingCity: address.city,
        shippingPostalCode: address.postalCode,
        shippingCountry: address.country,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    // Configurar webhook
    try {
      await fetch(`${BLOCKCYPHER_API_URL}/hooks?token=${BLOCKCYPHER_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'tx-confirmation',
          address: bitcoinAddress,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/bitcoin/webhook`,
          confirmations: 2 // Número de confirmações necessárias
        })
      })
    } catch (error) {
      console.error('Erro ao configurar webhook:', error)
      // Não falhar a requisição por erro no webhook
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        bitcoinAddress,
        amount: btcAmount,
        qrCodeData: `bitcoin:${bitcoinAddress}?amount=${btcAmount.toFixed(8)}`
      }
    })

  } catch (error) {
    console.error('Erro ao processar pagamento Bitcoin:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao processar pagamento'
      },
      { status: 500 }
    )
  }
} 