'use server';

import { UserRole } from '@models';
import { db } from '@server/db';
import type { CreateUserForm, UpdateUserForm } from './types';

export async function UserService() {
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

  async function updateUser(id: string, updateUserForm: UpdateUserForm) {
    const { contact, ...rest } = updateUserForm;
    return db.user.update({
      where: { id },
      data: {
        ...rest,
        contact: {
          update: {
            ...contact,
          },
        },
      },
    });
  }

  async function inviteUser(creatorEmail: string, data: CreateUserForm) {
    const creatorsCompany = await db.user.findUnique({
      where: { email: creatorEmail },
      include: { company: true },
    });

    if (!creatorsCompany) {
      throw new Error('Creator not found');
    }

    return db.user.create({
      data: {
        email: data.email,
        fullName: data.email,
        role: data.role,
        company: {
          connect: { id: creatorsCompany.companyId },
        },
      },
    });
  }

  return {
    getUsersInCompany,
    getUserFromId,
    updateOrCreateUser,
    updateUser,
    inviteUser,
  };
}
