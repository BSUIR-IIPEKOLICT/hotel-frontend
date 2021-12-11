import InternalMiddleware from './internal.middleware.js'

export default function (req, res, next) {
  return InternalMiddleware(req, res, next)
}
