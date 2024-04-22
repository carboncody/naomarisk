import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Remove local storage items ending with "-auth-token"
    for (const key of Object.keys(localStorage)) {
      if (key.endsWith('-auth-token')) {
        localStorage.removeItem(key);
      }
    }

    // Remove cookies ending with "-auth-token"
    const cookies = req.cookies;
    for (const [cookieName, cookieValue] of Object.entries(cookies)) {
      if (cookieName.endsWith('-auth-token')) {
        req.cookies.delete(cookieName);
      }
    }

    // Sign out from Supabase
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL('/auth/login', req.url), {
    status: 302,
  });
}
