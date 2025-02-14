/*
  Warnings:

  - You are about to drop the `Tries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tries" DROP CONSTRAINT "Tries_promptId_fkey";

-- DropTable
DROP TABLE "Tries";

-- CreateTable
CREATE TABLE "try" (
    "id" TEXT NOT NULL,
    "essay" TEXT NOT NULL,
    "wordCount" INTEGER,
    "overallScore" INTEGER NOT NULL,
    "grammarScore" INTEGER NOT NULL,
    "spellingScore" INTEGER NOT NULL,
    "punctuationScore" INTEGER NOT NULL,
    "styleScore" INTEGER NOT NULL,
    "promptId" TEXT,

    CONSTRAINT "try_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "try_id_key" ON "try"("id");

-- AddForeignKey
ALTER TABLE "try" ADD CONSTRAINT "try_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
