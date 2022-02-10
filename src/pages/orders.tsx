import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Title } from '../shared/enums';

const Orders: NextPage = () => {
  return (
    <Layout title={Title.Orders}>
      <h1>Orders page</h1>
    </Layout>
  );
};

export default Orders;
