import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function InputErrorMessage({ children }: Props) {
  return (
    <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
      {children}
    </span>
  );
}
