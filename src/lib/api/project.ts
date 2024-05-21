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
      include: {
        risks: true,
        projectUsers: {
          include: { user: true },
        },
        company: true,
      },
    });
  }

  async function createProject(
    email: string,
    createProjectForm: CreateProjectForm,
  ) {
    const { projectUserIds, ...rest } = createProjectForm;

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
    const { projectUserIds, ...rest } = updateProjectForm;
    return db.project.update({
      where: { id },
      data: {
        ...rest,
        projectUsers: projectUserIds
          ? {
              deleteMany: {
                projectId: id,
              },
              createMany: {
                data: projectUserIds,
              },
            }
          : undefined,
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
