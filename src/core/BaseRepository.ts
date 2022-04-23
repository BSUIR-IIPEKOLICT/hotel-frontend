import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL } from '../shared/constants';
import { DeleteModel } from '../abstractions/models';
import { StorageKey } from '../shared/enums';

export default abstract class BaseRepository<M> {
  protected readonly route: string = '/';

  private readonly baseURL: string = API_URL;

  protected readonly api: AxiosInstance = axios.create({
    baseURL: this.baseURL,
  });

  protected readonly authApi: AxiosInstance = axios.create({
    baseURL: this.baseURL,
  });

  private readonly interceptor = (config: AxiosRequestConfig) => {
    try {
      const savedToken: string | null = localStorage
        ? localStorage.getItem(StorageKey.TOKEN)
        : null;

      if (config.headers && savedToken) {
        config.headers.authorization = `Beaver ${savedToken}`;
      }

      return config;
    } catch (e) {
      return config;
    }
  };

  constructor() {
    this.authApi.interceptors.request.use(this.interceptor);
  }

  async getAll(): Promise<M[]> {
    return (await this.api.get<M[]>(this.route)).data;
  }

  async getOne(id: number): Promise<M> {
    return (await this.authApi.get<M>(`${this.route}/${id}`)).data;
  }

  async delete(id: number): Promise<number> {
    return (await this.authApi.delete<DeleteModel>(`${this.route}/${id}`)).data.id;
  }
}
