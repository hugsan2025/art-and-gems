import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ApiResponse } from '@/types/api'

interface SocialMedia {
  instagram: string
  facebook: string
  linkedin?: string
  youtube?: string
  pinterest?: string
}

const socialMedia: SocialMedia = {
  instagram: "https://instagram.com/artandgems",
  facebook: "https://facebook.com/artandgems",
  linkedin: "https://linkedin.com/company/artandgems",
  youtube: "https://youtube.com/@artandgems",
  pinterest: "https://pinterest.com/artandgems"
}

export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse<SocialMedia>>> {
  return NextResponse.json({ data: socialMedia })
} 