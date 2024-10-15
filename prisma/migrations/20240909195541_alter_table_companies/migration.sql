/*
  Warnings:

  - You are about to drop the column `id_user` on the `Companies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Companies_id_user_key";

-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "id_user";
