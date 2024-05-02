'use client';

import { type User } from '@models';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface MeContextType {
  me: User | null;
  setMe: (user: User | null) => void;
}

const MeContext = createContext<MeContextType | undefined>(undefined);

export function useMe() {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error('useMe must be used within a MeProvider');
  }
  return context;
}

interface MeProviderProps {
  children: ReactNode;
}

export function MeProvider({ children }: MeProviderProps) {
  const [me, setMe] = useState<User | null>(null);

  return (
    <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
  );
}
