/*
  Warnings:

  - Changed the type of `type` on the `Ad` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "type",
ADD COLUMN     "type" "AdType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sex" "Sex" NOT NULL;
