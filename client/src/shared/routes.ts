import { CreatePage } from '../pages/CreatePage'
import { BasketPage } from '../pages/BasketPage'
import { RoomPage } from '../pages/RoomPage'
import { MainPage } from '../pages/MainPage'
import { AuthPage } from '../pages/AuthPage'
import { paths } from './enums'

export const authRoutes = [
    {
        path: paths.create,
        component: CreatePage,
    },
    {
        path: paths.basket,
        component: BasketPage,
    },
]

export const publicRoutes = [
    {
        path: paths.main,
        component: MainPage,
    },
    {
        path: paths.register,
        component: AuthPage,
    },
    {
        path: paths.login,
        component: AuthPage,
    },
    {
        path: `${paths.room}/:id`,
        component: RoomPage,
    },
]
