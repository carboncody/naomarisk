import { ProjectService } from '@lib/api';
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
