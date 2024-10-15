-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Works" ADD COLUMN     "status" "WorkStatus" NOT NULL DEFAULT 'PENDING';
