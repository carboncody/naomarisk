interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({}: LoadingSpinnerProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* <Spinner
        size={size}
        classNames={{
          circle1: 'border-b-black dark:border-b-white',
          circle2: 'border-b-black dark:border-b-white',
        }}
      /> */}
    </div>
  );
}
