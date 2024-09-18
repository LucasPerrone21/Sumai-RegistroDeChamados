/*
  Warnings:

  - The primary key for the `Access` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Access" DROP CONSTRAINT "Access_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Access_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Access_id_seq";
