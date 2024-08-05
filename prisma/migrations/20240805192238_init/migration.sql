-- CreateTable
CREATE TABLE "_BetToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BetToTag_AB_unique" ON "_BetToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BetToTag_B_index" ON "_BetToTag"("B");

-- AddForeignKey
ALTER TABLE "_BetToTag" ADD CONSTRAINT "_BetToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Bet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BetToTag" ADD CONSTRAINT "_BetToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
