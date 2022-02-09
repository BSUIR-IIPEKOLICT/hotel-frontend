import React from 'react';
import Head from 'next/head';
import { LayoutProps } from '../interfaces/props';
import Nav from './Nav';

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
      </Head>
      <main>
        <Nav />
        {children}
      </main>
    </>
  );
};

export default Layout;
