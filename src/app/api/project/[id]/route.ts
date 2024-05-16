import { ProjectService } from '@lib/api';
import { type UpdateProjectForm } from '@lib/api/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const projectId = req.url.split('/project/')[1];

  if (!projectId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  if (req.method === 'GET') {
    const projectService = await ProjectService();
    const project = await projectService.getProjectFromId(projectId);

    return NextResponse.json(project);
  }

  if (req.method === 'PATCH') {
    console.info(req.body);

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
}
