import Image from 'next/image'
import Link from 'next/link'

export default function CourseSection() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Cursos de Lapidação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/curso-lapidacao.jpg"
              alt="Curso de Lapidação"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">
              Aprenda a Arte da Lapidação
            </h3>
            <p className="text-gray-600 mb-6">
              Descubra os segredos da lapidação de pedras preciosas com nossos
              cursos especializados. Aprenda técnicas profissionais e transforme
              pedras brutas em verdadeiras obras de arte.
            </p>
            <Link
              href="/cursos"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg inline-block text-center w-fit"
            >
              Conhecer Cursos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 