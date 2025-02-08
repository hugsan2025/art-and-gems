import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar, Footer } from '@/components'
import { Metadata } from 'next'
import Script from 'next/script'
import SupportChat from '@/components/SupportChat'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://artandgems.pt'),
  title: {
    default: 'Art And Gems - Pedras Preciosas e Cursos de Lapidação',
    template: '%s | Art And Gems'
  },
  description: 'Pedras preciosas de qualidade superior e cursos especializados de lapidação em Lisboa.',
  keywords: ['pedras preciosas', 'gemas', 'lapidação', 'cursos', 'joias', 'Lisboa', 'Portugal'],
  authors: [{ name: 'Art And Gems' }],
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://artandgems.pt',
    siteName: 'Art And Gems',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Art And Gems - Pedras Preciosas'
    }]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Art And Gems',
    image: 'https://artandgems.pt/og-image.jpg',
    description: 'Pedras preciosas de qualidade superior e cursos especializados de lapidação em Lisboa.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Engenheiro Ferry Borges 6 A',
      addressLocality: 'Lisboa',
      postalCode: '1600-237',
      addressCountry: 'PT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.756499,
      longitude: -9.182647
    },
    telephone: '+351912345678',
    email: 'josehenriques2025@icloud.com',
    openingHours: [
      'Mo-Fr 10:00-19:00',
      'Sa 10:00-13:00'
    ],
    priceRange: '€€€',
    sameAs: [
      'https://instagram.com/artandgems',
      'https://facebook.com/artandgems'
    ]
  }

  return (
    <html lang="pt-PT">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <SupportChat />
        </Providers>
      </body>
    </html>
  )
} 