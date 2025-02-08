import Image from 'next/image'
import TrustBadges from '@/components/TrustBadges'
import Gallery from '@/components/Gallery'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Sobre a Art And Gems</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Descubra o brilho da natureza em cada detalhe, onde a qualidade encontra a excelência.
        </p>
      </div>

      {/* Qualidade e Satisfação */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-[400px]">
          <Image
            src="/images/about/quality.jpg"
            alt="Qualidade Art And Gems"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
          <p className="text-lg text-gray-600">
            Buscamos proporcionar a nossos clientes conhecimento sobre pedras preciosas e formar novos profissionais através de nossos cursos especializados.
          </p>
        </div>
      </div>

      {/* Certificações */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Compromisso com Qualidade</h2>
          <p className="text-lg text-gray-600">
            Todas as nossas pedras são criteriosamente selecionadas e certificadas, garantindo o mais alto padrão de qualidade aos nossos clientes.
          </p>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/images/about/certification.jpg"
            alt="Certificações Art And Gems"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16">
        <TrustBadges />
      </div>

      {/* Galeria */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nossa Galeria</h2>
        <Gallery />
      </div>
    </div>
  )
} 