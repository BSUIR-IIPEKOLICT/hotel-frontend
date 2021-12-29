import { orderService, serviceService, typeService } from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'

export default class ServiceController {
  async get(req: ModifiedRequest, res: Response) {
    const services = await serviceService.get()
    return res.json(services)
  }

  async create(req: ModifiedRequest, res: Response) {
    const { name, price } = req.body
    const service = await serviceService.create(name, price)
    return res.json(service)
  }

  async change(req: ModifiedRequest, res: Response) {
    const { _id, name, price } = req.body
    const service = await serviceService.change(_id, name, price)
    return res.json(service)
  }

  async delete(req: ModifiedRequest, res: Response) {
    const id = await serviceService.delete(req.body._id)
    await typeService.removeService(id)
    await orderService.removeService(id)
    return res.json(id)
  }
}
