import { type UpdateCompanyForm } from '@lib/api/types';
import { CompanyService } from '@lib/db/company';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'Not logged in' });
  }

  const body = (await req.json()) as UpdateCompanyForm;
  const companyService = await CompanyService();
  const company = await companyService.updateCompany(user.email, body);
  return NextResponse.json(company);
}
