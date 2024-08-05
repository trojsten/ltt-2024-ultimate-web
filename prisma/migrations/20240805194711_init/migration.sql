/*
  Warnings:

  - You are about to drop the column `questId` on the `User` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_questId_fkey";

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "priority" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "questId";

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
