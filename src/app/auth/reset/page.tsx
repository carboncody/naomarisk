'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPassword() {
  const supabase = createClientComponentClient();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const token = searchParams.get('token');
    if (!token) return;

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError('Failed to reset password. Please try again.');
    } else {
      setSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        No token in the URL please try again
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="h-[400px] w-[400px] rounded-lg border bg-zinc-200 shadow-xl">
        <p className="my-5 text-center text-2xl font-normal dark:text-white">
          Reset Your Password
        </p>
        <div className="px-5 py-5 dark:text-white">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          {!success && (
            <>
              <input
                type="password"
                className="mb-3 w-full rounded-md border p-2"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className="mb-3 w-full rounded-md border p-2"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="mt-4 w-full rounded bg-blue-500 py-2 text-white"
                onClick={handlePasswordReset}
              >
                Reset Password
              </button>
            </>
          )}
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
