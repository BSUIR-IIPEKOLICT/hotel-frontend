import BasketModel from '../models/basket.model.js'

export default class BasketService {
  async get() {
    return BasketModel.find({}).populate('_user').populate('_orders').lean()
  }

  async getOne(_user) {
    return BasketModel.findOne({ _user })
      .populate('_user')
      .populate('_orders')
      .lean()
  }

  async create(_user) {
    const basket = await new BasketModel({ _user })
    await basket.save()
    return this.getOne(_user)
  }

  async addOrder(basketId, orderId) {
    await BasketModel.findByIdAndUpdate(basketId, {
      $push: { _orders: orderId },
    })
  }

  async removeOrder(order) {
    await BasketModel.updateOne(
      { _id: order._basket },
      { $pull: { _orders: order._id } }
    )
  }

  async delete(_id) {
    await BasketModel.findByIdAndRemove(_id)
    return _id
  }
}
