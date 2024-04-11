'use client';

import { env } from '@env';
import { Button } from '@nextui-org/react';
import { SignUp } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export default function HomePage() {
  const supabase = createClient(env.supbase.url, env.supbase.key);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-[#2a2929] text-white">
      <div className="h-[600px] w-[500px] rounded-lg border bg-[#3f3e3e]">
        <p className="mt-5 text-center text-4xl text-white">Login</p>
        <div className="px-5">
          <SignUp
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            redirectTo="/"
          />
        </div>
        <div className="pt-4 text-center">
          <Link className="block pb-2 text-blue-500" href="/forgotpassword">
            Forgot Password?
          </Link>
        </div>
        <div className="pt-4 text-center">
          Already registered?{' '}
          <Link href="/login" className="text-blue-500 underline">
            Sign in
          </Link>
        </div>
      </div>
      <Link href={'/'}>
        <Button className="my-5">back</Button>
      </Link>
    </div>
  );
}
