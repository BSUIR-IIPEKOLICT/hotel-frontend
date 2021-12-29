import { basketService } from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { GetOneBasketDto } from '../shared/dtos'

export default class BasketController {
  async get(req: ModifiedRequest, res: Response) {
    const baskets = await basketService.get()
    return res.json(baskets)
  }

  async getOne(req: ModifiedRequest & GetOneBasketDto, res: Response) {
    const basket = await basketService.getOne(req.query._user)
    return res.json(basket)
  }
}
