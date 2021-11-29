const { Router } = require('express')
const router = Router()
const controller = require('../controllers/RoomController')
const RoleMiddleware = require('../middleware/RoleMiddleware')

router.get('/', controller.get)
router.get('/:_id', controller.current)
router.post('/', RoleMiddleware(['admin']), controller.create)
router.delete('/', RoleMiddleware(['admin']), controller.delete)

module.exports = router
