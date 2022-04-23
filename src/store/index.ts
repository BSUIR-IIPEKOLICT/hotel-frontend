import { createContext } from 'react';
import { AppStore } from '../abstractions/interfaces';
import UserStore from './UserStore';
import BuildingStore from './BuildingStore';
import TypeStore from './TypeStore';
import AuthStore from './AuthStore';

export const store: AppStore = {
  authStore: new AuthStore(),
  userStore: new UserStore(),
  buildingStore: new BuildingStore(),
  typeStore: new TypeStore(),
};

export const StoreContext = createContext<AppStore>(store);
