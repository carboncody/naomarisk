import { UserService } from '@lib/api';
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
