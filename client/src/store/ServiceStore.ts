import {action, computed, makeAutoObservable} from 'mobx'
import {Service} from '../interfaces/models'

export default class ServiceStore {

    private _services: Service[]

    constructor() {
        this._services = [
            {
                _id: 's1',
                name: 'tv',
                price: 20
            },
            {
                _id: 's2',
                name: 'bar',
                price: 30
            },
            {
                _id: 's3',
                name: 'safe',
                price: 10
            },
            {
                _id: 's4',
                name: 'masha',
                price: 300
            }
        ]
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
