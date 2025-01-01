-- DropIndex
DROP INDEX "Blog_coverImage_key";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
