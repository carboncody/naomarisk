import { type ReactNode } from 'react';

type Props = {
  className: string;
  children: ReactNode;
};

export default function Alert({ className, children }: Props) {
  return (
    <div className={`alert ${className} rounded-none shadow-lg`}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}
