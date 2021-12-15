import { Router } from 'express'
import { roomController } from '../controllers/index.js'
import { roleMiddleware } from '../middleware/index.js'

const roomRouter = Router()

roomRouter.get('/', roomController.get)
roomRouter.post('/', roleMiddleware(['admin']), roomController.create)
roomRouter.patch('/', roleMiddleware(['admin']), roomController.change)
roomRouter.delete('/', roleMiddleware(['admin']), roomController.delete)

export default roomRouter
