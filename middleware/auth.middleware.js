import internalMiddleware from './internal.middleware.js'

export default function authMiddleware(req, res, next) {
  return internalMiddleware(req, res, next)
}
