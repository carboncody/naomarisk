export type CreateProjectForm = {
  name: string;
  description: string;
  startDate: Date | null;
  dueDate: Date | null;
  budget?: string;
  riskRegisterDescription?: string;
  riskReportIntro?: string;
  projectUserIds: string[];
};

export type UpdateProjectForm = Partial<CreateProjectForm>;
