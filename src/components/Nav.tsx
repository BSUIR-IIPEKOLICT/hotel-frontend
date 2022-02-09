import React, { useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../store';
import { useRouter } from 'next/router';
import { EndPoint } from '../shared/enums';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useLocalStorage } from '../hooks';
import { OutlinedButton, TextButton } from '../styles/buttons';
import { NavProps } from '../interfaces/props';

const Nav: React.FC<NavProps> = ({ toggleTheme }) => {
  const { destroyToken } = useLocalStorage();
  const { userStore } = useContext(StoreContext);
  const { route, push, reload } = useRouter();
  const isAuthPages = route === EndPoint.Login || route === EndPoint.Register;
  const { palette } = useTheme();

  const logout = () => {
    userStore.setUser();
    userStore.setIsAuth(false);
    destroyToken();
    push(EndPoint.Main).then();
  };

  const toggleThemeHandler = () => toggleTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link href={EndPoint.Main}>Hotel app</Link>
            <TextButton onClick={toggleThemeHandler}>
              {palette.mode === 'dark' ? (
                <DarkModeRoundedIcon />
              ) : (
                <LightModeRoundedIcon />
              )}
            </TextButton>
          </Typography>

          {userStore?.getIsAuth() && userStore?.isAdmin() && (
            <OutlinedButton onClick={() => push(EndPoint.Admin)}>
              Admin
            </OutlinedButton>
          )}

          {userStore?.getIsAuth() && (
            <>
              <TextButton onClick={() => push(EndPoint.Orders)}>
                <AccountCircleRoundedIcon />
              </TextButton>
              <OutlinedButton onClick={logout}>Logout</OutlinedButton>
            </>
          )}

          {!isAuthPages && !userStore?.getIsAuth() && (
            <>
              <Link href={EndPoint.Register} passHref={true}>
                <OutlinedButton>Register</OutlinedButton>
              </Link>

              <Link href={EndPoint.Login} passHref={true}>
                <OutlinedButton>Login</OutlinedButton>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default observer(Nav);
