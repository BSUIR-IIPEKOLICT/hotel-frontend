import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import { Title } from '../src/shared/enums';

const Orders: NextPage = () => {
  return (
    <Layout title={Title.Orders}>
      <h1>Orders page</h1>
    </Layout>
  );
};

export default Orders;
