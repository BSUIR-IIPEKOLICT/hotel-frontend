import React from 'react'
import {Box, Button, Container, TextField, useTheme} from '@mui/material'
import Typography from '@mui/material/Typography'
import {NavLink, useLocation} from 'react-router-dom'
import {loginRoute, registerRoute} from '../shared/constants'

export const AuthPage: React.FC = () => {
    const location = useLocation()
    const isRegister = location.pathname === registerRoute
    const {palette} = useTheme()

    return (
        <div className="container">
            <Container>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    className='form'
                >
                    <Typography variant='h4' component='div' sx={{flexGrow: 1, my: 2}}>
                        {isRegister ? 'Register' : 'Login'}
                    </Typography>
                    <TextField
                        id="outlined-email"
                        label="E-mail"
                        type="email"
                        autoComplete="current-email"
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Box sx={{
                        py: 3,
                        width: '40ch',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography component='div'>
                            {isRegister ? 'Already have account? ' : `Don't have account? `}
                            <Typography component='span' sx={{color: palette.primary.main}}>
                                <NavLink to={isRegister ? loginRoute : registerRoute}>
                                    {isRegister ? ' Login' : 'Register'}
                                </NavLink>
                            </Typography>
                        </Typography>
                        <Button variant='contained'>{isRegister ? 'Register' : 'Login'}</Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}
