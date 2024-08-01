'use client';

// import { env } from '@env';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ForgottenPassword } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
// import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export default function HomePage() {
  const supabase = createClientComponentClient();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gradient-to-b dark:from-[#1c1c1c] dark:to-[#2a2929] dark:text-white">
      <div className="h-[600px] w-[500px] rounded-lg border bg-zinc-200 dark:bg-[#3f3e3e]">
        <p className="mt-5 text-center text-4xl dark:text-white">
          Request new password
        </p>
        <div className="px-5">
          <ForgottenPassword
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    inputText: '#FFFFFF',
                    inputLabelText: '#FFFFFF',
                  },
                },
              },
            }}
          />
        </div>
        <div className="pt-4 text-center">
          <Link className="block pb-2 text-blue-500" href="/auth/login">
            Sign in
          </Link>
        </div>
        <div className="pt-4 text-center">
          Not registered yet?{' '}
          <Link href="/auth/signup" className="text-blue-500 underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
