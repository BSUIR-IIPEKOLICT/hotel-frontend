import { TokenModel, User, UserPopulated } from './models';
import { Role } from '../shared/enums';

export interface IAuthStore {
  getUserData(): TokenModel | undefined;
  getIsAuth(): boolean;
  isAdmin(): boolean;
  setUserData(tokenData?: TokenModel): void;
  setIsAuth(isAuth: boolean): void;
}

export interface IUserStore {
  getUsers(): UserPopulated[];
  setUsers(users: UserPopulated[]): void;
  changeRole(id: number, role: Role): void;
  changeCredentials(id: number, email: string, password: string): void;
  delete(id: number): void;
}

export interface IBuildingStore {
  getCurrent(): string;
  setCurrent(buildingId: string): void;
}

export interface ITypeStore {
  getCurrent(): string;
  setCurrent(typeId: string): void;
}
