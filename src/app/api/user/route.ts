import { type CreateUserForm, type UpdateUserForm } from '@lib/api/types';
import { UserService } from '@lib/db';
import { sendInviteEmail } from '@lib/services/email';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { type User } from '@models';
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
  const { error, data: employee } = await userService.inviteUser(
    user.email,
    body,
  );
  const typedEmployee = employee as User;
  if (error) {
    return NextResponse.json({ error }, { status: error.code });
  }
  void sendInviteEmail(employee.email, typedEmployee.company.email);

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
  const employee = await userService.updateUser(user.email, {
    ...body,
    avatarUrl: body.avatarUrl, 
  });

  return NextResponse.json(employee);
}

