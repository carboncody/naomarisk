import { type UpdateUserForm } from '@lib/api/types';
import { UserService } from '@lib/db';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const userEmail = req.url.split('/user/')[1];

  if (!userEmail) {
    return NextResponse.json({ status: 400, error: 'No user id in url' });
  }

  const userService = await UserService();
  const { error, data: employee } =
    await userService.getUserFromEmail(userEmail);
  if (error) {
    return NextResponse.json({ error }, { status: error.code });
  }
  return NextResponse.json(employee);
}

export async function PATCH(req: Request) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const me = user;

  if (!me?.email) {
    return NextResponse.json({
      status: 400,
      error: 'User not created on server side',
    });
  }

  const userEmail = req.url.split('/user/')[1];

  if (!userEmail) {
    return NextResponse.json({ status: 400, error: 'No user id in url' });
  }

  const body = (await req.json()) as UpdateUserForm;

  const userService = await UserService();
  const { error, data: employee } = await userService.updateUser(
    userEmail,
    body,
  );
  if (error) {
    return NextResponse.json({ error }, { status: error.code });
  }
  return NextResponse.json(employee);
}

export async function DELETE(req: Request) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const me = user;

  if (!me?.email) {
    return NextResponse.json({
      status: 400,
      error: 'User not created on server side',
    });
  }

  const userEmail = req.url.split('/user/')[1];

  if (!userEmail) {
    return NextResponse.json({ status: 400, error: 'No user id in url' });
  }

  const userService = await UserService();
  const employee = await userService.deleteUser(userEmail);
  return NextResponse.json(employee);
}
