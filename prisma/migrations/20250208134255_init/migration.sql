/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryToProduct_AB_unique";

-- AlterTable
ALTER TABLE "_ProductCartAdds" ADD CONSTRAINT "_ProductCartAdds_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProductCartAdds_AB_unique";

-- AlterTable
ALTER TABLE "_ProductViews" ADD CONSTRAINT "_ProductViews_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProductViews_AB_unique";
