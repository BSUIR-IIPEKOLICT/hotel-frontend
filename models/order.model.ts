import mongoose from 'mongoose'

export default mongoose.model(
  'Order',
  new mongoose.Schema({
    _basket: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Basket',
      index: true,
    },
    _room: { type: mongoose.Types.ObjectId, require: true, ref: 'Room' },
    _services: [{ type: mongoose.Types.ObjectId, ref: 'Service' }],
    duty: { type: Number, require: true },
    population: { type: Number, default: 1, require: true },
    date: { type: String, require: true },
  })
)
