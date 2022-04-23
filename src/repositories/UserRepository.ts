import BaseRepository from '../core/BaseRepository';
import { UserPopulated } from '../abstractions/models';
import { APIRoute, Role } from '../shared/enums';
import { Repository } from '../shared/decorators';

@Repository(APIRoute.USERS)
export default class UserRepository extends BaseRepository<UserPopulated> {
  async changeRole(id: number, role: Role): Promise<UserPopulated> {
    return (await this.authApi.patch<UserPopulated>(`${this.route}/${id}/role`, { role })).data;
  }

  async changeCredentials(id: number, email: string, password: string): Promise<UserPopulated> {
    return (
      await this.authApi.patch<UserPopulated>(`${this.route}/${id}/credentials`, {
        email,
        password,
      })
    ).data;
  }
}
