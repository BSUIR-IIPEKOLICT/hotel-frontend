import BaseApi from '../base/baseApi'
import { OrderPopulated } from '../interfaces/populatedModels'

export default class OrderApi extends BaseApi {
  private readonly route = '/order'

  async get(basketId: string): Promise<OrderPopulated[]> {
    return (await this.api.get<OrderPopulated[]>(`${this.route}/${basketId}`))
      .data
  }
}
