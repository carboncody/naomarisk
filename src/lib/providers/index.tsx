'use client';

import { MeProvider } from '@lib/context/MeContext';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <MeProvider>{children}</MeProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
