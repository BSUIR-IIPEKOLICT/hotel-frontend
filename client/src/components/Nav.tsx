import React, {useContext} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'
import {NavLink, useLocation} from 'react-router-dom'
import {basketRoute, loginRoute, registerRoute, mainRoute} from '../shared/constants'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import {useTheme} from '@mui/material'
import {NavProps} from '../interfaces/props'

export const Nav: React.FC<NavProps> = observer(({toggleTheme}) => {
    const {user} = useContext(Context)
    const {pathname} = useLocation()
    const isAuthPage = pathname === loginRoute || pathname === registerRoute
    const {palette} = useTheme()

    user.setIsAuth(true)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
                        <NavLink to={mainRoute}>Hotel app</NavLink>
                        <Button variant='text' color='inherit' sx={{mx: 1}} onClick={() => toggleTheme()}>
                            {(palette.mode === 'dark') ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
                        </Button>
                    </Typography>

                    {user.isAuth && user.user.role === 'admin' && (
                        <Button variant='outlined' color='inherit' sx={{mx: 1}}>Create</Button>
                    )}

                    {user.isAuth && (
                        <>
                            <NavLink to={basketRoute}>
                                <Button variant='text' color='inherit' sx={{mx: 1}}>
                                    <AccountCircleRoundedIcon />
                                </Button>
                            </NavLink>
                            <Button variant='outlined' color='inherit' sx={{mx: 1}}>Logout</Button>
                        </>
                    )}

                    {!isAuthPage && !user.isAuth && (
                        <Box>
                            <NavLink to={registerRoute}>
                                <Button variant='outlined' color='inherit' sx={{mx: 1}}>Register</Button>
                            </NavLink>
                            <NavLink to={loginRoute}>
                                <Button variant='outlined' color='inherit' sx={{mx: 1}}>Login</Button>
                            </NavLink>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
})
