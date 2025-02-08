'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SalesData {
  date: string
  sales: number
}

export default function SalesChart() {
  const [data, setData] = useState<SalesData[]>([])

  useEffect(() => {
    fetchSalesData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const response = await fetch('/api/admin/sales')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Erro ao buscar dados de vendas:', error)
    }
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 