import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { StyledButtonProps } from '../interfaces/styles';

const StyledButton = styled(Button)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
`;

export const DefaultButton: React.FC<StyledButtonProps> = ({
  children,
  primary,
  variant,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={primary ? 'primary' : 'inherit'}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export const TextButton: React.FC<StyledButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <DefaultButton variant="text" {...props}>
      {children}
    </DefaultButton>
  );
};

export const OutlinedButton: React.FC<StyledButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <DefaultButton variant="outlined" {...props}>
      {children}
    </DefaultButton>
  );
};

export const ContainedButton: React.FC<StyledButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <DefaultButton variant="contained" {...props}>
      {children}
    </DefaultButton>
  );
};
