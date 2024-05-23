import { RiskService } from '@lib/api/risk';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log(req);
  const projectId = req.url.split('/risk/')[1];
  console.log('The project id is----------------------------------------:',projectId);

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const riskService = await RiskService();
  const risk = await riskService.getRisk(projectId);

  return NextResponse.json(risk);
}
