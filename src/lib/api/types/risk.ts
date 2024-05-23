import { type RiskStatus } from '@prisma/client';

export type CreateRiskForm = {
  customerId: string;
  description: string;
  probability: number;
  consequence: number;
  status: RiskStatus;
  comment: string | undefined;
  activity: string | undefined;
};
