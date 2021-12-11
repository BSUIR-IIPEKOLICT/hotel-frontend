import TypeModel from '../models/type.model.js'

class TypeService {
  async get() {
    return TypeModel.find({}).lean()
  }

  async create(_services, name, places) {
    const type = await new TypeModel({
      _services,
      name,
      places,
    })
    await type.save()
    return type
  }

  async change(_id, _services, name, places) {
    const type = await TypeModel.findByIdAndUpdate(_id, {
      $set: { _services, name, places },
    }).lean()
    return { ...type, _services, name, places }
  }

  async removeService(serviceId) {
    await TypeModel.updateMany({}, { $pull: { _services: serviceId } })
  }

  async delete(_id) {
    await TypeModel.findByIdAndRemove(_id)
    return _id
  }
}

export default new TypeService()
