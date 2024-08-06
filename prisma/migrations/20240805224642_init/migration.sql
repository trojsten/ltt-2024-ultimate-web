-- DropForeignKey
ALTER TABLE "BetOutcome" DROP CONSTRAINT "BetOutcome_FinalBetId_fkey";

-- AlterTable
ALTER TABLE "BetOutcome" ALTER COLUMN "FinalBetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BetOutcome" ADD CONSTRAINT "BetOutcome_FinalBetId_fkey" FOREIGN KEY ("FinalBetId") REFERENCES "Bet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
