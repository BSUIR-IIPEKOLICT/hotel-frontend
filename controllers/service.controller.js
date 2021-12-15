import { orderService, serviceService, typeService } from '../services/index.js'

export default class ServiceController {
  async get(req, res) {
    const services = await serviceService.get()
    return res.json(services)
  }

  async create(req, res) {
    const { name, price } = req.body
    const service = await serviceService.create(name, price)
    return res.json(service)
  }

  async change(req, res) {
    const { _id, name, price } = req.body
    const service = await serviceService.change(_id, name, price)
    return res.json(service)
  }

  async delete(req, res) {
    const id = await serviceService.delete(req.body._id)
    await typeService.removeService(id)
    await orderService.removeService(id)
    return res.json(id)
  }
}
