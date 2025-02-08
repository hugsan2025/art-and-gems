-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "clarity" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "gemFamily" "GemFamily",
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;
