const ApiError = require('../errors/ApiError')

class UserController {
    async register(req, res) {

    }

    async login(req, res) {

    }

    async auth(req, res, next) {
        const {id} = req.query

        if (!id) return next(ApiError.badRequest('No id'))

        res.json({message: id})
    }
}

module.exports = new UserController()
