-- CreateTable
CREATE TABLE "BetOutcome" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "odds" DOUBLE PRECISION NOT NULL,
    "betId" INTEGER NOT NULL,
    "limit" INTEGER,

    CONSTRAINT "BetOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BetOutcome" ADD CONSTRAINT "BetOutcome_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
