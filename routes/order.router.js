import { Router } from 'express'
import { orderController } from '../controllers/index.js'

const orderRouter = Router()

orderRouter.get('/', orderController.get)
orderRouter.post('/', orderController.create)
orderRouter.delete('/', orderController.delete)

export default orderRouter
