import { type UpdateProjectForm } from '@lib/api/types';
import { ProjectService } from '@lib/db';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const projectId = req.url.split('/project/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const projectService = await ProjectService();
  const project = await projectService.getProjectFromId(projectId);

  return NextResponse.json(project);
}

export async function PATCH(req: Request) {
  const projectId = req.url.split('/project/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const body = (await req.json()) as UpdateProjectForm;

  const projectService = await ProjectService();
  const { error } = await projectService.updateProject(
    user.email,
    projectId,
    body,
  );

  if (error) {
    return NextResponse.json({ error }, { status: error.code });
  }

  return NextResponse.json({ status: 200 });
}
