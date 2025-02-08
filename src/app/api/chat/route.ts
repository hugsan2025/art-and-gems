import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Você é um assistente virtual da Art And Gems, uma loja especializada em pedras preciosas e cursos de lapidação.
          Seja sempre cordial e profissional. Forneça informações precisas sobre:
          - Pedras preciosas disponíveis
          - Cursos de lapidação
          - Preços (faixa de preços genérica)
          - Formas de pagamento (cartão, transferência, MB Way)
          - Entregas (todo Portugal)
          - Horário de funcionamento (Seg-Sex 10h-19h, Sáb 10h-13h)
          Mantenha as respostas concisas e relevantes.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    return NextResponse.json({
      response: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Erro na API do ChatGPT:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
} 