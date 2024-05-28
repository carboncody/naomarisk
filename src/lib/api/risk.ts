import { db } from '@server/db';
import { type CreateRiskForm } from './types';
import { type UpdateRiskForm } from './types/risk';

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

  async function createRisk(
    projectId: string,
    data: CreateRiskForm,
  ): Promise<{ errorMsg: string; code: number }> {
    try {
      await db.risk.create({
        data: {
          ...data,
          projectId,
          probability: +data.probability,
          consequence: +data.consequence,
        },
      });
      return { errorMsg: '', code: 200 };
    } catch (error) {
      return {
        errorMsg: error.message || 'An error occurred',
        code: error.code || 500,
      };
    }
  }

  async function updateRisk(
    projectId: string,
    data: UpdateRiskForm,
  ): Promise<{ errorMsg: string; code: number }> {
    try {
      await db.risk.update({
        where: { id: data.id },
        data: {
          ...data,
          probability: +data.probability,
          consequence: +data.consequence,
        },
      });
      return { errorMsg: '', code: 200 };
    } catch (error) {
      return {
        errorMsg: error.message || 'An error occurred',
        code: error.code || 500,
      };
    }
  }

  return {
    getRisk,
    createRisk,
    updateRisk,
  };
}
