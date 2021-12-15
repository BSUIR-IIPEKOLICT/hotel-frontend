import ServiceModel from '../models/service.model.js'

export default class ServiceService {
  async get() {
    return ServiceModel.find({}).lean()
  }

  async create(name, price) {
    const service = await new ServiceModel({ name, price })
    await service.save()
    return service
  }

  async change(_id, name, price) {
    const service = await ServiceModel.findByIdAndUpdate(_id, {
      $set: { name, price },
    }).lean()
    return { ...service, name, price }
  }

  async delete(_id) {
    await ServiceModel.findByIdAndRemove(_id)
    return _id
  }
}
