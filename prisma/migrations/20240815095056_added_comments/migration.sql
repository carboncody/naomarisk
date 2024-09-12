-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "ChildRisk" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "probability" INTEGER,
    "consequence" INTEGER,
    "comment" TEXT,
    "activity" TEXT,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "ChildRisk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildRisk" ADD CONSTRAINT "ChildRisk_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Risk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
