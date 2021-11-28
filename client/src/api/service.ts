import BaseApi from '../base/baseApi'
import { Service } from '../interfaces/models'

export default class ServiceApi extends BaseApi {
    private readonly route = '/service'

    async getAll(): Promise<Service[]> {
        return (await this.api.get<Service[]>(this.route)).data
    }
}
