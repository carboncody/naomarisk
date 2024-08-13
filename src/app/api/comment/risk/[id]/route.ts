import type { CreateCommentForm } from '@lib/api/types';
import { CommentService } from '@lib/db';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const riskId = req.url.split('/risk/')[1];

  if (!riskId) {
    return NextResponse.json({ status: 400, error: 'No project id in url' });
  }

  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const me = user;

  if (!me?.email) {
    return NextResponse.json({
      status: 400,
      error: 'User not created on server side',
    });
  }

  const body = (await req.json()) as CreateCommentForm;
  const commentService = await CommentService();
  try {
    const comment = await commentService.createComment(riskId, me.email, body);
    return NextResponse.json({ status: 200, comment });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === 'P2002' ? 409 : 500 },
      );
    }
    return NextResponse.json({ status: 500, error: error });
  }
}
