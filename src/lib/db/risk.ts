import { db } from '@server/db';
import { type CreateRiskForm } from '../api/types';
import { type UpdateRiskForm } from '../api/types/risk';

export async function RiskService() {
  async function getRisk(projectId: string) {
    return db.risk.findMany({
      where: { projectId },
      include: {
        riskowner: true,
      },
    });
  }

  async function createRisk(projectId: string, data: CreateRiskForm) {
    try {
      const risksInProject = await db.risk.findMany({
        where: { projectId },
        select: { customId: true },
      });

      const highestRiskCustomId =
        risksInProject.length > 0
          ? Math.max(...risksInProject.map((risk) => risk.customId))
          : 0;

      const newRisk = await db.risk.create({
        data: {
          ...data,
          customId: highestRiskCustomId + 1,
          projectId,
          probability:
            data.probability !== undefined ? +data.probability : undefined,
          consequence:
            data.consequence !== undefined ? +data.consequence : undefined,
        },
      });

      return newRisk;
    } catch (error) {
      throw new Error();
    }
  }

  async function updateRisk(id: string, data: UpdateRiskForm) {
    await db.risk.findUnique({
      where: { id },
    });

    try {
      await db.risk.update({
        where: { id },
        data: {
          ...data,
          probability: data.probability ? +data.probability : undefined,
          consequence: data.consequence ? +data.consequence : undefined,
        },
      });
    } catch (error) {
      console.error('Error updating risk:', error);
      throw error;
    }
  }

  return {
    getRisk,
    createRisk,
    updateRisk,
  };
}
