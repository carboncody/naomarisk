import { UserService } from '@lib/api';
import { type CreateUserForm } from '@lib/api/types';
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
    createUserForm: CreateUserForm;
  };
  const userService = await UserService();
  const employee = await userService.inviteUser(
    user.email,
    body.createUserForm.role,
    user.id,
  );
  return NextResponse.json({ employee });
}
