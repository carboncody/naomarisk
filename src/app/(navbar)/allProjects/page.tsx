import { createServerClient } from '@/lib/supabase-server';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Account() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
      <h2 className="mb-4 text-4xl font-semibold">
        All projects ever made are located here
      </h2>
      <p className="mb-10 font-medium">Hi {session?.user.email}</p>

      <div className=" justify-flex flex justify-center">
        <Link className="block w-full p-3" href="/">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
