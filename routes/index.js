const {Router} = require('express')
const router = Router()

router.use('/user', require('./userRouter'))
router.use('/building', require('./buildingRouter'))
router.use('/type', require('./typeRouter'))
router.use('/service', require('./serviceRouter'))
router.use('/room', require('./roomRouter'))
router.use('/basket', require('./basketRouter'))
router.use('/order', require('./orderRouter'))

module.exports = router
