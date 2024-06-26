import { type RiskStatus } from '@prisma/client';

export type CreateRiskForm = {
  description: string;
  probability: number | null;
  consequence: number | null;
  status: RiskStatus;
  comment: string | undefined;
  activity: string | undefined;
  riskOwnerUserId: string | undefined;
};

export type UpdateRiskForm = Partial<CreateRiskForm> & {
  probability: number | null;
  consequence: number | null;
};
