import { Router } from 'express'
import buildingRouter from './building.router.js'
import serviceRouter from './service.router.js'
import typeRouter from './type.router.js'
import roomRouter from './room.router.js'
import orderRouter from './order.router.js'
import basketRouter from './basket.router.js'
import userRouter from './user.router.js'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/building', buildingRouter)
apiRouter.use('/type', typeRouter)
apiRouter.use('/service', serviceRouter)
apiRouter.use('/room', roomRouter)
apiRouter.use('/basket', basketRouter)
apiRouter.use('/order', orderRouter)

export default apiRouter
