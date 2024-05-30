import { createClient } from '@lib/services/supabase/client';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  await supabase.auth.signOut();
  // }

  revalidatePath('/', 'layout');
  return NextResponse.redirect(new URL('/auth/login', req.url), {
    status: 302,
  });
}
