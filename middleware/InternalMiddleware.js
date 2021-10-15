const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken')
const {secret} = require('../config.json')

module.exports = (req, res, next, roles) => {
    if (req.method === 'OPTIONS') return next()

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return next(ApiError.authError('Not authorized'))

        const decoded = jwt.verify(token, secret)

        if (roles) {
            if (roles.indexOf(decoded.role) === -1) return next(ApiError.forbidden('No access'))
        }

        req.user = decoded
        next()
    } catch (e) {
        next(ApiError.authError('Not authorized'))
    }
}
