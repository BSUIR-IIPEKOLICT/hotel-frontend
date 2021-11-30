const Basket = require('../models/Basket')

class BasketController {
  async get(req, res) {
    const baskets = await Basket.find({})
      .populate('_user')
      .populate('_orders')
      .lean()
    return res.json(baskets)
  }

  async getOne(req, res) {
    const { _user } = req.query
    const basket = await Basket.findOne({ _user })
      .populate('_user')
      .populate('_orders')
      .lean()
    return res.json(basket)
  }
}

module.exports = new BasketController()
