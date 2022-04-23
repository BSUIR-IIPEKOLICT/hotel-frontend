import type { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import Layout from '../../components/Layout';
import { Title } from '../../shared/enums';

const Options: NextPage = () => {
  return (
    <Layout title={Title.OPTIONS}>
      <h1>Options page</h1>
    </Layout>
  );
};

export default observer(Options);
