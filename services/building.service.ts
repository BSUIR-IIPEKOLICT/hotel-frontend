import { Building, BuildingPopulated } from '../shared/models'
import { BuildingRepository } from '../shared/repositories'

export default class BuildingService extends BuildingRepository {
  async get(): Promise<Building[]> {
    return this.model.find({}).lean()
  }

  async getOne(_id: string): Promise<BuildingPopulated> {
    return this.model.findById(_id).populate('_rooms').lean()
  }

  async create(address: string): Promise<Building> {
    const building = await new this.model({ address })
    await building.save()
    return building
  }

  async change(_id: string, address: string): Promise<BuildingPopulated> {
    await this.model
      .findByIdAndUpdate(_id, {
        $set: { address },
      })
      .lean()
    return this.getOne(_id)
  }

  async addRoom(buildingId: string, roomId: string) {
    await this.model.updateOne(
      { _id: buildingId },
      { $push: { _rooms: roomId } }
    )
  }

  async removeRoom(roomId: string) {
    await this.model.updateMany({}, { $pull: { _rooms: roomId } })
  }

  async delete(_id: string): Promise<string> {
    await this.model.findByIdAndRemove(_id)
    return _id
  }
}
