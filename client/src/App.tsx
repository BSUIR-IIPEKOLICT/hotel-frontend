import React, {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {AppRouter} from './components/AppRouter'
import {Nav} from './components/Nav'
import {ThemeProvider} from '@mui/material'
import theme from './shared/theme'

export const App: React.FC = () => {
    const [dark, setDark] = useState(true)

    return (
        <div className={dark ? 'root' : 'root light'}>
            <ThemeProvider theme={theme(dark)}>
                <BrowserRouter>
                    <Nav />
                    <AppRouter />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}
