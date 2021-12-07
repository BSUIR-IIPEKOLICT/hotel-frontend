const { Router } = require('express')
const router = Router()
const controller = require('../controllers/OrderController')

router.get('/', controller.get)
router.put('/', controller.create)
router.delete('/', controller.delete)

module.exports = router
