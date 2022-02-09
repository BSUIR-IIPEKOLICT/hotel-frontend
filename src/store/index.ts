import { AppStore } from '../interfaces/common';
import UserStore from './UserStore';
import { createContext } from 'react';
import BuildingStore from './BuildingStore';
import TypeStore from './TypeStore';

export const store: AppStore = {
  userStore: new UserStore(),
  buildingStore: new BuildingStore(),
  typeStore: new TypeStore(),
};

export const StoreContext = createContext<AppStore>(store);
