import { styled } from '@mui/system';
import React from 'react';
import { Box } from '@mui/material';
import { StyledFormContainerProps } from '../interfaces/styles';

const StyledFormContainer = styled(Box)`
  padding: ${({ theme }) => theme.spacing(1)} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LargeFormContainer = styled(StyledFormContainer)`
  padding: ${({ theme }) => theme.spacing(3)} 0;
  width: 40ch;
`;

export const FormContainer: React.FC<StyledFormContainerProps> = (props) => {
  return props.large ? (
    <LargeFormContainer {...props}>{props.children}</LargeFormContainer>
  ) : (
    <StyledFormContainer {...props}>{props.children}</StyledFormContainer>
  );
};
