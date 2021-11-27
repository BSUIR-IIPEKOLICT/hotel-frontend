import { $api, $authApi } from './index'
import jwtDecode from 'jwt-decode'
import { AxiosResponse } from 'axios'
import { User } from '../interfaces/models'

export const register = async (
    email: string,
    password: string
): Promise<AxiosResponse<User>> => {
    const { data } = await $api.post<string>('api/user/register', {
        email,
        password,
    })
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const login = async (
    email: string,
    password: string
): Promise<AxiosResponse<User>> => {
    const { data } = await $api.post<string>('api/user/login', {
        email,
        password,
    })
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const auth = async (): Promise<AxiosResponse<User>> => {
    const { data } = await $authApi.post<string>('api/user/auth')
    localStorage.setItem('token', data)
    return jwtDecode(data)
}
