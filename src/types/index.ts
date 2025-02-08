export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  images?: string[]
  weight?: number
  clarity?: string
  cut?: string
  category: string
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
  items: OrderItem[]
  status: string
  total: number
  createdAt: Date
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
}

export interface Carrier {
  id: string
  name: string
  zones: DeliveryZone[]
}

export interface DeliveryZone {
  id: string
  name: string
  price: number
  carrierId: string
}

export interface Course {
  id: string
  name: string
  description: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
} 