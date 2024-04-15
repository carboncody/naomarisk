import type { CreateContactForm, UpdateContactForm } from './contact';

export type CreateCompanyForm = {
  cvr: string;
  contact: CreateContactForm;
};

export type UpdateCompanyForm = {
  name?: string;
  cvr?: string;
  contact?: UpdateContactForm;
};
