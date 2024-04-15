import '@styles/globals.css';

import { Providers } from '@lib/providers';
import { Inter } from 'next/font/google';

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
      <Providers>
        <body
          suppressHydrationWarning
          className={`font-sans ${inter.variable}`}
        >
          <main>{children}</main>
        </body>
      </Providers>
    </html>
  );
}
