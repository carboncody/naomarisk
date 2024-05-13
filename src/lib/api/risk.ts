import { db } from '@server/db';

export async function RiskService() {
  async function getRisk(projectId: string) {
    return db.risk.findMany({
      where: {
        projectId,
      },
    });
  }
  return {
    getRisk,
  };
}
