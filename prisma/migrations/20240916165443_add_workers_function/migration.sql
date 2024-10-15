/*
  Warnings:

  - Added the required column `id_function` to the `Workers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workers" ADD COLUMN     "id_function" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WorkerFunction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_company" INTEGER NOT NULL,

    CONSTRAINT "WorkerFunction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_id_function_fkey" FOREIGN KEY ("id_function") REFERENCES "WorkerFunction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerFunction" ADD CONSTRAINT "WorkerFunction_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
