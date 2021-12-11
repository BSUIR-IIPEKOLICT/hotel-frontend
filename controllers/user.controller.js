import jwt from 'jsonwebtoken'
import ApiError from '../errors/api.error.js'
import UserService from '../services/user.service.js'
import { hash, compareSync } from 'bcrypt'
import BasketService from '../services/basket.service.js'
import OrderService from '../services/order.service.js'
import RoomService from '../services/room.service.js'

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'lol',
    { expiresIn: '24h' }
  )
}

export default class UserController {
  async register(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest('Invalid login data'))
    }

    const candidate = await UserService.getByEmail(email)

    if (candidate) {
      return next(ApiError.badRequest('User with that email already exists'))
    }

    const usersCount = await UserService.count()
    const hashPassword = await hash(password, 5)

    const user = await UserService.create(
      email,
      hashPassword,
      !usersCount ? 'admin' : 'client'
    )

    await BasketService.create(user._id)

    return res.json({
      token: generateToken(user),
      id: user._id,
    })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await UserService.getByEmail(email)

    if (!user) return next(ApiError.internal('User not exists'))
    if (!compareSync(password, user.password)) {
      return next(ApiError.internal('Invalid password'))
    }

    return res.json({ token: generateToken(user), id: user._id })
  }

  async auth(req, res) {
    const user = await UserService.getByEmail(req.user.email)
    return res.json({ token: generateToken(req.user), id: user._id })
  }

  async getAll(req, res) {
    const users = await UserService.get()
    return res.json(users)
  }

  async changeRole(req, res) {
    const { _id, role } = req.body
    await UserService.change(_id, role)
    return res.json(role)
  }

  async delete(req, res) {
    const user = await UserService.getOne(req.body._id)
    const id = await UserService.delete(req.body._id)
    const basket = await BasketService.getOne(user._id)
    const orders = await OrderService.get(basket._id)

    orders.map(async ({ _room }) => await RoomService.unBookRoom(_room))

    await OrderService.deleteWithBasket(basket._id)
    await BasketService.delete(basket._id)

    return res.json(id)
  }
}
