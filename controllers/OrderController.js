const Order = require('../models/Order')
const Basket = require('../models/Basket')
const Room = require('../models/Room')
const { objectId } = require('../helpers/db')

class OrderController {
  async get(req, res) {
    const { _basket } = req.query
    const orders = await Order.find({ _basket })
      .populate('_services')
      .populate('_room')
      .lean()
    return res.json(orders)
  }

  async create(req, res) {
    const { _basket, _room, _services, duty, population, date } = req.body
    const id = objectId()

    const order = await new Order({
      _id: id,
      _basket,
      _room,
      _services,
      duty,
      population,
      date,
    })

    await order.save()
    const response = await Order.findOne(order)
      .populate('_services')
      .populate('_room')
      .lean()
    await Basket.updateOne({ _id: _basket }, { $push: { _orders: id } })
    await Room.updateOne({ _id: _room }, { $set: { isFree: false } })
    await Room.updateOne({ _id: _room }, { $set: { population } })

    return res.json(response)
  }

  async delete(req, res) {
    const { _id } = req.body
    const order = await Order.findById(_id).lean()

    await Basket.updateOne({ _id: order._basket }, { $pull: { _orders: _id } })
    await Room.updateOne(
      { _id: order._room },
      { $set: { isFree: true, population: 0 } }
    )
    await Order.deleteOne(order)

    return res.json(_id)
  }
}

module.exports = new OrderController()
