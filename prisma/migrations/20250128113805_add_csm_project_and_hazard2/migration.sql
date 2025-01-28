/*
  Warnings:

  - Changed the type of `status` on the `Hazard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `revisionDate` on table `Hazard` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CSMStatus" AS ENUM ('PLANNING', 'ACTIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "Hazard" DROP COLUMN "status",
ADD COLUMN     "status" "CSMStatus" NOT NULL,
ALTER COLUMN "identifiedDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "revisionDate" SET NOT NULL;
