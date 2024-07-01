// app/layout.js
"use client";
import FolderDataProvider from '@/context/FolderContext';
import Providers from './components/Providers'
import DataProvider from '@/context/DataProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DataProvider>
        <FolderDataProvider>
        <body>
          <Providers>{children}</Providers>
        </body>
        </FolderDataProvider>
      </DataProvider>
    </html>
  );
}
