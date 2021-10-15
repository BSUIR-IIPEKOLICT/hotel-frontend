const {Router} = require('express')
const router = Router()
const controller = require('../controllers/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/auth', AuthMiddleware, controller.auth)

module.exports = router
