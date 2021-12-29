import {
  basketService,
  buildingService,
  orderService,
  roomService,
  typeService,
} from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'

export default class TypeController {
  async get(req: ModifiedRequest, res: Response) {
    const types = await typeService.get()
    return res.json(types)
  }

  async create(req: ModifiedRequest, res: Response) {
    const { _services, name, places } = req.body
    const type = await typeService.create(_services, name, places)
    return res.json(type)
  }

  async change(req: ModifiedRequest, res: Response) {
    const { _id, _services, name, places } = req.body
    const type = await typeService.change(_id, _services, name, places)
    return res.json(type)
  }

  async delete(req: ModifiedRequest, res: Response) {
    const id = await typeService.delete(req.body._id)
    const rooms = await roomService.get({ _type: id })
    await roomService.deleteWithType(id)

    rooms.map(async (room) => {
      await buildingService.removeRoom(room._id)

      if (room._order) {
        const order = await orderService.getOne(room._order)
        await basketService.removeOrder(order)
        await orderService.delete(room._order)
      }
    })

    return res.json(id)
  }
}
