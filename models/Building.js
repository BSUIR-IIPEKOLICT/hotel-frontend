const {Schema, model, Types} = require('mongoose')

module.exports = model('Building', new Schema({
    _rooms: [
        {
            type: Types.ObjectId,
            ref: 'Room'
        }
    ],
    address: {
        type: String,
        require: true
    }
}))
