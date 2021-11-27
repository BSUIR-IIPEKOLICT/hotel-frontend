import BaseApi from './base'
import { RoomPopulated } from '../interfaces/populatedModels'
import { RoomRequestConfig } from '../interfaces/types'

export default class RoomApi extends BaseApi {
    private readonly route = '/room'

    async get(config: RoomRequestConfig): Promise<RoomPopulated[]> {
        let query = `?page=${config.page}&limit=${config.limit}`

        if (config._building) query += `&_building=${config._building}`
        if (config._type) query += `&_type=${config._type}`
        if (config.isFree) query += `&isFree=${config.isFree}`

        return (await this.api.get<RoomPopulated[]>(this.route + query)).data
    }
}
