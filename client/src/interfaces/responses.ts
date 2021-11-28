import { RoomPopulated } from './populatedModels'

export interface RoomResponse {
    rooms: RoomPopulated[]
    amount: number
}
