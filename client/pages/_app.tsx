import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId='856248262964-17bgpnehjcua8u7dp98tm5t9gj2doi2t.apps.googleusercontent.com'>
          <Component {...pageProps} />
          <Toaster />
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
