import { type RiskStatus } from '@prisma/client';

export type CreateRiskForm = {
  customId: string;
  description: string;
  probability: number | undefined;
  consequence: number | undefined;
  status: RiskStatus;
  comment: string | undefined;
  activity: string | undefined;
  riskOwnerUserId: string | undefined;
};

export type UpdateRiskForm = Partial<CreateRiskForm> & { customId: never };
