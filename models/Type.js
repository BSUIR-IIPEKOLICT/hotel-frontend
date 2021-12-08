const { Schema, model, Types } = require('mongoose')

module.exports = model(
  'Type',
  new Schema({
    _services: [
      {
        type: Types.ObjectId,
        ref: 'Service',
      },
    ],
    name: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    places: {
      type: Number,
      default: 1,
      require: true,
    },
  })
)
