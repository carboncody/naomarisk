export type CreatePhaseForm = {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
};

export type UpdatePhaseForm = Partial<CreatePhaseForm>;
