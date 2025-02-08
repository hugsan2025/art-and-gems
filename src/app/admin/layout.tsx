'use client'

import { useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, Package, Truck, FileText } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST'
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-600">Art And Gems</h1>
          <p className="text-sm text-gray-500">Área Administrativa</p>
        </div>

        <nav className="mt-6">
          <Link
            href="/admin"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          <Link
            href="/admin/produtos"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
          >
            <Package className="w-5 h-5 mr-3" />
            Produtos
          </Link>

          <Link
            href="/admin/transportadoras"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
          >
            <Truck className="w-5 h-5 mr-3" />
            Transportadoras
          </Link>

          <Link
            href="/admin/conteudo"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
          >
            <FileText className="w-5 h-5 mr-3" />
            Conteúdo
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  )
} 