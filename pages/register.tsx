import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import { EndPoint, Title } from '../src/shared/enums';
import { Box, Container, TextField, Typography } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { userRepository } from '../src/repositories';
import { StoreContext } from '../src/store';
import { User } from '../src/interfaces/models';
import { ContainedButton } from '../src/styles/buttons';
import { FormContainer } from '../src/styles/containers';
import { PrimaryText, FormHeader } from '../src/styles/typography';
import { errorViewer } from '../src/shared/utils';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userStore } = useContext(StoreContext);
  const { push } = useRouter();

  const submitHandler = async () => {
    try {
      const user: User = await userRepository.register(email, password);

      userStore.setUser(user);
      userStore.setIsAuth(true);
      await push(EndPoint.Main);
    } catch (e) {
      errorViewer(e);
    }
  };

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Layout title={Title.Register}>
      <Container>
        <Box component="form" noValidate autoComplete="off" className="form">
          <FormHeader>Register</FormHeader>
          <TextField
            label="E-mail"
            type="email"
            autoComplete="current-email"
            onChange={changeEmailHandler}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={changePasswordHandler}
          />
          <FormContainer large>
            <Typography component="div">
              Already have account?{' '}
              <PrimaryText>
                <Link href={EndPoint.Login}>Login</Link>
              </PrimaryText>
            </Typography>
            <ContainedButton primary={true} onClick={submitHandler}>
              Register
            </ContainedButton>
          </FormContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
