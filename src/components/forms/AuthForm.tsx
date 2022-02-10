import React from 'react';
import { AuthFormProps } from '../../interfaces/props';
import { FormHeader } from '../styled/typography';
import { TextField } from '@mui/material';

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  emailHandler,
  passwordHandler,
}) => {
  return (
    <>
      <FormHeader>{title}</FormHeader>
      <TextField
        label="E-mail"
        type="email"
        autoComplete="current-email"
        onChange={emailHandler}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={passwordHandler}
      />
    </>
  );
};

export default AuthForm;
