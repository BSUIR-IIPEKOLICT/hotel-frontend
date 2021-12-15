import BasketService from './basket.service.js'
import BuildingService from './building.service.js'
import OrderService from './order.service.js'
import RoomService from './room.service.js'
import ServiceService from './service.service.js'
import TypeService from './type.service.js'
import UserService from './user.service.js'

export const basketService = new BasketService()
export const buildingService = new BuildingService()
export const orderService = new OrderService()
export const roomService = new RoomService()
export const serviceService = new ServiceService()
export const typeService = new TypeService()
export const userService = new UserService()
