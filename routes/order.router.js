import { Router } from 'express'
import { orderController } from '../controllers/index.js'
const OrderRouter = Router()

OrderRouter.get('/', orderController.get)
OrderRouter.post('/', orderController.create)
OrderRouter.delete('/', orderController.delete)

export default OrderRouter
