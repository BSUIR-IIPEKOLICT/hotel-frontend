import jwt from 'jsonwebtoken'
import ApiError from '../errors/api.error.js'
import { hash, compareSync } from 'bcrypt'
import {
  basketService,
  orderService,
  roomService,
  userService,
} from '../services/index.js'
import {
  LOCAL_JWT_SECRET,
  LOGIN_DATA_ERROR,
  PASSWORD_ERROR,
  USER_ERROR,
  USER_EXISTS_ERROR,
} from '../shared/constants.js'

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || LOCAL_JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export default class UserController {
  async register(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest(LOGIN_DATA_ERROR))
    }

    const candidate = await userService.getByEmail(email)

    if (candidate) {
      return next(ApiError.badRequest(USER_EXISTS_ERROR))
    }

    const usersCount = await userService.count()
    const hashPassword = await hash(password, 5)

    const user = await userService.create(
      email,
      hashPassword,
      !usersCount ? 'admin' : 'client'
    )

    await basketService.create(user._id)

    return res.json({
      token: generateToken(user),
      id: user._id,
    })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await userService.getByEmail(email)

    if (!user) return next(ApiError.internal(USER_ERROR))
    if (!compareSync(password, user.password)) {
      return next(ApiError.internal(PASSWORD_ERROR))
    }

    return res.json({ token: generateToken(user), id: user._id })
  }

  async auth(req, res) {
    const user = await userService.getByEmail(req.user.email)
    return res.json({ token: generateToken(req.user), id: user._id })
  }

  async getAll(req, res) {
    const users = await userService.get()
    return res.json(users)
  }

  async changeRole(req, res) {
    const { _id, role } = req.body
    await userService.change(_id, role)
    return res.json(role)
  }

  async delete(req, res) {
    const user = await userService.getOne(req.body._id)
    const id = await userService.delete(req.body._id)
    const basket = await basketService.getOne(user._id)
    const orders = await orderService.get(basket._id)

    orders.map(async ({ _room }) => await roomService.unBookRoom(_room))

    await orderService.deleteWithBasket(basket._id)
    await basketService.delete(basket._id)

    return res.json(id)
  }
}
