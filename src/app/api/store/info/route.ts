import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface StoreInfo {
  name: string
  address: {
    street: string
    number: string
    postalCode: string
    city: string
    country: string
  }
  contact: {
    phone: string
    email: string
    whatsapp?: string
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  businessHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
}

const storeInfo: StoreInfo = {
  name: "Art And Gems",
  address: {
    street: "Rua Engenheiro Ferry Borges",
    number: "6 A",
    postalCode: "1600-237",
    city: "Lisboa",
    country: "Portugal"
  },
  contact: {
    phone: "+351 912 345 678",
    email: "josehenriques2025@icloud.com",
    whatsapp: "+351 912 345 678"
  },
  coordinates: {
    latitude: 38.756499, // Coordenadas reais da loja
    longitude: -9.182647
  },
  businessHours: {
    weekdays: "10:00 - 19:00",
    saturday: "10:00 - 13:00",
    sunday: "Fechado"
  }
}

export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse<StoreInfo>>> {
  return NextResponse.json({ data: storeInfo })
} 