const client = require('mongoose')

module.exports = {
  connect: () => client.connect(process.env.MONGODB_URI || ''),
  objectId: () => new client.Types.ObjectId(),
}
