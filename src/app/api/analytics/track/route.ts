import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AnalyticsType } from '@/types/analytics'

export async function POST(request: Request) {
  try {
    const { type, productId } = await request.json()

    const event = await prisma.Analytics.create({
      data: {
        type: type as AnalyticsType,
        productId: productId || null
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Erro ao registrar evento:', error)
    return NextResponse.json(
      { error: 'Erro ao registrar evento' },
      { status: 500 }
    )
  }
} 