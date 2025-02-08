'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Eye, MousePointer, ShoppingCart, TrendingUp } from 'lucide-react'

interface Analytics {
  totalViews: number
  totalClicks: number
  totalPurchases: number
  conversionRate: number
  productStats: {
    name: string
    views: number
    clicks: number
    purchases: number
  }[]
  dailyStats: {
    date: string
    views: number
    clicks: number
    purchases: number
  }[]
}

export default function StatisticsPage() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalViews: 0,
    totalClicks: 0,
    totalPurchases: 0,
    conversionRate: 0,
    productStats: [],
    dailyStats: []
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Estatísticas</h1>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Visualizações</p>
              <p className="text-2xl font-bold">{analytics.totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-full">
              <MousePointer className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cliques</p>
              <p className="text-2xl font-bold">{analytics.totalClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-full">
              <ShoppingCart className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Compras</p>
              <p className="text-2xl font-bold">{analytics.totalPurchases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taxa de Conversão</p>
              <p className="text-2xl font-bold">{analytics.conversionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Estatísticas Diárias */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Estatísticas Diárias</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" name="Visualizações" fill="#3B82F6" />
              <Bar dataKey="clicks" name="Cliques" fill="#22C55E" />
              <Bar dataKey="purchases" name="Compras" fill="#A855F7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Estatísticas por Produto */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Estatísticas por Produto</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Produto</th>
                <th className="text-right py-3">Visualizações</th>
                <th className="text-right py-3">Cliques</th>
                <th className="text-right py-3">Compras</th>
                <th className="text-right py-3">Taxa de Conversão</th>
              </tr>
            </thead>
            <tbody>
              {analytics.productStats.map((product) => (
                <tr key={product.name} className="border-b">
                  <td className="py-3">{product.name}</td>
                  <td className="text-right">{product.views}</td>
                  <td className="text-right">{product.clicks}</td>
                  <td className="text-right">{product.purchases}</td>
                  <td className="text-right">
                    {((product.purchases / product.views) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 