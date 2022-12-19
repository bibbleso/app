import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import StoreProvider from '../store/context/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from '@/lib/trpc';
import Theme from 'src/components/Theme';
import { useEffect } from 'react';
import useFullScreen from 'src/hooks/useFullScreen';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  useFullScreen();

  return (
    <StoreProvider>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Theme>
    </StoreProvider>
  );
}

//export default trpc.withTRPC(MyApp);
export default MyApp;
