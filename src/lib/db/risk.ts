import { db } from '@server/db';
import { type CreateRiskForm } from '../api/types';
import { type UpdateRiskForm } from '../api/types/risk';

export async function RiskService() {
  async function getRisk(projectId: string) {
    return db.risk.findMany({
      where: { projectId },
      include: {
        riskowner: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async function createRisk(projectId: string, data: CreateRiskForm) {
    try {
      const risk = await db.risk.create({
        data: {
          ...data,
          projectId,
          probability: +data.probability,
          consequence: +data.consequence,
        },
      });
      return risk;
    } catch (error) {
      throw error;
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
