/*
  Warnings:

  - You are about to drop the column `email` on the `TechnicalManagers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TechnicalManagers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `TechnicalManagers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalManagers" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "Companies_cnpj_key" ON "Companies"("cnpj");
