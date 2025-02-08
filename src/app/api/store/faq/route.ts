import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'products' | 'courses' | 'shipping'
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Vocês fazem envios internacionais?',
    answer: 'Sim, fazemos envios para toda a Europa através de transportadoras parceiras com seguro incluído.',
    category: 'shipping'
  },
  {
    id: '2',
    question: 'Como são selecionadas as pedras?',
    answer: 'Todas as nossas pedras são cuidadosamente selecionadas por especialistas, garantindo a mais alta qualidade e autenticidade.',
    category: 'products'
  },
  {
    id: '3',
    question: 'Os cursos são presenciais ou online?',
    answer: 'Oferecemos ambas as modalidades. Os cursos presenciais acontecem em nossa loja em Lisboa, e os cursos online são realizados através de nossa plataforma exclusiva.',
    category: 'courses'
  }
]

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<FAQ[]>>> {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const filteredFaqs = category 
    ? faqs.filter(faq => faq.category === category)
    : faqs

  return NextResponse.json({ data: filteredFaqs })
} 