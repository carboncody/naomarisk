// Enums
export enum RiskStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
}

export enum ProjectStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
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

export enum ProjectRole {
  MEMBER = 'MEMBER',
  MANAGER = 'MANAGER',
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
  users?: User[];
  companies?: Company[];
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
  avatarUrl?: string;
}

export interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  startDate: Date;
  status: ProjectStatus;
  dueDate: Date;
  budget?: string;
  riskRegisterDescription?: string;
  riskReportIntro?: string;
  riskReportDocumentId?: string;
  company: Company;
  companyId: string;
  risks: Risk[];
  projectUsers: ProjectUser[];
  phases: Phase[];
}

export interface ProjectUser {
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: string;
  project: Project;
  projectId: string;
  role: ProjectRole;
}

export interface Risk {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  customId: number;
  description: string;
  probability: number | null;
  consequence: number | null;
  timeProbability: number | null;
  timeConsequence: number | null;
  economicProbability: number | null;
  economicConsequence: number | null;
  status: RiskStatus;
  comments: Comment[];
  activity?: string;
  riskOwner: User;
  riskManager: User;
  userId: string;
  project: Project;
  projectId: string;
  riskOwnerUserId: string;
  riskManagerUserId: string;
  user: User[];
  mitigationPhase: Phase | null;
  mitigationPhaseId: string | null;
  projectPhase: Phase | null;
  projectPhaseId: string | null;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
  authorId: string;
  author: User;
  resolvedById: string | null;
  resolvedBy: User | null;
  risk: Risk;
  riskId: string;
}

export interface Phase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  startDate: Date;
  endDate: Date;
  project: Project;
  projectId: string;
  projectRisks: Risk[];
  mitigationRisks: Risk[];
  description: string;
}
