import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AnalyticsType } from '@/types/analytics'

export async function GET() {
  try {
    // Buscar todas as análises
    const analytics = await prisma.Analytics.findMany({
      include: {
        product: true
      }
    })

    // Calcular estatísticas totais
    const totalViews = analytics.filter(a => a.type === AnalyticsType.PAGE_VIEW).length
    const totalClicks = analytics.filter(a => a.type === AnalyticsType.CLICK).length
    const totalPurchases = analytics.filter(a => a.type === AnalyticsType.PURCHASE).length
    const conversionRate = totalViews > 0 
      ? Number(((totalPurchases / totalViews) * 100).toFixed(1))
      : 0

    // Agrupar por produto
    const products = await prisma.Product.findMany({
      include: {
        analytics: true
      }
    })

    const productStats = products.map(product => ({
      name: product.name,
      views: product.analytics.filter(a => a.type === AnalyticsType.PAGE_VIEW).length,
      clicks: product.analytics.filter(a => a.type === AnalyticsType.CLICK).length,
      purchases: product.analytics.filter(a => a.type === AnalyticsType.PURCHASE).length
    }))

    // Agrupar por dia (últimos 7 dias)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const dailyAnalytics = await prisma.Analytics.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })

    const dailyStats = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayAnalytics = dailyAnalytics.filter(a => 
        a.createdAt.toDateString() === date.toDateString()
      )

      return {
        date: date.toLocaleDateString('pt-BR'),
        views: dayAnalytics.filter(a => a.type === AnalyticsType.PAGE_VIEW).length,
        clicks: dayAnalytics.filter(a => a.type === AnalyticsType.CLICK).length,
        purchases: dayAnalytics.filter(a => a.type === AnalyticsType.PURCHASE).length
      }
    }).reverse()

    return NextResponse.json({
      totalViews,
      totalClicks,
      totalPurchases,
      conversionRate,
      productStats,
      dailyStats
    })
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
} 