import { Nav } from '@components/ui/Nav';
import { UserService } from '@lib/db';
import { MeProvider } from '@lib/providers/me';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import type { User } from '@models';

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
        <Nav />
        {children}
      </MeProvider>
    </>
  );
}
