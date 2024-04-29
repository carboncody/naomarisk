import '@/styles/globals.css';
import { Providers } from '@lib/providers';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: {
    template: '%s | Naoma Risk',
    default: 'Naoma Risk',
  },
  description: 'Naoma Risk - Risk assessment tool for large projects',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`font-sans ${inter.variable}`}>
        <Providers>
          <Toaster
            position="top-right"
            toastOptions={{
              className: '',
              duration: 5000,
              style: {
                background: 'dark:#333 #fff',
                color: 'dark:#fff #333',
              },
              success: {
                iconTheme: {
                  primary: '#15803d',
                  secondary: 'white',
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
