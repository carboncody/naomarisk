import { ProjectService } from '@lib/api';
import { type CreateRiskForm } from '@lib/api/types/risk';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' });
  }

  const body = (await req.json()) as {
    CreateRiskForm: CreateRiskForm;
  };
  const projectService = await ProjectService();
  // const project = await RiskService.createRisk(user.email, body.CreateRiskForm);
  // return NextResponse.json({ project });
}
