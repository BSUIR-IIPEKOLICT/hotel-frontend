import { Building, Type } from './models'

export interface RoomPopulated {
    _id: string,
    _building: Building,
    _type: Type,
    _order?: string,
    isFree: boolean,
    population: number
}
