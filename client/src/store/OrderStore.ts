import { action, computed, makeObservable, observable } from 'mobx'
import { OrderPopulated } from '../interfaces/populatedModels'

export default class OrderStore {
    @observable private _orders: OrderPopulated[] = []

    constructor() {
        makeObservable(this)
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
