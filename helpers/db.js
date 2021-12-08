const client = require('mongoose')

module.exports = {
  connect: (callback) =>
    client.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel',
      (err) => {
        if (err) {
          return console.error(`Mongo error: ${err.message}`)
        }
        console.log('Success connect to mongo.')
        callback()
      }
    ),
  objectId: () => new client.Types.ObjectId(),
}
