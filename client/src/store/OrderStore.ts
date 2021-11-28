import { action, computed, makeAutoObservable } from 'mobx'
import { OrderPopulated } from '../interfaces/populatedModels'

export default class OrderStore {
    private _orders: OrderPopulated[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @action
    setOrders(value: OrderPopulated[]) {
        this._orders = value
    }

    @computed
    get orders() {
        return this._orders
    }
}
