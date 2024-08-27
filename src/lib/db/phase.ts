'use server';

import { type Phase } from '@prisma/client';
import { db } from '@server/db';
import type { ActionResponse, CreatePhaseForm } from '../api/types';

export async function PhaseService() {
  async function getPhase(id: string) {
    return db.phase.findUnique({
      where: { id },
      include: { project: true, projectRisks: true, mitigationRisks: true },
    });
  }

  async function getPhasesForProject(projectId: string) {
    return db.phase.findMany({
      where: { projectId },
      include: { projectRisks: true, mitigationRisks: true },
    });
  }

  async function createPhase(
    projectId: string,
    data: CreatePhaseForm,
  ): Promise<ActionResponse<Phase>> {
    try {
      const project = await db.project.findUnique({ where: { id: projectId } });

      if (!project) {
        return {
          error: {
            code: 404,
            message: `Project with id ${projectId} not found`,
          },
        };
      }

      const createdPhase = await db.phase.create({
        data: {
          ...data,
          project: { connect: { id: projectId } },
        },
      });

      return { data: createdPhase };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      };
    }
  }

  async function updatePhase(
    id: string,
    data: Partial<{ name: string; startDate: Date; endDate: Date }>,
  ): Promise<ActionResponse<Phase>> {
    try {
      const updatedPhase = await db.phase.update({
        where: { id },
        data,
      });

      return { data: updatedPhase };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      };
    }
  }

  async function deletePhase(id: string): Promise<ActionResponse<Phase>> {
    try {
      const deletedPhase = await db.phase.delete({ where: { id } });
      return { data: deletedPhase };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      };
    }
  }

  async function addRiskToPhase(
    phaseId: string,
    riskId: string,
    type: 'project' | 'mitigation',
  ): Promise<ActionResponse<Phase>> {
    try {
      const updatedPhase = await db.phase.update({
        where: { id: phaseId },
        data: {
          [type === 'project' ? 'projectRisks' : 'mitigationRisks']: {
            connect: { id: riskId },
          },
        },
        include: { projectRisks: true, mitigationRisks: true },
      });

      return { data: updatedPhase };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      };
    }
  }

  return {
    getPhase,
    getPhasesForProject,
    createPhase,
    updatePhase,
    deletePhase,
    addRiskToPhase,
  };
}
