import axios, {AxiosRequestConfig} from 'axios'

const authInterceptor = (config: AxiosRequestConfig) => {
    // @ts-ignore
    config.headers.authorization = `Beaver ${localStorage.getItem('token')}`
    return config
}

export const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const $authApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

$authApi.interceptors.request.use(authInterceptor)
