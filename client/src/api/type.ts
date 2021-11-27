import BaseApi from './base'
import { Type } from '../interfaces/models'

export default class TypeApi extends BaseApi {
    private readonly route = '/type'

    async getAll(): Promise<Type[]> {
        return (await this.api.get<Type[]>(this.route)).data
    }
}
