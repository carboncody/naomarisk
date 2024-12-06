-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('MEMBER', 'MANAGER');

-- AlterTable
ALTER TABLE "ProjectUser" ADD COLUMN     "role" "ProjectRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "Risk" ADD COLUMN     "riskManagerUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_riskManagerUserId_fkey" FOREIGN KEY ("riskManagerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
