import React from 'react';
import Layout from '../src/components/Layout';
import Link from 'next/link';
import { Title } from '../src/shared/enums';

export default function Error() {
  return (
    <Layout title={Title.Error}>
      <h1>Error: page not found</h1>
      <Link href="/">Go to home page</Link>
    </Layout>
  );
}
