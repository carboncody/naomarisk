import { type CreatePhaseForm, type UpdatePhaseForm } from '@lib/api/types';
import { PhaseService } from '@lib/db/phase';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const phaseId = req.url.split('/phase/')[1];

  if (!phaseId) {
    return NextResponse.json({ status: 400, error: 'No phase id in url' });
  }

  const phaseService = await PhaseService();
  const phase = await phaseService.getPhase(phaseId);

  if (!phase) {
    return NextResponse.json({ status: 404, error: 'Phase not found' });
  }

  return NextResponse.json(phase);
}

export async function POST(req: Request) {
  const projectId = req.url.split('/phase/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const body = (await req.json()) as CreatePhaseForm;
  const phaseService = await PhaseService();

  try {
    const phase = await phaseService.createPhase(projectId, body);
    return NextResponse.json({ status: 200, phase });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === 'P2002' ? 409 : 500 },
      );
    }
    return NextResponse.json({
      status: 500,
      error: 'Error - something went wrong',
    });
  }
}

export async function PATCH(req: Request) {
  const phaseId = req.url.split('/phase/')[1];

  if (!phaseId) {
    return NextResponse.json({ status: 400, error: 'No phase id in url' });
  }

  const body = (await req.json()) as UpdatePhaseForm;
  const phaseService = await PhaseService();

  try {
    const phase = await phaseService.updatePhase(phaseId, body);
    return NextResponse.json({ status: 200, phase });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: 'Error - something went wrong',
    });
  }
}

export async function DELETE(req: Request) {
  const phaseId = req.url.split('/phase/')[1];

  if (!phaseId) {
    return NextResponse.json({ status: 400, error: 'No phase id in url' });
  }

  const phaseService = await PhaseService();

  try {
    await phaseService.deletePhase(phaseId);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: 'Error - something went wrong',
    });
  }
}
