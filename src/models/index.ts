// Enums
export enum RiskStatus {
  New = 'NEW',
  Open = 'OPEN',
  Closed = 'CLOSED',
}

export enum UserRole {
  User = 'USER',
  Manager = 'MANAGER',
  Owner = 'OWNER',
}

export enum UserStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Inactive = 'INACTIVE',
}

// Interfaces
export interface Company {
  id: string;
  name: string;
  email: string;
  cvr: string;
  createdAt: Date;
  updatedAt: Date;
  projects: Project[];
  users: User[];
  contact: Contact;
  contactId: string;
}

export interface Contact {
  id: string;
  email: string;
  fullName: string;
  address?: string;
  phone?: string;
  website?: string;
  users: User[];
  companies: Company[];
}

export interface User {
  projectIds: unknown;
  fullName: string;
  id: string;
  email: string;
  jobDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  company: Company;
  companyId: string;
  contact: Contact;
  contactId: string;
  projectUsers: ProjectUser[];
  risks: Risk[];
}

export interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  budget?: string;
  riskRegisterDescription?: string;
  riskReportIntro?: string;
  riskReportDocumentId?: string;
  company: Company;
  companyId: string;
  risks: Risk[];
  projectUsers: ProjectUser[];
}

export interface ProjectUser {
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: string;
  project: Project;
  projectId: string;
}

export interface Risk {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  customId: string;
  description: string;
  probability: number;
  consequence: number;
  status: RiskStatus;
  comment?: string;
  activity?: string;
  riskowner: User;
  userId: string;
  project: Project;
  projectId: string;
  riskOwnerUserId: string;
  user: User[];
}
