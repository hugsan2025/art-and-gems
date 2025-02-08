import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface LocationInfo {
  address: string
  postalCode: string
  city: string
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
  googleMapsUrl: string
  nearbyLandmarks: string[]
  publicTransport: {
    metro: string[]
    bus: string[]
  }
}

const locationInfo: LocationInfo = {
  address: "Rua Engenheiro Ferry Borges, 6 A",
  postalCode: "1600-237",
  city: "Lisboa",
  country: "Portugal",
  coordinates: {
    latitude: 38.756499,
    longitude: -9.182647
  },
  googleMapsUrl: "https://goo.gl/maps/your-store-location", // Adicione o link real
  nearbyLandmarks: [
    "Centro Comercial Amoreiras",
    "Jardim das Amoreiras",
    "Aqueduto das Águas Livres"
  ],
  publicTransport: {
    metro: [
      "Linha Azul - Estação Rato",
      "Linha Verde - Estação Campo de Ourique"
    ],
    bus: [
      "709 - Campo de Ourique ⇄ Campo Mártires da Pátria",
      "713 - Alameda D. A. Henriques ⇄ Estação Campolide",
      "774 - Campo de Ourique ⇄ Gomes Freire"
    ]
  }
}

export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse<LocationInfo>>> {
  return NextResponse.json({ data: locationInfo })
} 