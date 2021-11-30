const { Router } = require('express')
const router = Router()
const controller = require('../controllers/BasketController')
const RoleMiddleware = require('../middleware/RoleMiddleware')

router.get('/', RoleMiddleware(['admin']), controller.get)
router.get('/current', controller.getOne)

module.exports = router
