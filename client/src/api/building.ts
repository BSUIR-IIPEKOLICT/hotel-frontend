import BaseApi from './base'
import { Building } from '../interfaces/models'

export default class BuildingApi extends BaseApi {
    private readonly route = '/building'

    async getAll(): Promise<Building[]> {
        return (await this.api.get<Building[]>(this.route)).data
    }
}
