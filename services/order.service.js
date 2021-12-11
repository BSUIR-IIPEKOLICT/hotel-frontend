import OrderModel from '../models/order.model.js'

class OrderService {
  async get(_basket) {
    return OrderModel.find({ _basket })
      .populate('_services')
      .populate('_room')
      .lean()
  }

  async getOne(_id) {
    return OrderModel.findById(_id)
      .populate('_services')
      .populate('_room')
      .lean()
  }

  async create(params) {
    const order = await new OrderModel(params)
    await order.save()
    return this.getOne(order._id)
  }

  async removeService(serviceId) {
    await OrderModel.updateMany({}, { $pull: { _services: serviceId } })
  }

  async delete(_id) {
    await OrderModel.findByIdAndRemove(_id)
    return _id
  }

  async deleteWithBasket(_basket) {
    await OrderModel.deleteMany({ _basket })
  }
}

export default new OrderService()
