import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import { type CreateCommentForm } from '@lib/api/types';
import type { Comment } from '@models';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CreateCommentProps {
  riskId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  refetch: () => void;
}

export function CreateComment({
  riskId,
  setComments,
  refetch,
}: CreateCommentProps) {
  const [content, setContent] = useState('');

  async function onSubmit(data: CreateCommentForm) {
    if (!content || content === '') {
      toast.error('Du skal skrive en kommentar');
      return;
    }

    try {
      const comment = await axios.post<{
        status: number;
        comment: Comment;
      }>(`/api/comment/risk/${riskId}`, data);
      console.info(comment);
      toast.success('Kommentar tilføjet!');
      setComments((prevComments) => [...prevComments, comment.data.comment]);
      setContent('');
      refetch();
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <div>
      <div className="mb-5">
        <Textarea
          value={content}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void onSubmit({ content });
            }
          }}
          onChange={(e) => setContent(e.target.value)}
          className="dark:bg-zinc-800 dark:text-white "
          placeholder="Skriv en kommentar..."
        />
      </div>

      <Button variant="default" onClick={() => onSubmit({ content })}>
        Kommenter
      </Button>
    </div>
  );
}
