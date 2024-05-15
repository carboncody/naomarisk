import { Spinner } from '@nextui-org/react';

interface LoadingSpinnerProps {
  dist?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({
  size = 'md',
  dist = 'top-0',
}: LoadingSpinnerProps) {
  return (
    <Spinner
      className={dist}
      size={size}
      classNames={{
        circle1: 'border-b-black dark:border-b-white',
        circle2: 'border-b-black dark:border-b-white',
      }}
    />
  );
}
