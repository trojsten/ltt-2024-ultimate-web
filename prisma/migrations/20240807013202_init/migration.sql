/*
  Warnings:

  - You are about to drop the column `channelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_channelId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelId";

-- DropTable
DROP TABLE "message";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "attachment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChannelToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToUser_AB_unique" ON "_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToUser_B_index" ON "_ChannelToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
