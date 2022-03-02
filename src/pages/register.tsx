import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { EndPoint, Title } from '../shared/enums';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { ContainedButton } from '../components/styled/buttons';
import { FormContainer } from '../components/styled/containers';
import { PrimaryText } from '../components/styled/typography';
import AuthForm from '../components/forms/AuthForm';
import { useUser } from '../hooks';

const Register: NextPage = () => {
  const { changePasswordHandler, changeEmailHandler, submitHandler } =
    useUser();

  return (
    <Layout title={Title.Register}>
      <Container>
        <Box component="form" noValidate autoComplete="off" className="form">
          <AuthForm
            title="Register"
            emailHandler={changeEmailHandler}
            passwordHandler={changePasswordHandler}
          />
          <FormContainer large>
            <Typography component="div">
              Already have account?{' '}
              <PrimaryText>
                <Link href={EndPoint.Login}>Login</Link>
              </PrimaryText>
            </Typography>
            <ContainedButton primary onClick={submitHandler}>
              Register
            </ContainedButton>
          </FormContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
