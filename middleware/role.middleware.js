import InternalMiddleware from './internal.middleware.js'

export default function (roles) {
  return (req, res, next) => InternalMiddleware(req, res, next, roles)
}
