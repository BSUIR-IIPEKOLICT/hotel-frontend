import UserModel from '../models/user.model.js'

class UserService {
  async get() {
    return UserModel.find({}).lean()
  }

  async getOne(_id) {
    return UserModel.findById(_id).lean()
  }

  async getByEmail(email) {
    return UserModel.findOne({ email }).lean()
  }

  async count() {
    return UserModel.countDocuments()
  }

  async create(email, password, role) {
    const user = await new UserModel({ email, password, role })
    await user.save()
    return user
  }

  async change(_id, role) {
    const user = await UserModel.findByIdAndUpdate(_id, {
      $set: { role },
    }).lean()
    return { ...user, role }
  }

  async delete(_id) {
    await UserModel.findByIdAndRemove(_id)
    return _id
  }
}

export default new UserService()
