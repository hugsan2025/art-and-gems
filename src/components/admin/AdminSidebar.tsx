'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  ShoppingCart,
  Settings,
  LogOut,
  FileText
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin'
  },
  {
    title: 'Produtos',
    icon: Package,
    href: '/admin/produtos'
  },
  {
    title: 'Estatísticas',
    icon: BarChart3,
    href: '/admin/estatisticas'
  },
  {
    title: 'Pedidos',
    icon: ShoppingCart,
    href: '/admin/pedidos'
  },
  {
    title: 'Configurações',
    icon: Settings,
    href: '/admin/configuracoes'
  },
  {
    title: 'Conteúdo',
    icon: FileText,
    href: '/admin/conteudo'
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Art And Gems</h2>
        <p className="text-sm text-gray-600">Painel Administrativo</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  )
} 