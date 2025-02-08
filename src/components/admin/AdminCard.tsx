import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface AdminCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

export default function AdminCard({ title, description, icon: Icon, href }: AdminCardProps) {
  return (
    <Link 
      href={href}
      className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
} 