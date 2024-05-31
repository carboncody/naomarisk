import { type CreateUserForm, type UpdateUserForm } from '@lib/api/types';
import { UserService } from '@lib/db';
import { sendInviteEmail } from '@lib/services/email';
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

  const userService = await UserService();
  const users = await userService.getUsersInCompany(user.email);
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' });
  }

  const body = (await req.json()) as CreateUserForm;
  const userService = await UserService();
  const employee = await userService.inviteUser(user.email, body);

  void sendInviteEmail(employee.email, employee.company.name);

  return NextResponse.json({ employee });
}

export async function PATCH(req: Request) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' });
  }
  const body = (await req.json()) as UpdateUserForm;

  const userService = await UserService();
  const employee = await userService.updateUser(user.email, body);
  return NextResponse.json(employee);
}
