import UserStore from '../store/UserStore'
import BasketStore from '../store/BasketStore'
import BuildingStore from '../store/BuildingStore'
import RoomStore from '../store/RoomStore'
import ServiceStore from '../store/ServiceStore'
import TypeStore from '../store/TypeStore'
import OrderStore from '../store/OrderStore'

export interface AppStore {
    user: UserStore
    basket: BasketStore
    building: BuildingStore
    room: RoomStore
    service: ServiceStore
    type: TypeStore
    order: OrderStore
}

export interface RoomRequestConfig {
    _building?: string
    _type?: string
    page: number
    limit: number
    isFree?: boolean
}
