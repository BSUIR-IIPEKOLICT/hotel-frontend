const Building = require('../models/Building')
const Room = require('../models/Room')
const Order = require('../models/Order')
const Basket = require('../models/Basket')

class BuildingController {
  async get(req, res) {
    const buildings = await Building.find({}).lean()
    return res.json(buildings)
  }

  async create(req, res) {
    const { address } = req.body

    const building = await new Building({ address })
    await building.save()

    return res.json(building)
  }

  async change(req, res) {
    const { _id, address } = req.body

    const building = await Building.findByIdAndUpdate(_id, {
      $set: { address },
    }).lean()

    building.address = address

    return res.json(building)
  }

  async delete(req, res) {
    const { _id } = req.body
    const building = await Building.findById(_id).populate('_rooms').lean()

    building._rooms.map(async ({ _id }) => {
      const order = await Order.findOne({ _room: _id }).lean()

      await Basket.updateOne(
        { _id: order._basket },
        { $pull: { _orders: order._id } }
      )
      await Order.deleteOne(order)
      await Room.deleteOne({ _id })
    })

    await Building.deleteOne({ _id: building._id })

    return res.json(_id)
  }
}

module.exports = new BuildingController()
