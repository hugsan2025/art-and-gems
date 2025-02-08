import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="/images/hero-bg.jpg"
          alt="Art And Gems"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Art And Gems
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Transformando pedras brutas em obras de arte
          </p>
          <div className="flex gap-4">
            <Link
              href="/pedras"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
            >
              Ver Pedras
            </Link>
            <Link
              href="/cursos"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100"
            >
              Nossos Cursos
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sobre Nós</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 leading-relaxed">
              A Art And Gems é especializada na lapidação e comercialização de pedras preciosas. 
              Nossa equipe de artesãos altamente qualificados trabalha com paixão e precisão 
              para revelar a beleza única de cada gema. Além disso, oferecemos cursos de 
              lapidação para quem deseja aprender esta arte milenar.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
} 