'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    // Verificar se já está autenticado
    const adminToken = document.cookie.includes('admin_token')
    if (adminToken) {
      router.push('/admin')
    }
  }, [router])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Credenciais inválidas')
      }
    } catch (error) {
      setError('Erro ao fazer login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login Administrativo</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuário
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
} 