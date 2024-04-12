import { createServerClient } from '@lib/services/supabase/supabase-server';
import { Button } from '@nextui-org/react';
import { Session } from 'inspector';
import Link from 'next/link';

export async function Home() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(Session);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <p className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Naoma <span className="text-[hsl(280,100%,70%)]">Risk</span>
        </p>

        <p>Welcome {session?.user.email}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <p className="text-2xl font-bold">First Steps →</p>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <p className="text-2xl font-bold">Documentation →</p>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="justify-flex flex justify-center gap-6">
          <Link className="btn btn-outline no-animation" href="/account">
            <Button>Account settings</Button>
          </Link>
          <form className="block" action="/auth/signout" method="post">
            <Button type="submit">Sign out</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
