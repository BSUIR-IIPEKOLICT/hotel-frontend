import { IBuildingStore, ITypeStore, IUserStore } from './stores';

export interface AppStore {
  userStore: IUserStore;
  buildingStore: IBuildingStore;
  typeStore: ITypeStore;
}

export interface RoomRequestConfig {
  _building?: string;
  _type?: string;
  page: number;
  limit: number;
  isFree?: boolean;
}
