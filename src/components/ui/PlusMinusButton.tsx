import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

interface PlusButtonProps {
  type: 'plus' | 'minus';
  dims?: string;
  onClick: () => void;
}

export function PlusMinusButton({ type, onClick }: PlusButtonProps) {
  return (
    <div onClick={onClick}>
      <button
        className={`group cursor-pointer outline-none ${
          type === 'plus' ? 'hover:rotate-90' : ''
        } duration-300`}
      >
        {type === 'plus' ? (
          <AiOutlinePlusCircle className="scale-95 rounded-full text-2xl text-green-600 duration-300 group-hover:scale-100 group-hover:bg-green-100 group-active:bg-green-600 group-active:text-green-200 group-active:duration-0" />
        ) : (
          <AiOutlineMinusCircle className="scale-95 rounded-full text-2xl text-red-600 duration-300 group-hover:scale-100 group-hover:bg-red-100 group-active:bg-red-600 group-active:text-red-200 group-active:duration-0" />
        )}
      </button>
    </div>
  );
}
