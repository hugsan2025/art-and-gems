import { BarChart3, Package, Users, ShoppingCart } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import AdminCard from '@/components/admin/AdminCard'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatsCard 
          title="Total de Visualizações"
          value="0"
          icon={BarChart3}
          color="blue"
        />
        <StatsCard 
          title="Total de Cliques"
          value="0"
          icon={Users}
          color="green"
        />
        <StatsCard 
          title="Taxa de Conversão"
          value="0%"
          icon={ShoppingCart}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard
          title="Produtos"
          description="Gerenciar pedras preciosas e cursos"
          icon={Package}
          href="/admin/produtos"
        />
        <AdminCard
          title="Estatísticas"
          description="Análise de produtos e vendas"
          icon={BarChart3}
          href="/admin/estatisticas"
        />
        <AdminCard
          title="Pedidos"
          description="Visualizar e gerenciar pedidos"
          icon={ShoppingCart}
          href="/admin/pedidos"
        />
      </div>
    </div>
  )
} 