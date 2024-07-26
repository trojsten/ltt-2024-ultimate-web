-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "consumable" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "consumed" BOOLEAN NOT NULL DEFAULT false;
