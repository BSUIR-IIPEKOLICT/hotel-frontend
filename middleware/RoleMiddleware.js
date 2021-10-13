const InternalMiddleware = require('./InternalMiddleware')

module.exports = role => {
    return (req, res, next) => InternalMiddleware(req, res, next, role)
}
