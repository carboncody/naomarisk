export type CreateContactForm = {
  email: string;
  fullName: string;
  address?: string;
  phone?: string;
  website?: string;
};

export type UpdateContactForm = Partial<CreateContactForm>;
