import React from 'react';
import { Typography, TypographyProps, styled } from '@mui/material';
import { StyledTypographyProps } from '../../interfaces/styled';

const PrimaryTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledFormHeader = styled(Typography)`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  flex-grow: 1;
`;

export const PrimaryText: React.FC<StyledTypographyProps> = (props) => {
  return (
    <PrimaryTypography component={props.component || 'span'} {...props}>
      {props.children}
    </PrimaryTypography>
  );
};

export const FormHeader: React.FC<TypographyProps> = (props) => {
  return (
    <StyledFormHeader variant={props.variant || 'h4'} {...props}>
      {props.children}
    </StyledFormHeader>
  );
};
