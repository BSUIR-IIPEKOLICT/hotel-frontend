import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { StyledButtonProps } from '../interfaces/styles';

const StyledButton = styled(Button)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
`;

export const DefaultButton: React.FC<StyledButtonProps> = (props) => {
  return (
    <StyledButton
      variant={props.variant}
      color={props.primary ? 'primary' : 'inherit'}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
};

export const TextButton: React.FC<StyledButtonProps> = (props) => {
  return (
    <DefaultButton variant="text" {...props}>
      {props.children}
    </DefaultButton>
  );
};

export const OutlinedButton: React.FC<StyledButtonProps> = (props) => {
  return (
    <DefaultButton variant="outlined" {...props}>
      {props.children}
    </DefaultButton>
  );
};

export const ContainedButton: React.FC<StyledButtonProps> = (props) => {
  return (
    <DefaultButton variant="contained" {...props}>
      {props.children}
    </DefaultButton>
  );
};
