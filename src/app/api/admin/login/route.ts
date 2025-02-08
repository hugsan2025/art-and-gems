import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Criar cookie de autenticação
      cookies().set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
} 