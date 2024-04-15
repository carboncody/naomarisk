import type { UserRole } from '@models';
import { db } from '@server/db';
import type { CreateUserForm, UpdateUserForm } from './types';

export class UserService {
  static async getUsersInCompany(companyId: string) {
    return db.user.findMany({
      where: { companyId },
    });
  }

  static async getUserFromId(id: string) {
    return db.user.findUnique({ where: { id } });
  }

  static async upsertUser(email: string, createUserForm: CreateUserForm) {
    const { contact, company, ...rest } = createUserForm;
    return db.user.upsert({
      where: { id: email },
      create: {
        ...rest,
        contact: {
          create: {
            ...contact,
          },
        },
        company: {
          connect: { id: company.id },
        },
      },
      update: {},
    });
  }

  static async updateUser(id: string, updateUserForm: UpdateUserForm) {
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

  static async inviteUser(email: string, role: UserRole, companyId: string) {
    return db.user.create({
      data: {
        role,
        company: {
          connect: { id: companyId },
        },
        contact: {
          create: {
            email,
            fullName: email,
          },
        },
      },
    });
  }
}
