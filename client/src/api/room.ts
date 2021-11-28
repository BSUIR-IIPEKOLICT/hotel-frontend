import BaseApi from './base'
import { RoomRequestConfig } from '../interfaces/types'
import { RoomResponse } from '../interfaces/responses'

export default class RoomApi extends BaseApi {
    private readonly route = '/room'

    async get(
        page: number,
        limit: number,
        building: string = '',
        type: string = '',
        isFree: boolean | undefined = undefined
    ): Promise<RoomResponse> {
        const params: RoomRequestConfig = {
            page,
            limit,
            isFree,
        }

        if (building) params._building = building
        if (type) params._type = type
        if (isFree) params.isFree = isFree

        return (await this.api.get<RoomResponse>(this.route, { params })).data
    }
}
