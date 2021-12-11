import BuildingModel from '../models/building.model.js'

class BuildingService {
  async get() {
    return BuildingModel.find({}).lean()
  }

  async getOne(_id) {
    return BuildingModel.findById(_id).populate('_rooms').lean()
  }

  async create(address) {
    const building = await new BuildingModel({ address })
    await building.save()
    return building
  }

  async change(_id, address) {
    const building = await BuildingModel.findByIdAndUpdate(_id, {
      $set: { address },
    }).lean()
    return { ...building, address }
  }

  async addRoom(buildingId, roomId) {
    await BuildingModel.updateOne(
      { _id: buildingId },
      { $push: { _rooms: roomId } }
    )
  }

  async removeRoom(roomId) {
    await BuildingModel.updateMany({}, { $pull: { _rooms: roomId } })
  }

  async delete(_id) {
    await BuildingModel.findByIdAndRemove(_id)
    return _id
  }
}

export default new BuildingService()
