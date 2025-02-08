import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://artandgems.pt'

  // Buscar produtos
  const products = await prisma.product.findMany({
    select: {
      id: true,
      type: true,
      updatedAt: true
    }
  })

  // URLs estáticas
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/pedras`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ]

  // URLs dinâmicas dos produtos
  const productUrls: MetadataRoute.Sitemap = products.map(product => ({
    url: `${baseUrl}/${product.type === 'STONE' ? 'pedras' : 'cursos'}/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  return [...staticUrls, ...productUrls]
} 