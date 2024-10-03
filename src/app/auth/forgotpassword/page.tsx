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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="h-[600px] w-[500px] rounded-lg border bg-zinc-200 shadow-xl dark:bg-zinc-700">
        <p className="mt-5 text-center text-4xl font-normal dark:text-white">
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
                    inputText: '#000000',
                    inputLabelText: '#000000',
                  },
                },
              },
            }}
          />
        </div>
        <div className="pt-4 text-center">
          <Link className="block pb-2 text-blue-500" href="/auth/login">
            Log ind
          </Link>
        </div>
        <div className="pt-4 text-center">
          Ikke registreret endnu?{' '}
          <Link href="/auth/signup" className="text-blue-500 underline">
            Opret konto
          </Link>
        </div>
      </div>
    </div>
  );
}
