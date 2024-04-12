import type { UserRole } from '@models';
import type { CreateCompanyForm } from './company';
import type { CreateContactForm, UpdateContactForm } from './contact';

export type CreateUserForm = {
  name: string;
  jobDescription?: string;
  role: UserRole;
  contact: CreateContactForm;
  company: CreateCompanyForm;
};

export type UpdateUserForm = {
  name?: string;
  jobDescription?: string;
  role?: UserRole;
  contact?: UpdateContactForm;
};
