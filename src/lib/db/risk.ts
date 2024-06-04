import type { Risk } from '@prisma/client';
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
    const risksInProject = await db.risk.findMany({
      where: { projectId },
      select: { customId: true },
    });

    const highestRisk =
      risksInProject.length > 0
        ? risksInProject.reduce((max, risk) => {
            return risk.customId > max.customId ? risk : max;
          }, risksInProject[0] as Risk)
        : 0;

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
          customId: +highestRisk + 1,
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
    createRisk,
    updateRisk,
  };
}