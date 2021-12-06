import BaseApi from '../base/baseApi'
import { BasketPopulated } from '../interfaces/populatedModels'

export default class BasketApi extends BaseApi {
  private readonly route = '/basket'
  private readonly currentAlias = '/current'

  async getOne(userId: string): Promise<BasketPopulated> {
    return (
      await this.api.get<BasketPopulated>(this.route + this.currentAlias, {
        params: { _user: userId },
      })
    ).data
  }

  async getAll(): Promise<BasketPopulated[]> {
    return (await this.authApi.get<BasketPopulated[]>(this.route)).data
  }
}
