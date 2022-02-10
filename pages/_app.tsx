import type { AppProps } from 'next/app';
import Global from '../src/styles/global';
import 'normalize.css';
import React from 'react';
import createEmotionCache from '../src/shared/createEmotionCache';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Global />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
