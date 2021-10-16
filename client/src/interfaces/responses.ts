import {Building, Order, Type} from './models'

export interface RoomResponse {
    _id: string,
    _building: Building,
    _type: Type,
    _order?: Order,
    isFree: boolean,
    population: number
}
