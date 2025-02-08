import { Diamond, Award, BookOpen, Gem } from 'lucide-react'

const features = [
  {
    icon: Diamond,
    title: 'Pedras Exclusivas',
    description: 'Seleção única de pedras preciosas de alta qualidade'
  },
  {
    icon: Award,
    title: 'Certificação',
    description: 'Todas as pedras são certificadas e autenticadas'
  },
  {
    icon: BookOpen,
    title: 'Cursos Especializados',
    description: 'Aprenda com os melhores mestres lapidários'
  },
  {
    icon: Gem,
    title: 'Arte em Lapidação',
    description: 'Técnicas exclusivas de lapidação artística'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50">
                <feature.icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 