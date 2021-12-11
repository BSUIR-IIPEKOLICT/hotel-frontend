import { Router } from 'express'
import { buildingController } from '../controllers/index.js'
import RoleMiddleware from '../middleware/role.middleware.js'
const BuildingRouter = Router()

BuildingRouter.get('/', buildingController.get)
BuildingRouter.post('/', RoleMiddleware(['admin']), buildingController.create)
BuildingRouter.patch('/', RoleMiddleware(['admin']), buildingController.change)
BuildingRouter.delete('/', RoleMiddleware(['admin']), buildingController.delete)

export default BuildingRouter
