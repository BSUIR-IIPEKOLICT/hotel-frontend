import BaseApi from '../base/baseApi'
import { OrderPopulated } from '../interfaces/populatedModels'
import { Order } from '../interfaces/models'

export default class OrderApi extends BaseApi {
  private readonly route = '/order'

  async get(basketId: string): Promise<OrderPopulated[]> {
    return (
      await this.api.get<OrderPopulated[]>(this.route, {
        params: { _basket: basketId },
      })
    ).data
  }

  async create(
    _basket: string,
    _room: string,
    _services: string[],
    duty: number,
    population: number
  ): Promise<Order> {
    return (
      await this.api.post<Order>(this.route, {
        _basket,
        _room,
        _services,
        duty,
        population,
        date: new Date().toDateString(),
      })
    ).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.api.delete<string>(this.route, { params: { _id } })).data
  }
}
