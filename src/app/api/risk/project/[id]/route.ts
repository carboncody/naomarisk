import { RiskService } from '@lib/db/risk';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const projectId = req.url.split('/project/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const riskService = await RiskService();
  const risk = await riskService.getProjectRisks(projectId);

  return NextResponse.json(risk);
}
