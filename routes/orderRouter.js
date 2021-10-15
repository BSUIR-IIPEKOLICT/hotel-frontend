const {Router} = require('express')
const router = Router()
const controller = require('../controllers/OrderController')

router.get('/:_id', controller.get)
router.post('/', controller.create)
router.delete('/', controller.delete)

module.exports = router
