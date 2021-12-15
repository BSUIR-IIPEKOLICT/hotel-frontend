import { Router } from 'express'
import { serviceController } from '../controllers/index.js'
import { roleMiddleware } from '../middleware/index.js'

const serviceRouter = Router()

serviceRouter.get('/', serviceController.get)
serviceRouter.post('/', roleMiddleware(['admin']), serviceController.create)
serviceRouter.patch('/', roleMiddleware(['admin']), serviceController.change)
serviceRouter.delete('/', roleMiddleware(['admin']), serviceController.delete)

export default serviceRouter
