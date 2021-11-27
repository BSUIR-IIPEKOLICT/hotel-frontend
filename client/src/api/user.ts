import { User } from '../interfaces/models'
import jwtDecode from 'jwt-decode'
import BaseApi from './base'

export default class UserApi extends BaseApi {
    private readonly route = '/user'
    private readonly alias = {
        register: '/register',
        login: '/login',
        auth: '/auth',
    }

    async register(email: string, password: string): Promise<User> {
        const { data } = await this.api.post<string>(
            this.route + this.alias.register,
            {
                email,
                password,
            }
        )
        localStorage.setItem('token', data)
        return jwtDecode(data)
    }

    async login(email: string, password: string): Promise<User> {
        const { data } = await this.api.post<string>(
            this.route + this.alias.login,
            {
                email,
                password,
            }
        )
        localStorage.setItem('token', data)
        return jwtDecode(data)
    }

    async auth(): Promise<User> {
        const { data } = await this.authApi.post<string>(
            this.route + this.alias.auth
        )
        localStorage.setItem('token', data)
        return jwtDecode(data)
    }
}
