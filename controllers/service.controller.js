import ServiceService from '../services/service.service.js'
import TypeService from '../services/type.service.js'
import OrderService from '../services/order.service.js'

export default class ServiceController {
  async get(req, res) {
    const services = await ServiceService.get()
    return res.json(services)
  }

  async create(req, res) {
    const { name, price } = req.body
    const service = await ServiceService.create(name, price)
    return res.json(service)
  }

  async change(req, res) {
    const { _id, name, price } = req.body
    const service = await ServiceService.change(_id, name, price)
    return res.json(service)
  }

  async delete(req, res) {
    const id = await ServiceService.delete(req.body._id)
    await TypeService.removeService(id)
    await OrderService.removeService(id)
    return res.json(id)
  }
}
