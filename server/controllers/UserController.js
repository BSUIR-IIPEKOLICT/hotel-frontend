const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Basket = require('../models/Basket')
const {secret} = require('../config.json')

const generateToken = user => {
    return jwt.sign(
        {
            id: user['_id'],
            email: user.email,
            isAmin: user.isAdmin
        },
        secret,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res, next) {
        const {email, password, isAdmin} = req.body

        if (!email || !password) return next(ApiError.badRequest('Invalid login data'))

        const candidate = await User.find({email}).lean()

        if (candidate.length) return next(ApiError.badRequest('User with that email already exists'))

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await new User({email, password: hashPassword, isAdmin})
        const token = generateToken(user)

        await new Basket({_user: user['_id']}).save()
        await user.save()

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({email}).lean()

        if (!user) return next(ApiError.internal('User not exists'))
        if (!bcrypt.compareSync(password, user.password)) return next(ApiError.internal('Invalid password'))

        const token = generateToken(user)
        return res.json({token})
    }

    async auth(req, res, next) {
        const {id} = req.query

        if (!id) return next(ApiError.badRequest('No id'))

        res.json({message: id})
    }
}

module.exports = new UserController()
