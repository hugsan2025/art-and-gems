import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface StoreInfo {
  name: string
  address: string
  postalCode: string
  city: string
  country: string
  phone: string
  email: string
  businessHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  social: {
    instagram: string
    facebook: string
  }
}

const storeInfo: StoreInfo = {
  name: "Art And Gems",
  address: "Rua Engenheiro Ferry Borges, 6 A",
  postalCode: "1600-237",
  city: "Lisboa",
  country: "Portugal",
  phone: "+351 XXX XXX XXX", // Adicione o telefone real
  email: "contato@artandgems.pt",
  businessHours: {
    weekdays: "10:00 - 19:00",
    saturday: "10:00 - 13:00",
    sunday: "Fechado"
  },
  social: {
    instagram: "https://instagram.com/artandgems",
    facebook: "https://facebook.com/artandgems"
  }
}

export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse<StoreInfo>>> {
  return NextResponse.json({ data: storeInfo })
} 