import { IBuildingStore } from '../interfaces/stores';
import { makeAutoObservable } from 'mobx';

export default class BuildingStore implements IBuildingStore {
  private current: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  getCurrent(): string {
    return this.current;
  }

  setCurrent(buildingId: string): void {
    this.current = buildingId;
  }
}
