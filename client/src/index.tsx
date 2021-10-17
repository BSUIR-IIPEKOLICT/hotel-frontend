import React, {createContext} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import {App} from './App'
import UserStore from './store/UserStore'
import BasketStore from './store/BasketStore'
import BuildingStore from './store/BuildingStore'
import RoomStore from './store/RoomStore'
import ServiceStore from './store/ServiceStore'
import TypeStore from './store/TypeStore'
import OrderStore from './store/OrderStore'
import {AppStore} from './interfaces/types'
import {configure} from 'mobx'

configure({
    enforceActions: 'never'
})

export const Context = createContext<AppStore>({} as AppStore)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        basket: new BasketStore(),
        building: new BuildingStore(),
        room: new RoomStore(),
        service: new ServiceStore(),
        type: new TypeStore(),
        order: new OrderStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
