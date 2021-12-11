import { Router } from 'express'
import { basketController } from '../controllers/index.js'
import RoleMiddleware from '../middleware/role.middleware.js'
const BasketRouter = Router()

BasketRouter.get('/', RoleMiddleware(['admin']), basketController.get)
BasketRouter.get('/current', basketController.getOne)

export default BasketRouter
