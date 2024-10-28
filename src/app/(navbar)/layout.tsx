import { Nav } from '@components/ui/Nav';
import { UserService } from '@lib/db';
import { MeProvider } from '@lib/providers/me';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import type { User } from '@models';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export default async function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const me = (await (await UserService()).getMe(user!.email!)) as User;

  return (
    <>
      <MeProvider me={me}>
        <ThemeProvider attribute="class" enableSystem>
          <Nav />
          <div className="max-w-screen flex h-full max-h-[calc(100vh-3rem)] flex-col overflow-y-auto p-4">
            {children}
          </div>
        </ThemeProvider>
      </MeProvider>
    </>
  );
}
