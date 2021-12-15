import {
  basketService,
  buildingService,
  orderService,
  roomService,
} from '../services/index.js'

export default class BuildingController {
  async get(req, res) {
    const buildings = await buildingService.get()
    return res.json(buildings)
  }

  async create(req, res) {
    const building = await buildingService.create(req.body.address)
    return res.json(building)
  }

  async change(req, res) {
    const { _id, address } = req.body
    const building = await buildingService.change(_id, address)
    return res.json(building)
  }

  async delete(req, res) {
    const id = await buildingService.delete(req.body._id)
    const rooms = await roomService.get({ _building: id })

    rooms.map(async (room) => {
      if (room._order) {
        const order = await orderService.getOne(room._order)
        await orderService.delete(room._order)
        await basketService.removeOrder(order)
      }
    })

    await roomService.deleteWithBuilding(id)
    return res.json(id)
  }
}
