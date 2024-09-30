import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Textarea } from '@components/ui/textarea';
import type { Comment } from '@models';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SlOptions } from 'react-icons/sl';

interface CommentProps {
  comment: Comment;
  commentBeingEditedId: string | null;
  onEdit: (commentId: string | null, content: string) => void;
  setCommentBeingDeletedId: (id: string | null) => void;
  setCommentBeingEditedId: (id: string | null) => void;
}

export function Comment({
  comment,
  commentBeingEditedId,
  onEdit,
  setCommentBeingDeletedId,
  setCommentBeingEditedId,
}: CommentProps) {
  const [replacedContent, setReplacedContent] = useState(comment.content);

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border p-2 dark:border-zinc-700">
      <div className="flex items-center justify-between gap-2 text-zinc-400 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span>{dayjs(comment.createdAt).format('DD MMM HH:mm')}</span> -
          <span>{comment.author.fullName}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" className="rounded-full">
              <span className="text-xl hover:text-zinc-600 dark:hover:text-zinc-50">
                <SlOptions />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setCommentBeingEditedId(comment.id)}
            >
              Rediger
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="rounded-sm !text-red-500 hover:!bg-red-200 dark:hover:!bg-red-500/70 dark:hover:!text-red-50"
              onClick={() => setCommentBeingDeletedId(comment.id)}
            >
              Slet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {commentBeingEditedId === comment.id ? (
        <div className="flex w-full flex-col gap-2">
          <Textarea
            className="w-full border-0 bg-transparent p-0 outline-none focus-visible:ring-transparent"
            value={replacedContent}
            onChange={(e) => setReplacedContent(e.target.value)}
          />
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setCommentBeingEditedId(null)}
            >
              Fortryd
            </Button>
            <Button
              variant="default"
              onClick={() => onEdit(comment.id, replacedContent)}
            >
              Opdater
            </Button>
          </div>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
    </div>
  );
}