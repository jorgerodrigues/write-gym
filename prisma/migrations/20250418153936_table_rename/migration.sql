/*
  Warnings:

  - You are about to drop the `sentence-on-user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sentence-on-user" DROP CONSTRAINT "sentence-on-user_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "sentence-on-user" DROP CONSTRAINT "sentence-on-user_userId_fkey";

-- DropTable
DROP TABLE "sentence-on-user";

-- CreateTable
CREATE TABLE "sentence_on_user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentenceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sentence_on_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sentence_on_user_id_key" ON "sentence_on_user"("id");

-- AddForeignKey
ALTER TABLE "sentence_on_user" ADD CONSTRAINT "sentence_on_user_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentence_on_user" ADD CONSTRAINT "sentence_on_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
