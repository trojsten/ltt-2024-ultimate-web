-- CreateEnum
CREATE TYPE "ProblemType" AS ENUM ('Math', 'Physics', 'Informatics');

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" "ProblemType" NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
