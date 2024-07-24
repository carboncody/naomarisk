import '@/styles/globals.css';
import { Toast } from '@components/ui/Toast';
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
      <body suppressHydrationWarning className={`font-sans ${inter.variable}`}>
        <main className="h-screen overflow-auto bg-zinc-100 from-[#1c1c1c] to-[#2a2929] dark:bg-gradient-to-b dark:text-white">
          <Providers>
            <Toast />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
