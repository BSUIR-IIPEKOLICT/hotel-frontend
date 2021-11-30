import { action, computed, makeObservable, observable } from 'mobx'
import { BasketPopulated } from '../interfaces/populatedModels'

export default class BasketStore {
  @observable private _basket: BasketPopulated = {} as BasketPopulated
  @observable private _baskets: BasketPopulated[] = []
  @observable private _duty: number = 0

  constructor() {
    makeObservable(this)
  }

  @action
  setBasket(value: BasketPopulated) {
    this._basket = value
  }

  @action
  setBaskets(value: BasketPopulated[]) {
    this._baskets = value
  }

  @action
  setDuty(value: number) {
    this._duty = value
  }

  @action
  addDuty(value: number) {
    this._duty += value
  }

  @action
  removeDuty(value: number) {
    this._duty -= value
  }

  @computed
  get basket() {
    return this._basket
  }

  @computed
  get baskets() {
    return this._baskets
  }

  @computed
  get duty() {
    return this._duty
  }
}
