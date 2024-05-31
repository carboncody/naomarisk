import { type CreateProjectForm } from '@lib/api/types';
import { ProjectService } from '@lib/db';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' });
  }

  const projectService = await ProjectService();
  const projects = await projectService.getProjectsInCompany(user.email);
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const body = (await req.json()) as CreateProjectForm;
  const projectService = await ProjectService();
  const { error } = await projectService.createProject(user.email, body);

  if (error) {
    return NextResponse.json({ error }, { status: error.code });
  }

  return NextResponse.json({ status: 200 });
}
