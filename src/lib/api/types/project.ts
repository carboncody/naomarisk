import type { ProjectRole, ProjectStatus } from '@models';

export interface ProjectAssignmentForm {
  userId: string;
  role: ProjectRole;
}

export type CreateProjectForm = {
  name: string;
  description: string;
  startDate: Date | null;
  dueDate: Date | null;
  budget?: string;
  status: ProjectStatus;
  riskRegisterDescription?: string;
  riskReportIntro?: string;
  assignments: ProjectAssignmentForm[];
};

export type UpdateProjectForm = Partial<CreateProjectForm>;
