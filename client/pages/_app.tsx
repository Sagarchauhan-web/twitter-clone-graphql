import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId='856248262964-17bgpnehjcua8u7dp98tm5t9gj2doi2t.apps.googleusercontent.com'>
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </div>
  );
}
