import { Button, Textarea } from '@nextui-org/react';

interface CreateCommentProps {
  riskId: string;
}

const handelSubmit = () => {
  console.log('submit');
};

const CreateComment: React.FC<CreateCommentProps> = ({ riskId }) => {
  return (
    <form onSubmit={handelSubmit}>
      <h2 className="mb-5 text-xl">kommentarer:</h2>
      <div className="mb-5">
        <Textarea
          className="bg-gray-600 text-white"
          placeholder="Skriv en kommentar..."
          classNames={{
            inputWrapper:
              'bg-gray-600 text-white border-1 border-gray-400 focus:bg-gray-600',
          }}
        />
      </div>

      <Button type="submit">Kommenter</Button>
    </form>
  );
};

export default CreateComment;
