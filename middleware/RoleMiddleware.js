const InternalMiddleware = require('./InternalMiddleware')

module.exports = roles => {
    return (req, res, next) => InternalMiddleware(req, res, next, roles)
}
