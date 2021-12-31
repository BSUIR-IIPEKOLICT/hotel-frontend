import mongoose from 'mongoose'

export default mongoose.model(
  'Building',
  new mongoose.Schema({
    _rooms: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
    address: { type: String, require: true, unique: true, index: true },
  })
)
