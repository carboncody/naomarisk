'use client';

import { MeProvider } from '@lib/context/MeContext';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <MeProvider>{children}</MeProvider>
    </NextUIProvider>
  );
}
