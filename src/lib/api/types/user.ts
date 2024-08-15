import type { UserRole } from '@models';

export type CreateUserForm = {
  fullName: string;
  email: string;
  jobDescription?: string;
  role: UserRole;
  company?: string;
  cvr?: string;
};

export type UpdateUserForm = Partial<CreateUserForm>;
