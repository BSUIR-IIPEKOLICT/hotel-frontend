import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import { Title } from '../src/shared/enums';
import {
  OutlinedButton,
  TextButton,
  ContainedButton,
} from '../src/styles/buttons';

const Login: NextPage = () => {
  return (
    <Layout title={Title.Login}>
      <h1>Login page</h1>
      <OutlinedButton>Outlined</OutlinedButton>
      <TextButton>Text</TextButton>
      <ContainedButton>Contained</ContainedButton>
      <OutlinedButton primary>Outlined</OutlinedButton>
      <TextButton primary>Text</TextButton>
      <ContainedButton primary>Contained</ContainedButton>
    </Layout>
  );
};

export default Login;
