/*
  Warnings:

  - Added the required column `createdById` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewRemaining` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "viewRemaining" INTEGER NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
