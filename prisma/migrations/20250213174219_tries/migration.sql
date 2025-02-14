/*
  Warnings:

  - You are about to drop the `info-point` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "info-point" DROP CONSTRAINT "info-point_promptId_fkey";

-- DropTable
DROP TABLE "info-point";

-- CreateTable
CREATE TABLE "info-prompt" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "info-prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tries" (
    "id" TEXT NOT NULL,
    "essay" TEXT NOT NULL,
    "wordCount" INTEGER,
    "overallScore" INTEGER NOT NULL,
    "grammarScore" INTEGER NOT NULL,
    "spellingScore" INTEGER NOT NULL,
    "punctuationScore" INTEGER NOT NULL,
    "styleScore" INTEGER NOT NULL,
    "promptId" TEXT,

    CONSTRAINT "Tries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "info-prompt_id_key" ON "info-prompt"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tries_id_key" ON "Tries"("id");

-- AddForeignKey
ALTER TABLE "info-prompt" ADD CONSTRAINT "info-prompt_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tries" ADD CONSTRAINT "Tries_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
