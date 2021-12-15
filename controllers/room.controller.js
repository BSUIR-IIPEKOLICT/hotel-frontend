import {
  basketService,
  buildingService,
  orderService,
  roomService,
} from '../services/index.js'

export default class RoomController {
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

    const amount = await roomService.getAmount(query)
    const rooms = await roomService.get(query, limit, offset)

    return res.json({ rooms, amount })
  }

  async create(req, res) {
    const room = await roomService.create(req.body._building, req.body._type)
    await buildingService.addRoom(req.body._building, room._id)
    return res.json(room)
  }

  async change(req, res) {
    const { _id, _building, _type } = req.body
    const stock = await roomService.getOne(_id)
    const room = await roomService.change(_id, _building, _type)

    if (_building !== stock._building._id) {
      await buildingService.removeRoom(_id)
      await buildingService.addRoom(_building, _id)
    }

    return res.json(room)
  }

  async delete(req, res) {
    const room = await roomService.getOne(req.body._id)
    await roomService.delete(room._id)
    await buildingService.removeRoom(room._id)

    if (room._order) {
      const id = await orderService.delete(room._order)
      await basketService.removeOrder(id)
    }

    return res.json(room._id)
  }
}
