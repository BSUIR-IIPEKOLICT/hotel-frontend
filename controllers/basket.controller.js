import { basketService } from '../services/index.js'

export default class BasketController {
  async get(req, res) {
    const baskets = await basketService.get()
    return res.json(baskets)
  }

  async getOne(req, res) {
    const basket = await basketService.getOne(req.query._user)
    return res.json(basket)
  }
}
