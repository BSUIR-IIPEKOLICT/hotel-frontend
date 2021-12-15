import { Router } from 'express'
import { basketController } from '../controllers/index.js'
import { roleMiddleware } from '../middleware/index.js'

const basketRouter = Router()

basketRouter.get('/', roleMiddleware(['admin']), basketController.get)
basketRouter.get('/current', basketController.getOne)

export default basketRouter
