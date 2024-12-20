import { env } from '@env';
import { sendRiskAssignmentEmail } from '@lib/services/email';
import { db } from '@server/db';
import { type CreateRiskForm } from '../api/types';
import { type UpdateRiskForm } from '../api/types/risk';

export async function RiskService() {
  async function getRisk(id: string) {
    return db.risk.findUnique({
      where: { id },
      include: {
        riskOwner: true,
        riskManager: true,
        project: {
          include: { projectUsers: true, phases: true },
        },
        projectPhase: true,
        mitigationPhase: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async function getProjectRisks(projectId: string) {
    const risks = await db.risk.findMany({
      where: { projectId },
      include: {
        riskOwner: true,
        riskManager: true,
        projectPhase: true,
        mitigationPhase: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return risks;
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
          projectPhaseId: data.projectPhaseId ?? null,
          mitigationPhaseId: data.mitigationPhaseId ?? null,
        },
        include: { riskOwner: true, riskManager: true },
      });

      void db.project.update({
        where: { id: newRisk.projectId },
        data: {
          updatedAt: new Date(),
        },
      });

      if (newRisk.riskOwner) {
        void sendRiskAssignmentEmail({
          email: newRisk.riskOwner.email,
          risk: newRisk.description,
          link: `${env.frontendUrl}/projects/${projectId}/risks/${newRisk.id}`,
        });
      }

      if (newRisk.riskManager) {
        void sendRiskAssignmentEmail({
          email: newRisk.riskManager.email,
          risk: newRisk.description,
          link: `${env.frontendUrl}/projects/${projectId}/risks/${newRisk.id}`,
        });
      }

      return newRisk;
    } catch (error) {
      throw new Error();
    }
  }

  async function updateRisk(id: string, data: UpdateRiskForm) {
    let newOwner = false;

    if (data.riskOwnerUserId) {
      const prevRiskOwner = await db.risk.findUniqueOrThrow({
        where: { id },
        include: { riskOwner: true },
      });
      if (prevRiskOwner.riskOwnerUserId !== data.riskOwnerUserId) {
        newOwner = true;
      }
    }

    const updatedRisk = await db.risk.update({
      where: { id },
      data: {
        ...data,
        projectPhaseId: data.projectPhaseId,
        mitigationPhaseId: data.mitigationPhaseId,
      },
      include: { riskOwner: true },
    });

    void db.project.update({
      where: { id: updatedRisk.projectId },
      data: {
        updatedAt: new Date(),
      },
    });

    if (newOwner && updatedRisk.riskOwner) {
      void sendRiskAssignmentEmail({
        email: updatedRisk.riskOwner.email,
        risk: updatedRisk.description,
        link: `${env.frontendUrl}/projects/${updatedRisk.projectId}/risks/${updatedRisk.id}`,
      });
    }
  }

  async function deleteRisk(id: string) {
    return await db.risk.delete({ where: { id } });
  }

  return {
    getRisk,
    getProjectRisks,
    deleteRisk,
    createRisk,
    updateRisk,
  };
}
