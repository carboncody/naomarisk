import type { UserRole } from '@models';

export type CreateUserForm = {
  fullName: string;
  email: string;
  jobDescription?: string;
  role: UserRole;
};

export type UpdateUserForm = Partial<CreateUserForm>;
