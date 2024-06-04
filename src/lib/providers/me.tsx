'use client';

import type { User } from '@models';
import { createContext, useContext } from 'react';

const MeContext = createContext<User | undefined>(undefined);

export function useMe() {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error('useMe must be used within a MeContext');
  }
  return context;
}

export function MeProvider({
  children,
  me,
}: {
  children: React.ReactNode;
  me: User;
}) {
  return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
}
