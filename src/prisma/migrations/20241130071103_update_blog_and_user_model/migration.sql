/*
  Warnings:

  - You are about to drop the column `authorName` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `authorUserName` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Blog_authorUserName_key";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "authorName",
DROP COLUMN "authorUserName",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
