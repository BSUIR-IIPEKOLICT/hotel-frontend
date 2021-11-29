import BaseApi from '../base/baseApi'
import { OrderPopulated } from '../interfaces/populatedModels'

export default class OrderApi extends BaseApi {
  private readonly route = '/order'

  async get(basketId: string): Promise<OrderPopulated[]> {
    return (await this.api.get<OrderPopulated[]>(`${this.route}/${basketId}`))
      .data
  }

  async create(
    _basket: string,
    _room: string,
    _services: string[],
    population: number
  ): Promise<string> {
    return (
      await this.api.post<string>(this.route, {
        _basket,
        _room,
        _services,
        population,
        date: new Date().toDateString(),
      })
    ).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.api.delete<string>(this.route, { data: { _id } })).data
  }
}
