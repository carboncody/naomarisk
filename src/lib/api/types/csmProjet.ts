import type { CsmProjectRole, CSMStatus } from '@models';

export interface CsmProjectAssignmentForm {
  userId: string;
  role: CsmProjectRole;
}

export type CreateCsmProjectForm = {
  name: string;
  description: string;
  startDate: Date | null;
  dueDate: Date | null;
  budget?: string;
  status: CSMStatus;
  Description?: string;
  assignments: CsmProjectAssignmentForm[];
};

export type UpdateCsmProjectForm = Partial<CreateCsmProjectForm>;
