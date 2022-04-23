import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Title } from '../shared/enums';

const Main: NextPage = () => {
  return (
    <Layout title={Title.MAIN}>
      <h1>Main page</h1>
    </Layout>
  );
};

export default Main;
