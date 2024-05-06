import { Toaster } from 'react-hot-toast';

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: '',
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#15803d',
            secondary: 'white',
          },
        },
      }}
    />
  );
}
