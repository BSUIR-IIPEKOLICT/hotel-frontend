const { Router } = require('express')
const router = Router()
const controller = require('../controllers/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const RoleMiddleware = require('../middleware/RoleMiddleware')

router.get('/', RoleMiddleware(['admin']), controller.getAll)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/auth', AuthMiddleware, controller.auth)
router.patch('/', RoleMiddleware(['admin']), controller.changeRole)
router.delete('/', RoleMiddleware(['admin']), controller.delete)

module.exports = router
