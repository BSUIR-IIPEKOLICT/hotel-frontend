import { Router } from 'express'
import { typeController } from '../controllers/index.js'
import RoleMiddleware from '../middleware/role.middleware.js'
const TypeRouter = Router()

TypeRouter.get('/', typeController.get)
TypeRouter.post('/', RoleMiddleware(['admin']), typeController.create)
TypeRouter.patch('/', RoleMiddleware(['admin']), typeController.change)
TypeRouter.delete('/', RoleMiddleware(['admin']), typeController.delete)

export default TypeRouter
