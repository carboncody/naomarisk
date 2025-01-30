import { env } from '@env';
import type { ActionResponse } from '@lib/api/types';
import {
  type CreateCsmProjectForm,
  type UpdateCsmProjectForm,
} from '@lib/api/types/csmProjet';
import { sendProjectAssignmentEmail } from '@lib/services/email';
import { UserRole } from '@prisma/client';
import { db } from '@server/db';

export async function CsmProjectService() {
  async function getMyProjects(email: string) {
    return db.csmProject.findMany({
      where: {
        csmProjectUsers: {
          some: { user: { email } },
        },
      },
      include: {
        hazards: true,
        csmProjectUsers: {
          include: { user: true },
        },
        company: true,
      },
    });
  }

  async function getProjectsInCompany(email: string) {
    return db.csmProject.findMany({
      where: {
        company: {
          users: { some: { email } },
        },
      },
      include: {
        hazards: true,
        csmProjectUsers: {
          include: { user: true },
        },
        company: true,
      },
    });
  }

  async function getProjectFromId(id: string): Promise<CSMProject | null> {
    return db.csmProject.findUnique({
      where: { id },
      include: {
        hazards: true,
        csmProjectUsers: {
          include: {
            user: true,
          },
        },
        company: true,
      },
    });
  }

  async function createProject(
    employeeEmail: string,
    createCsmProjectForm: CreateCsmProjectForm,
  ): Promise<ActionResponse<CSMProject>> {
    const { assignments, ...rest } = createCsmProjectForm;

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

      const csmProject = await db.csmProject.create({
        data: {
          ...rest,
          company: {
            connect: {
              id: company.id,
            },
          },
          csmProjectUsers: assignments
            ? {
                create: assignments.map((assignment) => ({
                  userId: assignment.userId,
                  role: assignment.role,
                })),
              }
            : undefined,
        },
        include: {
          csmProjectUsers: {
            include: { user: true },
          },
        },
      });

      return {
        data: csmProject,
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
    updateCsmProjectForm: UpdateCsmProjectForm,
  ): Promise<ActionResponse<CSMProject>> {
    const { assignments, ...rest } = updateCsmProjectForm;

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

      const prevProject = await db.csmProject.findUnique({
        where: { id },
        include: {
          csmProjectUsers: {
            include: { user: true },
          },
        },
      });

      if (!prevProject) {
        return {
          error: {
            code: 404,
            message: `Project with id ${id} not found`,
          },
        };
      }

      const updatedProject = await db.csmProject.update({
        where: { id },
        data: {
          ...rest,
          csmProjectUsers: assignments
            ? {
                deleteMany: {
                  projectId: id,
                },
                createMany: {
                  data: assignments.map((assignment) => ({
                    userId: assignment.userId,
                    role: assignment.role,
                  })),
                },
              }
            : undefined,
        },
        include: {
          csmProjectUsers: {
            include: { user: true },
          },
        },
      });

      if (assignments && assignments.length > 0) {
        const projectProjectEmails = prevProject.csmProjectUsers.map(
          (csmProjectUsers) => csmProjectUsers.user.email,
        );
        const newProjectProjectEmails = updatedProject.csmProjectUsers.map(
          (csmProjectUsers) => csmProjectUsers.user.email,
        );

        const newAssignedEmails = newProjectProjectEmails.filter(
          (email) => !projectProjectEmails.includes(email),
        );

        void sendProjectAssignmentEmail({
          emails: newAssignedEmails,
          project: updatedProject.name,
          link: `${env.frontendUrl}/projects/${updatedProject.id}`,
        });
      }

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
