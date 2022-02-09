import { IUserStore } from '../interfaces/stores';
import { User } from '../interfaces/models';
import { makeAutoObservable } from 'mobx';
import { Role } from '../shared/enums';

export default class UserStore implements IUserStore {
  private user: User | undefined;
  private isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  getUser(): User | undefined {
    return this.user;
  }

  isAdmin(): boolean {
    return !!this.user && this.user.role === Role.Admin;
  }

  setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }

  setUser(user?: User): void {
    this.user = user;
  }
}
