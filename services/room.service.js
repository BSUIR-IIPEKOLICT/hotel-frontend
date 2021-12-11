import RoomModel from '../models/room.model.js'

class RoomService {
  async get(query, limit = Number.MAX_SAFE_INTEGER, offset = 0) {
    return RoomModel.find(query)
      .skip(offset)
      .limit(limit)
      .populate('_type')
      .populate('_building')
      .lean()
  }

  async getOne(_id) {
    return RoomModel.findById(_id)
      .populate('_type')
      .populate('_building')
      .lean()
  }

  async getAmount(query) {
    return RoomModel.find(query).countDocuments()
  }

  async create(_building, _type) {
    const room = await new RoomModel({
      _building,
      _type,
      isFree: true,
      population: 0,
    })
    await room.save()
    return this.getOne(room._id)
  }

  async change(_id, _building, _type) {
    await RoomModel.findByIdAndUpdate(_id, {
      $set: { _building, _type },
    }).lean()
    return this.getOne(_id)
  }

  async bookRoom(roomId, orderId, population) {
    await RoomModel.findByIdAndUpdate(roomId, {
      $set: { _order: orderId, isFree: false, population },
    })
  }

  async unBookRoom(roomId) {
    await RoomModel.findByIdAndUpdate(roomId, {
      $set: { isFree: true, population: 0 },
    })
    await RoomModel.findByIdAndUpdate(roomId, { $unset: { _order: '' } })
  }

  async delete(_id) {
    await RoomModel.findByIdAndRemove(_id)
    return _id
  }

  async deleteWithBuilding(_building) {
    await RoomModel.deleteMany({ _building })
  }

  async deleteWithType(_type) {
    await RoomModel.deleteMany({ _type })
  }
}

export default new RoomService()
