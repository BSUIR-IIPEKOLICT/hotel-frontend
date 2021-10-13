import {makeAutoObservable} from 'mobx'

export default class OrderStore {

    private _orders: Array<any>

    constructor() {
        this._orders = []
        makeAutoObservable(this)
    }

    setOrders(value: Array<any>) {
        this._orders = value
    }

    get orders() {
        return this._orders
    }
}
