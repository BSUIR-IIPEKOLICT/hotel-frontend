import type { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import Layout from '../../components/Layout';
import { Title } from '../../shared/enums';

const Types: NextPage = () => {
  return (
    <Layout title={Title.TYPES}>
      <h1>Types page</h1>
    </Layout>
  );
};

export default observer(Types);
