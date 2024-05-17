/*
  Warnings:

  - You are about to drop the column `teamId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_teamId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "teamId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
