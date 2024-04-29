'use client';

import '@/styles/globals.css';
import { Providers } from '@lib/providers';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const supabase = createClient(
  'https://mjqqjcubkoilxmelnbxn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcXFqY3Via29pbHhtZWxuYnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NTMyNzAsImV4cCI6MjAyODIyOTI3MH0.eFYDUktj6m3vDznvDJosUNSQOAO-wQCf_MS6WM6MGKM',
);

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

// export const metadata = {
//   title: {
//     template: '%s | Naoma Risk',
//     default: 'Naoma Risk',
//   },
//   description: 'Naoma Risk - Risk assessment tool for large projects',
//   icons: [{ rel: 'icon', url: '/favicon.ico' }],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`font-sans ${inter.variable}`}>
        <SessionContextProvider supabaseClient={supabase}>
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
        </SessionContextProvider>
      </body>
    </html>
  );
}
