import { IAuthStore, IBuildingStore, ITypeStore, IUserStore } from './storeInterfaces';

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface AppStore {
  authStore: IAuthStore;
  userStore: IUserStore;
  buildingStore: IBuildingStore;
  typeStore: ITypeStore;
}

export interface RoomRequestConfig {
  buildingId?: number;
  typeId?: number;
  page: number;
  limit: number;
  isFree?: boolean;
}

export interface ButtonConfiguraton {
  title: string;
  path: string;
}
