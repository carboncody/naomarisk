import { db } from '@server/db';
import { type CreateRiskForm } from './types';

export async function RiskService() {
  async function getRisk(projectId: string) {
    return db.risk.findMany({
      where: {
        projectId,
      },
    });
  }

  async function createRisk(projectId: string, data: CreateRiskForm) {
    return db.risk.create({
      data: {
        ...data,
        projectId,
        riskownerUserId: data.riskOwnerId,
      },
    });
  }

  return {
    getRisk,
    createRisk,
  };
}
