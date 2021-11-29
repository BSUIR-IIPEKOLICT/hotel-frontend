const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Basket = require('../models/Basket')
const { objectId } = require('../db')
const secret = process.env.SECRET || ''

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '24h' }
  )
}

class UserController {
  async register(req, res, next) {
    const { email, password } = req.body
    const id = objectId()

    if (!email || !password)
      return next(ApiError.badRequest('Invalid login data'))

    const candidate = await User.find({ email }).lean()

    if (candidate.length)
      return next(ApiError.badRequest('User with that email already exists'))

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await new User({
      _id: id,
      email,
      password: hashPassword,
    })

    const basket = await new Basket({ _user: id })
    await basket.save()
    await user.save()

    return res.json({ token: generateToken(user), id })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if (!user) return next(ApiError.internal('User not exists'))
    if (!bcrypt.compareSync(password, user.password))
      return next(ApiError.internal('Invalid password'))

    return res.json({ token: generateToken(user), id: user._id })
  }

  async auth(req, res) {
    const user = await User.findOne({ email: req.user.email }).lean()
    return res.json({ token: generateToken(req.user), id: user._id })
  }
}

module.exports = new UserController()
