const {mongo} = require('./config.json')
const client = require('mongoose')

module.exports = {
    connect: () => client.connect(mongo.url, mongo.options)
}
