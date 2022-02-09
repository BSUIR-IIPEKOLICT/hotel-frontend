import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { LayoutProps } from '../interfaces/props';
import Nav from './Nav';
import theme from '../styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { store, StoreContext } from '../store';
import { useLocalStorage } from '../hooks';

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isDark, setIsDark] = useState(true);
  const { isDarkMode, saveDarkMode } = useLocalStorage();

  useEffect(() => setIsDark(isDarkMode), [isDarkMode]);
  useEffect(() => saveDarkMode(isDark), [saveDarkMode, isDark]);

  const toggleThemeHandler = () => setIsDark((prev) => !prev);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
      </Head>
      <main>
        <StoreContext.Provider value={store}>
          <ThemeProvider theme={theme(isDark)}>
            <CssBaseline />
            <Nav toggleTheme={toggleThemeHandler} />
            {children}
          </ThemeProvider>
        </StoreContext.Provider>
      </main>
    </>
  );
};

export default Layout;
