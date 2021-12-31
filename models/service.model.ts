import mongoose from 'mongoose'

export default mongoose.model(
  'Service',
  new mongoose.Schema({
    name: { type: String, require: true, unique: true, index: true },
    price: { type: Number, default: 0, require: true },
  })
)
