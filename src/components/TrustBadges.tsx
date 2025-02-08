import { Shield, Award, GraduationCap, Users } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    title: 'Garantia de Autenticidade',
    description: 'Todas as nossas pedras são autênticas e certificadas'
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Seleção rigorosa das melhores pedras do mercado'
  },
  {
    icon: GraduationCap,
    title: 'Profissionais Certificados',
    description: 'Equipe especializada com certificações internacionais'
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    description: 'Suporte dedicado para encontrar a pedra perfeita'
  }
]

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <badge.icon className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{badge.title}</h3>
          <p className="text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  )
} 