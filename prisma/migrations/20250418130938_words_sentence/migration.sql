-- CreateTable
CREATE TABLE "sentence" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sentenceId" TEXT,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sentence_id_key" ON "sentence"("id");

-- CreateIndex
CREATE UNIQUE INDEX "words_id_key" ON "words"("id");

-- AddForeignKey
ALTER TABLE "sentence" ADD CONSTRAINT "sentence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
