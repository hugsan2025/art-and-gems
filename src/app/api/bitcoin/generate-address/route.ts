import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data.orderId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID do pedido não fornecido' 
        },
        { status: 400 }
      )
    }

    // Gerar um endereço Bitcoin único para o pedido
    const bitcoinAddress = `bc1q${Math.random().toString(36).substring(2, 15)}`

    // Atualizar o pedido com o endereço Bitcoin
    const order = await prisma.order.update({
      where: {
        id: data.orderId
      },
      data: {
        bitcoinAddress,
        paymentMethod: 'BITCOIN'
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: {
        address: bitcoinAddress,
        orderId: order.id
      }
    })

  } catch (error) {
    console.error('Erro ao gerar endereço Bitcoin:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao gerar endereço Bitcoin' 
      },
      { status: 500 }
    )
  }
} 