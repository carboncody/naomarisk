import { type UpdateProjectForm } from '@lib/api/types';
import { ProjectService } from '@lib/db';
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

  const body = (await req.json()) as UpdateProjectForm;

  const projectService = await ProjectService();
  const project = await projectService.updateProject(projectId, body);
  return NextResponse.json({ status: 200, project });
}
