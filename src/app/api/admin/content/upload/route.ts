import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const description = formData.get('description') as string
    const section = formData.get('section') as string

    // Upload para o Cloudinary
    const uploadResult = await uploadToCloudinary(file)

    // Salvar no banco de dados
    const content = await prisma.content.create({
      data: {
        type,
        url: uploadResult.secure_url,
        description,
        section
      }
    })

    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao fazer upload' },
      { status: 500 }
    )
  }
} 