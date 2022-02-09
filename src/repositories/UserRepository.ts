import BaseRepository from '../core/BaseRepository';
import { User } from '../interfaces/models';
import jwtDecode from 'jwt-decode';
import { Role } from '../shared/enums';
import { useLocalStorage } from '../hooks';

export default class UserRepository extends BaseRepository {
  readonly route = '/user';
  private readonly registerSubRoute = '/register';
  private readonly loginSubRoute = '/login';
  private readonly authSubRoute = '/auth';

  private readonly saveToken: (token: string) => void =
    useLocalStorage().saveToken;

  async getAll(): Promise<User[]> {
    return (await this.authApi.get<User[]>(this.route)).data;
  }

  async register(email: string, password: string): Promise<User> {
    const { data } = await this.api.post<string>(
      this.route + this.registerSubRoute,
      {
        email,
        password,
      }
    );
    this.saveToken(data);
    return jwtDecode(data);
  }

  async login(email: string, password: string): Promise<User> {
    const { data } = await this.api.post<string>(
      this.route + this.loginSubRoute,
      {
        email,
        password,
      }
    );
    this.saveToken(data);
    return jwtDecode(data);
  }

  async auth(): Promise<User> {
    const { data } = await this.authApi.post<string>(
      this.route + this.authSubRoute
    );
    this.saveToken(data);
    return jwtDecode(data);
  }

  async changeRole(_id: string, role: Role): Promise<User> {
    return (await this.authApi.patch<User>(this.route, { _id, role })).data;
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data;
  }
}
