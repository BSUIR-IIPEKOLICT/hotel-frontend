import mongoose from 'mongoose'

export default mongoose.model(
  'User',
  new mongoose.Schema({
    email: { type: String, require: true, unique: true, index: true },
    password: { type: String, require: true },
    role: { type: String, default: 'client', require: true, index: true },
  })
)
