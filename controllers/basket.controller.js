import BasketService from '../services/basket.service.js'

export default class BasketController {
  async get(req, res) {
    const baskets = await BasketService.get()
    return res.json(baskets)
  }

  async getOne(req, res) {
    const basket = await BasketService.getOne(req.query._user)
    return res.json(basket)
  }
}
