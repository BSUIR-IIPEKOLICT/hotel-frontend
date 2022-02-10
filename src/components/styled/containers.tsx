import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import {
  StyledFormContainerProps,
  StyledTypographyProps,
} from '../../interfaces/styled';

const StyledGrowTypography = styled(Typography)`
  flex-grow: 1;
`;

export const StyledGrowBox = styled(Box)`
  flex-grow: 1;
`;

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

export const GrowTypography: React.FC<StyledTypographyProps> = ({
  children,
  ...props
}) => (
  <StyledGrowTypography component="div" {...props}>
    {children}
  </StyledGrowTypography>
);
