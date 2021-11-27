import React, { useContext, useState } from 'react'
import { Box, Button, Container, TextField, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { login, register } from '../http/userAPI'
import { Context } from '../store'
import { User } from '../interfaces/models'
import { observer } from 'mobx-react-lite'
import { paths } from '../shared/enums'

export const AuthPage: React.FC = observer(() => {
    const location = useLocation()
    const isRegister = location.pathname === paths.register
    const { palette } = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { push } = useHistory()
    const { user } = useContext(Context)

    const submitHandler = async () => {
        try {
            let data

            if (isRegister) data = await register(email, password)
            else data = await login(email, password)

            user.setUser(data as unknown as User)
            user.setIsAuth(true)
            push(paths.main)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="container">
            <Container>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '40ch',
                        },
                    }}
                    noValidate
                    autoComplete="off"
                    className="form"
                >
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1, my: 2 }}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Typography>
                    <TextField
                        id="outlined-email"
                        label="E-mail"
                        type="email"
                        autoComplete="current-email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box
                        sx={{
                            py: 3,
                            width: '40ch',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="div">
                            {isRegister
                                ? 'Already have account? '
                                : `Don't have account? `}
                            <Typography
                                component="span"
                                sx={{ color: palette.primary.main }}
                            >
                                <NavLink
                                    to={
                                        isRegister
                                            ? paths.login
                                            : paths.register
                                    }
                                >
                                    {isRegister ? ' Login' : 'Register'}
                                </NavLink>
                            </Typography>
                        </Typography>
                        <Button variant="contained" onClick={submitHandler}>
                            {isRegister ? 'Register' : 'Login'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
})
