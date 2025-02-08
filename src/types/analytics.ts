export interface AnalyticsData {
  id: string
  productId: string | null
  type: AnalyticsType
  createdAt: Date
}

export enum AnalyticsType {
  PAGE_VIEW = 'PAGE_VIEW',
  PRODUCT_VIEW = 'PRODUCT_VIEW',
  CLICK = 'CLICK',
  PURCHASE = 'PURCHASE'
}

export interface AnalyticsStats {
  totalViews: number
  totalClicks: number
  totalPurchases: number
  conversionRate: number
  productStats: ProductStats[]
  dailyStats: DailyStats[]
}

export interface ProductStats {
  name: string
  views: number
  clicks: number
  purchases: number
}

export interface DailyStats {
  date: string
  views: number
  clicks: number
  purchases: number
} 