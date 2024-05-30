import type { CreateContactForm } from './contact';

export type CreateCompanyForm = {
  cvr: string;
  contact: CreateContactForm;
};

export interface UpdateCompanyForm {
  name?: string;
  cvr?: string;
  email?: string;
}
