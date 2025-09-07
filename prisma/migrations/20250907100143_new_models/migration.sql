/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reputation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "bio",
DROP COLUMN "location",
DROP COLUMN "portfolio",
DROP COLUMN "reputation",
DROP COLUMN "username";
