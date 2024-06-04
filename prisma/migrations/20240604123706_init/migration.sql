/*
  Warnings:

  - You are about to drop the column `itemId` on the `Bed` table. All the data in the column will be lost.
  - You are about to drop the column `bedId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Bed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_itemId_fkey";

-- AlterTable
ALTER TABLE "Bed" DROP COLUMN "itemId",
ADD COLUMN     "cost" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "bedId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
