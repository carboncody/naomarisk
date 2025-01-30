/*
  Warnings:

  - You are about to drop the column `projectId` on the `Hazard` table. All the data in the column will be lost.
  - You are about to drop the column `csmProjectId` on the `ProjectUser` table. All the data in the column will be lost.
  - You are about to drop the `CSMProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CSMProjectToContact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `csmProjectId` to the `Hazard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CSMProject" DROP CONSTRAINT "CSMProject_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Hazard" DROP CONSTRAINT "Hazard_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUser" DROP CONSTRAINT "ProjectUser_csmProjectId_fkey";

-- DropForeignKey
ALTER TABLE "_CSMProjectToContact" DROP CONSTRAINT "_CSMProjectToContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_CSMProjectToContact" DROP CONSTRAINT "_CSMProjectToContact_B_fkey";

-- AlterTable
ALTER TABLE "Hazard" DROP COLUMN "projectId",
ADD COLUMN     "csmProjectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectUser" DROP COLUMN "csmProjectId";

-- DropTable
DROP TABLE "CSMProject";

-- DropTable
DROP TABLE "_CSMProjectToContact";

-- CreateTable
CREATE TABLE "CsmProject" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'OPEN',
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "budget" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "CsmProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CsmProjectUser" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "csmProjectId" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "CsmProjectUser_pkey" PRIMARY KEY ("userId","csmProjectId")
);

-- CreateTable
CREATE TABLE "_ContactToCsmProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToCsmProject_AB_unique" ON "_ContactToCsmProject"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToCsmProject_B_index" ON "_ContactToCsmProject"("B");

-- AddForeignKey
ALTER TABLE "CsmProject" ADD CONSTRAINT "CsmProject_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CsmProjectUser" ADD CONSTRAINT "CsmProjectUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CsmProjectUser" ADD CONSTRAINT "CsmProjectUser_csmProjectId_fkey" FOREIGN KEY ("csmProjectId") REFERENCES "CsmProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hazard" ADD CONSTRAINT "Hazard_csmProjectId_fkey" FOREIGN KEY ("csmProjectId") REFERENCES "CsmProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToCsmProject" ADD CONSTRAINT "_ContactToCsmProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToCsmProject" ADD CONSTRAINT "_ContactToCsmProject_B_fkey" FOREIGN KEY ("B") REFERENCES "CsmProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
