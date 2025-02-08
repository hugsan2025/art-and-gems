export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  image?: string
  type: 'STONE' | 'COURSE'
  gemFamily?: GemFamily
  weight?: number
  origin?: string
  color?: string
  clarity?: string
  cut?: string
  duration?: number
  level?: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED'
  startDate?: Date
  maxStudents?: number
  categoryId: string
}

export enum GemFamily {
  CITRINE = 'CITRINE',
  EMERALD = 'EMERALD',
  RUBY = 'RUBY',
  KUNZITE = 'KUNZITE',
  SAPPHIRE = 'SAPPHIRE',
  OPAL = 'OPAL',
  GARNET = 'GARNET',
  OTHER = 'OTHER'
}

export interface Category {
  id: string
  name: string
  description?: string
}

export interface Order {
  id: string
  status: OrderStatus
  total: number
  customerName: string
  customerEmail: string
  customerPhone?: string
  carrierId?: string
  trackingCode?: string
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  orderId: string
  productId: string
}

export interface Carrier {
  id: string
  name: string
  nif: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  active: boolean
  deliveryZones: DeliveryZone[]
}

export interface DeliveryZone {
  id: string
  name: string
  districts: string[]
  basePrice: number
  weightPrice: number
  carrierId: string
}

export interface Course {
  id: number
  title: string
  description: string
  image: string
  slug: string
}

export interface CartItem extends Product {
  quantity: number
} 