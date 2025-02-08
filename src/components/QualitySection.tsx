import { Star, Diamond, Shield, Info } from 'lucide-react'

const qualities = [
  {
    icon: Star,
    title: 'Certificação',
    description: 'Todas as pedras são certificadas e autenticadas'
  },
  {
    icon: Diamond,
    title: 'Qualidade Premium',
    description: 'Seleção rigorosa das melhores pedras'
  },
  {
    icon: Shield,
    title: 'Origem Ética',
    description: 'Compromisso com práticas sustentáveis'
  },
  {
    icon: Info,
    title: 'Expertise',
    description: 'Mais de 20 anos de experiência'
  }
]

export default function QualitySection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Qualidade e Satisfação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {qualities.map((quality, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <quality.icon className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{quality.title}</h3>
              <p className="text-gray-600">{quality.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 