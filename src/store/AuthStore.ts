import { makeAutoObservable } from 'mobx';
import { IAuthStore } from '../abstractions/storeInterfaces';
import { TokenModel } from '../abstractions/models';
import { Role } from '../shared/enums';

export default class AuthStore implements IAuthStore {
  private userData: TokenModel | undefined;
  private isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  getUserData(): TokenModel | undefined {
    return this.userData;
  }

  setUserData(tokenData?: TokenModel): void {
    this.userData = tokenData;
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  isAdmin(): boolean {
    return !!this.userData && this.userData.role === Role.ADMIN;
  }

  setIsAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
  }
}
