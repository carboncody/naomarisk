'use server';

import { UserRole } from '@models';
import { db } from '@server/db';
import type { UpdateUserForm } from './types';

export async function UserService() {
  async function getUsersInCompany(companyId: string) {
    return db.user.findMany({
      where: { companyId },
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

  async function inviteUser(email: string, role: UserRole, companyId: string) {
    return db.user.create({
      data: {
        email,
        fullName: email,
        role,
        company: {
          connect: { id: companyId },
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
