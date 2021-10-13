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

export const Context = createContext(null) as any

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        basket: new BasketStore(),
        buildings: new BuildingStore(),
        room: new RoomStore(),
        services: new ServiceStore(),
        types: new TypeStore(),
        orders: new OrderStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
