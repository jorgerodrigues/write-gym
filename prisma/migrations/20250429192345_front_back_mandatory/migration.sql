/*
  Warnings:

  - Made the column `front` on table `card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `back` on table `card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "card" ALTER COLUMN "front" SET NOT NULL,
ALTER COLUMN "back" SET NOT NULL;
