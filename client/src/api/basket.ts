import BaseApi from '../base/baseApi'
import { BasketPopulated } from '../interfaces/populatedModels'

export default class BasketApi extends BaseApi {
    private readonly route = '/basket'

    async getOne(userId: string): Promise<BasketPopulated> {
        return (await this.api.get<BasketPopulated>(`${this.route}/${userId}`))
            .data
    }
}
