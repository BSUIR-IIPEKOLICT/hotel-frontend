import { action, computed, makeObservable, observable } from 'mobx'
import { Type } from '../interfaces/models'

export default class TypeStore {
  @observable private _types: Type[] = []
  @observable private _active: string = ''

  constructor() {
    makeObservable(this)
  }

  @action
  setTypes(value: Type[]) {
    this._types = value
  }

  @action
  setActive(id: string) {
    this._active = id
  }

  @computed
  get types() {
    return this._types
  }

  @computed
  get active() {
    return this._active
  }
}
