/*
  Warnings:

  - Added the required column `cod_sipac` to the `Campus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_sipac` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campus" ADD COLUMN     "cod_sipac" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "cod_sipac" INTEGER NOT NULL;
