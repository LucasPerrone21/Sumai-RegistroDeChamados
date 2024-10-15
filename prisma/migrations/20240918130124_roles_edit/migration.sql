/*
  Warnings:

  - You are about to drop the column `role_id` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Access` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'TECHNICAL_ADMIN', 'TECHNICAL_MANAGER');

-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_role_id_fkey";

-- AlterTable
ALTER TABLE "Access" DROP COLUMN "role_id",
ADD COLUMN     "company_id" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Roles";

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
