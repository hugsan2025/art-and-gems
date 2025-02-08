'use client'

interface Value {
  title: string
  description: string
  icon: string
}

const values: Value[] = [
  {
    title: "Qualidade Premium",
    description: "Oferecemos uma seleção exclusiva de pedras preciosas de qualidade superior, cuidadosamente escolhidas para garantir a máxima satisfação dos nossos clientes.",
    icon: "💎"
  },
  {
    title: "Confiança e Ética",
    description: "Todas as nossas pedras são autênticas e certificadas, garantindo a origem ética e a qualidade incomparável de cada peça que comercializamos.",
    icon: "✨"
  },
  {
    title: "Experiência Única",
    description: "Proporcionamos uma experiência personalizada na escolha das suas pedras preciosas, com aconselhamento especializado e serviço de excelência.",
    icon: "🌟"
  }
]

export default function ValueProposition() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            A Nossa Promessa
          </h2>
          <p className="text-lg text-gray-600">
            Excelência e dedicação em cada pedra preciosa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto italic">
            "Na Art And Gems, cada pedra conta uma história única. 
            Venha descobrir a sua na nossa loja em Lisboa."
          </p>
        </div>
      </div>
    </section>
  )
} 