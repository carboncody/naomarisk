import { UserService } from '@lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = (await req.json()) as { email: string };
  const user = (await UserService()).updateOrCreateUser(body.email);

  return NextResponse.json({ user });
}
