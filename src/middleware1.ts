import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // get cookies
  const cookies = request.cookies;

  // allow request if endpoint is login or next files
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // get token from cookies
  const token = cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect from /about to /home
  return NextResponse.redirect(new URL('/home', request.url));
}
