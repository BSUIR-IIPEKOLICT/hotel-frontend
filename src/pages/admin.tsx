import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Title } from '../shared/enums';

const Admin: NextPage = () => {
  return (
    <Layout title={Title.Admin}>
      <h1>Admin page</h1>
    </Layout>
  );
};

export default Admin;
