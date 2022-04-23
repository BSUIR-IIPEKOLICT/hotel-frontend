import type { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import Layout from '../../components/Layout';
import { Title } from '../../shared/enums';

const Buildings: NextPage = () => {
  return (
    <Layout title={Title.BUILDINGS}>
      <h1>Buildings page</h1>
    </Layout>
  );
};

export default observer(Buildings);
