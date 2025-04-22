/*
  Warnings:

  - You are about to drop the `info-prompt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `words` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "info-prompt" DROP CONSTRAINT "info-prompt_promptId_fkey";

-- DropForeignKey
ALTER TABLE "words" DROP CONSTRAINT "words_sentenceId_fkey";

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'sentence';

-- DropTable
DROP TABLE "info-prompt";

-- DropTable
DROP TABLE "words";

-- CreateTable
CREATE TABLE "word" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sentenceId" TEXT,

    CONSTRAINT "word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_prompt" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "info_prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "word_id_key" ON "word"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info_prompt_id_key" ON "info_prompt"("id");

-- AddForeignKey
ALTER TABLE "word" ADD CONSTRAINT "word_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_prompt" ADD CONSTRAINT "info_prompt_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
