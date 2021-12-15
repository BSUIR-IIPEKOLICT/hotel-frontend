import internalMiddleware from './internal.middleware.js'

export default function roleMiddleware(roles) {
  return (req, res, next) => internalMiddleware(req, res, next, roles)
}
