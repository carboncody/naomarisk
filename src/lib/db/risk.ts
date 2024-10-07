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
        riskowner: true,
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
    return db.risk.findMany({
      where: { projectId },
      include: {
        riskowner: true,
        projectPhase: true,
        mitigationPhase: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: {
        updatedAt: 'desc',
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
          projectPhaseId: data.projectPhaseId ?? null,
          mitigationPhaseId: data.mitigationPhaseId ?? null,
        },
        include: { riskowner: true },
      });

      void db.project.update({
        where: { id: newRisk.projectId },
        data: {
          updatedAt: new Date(),
        },
      });

      if (newRisk.riskowner) {
        void sendRiskAssignmentEmail({
          email: newRisk.riskowner.email,
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
        include: { riskowner: true },
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
      include: { riskowner: true },
    });

    void db.project.update({
      where: { id: updatedRisk.projectId },
      data: {
        updatedAt: new Date(),
      },
    });

    if (newOwner && updatedRisk.riskowner) {
      void sendRiskAssignmentEmail({
        email: updatedRisk.riskowner.email,
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
