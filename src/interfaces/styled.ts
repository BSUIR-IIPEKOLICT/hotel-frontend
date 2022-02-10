import { BoxProps, ButtonProps, TypographyProps } from '@mui/material';

export interface StyledButtonProps extends ButtonProps {
  primary?: boolean;
}

export interface StyledFormContainerProps extends BoxProps {
  large?: boolean;
}

export interface StyledTypographyProps extends TypographyProps {
  component?: string;
}
