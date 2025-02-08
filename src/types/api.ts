import type { NextRequest } from 'next/server'

export interface RouteParams {
  params: {
    id?: string
    zoneId?: string
  }
}

export interface RouteContext {
  request: NextRequest
  params: RouteParams['params']
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status?: number
} 