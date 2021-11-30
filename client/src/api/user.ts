import jwtDecode from 'jwt-decode'
import BaseApi from '../base/baseApi'
import { ConvertedUserResponse, UserResponse } from '../interfaces/responses'

export default class UserApi extends BaseApi {
  private readonly route = '/user'
  private readonly alias = {
    register: '/register',
    login: '/login',
    auth: '/auth',
  }

  async register(
    email: string,
    password: string
  ): Promise<ConvertedUserResponse> {
    const { data } = await this.api.post<UserResponse>(
      this.route + this.alias.register,
      {
        email,
        password,
      }
    )
    localStorage.setItem('token', data.token)
    return { user: jwtDecode(data.token), id: data.id }
  }

  async login(email: string, password: string): Promise<ConvertedUserResponse> {
    const { data } = await this.api.post<UserResponse>(
      this.route + this.alias.login,
      {
        email,
        password,
      }
    )
    localStorage.setItem('token', data.token)
    return { user: jwtDecode(data.token), id: data.id }
  }

  async auth(): Promise<ConvertedUserResponse> {
    const { data } = await this.authApi.post<UserResponse>(
      this.route + this.alias.auth
    )
    localStorage.setItem('token', data.token)
    return { user: jwtDecode(data.token), id: data.id }
  }
}
