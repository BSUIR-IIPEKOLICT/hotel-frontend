import { AdminPage } from '../pages/AdminPage'
import { UserPage } from '../pages/UserPage'
import { RoomPage } from '../pages/RoomPage'
import { MainPage } from '../pages/MainPage'
import { AuthPage } from '../pages/AuthPage'
import { paths } from './enums'
import { ManageBuildingsPage } from '../pages/ManageBuildingsPage'

export const authRoutes = [
  {
    path: paths.admin,
    component: AdminPage,
  },
  {
    path: paths.user,
    component: UserPage,
  },
  {
    path: paths.manageBuildings,
    component: ManageBuildingsPage,
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
