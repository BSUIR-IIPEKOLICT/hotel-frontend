import { action, computed, makeAutoObservable } from 'mobx'
import { BasketPopulated } from '../interfaces/populatedModels'

export default class BasketStore {
    private _basket: BasketPopulated = {} as BasketPopulated
    private _baskets: BasketPopulated[] = []

    constructor() {
        makeAutoObservable(this)
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
