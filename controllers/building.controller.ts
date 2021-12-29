import {
  basketService,
  buildingService,
  orderService,
  roomService,
} from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { RoomPopulated } from '../shared/models'

export default class BuildingController {
  async get(req: ModifiedRequest, res: Response) {
    const buildings = await buildingService.get()
    return res.json(buildings)
  }

  async create(req: ModifiedRequest, res: Response) {
    const building = await buildingService.create(req.body.address)
    return res.json(building)
  }

  async change(req: ModifiedRequest, res: Response) {
    const { _id, address } = req.body
    const building = await buildingService.change(_id, address)
    return res.json(building)
  }

  async delete(req: ModifiedRequest, res: Response) {
    const id = await buildingService.delete(req.body._id)
    const rooms = await roomService.get({ _building: id })

    rooms.map(async (room: RoomPopulated) => {
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
