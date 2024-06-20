import { db } from '@server/db';
import { type CreateRiskForm } from '../api/types';
import { type UpdateRiskForm } from '../api/types/risk';

export async function RiskService() {
  async function getRisk(id: string) {
    return db.risk.findUnique({
      where: { id },
      include: {
        riskowner: true,
        project: {
          include: { projectUsers: true },
        },
      },
    });
  }

  async function getProjectRisks(projectId: string) {
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
          customId: +highestRiskCustomId + 1,
          projectId,
          probability: data.probability ? +data.probability : null,
          consequence: data.consequence ? +data.consequence : null,
        },
      });

      return newRisk;
    } catch (error) {
      throw new Error();
    }
  }

  async function updateRisk(id: string, data: UpdateRiskForm) {
    console.info('updateRisk: ', data);
    await db.risk.update({
      where: { id },
      data: {
        ...data,
        probability: data.probability ? +data.probability : null,
        consequence: data.consequence ? +data.consequence : null,
      },
    });
  }

  return {
    getRisk,
    getProjectRisks,
    createRisk,
    updateRisk,
  };
}
