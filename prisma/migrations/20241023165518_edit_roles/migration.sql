/*
  Warnings:

  - You are about to drop the `Access` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'TECHNICAL_MANAGER';

-- DropTable
DROP TABLE "Access";
