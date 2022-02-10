import React, { useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store';
import { EndPoint } from '../shared/enums';
import { AppBar, Toolbar, useTheme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigation, useUser } from '../hooks';
import { OutlinedButton, TextButton } from './styled/buttons';
import { NavProps } from '../interfaces/props';
import { RouteLink } from './styled/common';
import { GrowTypography, StyledGrowBox } from './styled/containers';

const Nav: React.FC<NavProps> = ({ toggleTheme }) => {
  const { logoutHandler } = useUser();
  const { userStore } = useContext(StoreContext);
  const { isAuthPages } = useNavigation();
  const { palette } = useTheme();

  return (
    <StyledGrowBox>
      <AppBar position="static">
        <Toolbar>
          <GrowTypography variant="h5">
            <Link href={EndPoint.Main}>Hotel app</Link>
            <TextButton onClick={toggleTheme}>
              {palette.mode === 'dark' ? (
                <DarkModeRoundedIcon />
              ) : (
                <LightModeRoundedIcon />
              )}
            </TextButton>
          </GrowTypography>

          {userStore.getIsAuth() && userStore.isAdmin() && (
            <RouteLink href={EndPoint.Admin}>
              <OutlinedButton>Admin</OutlinedButton>
            </RouteLink>
          )}

          {userStore.getIsAuth() && (
            <>
              <RouteLink href={EndPoint.Orders}>
                <TextButton>
                  <AccountCircleRoundedIcon />
                </TextButton>
              </RouteLink>
              <OutlinedButton onClick={logoutHandler}>Logout</OutlinedButton>
            </>
          )}

          {!isAuthPages() && !userStore.getIsAuth() && (
            <>
              <RouteLink href={EndPoint.Register}>
                <OutlinedButton>Register</OutlinedButton>
              </RouteLink>
              <RouteLink href={EndPoint.Login}>
                <OutlinedButton>Login</OutlinedButton>
              </RouteLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </StyledGrowBox>
  );
};

export default observer(Nav);
