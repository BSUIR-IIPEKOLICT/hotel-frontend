import BuildingService from '../services/building.service.js'
import RoomService from '../services/room.service.js'
import OrderService from '../services/order.service.js'
import BasketService from '../services/basket.service.js'

export default class BuildingController {
  async get(req, res) {
    const buildings = await BuildingService.get()
    return res.json(buildings)
  }

  async create(req, res) {
    const building = await BuildingService.create(req.body.address)
    return res.json(building)
  }

  async change(req, res) {
    const { _id, address } = req.body
    const building = await BuildingService.change(_id, address)
    return res.json(building)
  }

  async delete(req, res) {
    const id = await BuildingService.delete(req.body._id)
    const rooms = await RoomService.get({ _building: id })

    rooms.map(async (room) => {
      if (room._order) {
        const order = await OrderService.getOne(room._order)
        await OrderService.delete(room._order)
        await BasketService.removeOrder(order)
      }
    })

    await RoomService.deleteWithBuilding(id)
    return res.json(id)
  }
}
