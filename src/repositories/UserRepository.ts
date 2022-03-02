import BaseRepository from '../core/BaseRepository';
import { User } from '../interfaces/models';
import jwtDecode from 'jwt-decode';
import { APIRoute, LSKey, Role } from '../shared/enums';
import { Repository } from '../shared/decorators';

@Repository(APIRoute.Users)
export default class UserRepository extends BaseRepository<User> {
  private saveToken(token: string) {
    localStorage.setItem(LSKey.Token, token);
  }

  async register(email: string, password: string): Promise<User> {
    const { data } = await this.api.post<string>(`${this.route}/register`, {
      email,
      password,
    });
    this.saveToken(data);
    return jwtDecode(data);
  }

  async login(email: string, password: string): Promise<User> {
    const { data } = await this.api.post<string>(`${this.route}/login`, {
      email,
      password,
    });
    this.saveToken(data);
    return jwtDecode(data);
  }

  async auth(): Promise<User> {
    const { data } = await this.authApi.post<string>(`${this.route}/auth`);
    this.saveToken(data);
    return jwtDecode(data);
  }

  async changeRole(_id: string, role: Role): Promise<User> {
    return (await this.authApi.patch<User>(`${this.route}/${_id}`, { role }))
      .data;
  }
}
