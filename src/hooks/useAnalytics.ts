import { useCallback } from 'react'
import { AnalyticsType } from '@/types/analytics'

export function useAnalytics() {
  const trackEvent = useCallback(async (type: AnalyticsType, productId?: string) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          productId
        }),
      })
    } catch (error) {
      console.error('Erro ao registrar evento:', error)
    }
  }, [])

  return { trackEvent }
} 