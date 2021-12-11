import ServiceController from './service.controller.js'
import BuildingController from './building.controller.js'
import TypeController from './type.controller.js'
import RoomController from './room.controller.js'
import OrderController from './order.controller.js'
import BasketController from './basket.controller.js'
import UserController from './user.controller.js'

export const buildingController = new BuildingController()
export const serviceController = new ServiceController()
export const typeController = new TypeController()
export const roomController = new RoomController()
export const orderController = new OrderController()
export const basketController = new BasketController()
export const userController = new UserController()
