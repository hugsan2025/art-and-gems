export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Art<span className="text-blue-500">And</span>Gems
          </Link>
          <div className="flex gap-6">
            <Link href="/pedras" className="hover:text-blue-500">
              Pedras
            </Link>
            <Link href="/cursos" className="hover:text-blue-500">
              Cursos
            </Link>
            <Link href="/carrinho" className="hover:text-blue-500">
              Carrinho
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
} 