const InternalMiddleware = require('./InternalMiddleware')

module.exports = (req, res, next) => InternalMiddleware(req, res, next)
