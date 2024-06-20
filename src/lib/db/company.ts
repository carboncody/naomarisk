'use server';

import { db } from '@server/db';
import type { UpdateCompanyForm } from '../api/types';

export async function CompanyService() {
  async function getCompany(email: string) {
    return db.company.findUnique({ where: { email } });
  }

  async function getUserCompany(userEmail: string) {
    return db.company.findFirst({
      where: {
        users: {
          some: {
            email: userEmail,
          },
        },
      },
      include: {
        users: true,
        projects: {
          include: {
            risks: true,
            projectUsers: true,
          },
        },
      },
    });
  }

  async function getCompanyFromId(id: string) {
    return db.company.findUnique({ where: { id } });
  }

  async function updateCompany(
    employeeEmail: string,
    updateCompanyForm: UpdateCompanyForm,
  ) {
    const { name, cvr, email } = updateCompanyForm;
    const user = await db.user.findUnique({
      where: {
        email: employeeEmail,
      },
    });

    return db.company.update({
      where: {
        id: user?.companyId,
      },
      data: {
        name,
        cvr,
        email,
      },
    });
  }

  return {
    getCompany,
    getUserCompany,
    getCompanyFromId,
    updateCompany,
  };
}
