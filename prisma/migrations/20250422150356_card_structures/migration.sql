/*
  Warnings:

  - You are about to drop the `sentence_on_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `try` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sentence_on_user" DROP CONSTRAINT "sentence_on_user_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "sentence_on_user" DROP CONSTRAINT "sentence_on_user_userId_fkey";

-- DropForeignKey
ALTER TABLE "try" DROP CONSTRAINT "try_promptId_fkey";

-- DropTable
DROP TABLE "sentence_on_user";

-- DropTable
DROP TABLE "try";

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "front" TEXT,
    "back" TEXT,
    "tags" TEXT[],
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "nextDueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentenceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "essay_practice_run" (
    "id" TEXT NOT NULL,
    "essay" TEXT NOT NULL,
    "wordCount" INTEGER,
    "overallScore" INTEGER NOT NULL,
    "grammarScore" INTEGER NOT NULL,
    "spellingScore" INTEGER NOT NULL,
    "punctuationScore" INTEGER NOT NULL,
    "styleScore" INTEGER NOT NULL,
    "promptId" TEXT,

    CONSTRAINT "essay_practice_run_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_id_key" ON "card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "essay_practice_run_id_key" ON "essay_practice_run"("id");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_practice_run" ADD CONSTRAINT "essay_practice_run_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
