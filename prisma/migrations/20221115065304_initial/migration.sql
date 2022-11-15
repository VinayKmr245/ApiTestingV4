/*
  Warnings:

  - Made the column `asset` on table `Update` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Update" ALTER COLUMN "asset" SET NOT NULL;
