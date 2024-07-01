"use client"

import { SessionProvider } from 'next-auth/react';
import DataProvider from '@/context/DataProvider';
export default function Providers({ children }) {
  return (
   <DataProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
      </DataProvider>
  );
}
