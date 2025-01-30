import { type UpdateCsmProjectForm } from '@lib/api/types/csmProjet';
import { ProjectService } from '@lib/db';
import { CsmProjectService } from '@lib/db/csmProject';
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

  const body = (await req.json()) as UpdateCsmProjectForm;

  const projectService = await CsmProjectService();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { error } = await projectService.updateProject(
    user.email,
    projectId,
    body,
  );

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return NextResponse.json({ error }, { status: error.code });
  }

  return NextResponse.json({ status: 200 });
}

export async function POST(req: Request) {
  const projectId = req.url.split('/csm/')[1]?.split('/risk')[0];

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
}
