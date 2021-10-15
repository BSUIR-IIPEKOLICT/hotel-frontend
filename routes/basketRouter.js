const {Router} = require('express')
const router = Router()
const controller = require('../controllers/BasketController')
const RoleMiddleware = require('../middleware/RoleMiddleware')

router.get('/', RoleMiddleware(['admin']), controller.get)

module.exports = router
