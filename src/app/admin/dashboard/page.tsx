'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Package, Users, ShoppingCart } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import SalesChart from '@/components/admin/SalesChart'
import RecentOrders from '@/components/admin/RecentOrders'
import TopProducts from '@/components/admin/TopProducts'
import {
  _BarChart as BarChart,
  _Bar as Bar,
  _XAxis as XAxis,
  _YAxis as YAxis,
  _CartesianGrid as CartesianGrid,
  _Tooltip as Tooltip,
  _ResponsiveContainer as ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Vendas Totais"
          value={formatCurrency(stats.totalSales)}
          icon={BarChart3}
          color="blue"
        />
        <StatsCard
          title="Total de Pedidos"
          value={stats.totalOrders.toString()}
          icon={ShoppingCart}
          color="green"
        />
        <StatsCard
          title="Produtos"
          value={stats.totalProducts.toString()}
          icon={Package}
          color="purple"
        />
        <StatsCard
          title="Clientes"
          value={stats.totalCustomers.toString()}
          icon={Users}
          color="orange"
        />
      </div>

      {/* Gráfico de Vendas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Vendas dos Últimos 7 Dias</h2>
          <SalesChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h2>
          <TopProducts />
        </div>
      </div>

      {/* Pedidos Recentes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Pedidos Recentes</h2>
        <RecentOrders />
      </div>
    </div>
  )
} 