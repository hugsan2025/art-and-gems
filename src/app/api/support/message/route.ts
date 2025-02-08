import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORT_EMAIL = 'josehenriques2025@icloud.com'

export async function POST(request: NextRequest) {
  try {
    const { message, attachment, email } = await request.json()

    // Aqui você implementaria o envio real do email
    // usando serviços como SendGrid, AWS SES, etc.
    console.log('Mensagem de suporte:', {
      to: SUPPORT_EMAIL,
      from: email,
      subject: 'Nova mensagem de suporte - Art And Gems',
      text: message,
      attachment
    })

    return NextResponse.json({
      data: { success: true }
    })
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem' },
      { status: 500 }
    )
  }
} 