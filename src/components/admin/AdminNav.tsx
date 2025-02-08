'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  ShoppingBag,
  Users,
  Settings
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Produtos',
    href: '/admin/produtos',
    icon: Package
  },
  {
    label: 'Pedidos',
    href: '/admin/pedidos',
    icon: ShoppingBag
  },
  {
    label: 'Transportadoras',
    href: '/admin/transportadoras',
    icon: Truck
  },
  {
    label: 'Clientes',
    href: '/admin/clientes',
    icon: Users
  },
  {
    label: 'Configurações',
    href: '/admin/configuracoes',
    icon: Settings
  }
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="px-4">
        <div className="flex items-center space-x-8 h-16">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname.startsWith(href)

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 h-full text-sm font-medium border-b-2 -mb-[1px] ${
                  isActive
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 