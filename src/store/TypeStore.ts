import { ITypeStore } from '../abstractions/storeInterfaces';
import { makeAutoObservable } from 'mobx';

export default class TypeStore implements ITypeStore {
  private current: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  getCurrent(): string {
    return this.current;
  }

  setCurrent(typeId: string): void {
    this.current = typeId;
  }
}
