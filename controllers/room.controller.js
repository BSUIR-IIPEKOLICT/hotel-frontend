import RoomService from '../services/room.service.js'
import BuildingService from '../services/building.service.js'
import OrderService from '../services/order.service.js'
import BasketService from '../services/basket.service.js'

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

    const amount = await RoomService.getAmount(query)
    const rooms = await RoomService.get(query, limit, offset)

    return res.json({ rooms, amount })
  }

  async create(req, res) {
    const room = await RoomService.create(req.body._building, req.body._type)
    await BuildingService.addRoom(req.body._building, room._id)
    return res.json(room)
  }

  async change(req, res) {
    const { _id, _building, _type } = req.body
    const stock = await RoomService.getOne(_id)
    const room = await RoomService.change(_id, _building, _type)

    if (_building !== stock._building._id) {
      await BuildingService.removeRoom(_id)
      await BuildingService.addRoom(_building, _id)
    }

    return res.json(room)
  }

  async delete(req, res) {
    const room = await RoomService.getOne(req.body._id)
    await RoomService.delete(room._id)
    await BuildingService.removeRoom(room._id)

    if (room._order) {
      const id = await OrderService.delete(room._order)
      await BasketService.removeOrder(id)
    }

    return res.json(room._id)
  }
}
