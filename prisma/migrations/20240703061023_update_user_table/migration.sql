/*
  Warnings:

  - You are about to drop the column `useCase` on the `User` table. All the data in the column will be lost.
  - Made the column `companyName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamSize` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "useCase",
ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "teamSize" SET NOT NULL,
ALTER COLUMN "teamSize" SET DATA TYPE TEXT;
