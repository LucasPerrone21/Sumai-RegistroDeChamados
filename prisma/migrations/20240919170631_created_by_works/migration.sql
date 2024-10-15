/*
  Warnings:

  - Added the required column `createdBy` to the `Works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Works" ADD COLUMN     "aprovedBy" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
