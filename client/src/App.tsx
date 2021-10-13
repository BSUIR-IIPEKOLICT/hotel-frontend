import React, {createContext} from 'react'
import './App.scss'
import {BrowserRouter} from 'react-router-dom'
import {AppRouter} from './components/AppRouter'

export const App: React.FC = () => (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
)
