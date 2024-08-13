import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import toast from 'react-hot-toast';

interface CreateCommentProps {
  riskId: string;
}

const handelSubmit = () => {
  toast.error('Funktionalitet ikke tilgængelig endnu');
};

const CreateComment: React.FC<CreateCommentProps> = () => {
  return (
    <form onSubmit={handelSubmit}>
      <div className="mb-5">
        <Textarea
          className="text-white dark:bg-zinc-800"
          placeholder="Skriv en kommentar..."
        />
      </div>

      <Button variant="default">Kommenter</Button>
    </form>
  );
};

export default CreateComment;
