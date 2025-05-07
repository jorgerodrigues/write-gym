-- AlterTable
ALTER TABLE "card" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "nativeLanguage" TEXT NOT NULL DEFAULT 'pt_br';
