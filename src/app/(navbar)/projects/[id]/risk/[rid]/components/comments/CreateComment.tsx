import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import { type CreateCommentForm } from '@lib/api/types';
import type { Comment } from '@models';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CreateCommentProps {
  riskId: string;
  refetch: () => void;
}

export function CreateComment({ riskId, refetch }: CreateCommentProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: CreateCommentForm) {
    setIsLoading(true);
    if (!content || content === '') {
      toast.error('Du skal skrive en kommentar');
      return;
    }

    try {
      await axios.post<{
        status: number;
        comment: Comment;
      }>(`/api/comment/risk/${riskId}`, data);
      toast.success('Kommentar tilføjet!');
      setIsLoading(false);
      setContent('');
      refetch();
    } catch (error) {
      setIsLoading(false);
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
          className="dark:bg-zinc-800 dark:text-white"
          placeholder="Skriv en kommentar..."
        />
      </div>

      <Button
        variant="default"
        onClick={() => onSubmit({ content })}
        loading={isLoading}
      >
        Kommenter
      </Button>
    </div>
  );
}
