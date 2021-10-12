const {Schema, model} = require('mongoose')

module.exports = model('User', new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        require: true
    }
}))
