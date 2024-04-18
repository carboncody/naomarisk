import { createServerClient } from '@lib/services/supabase/supabase-server';
import { redirect } from 'next/navigation';
import PasswordForm from './password-form';
export const dynamic = 'force-dynamic';

export default async function UpdatePassword() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect('/auth/login');
  }

  return <PasswordForm user={user} />;
}
