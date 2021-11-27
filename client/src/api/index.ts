import UserApi from './user'
import ApiConfig from './config'
import TypeApi from './type'
import BuildingApi from './building'
import ServiceApi from './service'
import RoomApi from './room'

const config = new ApiConfig()

export const userApi = new UserApi(config)
export const typeApi = new TypeApi(config)
export const buildingApi = new BuildingApi(config)
export const serviceApi = new ServiceApi(config)
export const roomApi = new RoomApi(config)
