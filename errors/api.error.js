export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const NOT_FOUND = 404
export const INTERNAL_SERVER_ERROR = 500

export default class ApiError extends Error {
  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }

  static authError(message) {
    return new ApiError(UNAUTHORIZED, message)
  }

  static forbidden(message) {
    return new ApiError(FORBIDDEN, message)
  }

  static badRequest(message) {
    return new ApiError(NOT_FOUND, message)
  }

  static internal(message) {
    return new ApiError(INTERNAL_SERVER_ERROR, message)
  }
}
