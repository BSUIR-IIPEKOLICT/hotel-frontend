const Type = require('../models/Type')
const Room = require('../models/Room')
const Building = require('../models/Building')
const Order = require('../models/Order')

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

  async delete(req, res) {
    const { _id } = req.body
    const type = await Type.findById(_id).lean()
    const rooms = await Room.find({ _type: _id }).lean()

    await rooms.map(({ _id }) => {
      Building.updateMany({}, { $pull: { _rooms: _id } })
      Order.deleteOne({ _room: _id })
    })

    await Type.deleteOne(type)

    return res.json(_id)
  }
}

module.exports = new TypeController()
