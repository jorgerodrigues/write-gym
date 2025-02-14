-- CreateTable
CREATE TABLE "prompt" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info-point" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "promptId" TEXT NOT NULL,

    CONSTRAINT "info-point_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompt_id_key" ON "prompt"("id");

-- CreateIndex
CREATE UNIQUE INDEX "info-point_id_key" ON "info-point"("id");

-- AddForeignKey
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info-point" ADD CONSTRAINT "info-point_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
