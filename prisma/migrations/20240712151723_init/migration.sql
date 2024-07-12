/*
  Warnings:

  - You are about to drop the column `amountPerUser` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "amountPerUser" INTEGER,
ADD COLUMN     "expirationDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amountPerUser",
DROP COLUMN "expirationDate";
