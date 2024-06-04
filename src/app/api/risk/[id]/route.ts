import { type CreateRiskForm } from '@lib/api/types';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { RiskService } from '@lib/db/risk';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
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
  try {
    const risk = await riskService.createRisk(projectId, body);
    return NextResponse.json({ status: 200, risk });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === 'P2002' ? 409 : 500 },
      );
    }
    return NextResponse.json({ status: 500, error: error });
  }
}

export async function PATCH(req: Request) {
  const riskId = req.url.split('/risk/')[1];

  if (!riskId) {
    return NextResponse.json({ status: 400, error: 'No risk id in url' });
  }

  const body = (await req.json()) as UpdateRiskForm;
  const riskService = await RiskService();
  const risk = await riskService.updateRisk(riskId, body);
  return NextResponse.json({ status: 200, risk });
}
