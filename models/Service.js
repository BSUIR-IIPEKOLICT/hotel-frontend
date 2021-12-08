const { Schema, model } = require('mongoose')

module.exports = model(
  'Service',
  new Schema({
    name: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    price: {
      type: Number,
      default: 0,
      require: true,
    },
  })
)
