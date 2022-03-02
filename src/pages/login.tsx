import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { EndPoint, Title } from '../shared/enums';
import { ContainedButton } from '../components/styled/buttons';
import { Box, Container, Typography } from '@mui/material';
import AuthForm from '../components/forms/AuthForm';
import { FormContainer } from '../components/styled/containers';
import { PrimaryText } from '../components/styled/typography';
import Link from 'next/link';
import { useUser } from '../hooks';

const Login: NextPage = () => {
  const { changePasswordHandler, changeEmailHandler, submitHandler } =
    useUser();

  return (
    <Layout title={Title.Login}>
      <Container>
        <Box component="form" noValidate autoComplete="off" className="form">
          <AuthForm
            title="Login"
            emailHandler={changeEmailHandler}
            passwordHandler={changePasswordHandler}
          />
          <FormContainer large>
            <Typography component="div">
              Dont have account?{' '}
              <PrimaryText>
                <Link href={EndPoint.Register}>Register</Link>
              </PrimaryText>
            </Typography>
            <ContainedButton primary onClick={submitHandler}>
              Login
            </ContainedButton>
          </FormContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
