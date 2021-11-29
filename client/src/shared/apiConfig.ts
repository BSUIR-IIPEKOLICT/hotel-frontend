import axios, { AxiosRequestConfig } from 'axios'

export default class ApiConfig {
  private readonly host: string = process.env.REACT_APP_API_URL || ''
  private readonly _api = axios.create({ baseURL: `${this.host}/api` })
  private readonly _authApi = axios.create({ baseURL: `${this.host}/api` })
  private readonly _interceptor = (config: AxiosRequestConfig) => {
    if (config.headers !== undefined) {
      config.headers.authorization = `Beaver ${localStorage.getItem('token')}`
    }

    return config
  }

  constructor() {
    this._authApi.interceptors.request.use(this._interceptor)
  }

  get api() {
    return this._api
  }

  get authApi() {
    return this._authApi
  }
}
