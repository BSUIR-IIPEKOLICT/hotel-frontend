import { makeAutoObservable } from 'mobx';
import { IUserStore } from '../abstractions/storeInterfaces';
import { UserPopulated } from '../abstractions/models';
import { Role } from '../shared/enums';

export default class UserStore implements IUserStore {
  private users: UserPopulated[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private getUser(id: number): UserPopulated | undefined {
    return this.users.find(({ id: userId }) => userId === id);
  }

  getUsers(): UserPopulated[] {
    return this.users;
  }

  setUsers(users: UserPopulated[]): void {
    this.users = users;
  }

  changeRole(id: number, role: Role): void {
    const changedUser: UserPopulated | undefined = this.getUser(id);

    if (changedUser) {
      changedUser.role = role;
    }
  }

  changeCredentials(id: number, email: string, password: string): void {
    const changedUser: UserPopulated | undefined = this.getUser(id);

    if (changedUser) {
      changedUser.email = email;
      changedUser.password = password;
    }
  }

  delete(id: number): void {
    this.users = this.users.filter(({ id: userId }) => userId !== id);
  }
}
