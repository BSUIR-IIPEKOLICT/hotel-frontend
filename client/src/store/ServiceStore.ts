import { action, computed, makeAutoObservable } from 'mobx'
import { Service } from '../interfaces/models'

export default class ServiceStore {
    private _services: Service[] = []

    constructor() {
        makeAutoObservable(this)
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
