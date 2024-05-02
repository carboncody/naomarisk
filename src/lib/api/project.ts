import type { Project } from '@prisma/client';
import { db } from '@server/db';
import type { CreateProjectForm, UpdateProjectForm } from './types';

export async function ProjectService() {
  async function getProjectsInCompany(email: string) {
    return db.project.findMany({
      where: {
        company: {
          users: { some: { email } },
        },
      },
    });
  }

  async function getProjectFromId(id: string): Promise<Project | null> {
    return db.project.findUnique({
      where: { id },
      include: { risks: true, projectUsers: true, company: true },
    });
  }

  async function createProject(
    email: string,
    createProjectForm: CreateProjectForm,
  ) {
    const { riskIds, projectUserIds, ...rest } = createProjectForm;

    const company = await db.company.findUnique({
      where: {
        email: email,
      },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return db.project.create({
      data: {
        ...rest,
        company: {
          connect: {
            id: company.id,
          },
        },
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

  async function updateProject(
    id: string,
    updateProjectForm: UpdateProjectForm,
  ) {
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

  return {
    getProjectsInCompany,
    getProjectFromId,
    createProject,
    updateProject,
  };
}
