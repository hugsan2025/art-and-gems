import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface WebhookData {
  address: string
  confirmations: number
  value: number // valor em satoshis
  hash: string
}

export async function POST(request: Request) {
  try {
    const data: WebhookData = await request.json()

    // Encontrar o pedido pelo endereço Bitcoin
    const order = await prisma.order.findFirst({
      where: {
        bitcoinAddress: data.address,
        status: 'PENDING'
      }
    })

    if (!order) {
      console.error('Pedido não encontrado para o endereço:', data.address)
      return NextResponse.json({ success: false }, { status: 404 })
    }

    // Atualizar status do pedido
    if (data.confirmations >= 2) {
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          status: 'PAID',
          updatedAt: new Date()
        }
      })

      // Enviar email de confirmação
      try {
        await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: order.customerEmail,
            subject: 'Pagamento Confirmado - Art And Gems',
            template: 'payment-confirmed',
            data: {
              orderNumber: order.id,
              customerName: order.customerName,
              amount: order.total,
              transactionHash: data.hash
            }
          })
        })
      } catch (error) {
        console.error('Erro ao enviar email:', error)
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erro no webhook Bitcoin:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno' },
      { status: 500 }
    )
  }
} 