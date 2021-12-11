import OrderService from '../services/order.service.js'
import BasketService from '../services/basket.service.js'
import RoomService from '../services/room.service.js'

export default class OrderController {
  async get(req, res) {
    const orders = await OrderService.get(req.query._basket)
    return res.json(orders)
  }

  async create(req, res) {
    const { _basket, _room, _services, duty, population, date } = req.body

    const order = await OrderService.create({
      _basket,
      _room,
      _services,
      duty,
      population,
      date,
    })

    await BasketService.addOrder(_basket, order._id)
    await RoomService.bookRoom(_room, order._id, population)

    return res.json(order)
  }

  async delete(req, res) {
    const order = await OrderService.getOne(req.body._id)
    await OrderService.delete(req.body._id)
    await BasketService.removeOrder(order)
    await RoomService.unBookRoom(order._room._id)
    return res.json(order._id)
  }
}
