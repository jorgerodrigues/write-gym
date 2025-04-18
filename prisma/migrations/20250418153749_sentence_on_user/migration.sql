-- DropForeignKey
ALTER TABLE "sentence" DROP CONSTRAINT "sentence_userId_fkey";

-- CreateTable
CREATE TABLE "sentence-on-user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentenceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sentence-on-user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sentence-on-user_id_key" ON "sentence-on-user"("id");

-- AddForeignKey
ALTER TABLE "sentence-on-user" ADD CONSTRAINT "sentence-on-user_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentence-on-user" ADD CONSTRAINT "sentence-on-user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
