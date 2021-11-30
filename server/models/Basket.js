const { Schema, model, Types } = require('mongoose')

module.exports = model(
  'Basket',
  new Schema({
    _user: {
      type: Types.ObjectId,
      require: true,
      ref: 'User',
    },
    _orders: [
      {
        type: Types.ObjectId,
        ref: 'Order',
      },
    ],
  })
)
