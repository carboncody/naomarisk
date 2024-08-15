import type { Comment } from '@models';
import { DropdownAnimation } from '@styles/animation';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CreateComment } from './CreateComment';

interface Props {
  riskId: string;
  comments: Comment[];
}

export function Comments({ riskId, comments: originalComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(originalComments);

  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <DropdownAnimation
          isOpen={comments.map((c) => c.id).includes(comment.id)}
          key={comment.id}
          initial
        >
          <div className="flex w-full flex-col gap-2 rounded-lg border p-2 dark:border-zinc-700">
            <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-400">
              <span>{dayjs(comment.createdAt).format('DD MMM HH:mm')}</span> -
              <span>{comment.author.fullName}</span>
            </div>
            <span>{comment.content}</span>
          </div>
        </DropdownAnimation>
      ))}
      <CreateComment riskId={riskId} setComments={setComments} />
    </div>
  );
}
