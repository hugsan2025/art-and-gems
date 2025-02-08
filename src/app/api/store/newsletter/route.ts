import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface NewsletterSubscription {
  email: string
  name?: string
  interests?: string[]
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ success: boolean }>>> {
  try {
    const data: NewsletterSubscription = await request.json()

    // Aqui você implementaria a lógica para salvar no banco de dados
    // e integrar com seu serviço de email marketing

    // Por enquanto, apenas simula sucesso
    return NextResponse.json({ 
      data: { 
        success: true 
      },
      status: 201
    })
  } catch (error) {
    console.error('Erro ao cadastrar newsletter:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao cadastrar na newsletter',
        status: 500
      }
    )
  }
} 