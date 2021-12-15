import ApiError from '../errors/api.error.js'
import jwt from 'jsonwebtoken'
import {
  ACCESS_ERROR,
  AUTH_ERROR,
  LOCAL_JWT_SECRET,
} from '../shared/constants.js'

const secret = process.env.JWT_SECRET || LOCAL_JWT_SECRET

export default function internalMiddleware(req, res, next, roles) {
  if (req.method === 'OPTIONS') return next()

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) return next(ApiError.authError(AUTH_ERROR))

    const decoded = jwt.verify(token, secret)

    if (roles) {
      if (roles.indexOf(decoded.role) === -1)
        return next(ApiError.forbidden(ACCESS_ERROR))
    }

    req.user = decoded
    next()
  } catch (e) {
    next(ApiError.authError(AUTH_ERROR))
  }
}
