import { makeAutoObservable } from 'mobx'

export default class BasketStore {
    private _basket: Object

    constructor() {
        this._basket = {}
        makeAutoObservable(this)
    }

    setBasket(value: Object) {
        this._basket = value
    }

    get basket() {
        return this._basket
    }
}
