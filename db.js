const {uri, options} = require('./config.json').mongo
const client = require('mongoose')

module.exports = {
    connect: () => client.connect(process.env.MONGODB_URI || uri, options),
    objectId: () => new client.Types.ObjectId()
}
