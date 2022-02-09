import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import { Title } from '../src/shared/enums';

const Main: NextPage = () => {
  return (
    <Layout title={Title.Main}>
      <h1>Main page</h1>
    </Layout>
  );
};

export default Main;
