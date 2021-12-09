const Type = require('../models/Type')
const Room = require('../models/Room')
const Building = require('../models/Building')
const Order = require('../models/Order')
const Basket = require('../models/Basket')

class TypeController {
  async get(req, res) {
    const types = await Type.find({}).lean()
    return res.json(types)
  }

  async create(req, res) {
    const { _services, name, places } = req.body

    const type = await new Type({
      _services,
      name,
      places,
    })
    await type.save()

    return res.json(type)
  }

  async change(req, res) {
    const { _id, _services, name, places } = req.body

    const type = await Type.findByIdAndUpdate(_id, {
      $set: { _services, name, places },
    }).lean()

    type._services = _services
    type.name = name
    type.places = places

    return res.json(type)
  }

  async delete(req, res) {
    const { _id } = req.body
    const rooms = await Room.find({ _type: _id }).lean()

    rooms.map(async ({ _id }) => {
      await Room.findByIdAndRemove(_id)
      await Building.updateMany({}, { $pull: { _rooms: _id } })
      const order = await Order.findOne({ _room: _id }).lean()

      if (order) {
        await Basket.findByIdAndUpdate(order._basket, {
          $pull: { _orders: order._id },
        })
        await Order.deleteOne(order)
      }
    })

    await Type.findByIdAndRemove(_id)

    return res.json(_id)
  }
}

module.exports = new TypeController()
