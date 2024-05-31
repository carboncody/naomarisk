import type { ActionResponse } from '@lib/api/types';
import { UserRole, type Project } from '@prisma/client';
import { db } from '@server/db';
import type { CreateProjectForm, UpdateProjectForm } from '../api/types';

export async function ProjectService() {
  async function getMyProjects(email: string) {
    return db.project.findMany({
      where: {
        projectUsers: {
          some: { user: { email } },
        },
      },
      include: {
        risks: true,
        projectUsers: {
          include: { user: true },
        },
        company: true,
      },
    });
  }

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
    employeeEmail: string,
    createProjectForm: CreateProjectForm,
  ): Promise<ActionResponse<Project>> {
    const { projectUserIds, ...rest } = createProjectForm;

    try {
      const creator = await db.user.findUnique({
        where: {
          email: employeeEmail,
        },
        include: { company: true },
      });

      if (creator?.role === UserRole.USER) {
        return {
          error: {
            code: 403,
            message: 'You do not have permission to create a project',
          },
        };
      }

      const company = creator?.company;

      if (!company) {
        return {
          error: {
            code: 400,
            message: `Employee ${employeeEmail} company not found`,
          },
        };
      }

      const project = await db.project.create({
        data: {
          ...rest,
          company: {
            connect: {
              id: company.id,
            },
          },
          projectUsers: projectUserIds
            ? {
                create: projectUserIds.map((id) => ({ userId: id })),
              }
            : undefined,
        },
      });

      return {
        data: project,
      };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      };
    }
  }

  async function updateProject(
    userEmail: string,
    id: string,
    updateProjectForm: UpdateProjectForm,
  ): Promise<ActionResponse<Project>> {
    const { projectUserIds, ...rest } = updateProjectForm;

    try {
      const user = await db.user.findUnique({
        where: {
          email: userEmail,
        },
        include: {
          projectUsers: {
            where: {
              projectId: id,
            },
          },
        },
      });

      if (!user) {
        return {
          error: {
            code: 404,
            message: `User with email ${userEmail} not found`,
          },
        };
      }

      if (user.role === UserRole.USER) {
        return {
          error: {
            code: 403,
            message: 'You do not have permission to update this project',
          },
        };
      }

      const projectUser = user.projectUsers.find((pu) => pu.projectId === id);
      if (!projectUser) {
        return {
          error: {
            code: 403,
            message: 'You are not a part of this project',
          },
        };
      }

      const updatedProject = await db.project.update({
        where: { id },
        data: {
          ...rest,
          projectUsers: projectUserIds
            ? {
                deleteMany: {
                  projectId: id,
                },
                createMany: {
                  data: projectUserIds.map((id) => ({ userId: id })),
                },
              }
            : undefined,
        },
      });

      return {
        data: updatedProject,
      };
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
    getMyProjects,
    getProjectsInCompany,
    getProjectFromId,
    createProject,
    updateProject,
  };
}
