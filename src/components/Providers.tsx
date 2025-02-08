'use client'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "EUR",
        }}
      >
        {children}
        <Toaster position="top-right" />
      </PayPalScriptProvider>
    </CartProvider>
  )
} 