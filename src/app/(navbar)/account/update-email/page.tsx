import { createServerClient } from '@lib/services/supabase/supabase-server';
import { redirect } from 'next/navigation';
import EmailForm from './email-form';

export const dynamic = 'force-dynamic';

export default async function UpdateEmail() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect('/auth/login');
  }
  return <EmailForm user={user} />;
}
