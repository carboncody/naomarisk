import type { UserRole } from '@models';
import type { UpdateContactForm } from './contact';

export type CreateUserForm = {
  name: string;
  email: string;
  jobDescription?: string;
  role: UserRole;
};

export type UpdateUserForm = {
  name?: string;
  jobDescription?: string;
  role?: UserRole;
  contact?: UpdateContactForm;
};
