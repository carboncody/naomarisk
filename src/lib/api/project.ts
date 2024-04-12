import type { Project } from '@prisma/client';
import { db } from '@server/db';
import type { CreateProjectForm, UpdateProjectForm } from './types';

export class ProjectService {
  static async getProjectsInCompany(companyId: string) {
    return db.project.findMany({
      where: { companyId },
    });
  }

  static async getProjectFromId(id: string): Promise<Project | null> {
    return db.project.findUnique({
      where: { id },
      include: { risks: true, projectUsers: true, company: true },
    });
  }

  static async createProject(
    companyId: string,
    createProjectForm: CreateProjectForm,
  ) {
    const { riskIds, projectUserIds, ...rest } = createProjectForm;
    return db.project.create({
      data: {
        ...rest,
        companyId,
        risks: riskIds
          ? {
              connect: riskIds,
            }
          : undefined,
        projectUsers: {
          create: projectUserIds,
        },
      },
    });
  }

  static async updateProject(id: string, updateProjectForm: UpdateProjectForm) {
    const { riskIds, projectUserIds, ...rest } = updateProjectForm;
    const riskIdsAssociatedWithProject = await db.risk.findMany({
      where: {
        projectId: id,
      },
      select: {
        id: true,
      },
    });
    return db.project.update({
      where: { id },
      data: {
        ...rest,
        risks: {
          disconnect: riskIdsAssociatedWithProject,
          connect: riskIds,
        },
        projectUsers: {
          create: projectUserIds,
        },
      },
    });
  }
}
