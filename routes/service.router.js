import { Router } from 'express'
import { serviceController } from '../controllers/index.js'
import RoleMiddleware from '../middleware/role.middleware.js'
const ServiceRouter = Router()

ServiceRouter.get('/', serviceController.get)
ServiceRouter.post('/', RoleMiddleware(['admin']), serviceController.create)
ServiceRouter.patch('/', RoleMiddleware(['admin']), serviceController.change)
ServiceRouter.delete('/', RoleMiddleware(['admin']), serviceController.delete)

export default ServiceRouter
