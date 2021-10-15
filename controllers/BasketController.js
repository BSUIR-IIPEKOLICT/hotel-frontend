const Basket = require('../models/Basket')
const Room = require('../models/Room')

class BasketController {
    async get(req, res) {
        const baskets = await Basket.find({}).populate('_user').populate('_orders').lean()
        return res.json(baskets)
    }
}

module.exports = new BasketController()
