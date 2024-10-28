import type { UpdateCommentForm } from '@lib/api/types';
import { CommentService } from '@lib/db';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
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
  const commentId = req.url.split('/comment/')[1];

  if (!commentId) {
    return NextResponse.json({ status: 400, error: 'No comment id in url' });
  }

  const body = (await req.json()) as UpdateCommentForm;
  const commentService = await CommentService();
  const comment = await commentService.updateComment(commentId, me.email, body);
  return NextResponse.json({ status: 200, comment });
}

export async function DELETE(req: Request) {
  const commentId = req.url.split('/comment/')[1];
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

  if (!commentId) {
    return NextResponse.json({ status: 400, error: 'No risk id in url' });
  }

  const commentService = await CommentService();
  await commentService.deleteComment(commentId, me.email);
  return NextResponse.json({ status: 200 });
}
