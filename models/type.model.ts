import mongoose from 'mongoose'

export default mongoose.model(
  'Type',
  new mongoose.Schema({
    _services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],
    name: { type: String, require: true, unique: true, index: true },
    places: { type: Number, default: 1, require: true },
  })
)
