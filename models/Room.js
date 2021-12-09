const { Schema, model, Types } = require('mongoose')

module.exports = model(
  'Room',
  new Schema({
    _building: {
      type: Types.ObjectId,
      require: true,
      ref: 'Building',
      index: true,
    },
    _type: {
      type: Types.ObjectId,
      require: true,
      ref: 'Type',
    },
    _order: {
      type: Types.ObjectId,
      ref: 'Order',
    },
    isFree: {
      type: Boolean,
      require: true,
      default: true,
    },
    population: {
      type: Number,
      default: 0,
      require: true,
    },
  })
)
