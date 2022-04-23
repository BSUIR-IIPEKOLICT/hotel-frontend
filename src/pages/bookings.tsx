import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Title } from '../shared/enums';

const Bookings: NextPage = () => {
  return (
    <Layout title={Title.BOOKINGS}>
      <h1>Bookings page</h1>
    </Layout>
  );
};

export default Bookings;
