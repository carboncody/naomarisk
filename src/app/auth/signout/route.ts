import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL('/auth/login'), {
    status: 302,
  });
}
