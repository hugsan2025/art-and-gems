import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const categories = [
  {
    id: 'cat_stones',
    name: 'Pedras',
    description: 'Pedras preciosas'
  }
]

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 