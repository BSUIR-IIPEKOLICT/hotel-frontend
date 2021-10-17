import React, {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {AppRouter} from './components/app/AppRouter'
import {Nav} from './components/Nav'
import {ThemeProvider} from '@mui/material'
import theme from './shared/theme'

export const App: React.FC = () => {
    const [dark, setDark] = useState(localStorage.getItem('darkMode') !== 'false')
    const currentTheme = theme(dark)

    useEffect(() => localStorage.setItem('darkMode', JSON.stringify(dark)), [dark])

    return (
        <div className={dark ? 'root' : 'root light'}>
            <ThemeProvider theme={currentTheme}>
                <BrowserRouter>
                    <Nav toggleTheme={() => setDark(prev => !prev)}/>
                    <AppRouter />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}
