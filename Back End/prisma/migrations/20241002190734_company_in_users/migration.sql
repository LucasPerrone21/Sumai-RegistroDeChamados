-- DropForeignKey
ALTER TABLE "Works" DROP CONSTRAINT "Works_createdBy_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company_id" INTEGER DEFAULT 0;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
