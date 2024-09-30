import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import type { Comment } from '@models';
import { DropdownAnimation } from '@styles/animation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Comment as CommentComponent } from './Comment';
import { CreateComment } from './CreateComment';

interface Props {
  riskId: string;
  comments: Comment[];
  refetch: () => void;
}

export function Comments({
  riskId,
  comments: originalComments,
  refetch,
}: Props) {
  const [comments, setComments] = useState<Comment[]>(originalComments);
  const [commentBeingDeletedId, setCommentBeingDeletedId] = useState<
    string | null
  >(null);
  const [commentBeingEditedId, setCommentBeingEditedId] = useState<
    string | null
  >(null);

  async function onEdit(commentId: string | null, content: string) {
    if (!commentId) return;

    try {
      await axios.patch(`/api/comment/${commentId}`, { content });
      toast.success('Kommentar opdateret!');
      setComments(
        comments.map((c) => (c.id === commentId ? { ...c, content } : c)),
      );
      setCommentBeingEditedId(null);
      refetch();
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  async function onDelete(commentId: string | null) {
    if (!commentId) return;

    try {
      await axios.delete(`/api/comment/${commentId}`);
      toast.success('Kommentar slettet!');
      setComments(comments.filter((c) => c.id !== commentId));
      setCommentBeingDeletedId(null);
      refetch();
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <DropdownAnimation isOpen={true} key={comment.id} initial>
          <CommentComponent
            comment={comment}
            commentBeingEditedId={commentBeingEditedId}
            onEdit={onEdit}
            setCommentBeingDeletedId={setCommentBeingDeletedId}
            setCommentBeingEditedId={setCommentBeingEditedId}
          />
        </DropdownAnimation>
      ))}
      <CreateComment
        riskId={riskId}
        setComments={setComments}
        refetch={refetch}
      />
      <AlertDialog
        open={!!commentBeingDeletedId}
        onOpenChange={(isOpen) =>
          setCommentBeingDeletedId(isOpen ? commentBeingDeletedId : null)
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Er du helt sikker?</AlertDialogTitle>
            <AlertDialogDescription>
              Denne handling kan ikke fortrydes. Dette vil permanent slette
              kommentaren.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCommentBeingDeletedId(null)}>
              Annuller
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-700"
              onClick={() => onDelete(commentBeingDeletedId)}
            >
              Slet kommentar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
