'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SignIn } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'src/components/ui/styles.css';

export default function SignInForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, user) => {
      try {
        if (event !== 'SIGNED_IN') {
          return;
        }

        if (!user?.user) {
          setError(
            'Noget gik galt i login. Prøv igen. Hvis det bliver ved, kontakt os. ',
          );
          return;
        }

        await axios.post('/api/user/upsert', {
          email: user.user.email,
        });
      } catch (error) {
        setError(JSON.stringify(error));
        throw error;
      }

      if (event === 'SIGNED_IN') {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-[#2a2929] text-white">
      <div className="h-[600px] w-[500px] rounded-lg border bg-gray-600">
        <p className="my-5 text-center text-4xl text-white">
          Velkommen til <br /> NAOMA-RISK
        </p>
        <p className="mb-4 text-center font-medium">Sign in</p>
        <div className="px-5 py-5 text-white">
          <SignIn
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
            providers={[]}
          />
          {error && <span className="text-red-500">{error}</span>}
          <div className="pt-4 text-center">
            <Link
              className="block pb-2 text-blue-500"
              href="/auth/forgotpassword"
            >
              Glemte adgangskode?
            </Link>
          </div>
          <div className="pt-4 text-center">
            Ikke registreret endnu?{' '}
            <Link href="/auth/signup" className="text-blue-500 underline">
              Opret profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
