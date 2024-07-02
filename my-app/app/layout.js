import FolderDataProvider from '@/context/FolderContext';
import Providers from './components/Providers'
import DataProvider from '@/context/DataProvider'
import RefreshProvider from '@/context/ReloadContext';
export const metadata = {
  title: 'Cloudit'
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RefreshProvider>
      <DataProvider>
        <FolderDataProvider>
        <body>
          <Providers>{children}</Providers>
        </body>
        </FolderDataProvider>
      </DataProvider>
      </RefreshProvider>
    </html>
  );
}
