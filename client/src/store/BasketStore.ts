import { action, computed, makeObservable, observable } from 'mobx'
import { BasketPopulated } from '../interfaces/populatedModels'

export default class BasketStore {
    @observable private _basket: BasketPopulated = {} as BasketPopulated
    @observable private _baskets: BasketPopulated[] = []

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

    @computed
    get basket() {
        return this._basket
    }

    @computed
    get baskets() {
        return this._baskets
    }
}
