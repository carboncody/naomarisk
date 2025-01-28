-- AlterTable
ALTER TABLE "ProjectUser" ADD COLUMN     "csmProjectId" TEXT;

-- CreateTable
CREATE TABLE "CSMProject" (
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

    CONSTRAINT "CSMProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hazard" (
    "id" TEXT NOT NULL,
    "customId" SERIAL NOT NULL,
    "status" "RiskStatus" NOT NULL,
    "identifiedDate" TIMESTAMP(3) NOT NULL,
    "version" TEXT NOT NULL,
    "revisionDate" TIMESTAMP(3),
    "responsibleUserId" TEXT,
    "unwantedState" TEXT NOT NULL,
    "cause" TEXT NOT NULL,
    "underlyingCauses" TEXT NOT NULL,
    "comments" TEXT,
    "accidentCategory" TEXT NOT NULL,
    "personCategory" TEXT NOT NULL,
    "consequence" TEXT NOT NULL,
    "acceptanceCriteriaBefore" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "changeType" TEXT NOT NULL,
    "projectActivity" TEXT NOT NULL,
    "activityCompletionDate" TIMESTAMP(3),
    "csmRaRiskAcceptancePrinciple" TEXT NOT NULL,
    "riskAcceptanceReferences" TEXT,
    "riskReductionMeasures" TEXT NOT NULL,
    "riskReductionComments" TEXT NOT NULL,
    "safetyRequirementDocs" TEXT NOT NULL,
    "measureStatus" TEXT NOT NULL,
    "riskLevelAfterMeasures" TEXT NOT NULL,
    "appendix1" TEXT,
    "appendix2" TEXT,
    "appendix3" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Hazard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CSMProjectToContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CSMProjectToContact_AB_unique" ON "_CSMProjectToContact"("A", "B");

-- CreateIndex
CREATE INDEX "_CSMProjectToContact_B_index" ON "_CSMProjectToContact"("B");

-- AddForeignKey
ALTER TABLE "ProjectUser" ADD CONSTRAINT "ProjectUser_csmProjectId_fkey" FOREIGN KEY ("csmProjectId") REFERENCES "CSMProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CSMProject" ADD CONSTRAINT "CSMProject_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hazard" ADD CONSTRAINT "Hazard_responsibleUserId_fkey" FOREIGN KEY ("responsibleUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hazard" ADD CONSTRAINT "Hazard_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "CSMProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CSMProjectToContact" ADD CONSTRAINT "_CSMProjectToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "CSMProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CSMProjectToContact" ADD CONSTRAINT "_CSMProjectToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
