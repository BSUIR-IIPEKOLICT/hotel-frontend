const {Router} = require('express')
const router = Router()
const controller = require('../controllers/OrderController')

router.get('/', controller.get)
router.get('/current', controller.current)
router.put('/', controller.create)
router.delete('/', controller.delete)

module.exports = router
