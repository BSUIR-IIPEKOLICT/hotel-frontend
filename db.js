const client = require('mongoose')

module.exports = {
  connect: () =>
    client.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel'
    ),
  objectId: () => new client.Types.ObjectId(),
}
