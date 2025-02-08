import Image from 'next/image'
import type { Course } from '@/types'

const courses: Course[] = [
  {
    id: 1,
    title: 'Lapidação Básica',
    description: 'Aprenda os fundamentos da lapidação de pedras preciosas. Curso ideal para iniciantes que desejam começar no mundo da lapidação.',
    image: '/images/curso-basico.jpg',
    slug: 'lapidacao-basica'
  },
  {
    id: 2,
    title: 'Técnicas Avançadas',
    description: 'Aprofunde seus conhecimentos com técnicas avançadas de lapidação. Para quem já possui experiência básica e quer se especializar.',
    image: '/images/curso-avancado.jpg',
    slug: 'tecnicas-avancadas'
  },
  {
    id: 3,
    title: 'Design de Joias',
    description: 'Combine a arte da lapidação com o design de joias. Aprenda a criar peças únicas e exclusivas.',
    image: '/images/curso-design.jpg',
    slug: 'design-joias'
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Cursos de Lapidação</h1>
          <p className="text-gray-600 text-lg">
            Aprenda a arte da lapidação com nossos cursos especializados. Do básico ao
            avançado, oferecemos formação completa com certificação.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Mais Informações
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Comece Sua Jornada</h2>
          <p className="text-gray-600 mb-8">
            Transforme sua paixão por pedras preciosas em uma habilidade profissional.
            Nossos cursos são ministrados por especialistas com anos de experiência.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">
            Fale com um Consultor
          </button>
        </div>
      </div>
    </div>
  )
} 