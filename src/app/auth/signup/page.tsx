'use client';

// import { env } from '@env';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SignUp } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
// import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export default function HomePage() {
  // const supabase = createClient(env.supbase.url, env.supbase.key);
  const supabase = createClientComponentClient();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gradient-to-b dark:from-[#1c1c1c] dark:to-[#2a2929] dark:text-white">
      <div className="h-[600px] w-[500px] rounded-lg border bg-zinc-200 shadow-xl dark:bg-zinc-700">
        <p className="mt-5 text-center text-4xl font-normal dark:text-white">
          Opret en ny konto
        </p>
        <div className="px-5">
          <SignUp
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    inputText: '#000000',
                    inputLabelText: '#000000',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
        <div className="pt-4 text-center">
          <Link
            className="block pb-2 text-blue-500"
            href="/auth/forgotpassword"
          >
            Glemt adgangskode?
          </Link>
        </div>
        <div className="pt-4 text-center">
          Allerede oprettet?{' '}
          <Link href="/auth/login" className="text-blue-500 underline">
            Log ind
          </Link>
        </div>
      </div>
    </div>
  );
}
