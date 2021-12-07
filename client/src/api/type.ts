import BaseApi from '../base/baseApi'
import { Type } from '../interfaces/models'

export default class TypeApi extends BaseApi {
  private readonly route = '/type'

  async getAll(): Promise<Type[]> {
    return (await this.api.get<Type[]>(this.route)).data
  }

  async create(
    _services: string[],
    name: string,
    places: number
  ): Promise<Type> {
    return (
      await this.authApi.put<Type>(this.route, { _services, name, places })
    ).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data
  }
}
