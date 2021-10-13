const Basket = require('../models/Basket')
const Order = require('../models/Order')

class BasketController {
    async get(req, res) {
        const baskets = await Basket.find({}).lean()
        return res.json({baskets})
    }

    async current(req, res) {
        const {_user} = req.body

        const basket = await Basket.findOne({_id: _user}).lean()
        return res.json({basket})
    }

    async create(req, res) {
        const {_user} = req.body

        await new Basket({_user}).save()
        return res.json({message: 'Success'})
    }

    async delete(req, res) {
        const {_id} = req.body
        const basket = await Basket.findById(_id).lean()

        await Order.deleteMany({_basket: basket['_id']})
        await Basket.deleteOne(basket)

        return res.json({message: 'Success'})
    }
}

module.exports = new BasketController()
