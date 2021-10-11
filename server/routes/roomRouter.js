const {Router} = require('express')
const router = Router()
const controller = require('../controllers/RoomController')

router.get('/', controller.get)
router.get('/:id', controller.current)
router.put('/', controller.create)
router.delete('/', controller.delete)

module.exports = router
