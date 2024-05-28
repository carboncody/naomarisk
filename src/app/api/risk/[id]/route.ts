import { RiskService } from '@lib/api/risk';
import { type CreateRiskForm } from '@lib/api/types';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log(req.url);
  const projectId = req.url.split('/risk/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const riskService = await RiskService();
  const risk = await riskService.getRisk(projectId);

  return NextResponse.json(risk);
}

export async function POST(req: Request) {
  const projectId = req.url.split('/risk/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const body = (await req.json()) as CreateRiskForm;
  const riskService = await RiskService();
  const risk = await riskService.createRisk(projectId, body);
  return NextResponse.json({ status: 200, risk });
}

export async function PATCH(req: Request) {
  const projectId = req.url.split('/risk/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const body = (await req.json()) as UpdateRiskForm;
  const riskService = await RiskService();
  const risk = await riskService.createRisk(projectId, body);
  return NextResponse.json({ status: 200, risk });
}
