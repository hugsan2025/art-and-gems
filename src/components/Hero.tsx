import Image from 'next/image'
import Link from 'next/link'
import { images } from '@/config/images'

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gray-900/40 z-10" />
      <Image
        src={images.hero}
        alt="Pedras preciosas"
        fill
        priority
        quality={100}
        className="object-cover object-center"
      />
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white max-w-5xl mx-auto px-4">
        <div className="border-2 border-white p-8 inline-block mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-center">
            Art <span className="text-blue-400">And</span> Gems
          </h1>
        </div>
        <p className="text-xl md:text-3xl text-center mb-12 font-light">
          Transformando pedras brutas em obras de arte
        </p>
        <div className="flex gap-4">
          <Link 
            href="/cursos"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Explorar Cursos
          </Link>
          <Link
            href="/produtos"
            className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg border-2 border-white text-lg transition-colors"
          >
            Ver Pedras
          </Link>
        </div>
      </div>
    </div>
  )
} 