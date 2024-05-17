import { ProjectService } from '@lib/api';
import { type UpdateProjectForm } from '@lib/api/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('Get function entered');
  const projectId = req.url.split('/project/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const projectService = await ProjectService();
  const project = await projectService.getProjectFromId(projectId);

  return NextResponse.json(project);
}

export async function PATCH(req: Request) {
  console.log('Patch function entered');
  const projectId = req.url.split('/project/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const body = (await req.json()) as {
    updateProjectForm: UpdateProjectForm;
  };
  const projectService = await ProjectService();
  const project = await projectService.updateProject(
    projectId,
    body.updateProjectForm,
  );
  return NextResponse.json({ project });
}
