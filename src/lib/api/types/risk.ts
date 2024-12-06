import { type RiskStatus } from '@prisma/client';

export type CreateRiskForm = {
  description: string;
  probability: number | null;
  consequence: number | null;
  timeProbability: number | null;
  timeConsequence: number | null;
  economicProbability: number | null;
  economicConsequence: number | null;
  status: RiskStatus;
  activity: string | undefined;
  riskOwnerUserId: string | null;
  riskManagerUserId: string | null;
  projectPhaseId: string | null;
  mitigationPhaseId: string | null;
};

export type UpdateRiskForm = Partial<CreateRiskForm> & {
  probability?: number | null;
  consequence?: number | null;
  projectPhaseId?: string | null;
  mitigationPhaseId?: string | null;
};
