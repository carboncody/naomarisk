'use client';
import { SignIn } from '@supabase/auth-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { createClient } from "@supabase/supabase-js";
// import { env } from "@env";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function SignInForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-[#2a2929] text-white">
      <div className="h-[600px] w-[500px] rounded-lg border bg-[#3f3e3e]">
        <p className="my-5 text-center text-4xl text-white">
          Welcome to <br /> NAOMA-RISK
        </p>
        <p className="mb-4 text-center font-medium">Sign in</p>
        <div className="px-5 py-5">
          <SignIn
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
          <div className="pt-4 text-center">
            <Link
              className="block pb-2 text-blue-500"
              href="/auth/forgotpassword"
            >
              Forgot Password?
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
    </div>
  );
}
