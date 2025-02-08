import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.category.deleteMany()

  const categories = [
    { id: "cat_1", name: "Paintings" },
    { id: "cat_2", name: "Sculptures" },
    { id: "cat_3", name: "Jewelry" }
  ]

  for (const category of categories) {
    try {
      await prisma.category.upsert({
        where: { id: category.id },
        update: { name: category.name },
        create: {
          id: category.id,
          name: category.name
        }
      })
      console.log(`Upserted category: ${category.name}`)
    } catch (error) {
      console.error(`Error upserting category ${category.name}:`, error)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 