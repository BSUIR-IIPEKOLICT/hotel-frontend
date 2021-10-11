const {Schema, model, Types} = require('mongoose')

module.exports = model('Client', new Schema({
    _user: {
        type: Types.ObjectId,
        require: true,
        ref: 'User'
    },
    _orders: [
        {
            type: Types.ObjectId,
            ref: 'Order'
        }
    ],
    name: {
        type: String,
        require: true
    }
}))
