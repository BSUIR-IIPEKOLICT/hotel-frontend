import {AdminPage} from '../pages/AdminPage'
import {BasketPage} from '../pages/BasketPage'
import {RoomPage} from '../pages/RoomPage'
import {MainPage} from '../pages/MainPage'
import {AuthPage} from '../pages/AuthPage'
import {adminRoute, basketRoute, loginRoute, mainRoute, registerRoute, roomRoute} from './constants'

export const authRoutes = [
    {
        path: adminRoute,
        component: AdminPage
    },
    {
        path: basketRoute,
        component: BasketPage
    }
]

export const publicRoutes = [
    {
        path: mainRoute,
        component: MainPage
    },
    {
        path: registerRoute,
        component: AuthPage
    },
    {
        path: loginRoute,
        component: AuthPage
    },
    {
        path: `${roomRoute}/:id`,
        component: RoomPage
    }
]
