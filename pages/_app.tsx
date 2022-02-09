import type { AppProps } from 'next/app';
import Global from '../src/styles/global';
import 'normalize.css';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
