import { Router } from 'express'
import BuildingRouter from './building.router.js'
import ServiceRouter from './service.router.js'
import TypeRouter from './type.router.js'
import RoomRouter from './room.router.js'
import OrderRouter from './order.router.js'
import BasketRouter from './basket.router.js'
import UserRouter from './user.router.js'
const ApiRouter = Router()

ApiRouter.use('/user', UserRouter)
ApiRouter.use('/building', BuildingRouter)
ApiRouter.use('/type', TypeRouter)
ApiRouter.use('/service', ServiceRouter)
ApiRouter.use('/room', RoomRouter)
ApiRouter.use('/basket', BasketRouter)
ApiRouter.use('/order', OrderRouter)

export default ApiRouter
