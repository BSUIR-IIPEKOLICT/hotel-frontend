import mongoose from 'mongoose'

export default mongoose.model(
  'Basket',
  new mongoose.Schema({
    _user: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'User',
      unique: true,
      index: true,
    },
    _orders: [{ type: mongoose.Types.ObjectId, ref: 'Order' }],
  })
)
