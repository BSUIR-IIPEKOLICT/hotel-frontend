const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Basket = require('../models/Basket')
const {secret} = require('../config.json')
const {objectId} = require('../db')

const generateToken = user => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        secret,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res, next) {
        const {email, password} = req.body
        const id = objectId()

        if (!email || !password) return next(ApiError.badRequest('Invalid login data'))

        const candidate = await User.find({email}).lean()

        if (candidate.length) return next(ApiError.badRequest('User with that email already exists'))

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await new User({
            _id: id,
            email,
            password: hashPassword
        })
        const token = generateToken(user)

        const basket = await new Basket({_user: id})
        await basket.save()
        await user.save()

        return res.json(token)
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({email}).lean()

        if (!user) return next(ApiError.internal('User not exists'))
        if (!bcrypt.compareSync(password, user.password)) return next(ApiError.internal('Invalid password'))

        return res.json(generateToken(user))
    }

    async auth(req, res) {
        return res.json(generateToken(req.user))
    }
}

module.exports = new UserController()
