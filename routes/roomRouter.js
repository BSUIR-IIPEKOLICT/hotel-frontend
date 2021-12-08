const { Router } = require('express')
const router = Router()
const controller = require('../controllers/RoomController')
const RoleMiddleware = require('../middleware/RoleMiddleware')

router.get('/', controller.get)
router.put('/', RoleMiddleware(['admin']), controller.create)
router.patch('/', RoleMiddleware(['admin']), controller.change)
router.delete('/', RoleMiddleware(['admin']), controller.delete)

module.exports = router
