import { action, computed, makeObservable, observable } from 'mobx'
import { Service } from '../interfaces/models'

export default class ServiceStore {
    @observable private _services: Service[] = []

    constructor() {
        makeObservable(this)
    }

    @action
    setServices(value: Service[]) {
        this._services = value
    }

    @computed
    get services() {
        return this._services
    }
}
