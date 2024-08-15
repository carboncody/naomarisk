'use server';

import { UserRole } from '@models';
import { type User } from '@prisma/client';
import { db } from '@server/db';
import type {
  ActionResponse,
  CreateUserForm,
  UpdateUserForm,
} from '../api/types';

export async function UserService() {
  async function getMe(email: string) {
    return db.user.findUnique({ where: { email }, include: { company: true } });
  }

  async function getUsersInCompany(email: string) {
    return db.user.findMany({
      where: {
        company: {
          users: { some: { email } },
        },
      },
    });
  }

  async function getUserFromId(id: string) {
    return db.user.findUnique({ where: { id } });
  }

  async function getUserFromEmail(
    email: string,
  ): Promise<ActionResponse<User>> {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return {
        error: {
          code: 404,
          message: `User with email ${email} not found`,
        },
      };
    }

    return { data: user };
  }

  async function updateOrCreateUser(email: string) {
    return await db.user.upsert({
      where: {
        email: email,
      },
      create: {
        email: email,
        fullName: email,
        role: UserRole.Owner,
        company: {
          create: {
            name: 'Dit firma',
            email,
          },
        },
      },
      update: {},
      include: { company: true },
    });
  }

  async function updateUser(
    editorEmail: string,
    updateUserForm: UpdateUserForm,
  ): Promise<ActionResponse<User>> {
    const { fullName, email, jobDescription, role } = updateUserForm;

    try {
      const user = await db.user.findUnique({
        where: {
          email: editorEmail,
        },
      });

      if (!user) {
        return {
          error: {
            code: 404,
            message: `User with email ${editorEmail} not found`,
          },
        };
      }

      if (user.role === UserRole.User) {
        return {
          error: {
            code: 403,
            message: 'You do not have permission to update users',
          },
        };
      }

      const createdUser = await db.user.update({
        where: { email: user.email },
        data: {
          fullName: fullName,
          jobDescription: jobDescription,
          role: role,
        },
      });

      return { data: createdUser };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: 'Internal Server Error',
        },
      };
    }
  }

  async function inviteUser(creatorEmail: string, data: CreateUserForm) {
    try {
      const creatorsCompany = await db.user.findUnique({
        where: { email: creatorEmail },
        include: { company: true },
      });

      if (!creatorsCompany) {
        throw new Error('Creator not found');
      }

      if (!creatorsCompany) {
        return {
          error: {
            code: 404,
            message: `User with email ${creatorEmail} not found`,
          },
        };
      }

      if (creatorsCompany.role === UserRole.User) {
        return {
          error: {
            code: 403,
            message: 'You do not have permission to update this project',
          },
        };
      }
      const createUser = await db.user.create({
        data: {
          email: data.email,
          fullName: data.email,
          role: data.role,
          company: {
            connect: { id: creatorsCompany.companyId },
          },
        },
        include: { company: true },
      });
      return {
        data: createUser,
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

  async function deleteUser(email: string) {
    return db.user.delete({ where: { email } });
  }

  return {
    getMe,
    getUsersInCompany,
    getUserFromEmail,
    getUserFromId,
    updateOrCreateUser,
    updateUser,
    inviteUser,
    deleteUser,
  };
}
