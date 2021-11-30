const { Router } = require('express')
const router = Router()
const controller = require('../controllers/BuildingController')
const RoleMiddleware = require('../middleware/RoleMiddleware')

router.get('/', controller.get)
router.post('/', RoleMiddleware(['admin']), controller.create)
router.delete('/', RoleMiddleware(['admin']), controller.delete)

module.exports = router
