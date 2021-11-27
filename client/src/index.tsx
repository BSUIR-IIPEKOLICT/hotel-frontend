import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { configure } from 'mobx'
import { Context, store } from './store'

configure({ enforceActions: 'never' })

ReactDOM.render(
    <Context.Provider value={store}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
