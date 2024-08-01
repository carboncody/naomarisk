import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';

interface CreateCommentProps {
  riskId: string;
}

const handelSubmit = () => {
  console.log('submit');
};

const CreateComment: React.FC<CreateCommentProps> = ({ riskId }) => {
  return (
    <form onSubmit={handelSubmit}>
      <div className="mb-5">
        <Textarea
          className="text-white dark:bg-zinc-600"
          placeholder="Skriv en kommentar..."
        />
      </div>

      <Button variant="default">Kommenter</Button>
    </form>
  );
};

export default CreateComment;
