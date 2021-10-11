const {Router} = require('express')
const router = Router()
const controller = require('../controllers/BuildingController')

router.get('/', controller.get)
router.put('/', controller.create)
router.delete('/', controller.delete)

module.exports = router
