/*
  Warnings:

  - Added the required column `updatedAt` to the `essay_practice_run` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `info_prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `sentence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "essay_practice_run" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "info_prompt" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "prompt" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sentence" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "word" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
