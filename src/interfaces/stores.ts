import { User } from './models';

export interface IUserStore {
  getUser(): User | undefined;
  getIsAuth(): boolean;
  isAdmin(): boolean;
  setUser(user?: User): void;
  setIsAuth(isAuth: boolean): void;
}

export interface IBuildingStore {
  getCurrent(): string;
  setCurrent(buildingId: string): void;
}

export interface ITypeStore {
  getCurrent(): string;
  setCurrent(typeId: string): void;
}
