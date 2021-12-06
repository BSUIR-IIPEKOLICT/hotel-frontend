import BaseApi from '../base/baseApi'
import { Service } from '../interfaces/models'

export default class ServiceApi extends BaseApi {
  private readonly route = '/service'

  async getAll(): Promise<Service[]> {
    return (await this.api.get<Service[]>(this.route)).data
  }

  async create(name: string, price: number): Promise<Service> {
    return (await this.authApi.post<Service>(this.route, { name, price })).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data
  }
}
