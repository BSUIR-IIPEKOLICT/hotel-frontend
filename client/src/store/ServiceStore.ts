import {makeAutoObservable} from 'mobx'

export default class ServiceStore {

    private _services: Array<any>

    constructor() {
        this._services = []
        makeAutoObservable(this)
    }

    setServices(value: Array<any>) {
        this._services = value
    }

    get services() {
        return this._services
    }
}
