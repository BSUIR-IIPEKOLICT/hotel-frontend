import TypeService from '../services/type.service.js'
import RoomService from '../services/room.service.js'
import BuildingService from '../services/building.service.js'
import OrderService from '../services/order.service.js'
import BasketService from '../services/basket.service.js'

export default class TypeController {
  async get(req, res) {
    const types = await TypeService.get()
    return res.json(types)
  }

  async create(req, res) {
    const { _services, name, places } = req.body
    const type = await TypeService.create(_services, name, places)
    return res.json(type)
  }

  async change(req, res) {
    const { _id, _services, name, places } = req.body
    const type = await TypeService.change(_id, _services, name, places)
    return res.json(type)
  }

  async delete(req, res) {
    const id = await TypeService.delete(req.body._id)
    const rooms = await RoomService.get({ _type: id })
    await RoomService.deleteWithType(id)

    rooms.map(async (room) => {
      await BuildingService.removeRoom(room._id)

      if (room._order) {
        const order = await OrderService.getOne(room._order)
        await BasketService.removeOrder(order)
        await OrderService.delete(room._order)
      }
    })

    return res.json(id)
  }
}
