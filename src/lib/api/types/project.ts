import type { ProjectStatus } from '@models';

export type CreateProjectForm = {
  name: string;
  description: string;
  startDate: Date | null;
  dueDate: Date | null;
  budget?: string;
  status: ProjectStatus;
  riskRegisterDescription?: string;
  riskReportIntro?: string;
  projectUserIds: string[];
};

export type UpdateProjectForm = Partial<CreateProjectForm>;
