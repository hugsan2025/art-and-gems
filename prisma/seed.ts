import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias padrão
  const categories = [
    { name: 'Pedras Preciosas', description: 'Pedras naturais de alto valor' },
    { name: 'Pedras Semipreciosas', description: 'Pedras naturais de valor médio' },
    { name: 'Cursos', description: 'Cursos e workshops' },
    { name: 'Outros', description: 'Outros produtos' }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  console.log('Seed concluído!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 