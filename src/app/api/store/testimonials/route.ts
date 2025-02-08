import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  rating: number
  date: string
  avatar?: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    role: 'Designer de Joias',
    company: 'Atelier Silva',
    content: 'Excelente qualidade das pedras. O atendimento é impecável e os cursos são muito informativos.',
    rating: 5,
    date: '2024-02-01',
    verified: true
  },
  {
    id: '2',
    name: 'João Santos',
    content: 'Os cursos de lapidação superaram minhas expectativas. Aprendi técnicas que não encontrei em nenhum outro lugar.',
    rating: 5,
    date: '2024-01-15',
    verified: true
  }
]

export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse<Testimonial[]>>> {
  return NextResponse.json({ data: testimonials })
} 