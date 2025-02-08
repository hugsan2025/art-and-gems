/// <reference types="react" /> 

export interface Product {
  clarity(clarity: any): unknown
  id: string
  name: string
  description: string
  price: number
  images: string[]
  type: 'STONE' | 'COURSE'
  gemFamily?: string
  origin?: string
  color?: string
  slug: string
}

export interface Message {
  type: 'user' | 'bot'
  content: string
} 