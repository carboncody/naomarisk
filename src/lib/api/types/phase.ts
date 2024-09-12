export type CreatePhaseForm = {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
};

export type UpdatePhaseForm = Partial<CreatePhaseForm>;
