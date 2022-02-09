import type { AppProps } from 'next/app';
import Global from '../src/styles/global';
import 'normalize.css';
import theme from '../src/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { store, StoreContext } from '../src/store';
import { useLocalStorage } from '../src/hooks';

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(true);
  const { isDarkMode } = useLocalStorage();

  useEffect(() => setIsDark(isDarkMode()), [isDarkMode]);

  return (
    <StoreContext.Provider value={store}>
      <Global />
      <ThemeProvider theme={theme(isDark)}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default MyApp;
