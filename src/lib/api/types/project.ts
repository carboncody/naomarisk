export type CreateProjectForm = {
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  budget?: string;
  riskRegisterDescription?: string;
  riskReportIntro?: string;
  riskIds?: { id: string }[];
  projectUserIds?: { userId: string }[];
};

export type UpdateProjectForm = Partial<CreateProjectForm>;
