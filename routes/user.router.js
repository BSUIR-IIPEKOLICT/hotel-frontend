import { Router } from 'express'
import { userController } from '../controllers/index.js'
import RoleMiddleware from '../middleware/role.middleware.js'
import AuthMiddleware from '../middleware/auth.middleware.js'
const UserRouter = Router()

UserRouter.get('/', RoleMiddleware(['admin']), userController.getAll)
UserRouter.post('/register', userController.register)
UserRouter.post('/login', userController.login)
UserRouter.post('/auth', AuthMiddleware, userController.auth)
UserRouter.patch('/', RoleMiddleware(['admin']), userController.changeRole)
UserRouter.delete('/', RoleMiddleware(['admin']), userController.delete)

export default UserRouter
