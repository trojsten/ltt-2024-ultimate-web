/*
  Warnings:

  - You are about to drop the column `betId` on the `BetOutcome` table. All the data in the column will be lost.
  - Added the required column `FinalBetId` to the `BetOutcome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PossileBetId` to the `BetOutcome` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BetOutcome" DROP CONSTRAINT "BetOutcome_betId_fkey";

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "eveluated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BetOutcome" DROP COLUMN "betId",
ADD COLUMN     "FinalBetId" INTEGER NOT NULL,
ADD COLUMN     "PossileBetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "betId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_betId_fkey" FOREIGN KEY ("betId") REFERENCES "BetOutcome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetOutcome" ADD CONSTRAINT "BetOutcome_PossileBetId_fkey" FOREIGN KEY ("PossileBetId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetOutcome" ADD CONSTRAINT "BetOutcome_FinalBetId_fkey" FOREIGN KEY ("FinalBetId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
