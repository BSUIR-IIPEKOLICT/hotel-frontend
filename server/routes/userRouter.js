const {Router} = require('express')
const router = Router()
const controller = require('../controllers/UserController')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/auth', controller.auth)

module.exports = router
