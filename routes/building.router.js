import { Router } from 'express'
import { buildingController } from '../controllers/index.js'
import { roleMiddleware } from '../middleware/index.js'

const buildingRouter = Router()

buildingRouter.get('/', buildingController.get)
buildingRouter.post('/', roleMiddleware(['admin']), buildingController.create)
buildingRouter.patch('/', roleMiddleware(['admin']), buildingController.change)
buildingRouter.delete('/', roleMiddleware(['admin']), buildingController.delete)

export default buildingRouter
