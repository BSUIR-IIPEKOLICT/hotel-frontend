const { Schema, model, Types } = require('mongoose')

module.exports = model(
  'Order',
  new Schema({
    _basket: {
      type: Types.ObjectId,
      require: true,
      ref: 'Basket',
    },
    _room: {
      type: Types.ObjectId,
      require: true,
      ref: 'Room',
    },
    _services: [
      {
        type: Types.ObjectId,
        ref: 'Service',
      },
    ],
    population: {
      type: Number,
      default: 1,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
  })
)
