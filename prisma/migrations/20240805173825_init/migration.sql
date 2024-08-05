-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('Simple', 'Numeric');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "questId" INTEGER;

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "answer" INTEGER,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_questRequire" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_questRequire_AB_unique" ON "_questRequire"("A", "B");

-- CreateIndex
CREATE INDEX "_questRequire_B_index" ON "_questRequire"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_questRequire" ADD CONSTRAINT "_questRequire_A_fkey" FOREIGN KEY ("A") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_questRequire" ADD CONSTRAINT "_questRequire_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
