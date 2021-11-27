import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './components/app/AppRouter'
import { Nav } from './components/Nav'
import { Box, CircularProgress, ThemeProvider } from '@mui/material'
import theme from './shared/theme'
import { auth } from './http/userAPI'
import { Context } from './store'
import { User } from './interfaces/models'

export const App: React.FC = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem('darkMode') !== 'false'
    )
    const currentTheme = theme(isDark)

    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(Context)

    useEffect(
        () => localStorage.setItem('darkMode', JSON.stringify(isDark)),
        [isDark]
    )

    useEffect(() => {
        auth()
            .then((data) => {
                user.setUser(data as unknown as User)
                user.setIsAuth(true)
            })
            .finally(() => setIsLoading(false))
    })

    if (isLoading)
        return (
            <div className={isDark ? 'root' : 'root light'}>
                <Box
                    sx={{
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
            </div>
        )

    return (
        <div className={isDark ? 'root' : 'root light'}>
            <ThemeProvider theme={currentTheme}>
                <BrowserRouter>
                    <Nav toggleTheme={() => setIsDark((prev) => !prev)} />
                    <AppRouter />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}
