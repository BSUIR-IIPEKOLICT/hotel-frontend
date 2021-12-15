import {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '../shared/constants.js'

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
