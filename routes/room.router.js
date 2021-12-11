import { Router } from 'express'
import { roomController } from '../controllers/index.js'
import RoleMiddleware from '../middleware/role.middleware.js'
const RoomRouter = Router()

RoomRouter.get('/', roomController.get)
RoomRouter.post('/', RoleMiddleware(['admin']), roomController.create)
RoomRouter.patch('/', RoleMiddleware(['admin']), roomController.change)
RoomRouter.delete('/', RoleMiddleware(['admin']), roomController.delete)

export default RoomRouter
