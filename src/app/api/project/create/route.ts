import { ProjectService } from '@lib/api';
import { type CreateProjectForm } from '@lib/api/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = (await req.json()) as {
    myEmail: string;
    createProjectForm: CreateProjectForm;
  };
  const projectService = await ProjectService();
  const project = await projectService.createProject(
    body.myEmail,
    body.createProjectForm,
  );
  return NextResponse.json({ project });
}
