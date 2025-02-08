import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse, Carrier } from '@/types'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Carrier[]>>> {
  try {
    const carriers = await prisma.carrier.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ data: carriers })
  } catch (error) {
    console.error('Erro ao buscar transportadoras:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar transportadoras' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Carrier>>> {
  try {
    const data = await request.json()
    const carrier = await prisma.carrier.create({
      data
    })

    return NextResponse.json({ data: carrier })
  } catch (error) {
    console.error('Erro ao criar transportadora:', error)
    return NextResponse.json(
      { error: 'Erro ao criar transportadora' },
      { status: 500 }
    )
  }
} 