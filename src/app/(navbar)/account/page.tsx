import { createServerClient } from '@lib/services/supabase/supabase-server';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Account() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white">
      <h2 className="mb-4 text-4xl font-semibold">Account</h2>
      <p className="mb-10 font-medium">
        Hi {user.email}, you can update your email or password from here
      </p>
      <div className=" justify-flex flex justify-center gap-6">
        <Link className="block w-full p-3" href="/account/update-email">
          <Button>Update email</Button>
        </Link>
        <Link className="block w-full p-3" href="/account/update-password">
          <Button>Update password</Button>
        </Link>
      </div>
      <div className=" justify-flex flex justify-center">
        <Link className="block w-full p-3" href="/">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
