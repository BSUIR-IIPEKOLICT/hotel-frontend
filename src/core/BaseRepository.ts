import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL } from '../shared/constants';

export default abstract class BaseRepository<M> {
  protected readonly route: string | undefined;

  private readonly baseURL: string = `${API_URL}/api`;
  protected readonly api: AxiosInstance = axios.create({
    baseURL: this.baseURL,
  });
  protected readonly authApi: AxiosInstance = axios.create({
    baseURL: this.baseURL,
  });
  private readonly interceptor = (config: AxiosRequestConfig) => {
    if (config.headers !== undefined) {
      config.headers.authorization = `Beaver ${localStorage.getItem('token')}`;
    }

    return config;
  };

  constructor() {
    this.authApi.interceptors.request.use(this.interceptor);
  }

  async getAll(): Promise<M[]> {
    return (await this.authApi.get<M[]>(this.route)).data;
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(`${this.route}/${_id}`)).data;
  }
}
