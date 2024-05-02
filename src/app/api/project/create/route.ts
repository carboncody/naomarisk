import { ProjectService } from '@lib/api';
import { type CreateProjectForm } from '@lib/api/types';
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
    createProjectForm: CreateProjectForm;
  };
  const projectService = await ProjectService();
  const project = await projectService.createProject(
    user.email,
    body.createProjectForm,
  );
  return NextResponse.json({ project });
}
