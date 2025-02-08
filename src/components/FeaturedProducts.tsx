import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Ametista Bruta',
    price: 299.99,
    image: '/images/ametista.jpg',
    slug: 'ametista-bruta'
  },
  {
    id: 2,
    name: 'Quartzo Rosa',
    price: 199.99,
    image: '/images/quartzo-rosa.jpg',
    slug: 'quartzo-rosa'
  },
  {
    id: 3,
    name: 'Turmalina',
    price: 499.99,
    image: '/images/turmalina.jpg',
    slug: 'turmalina'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">Destaques</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/produtos/${product.slug}`}
            className="group"
          >
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-blue-600 font-bold">
              R$ {product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
} 