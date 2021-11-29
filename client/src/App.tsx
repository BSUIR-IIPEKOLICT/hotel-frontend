import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './components/app/AppRouter'
import { Nav } from './components/Nav'
import { ThemeProvider } from '@mui/material'
import theme from './shared/theme'
import { Context } from './store'
import { basketApi, userApi } from './api'
import { Preloader } from './components/Preloader'

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('darkMode') !== 'false'
  )
  const currentTheme = theme(isDark)

  const [isLoading, setIsLoading] = useState(true)
  const { user, basket } = useContext(Context)

  useEffect(
    () => localStorage.setItem('darkMode', JSON.stringify(isDark)),
    [isDark]
  )

  useEffect(() => {
    userApi
      .auth()
      .then((response) => {
        user.setUser(response.user)
        user.setIsAuth(true)
        user.setId(response.id)

        basketApi
          .getOne(user.id)
          .then((response) => basket.setBasket(response))
          .catch((e) => console.error(e))
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  })

  if (isLoading) return <Preloader isDark={isDark} />

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
