const Room = require('../models/Room')
const Building = require('../models/Building')
const Order = require('../models/Order')
const Basket = require('../models/Basket')
const { objectId } = require('../db')

class RoomController {
  async get(req, res) {
    let { _building, _type, page, limit, isFree } = req.query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const offset = page * limit - limit

    const query = {}

    if (isFree) {
      query.isFree = isFree === 'true'
    }

    if (_building && !_type) query._building = _building
    else if (!_building && _type) query._type = _type
    else if (_building && _type) {
      query._building = _building
      query._type = _type
    }

    const amount = await Room.find(query).countDocuments()
    const rooms = await Room.find(query)
      .skip(offset)
      .limit(limit)
      .populate('_type')
      .populate('_building')
      .lean()

    return res.json({ rooms, amount })
  }

  async create(req, res) {
    const { _building, _type } = req.body
    const id = objectId()

    const room = await new Room({
      _id: id,
      _building,
      _type,
      isFree: true,
      population: 0,
    })

    await room.save()
    await Building.updateOne({ _id: _building }, { $push: { _rooms: id } })

    return res.json(room)
  }

  async delete(req, res) {
    const { _id } = req.query
    const room = await Room.findById(_id).populate('_order').lean()

    await Building.updateOne(
      { _id: room._building },
      { $pull: { _rooms: _id } }
    )

    if (room._order) {
      const { _id, _basket } = room._order
      await Basket.updateOne({ _id: _basket }, { $pull: { _orders: _id } })
      await Order.deleteOne({ _id })
    }

    await Room.deleteOne({ _id })

    return res.json(_id)
  }
}

module.exports = new RoomController()
