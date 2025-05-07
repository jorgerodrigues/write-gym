-- AlterTable
ALTER TABLE "sentence" ADD COLUMN     "language" TEXT,
ADD COLUMN     "nativeLanguage" TEXT;

-- AlterTable
ALTER TABLE "word" ADD COLUMN     "nativeLanguage" TEXT NOT NULL DEFAULT 'en';
