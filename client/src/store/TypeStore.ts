import { action, computed, makeAutoObservable } from 'mobx'
import { Type } from '../interfaces/models'

export default class TypeStore {
    private _types: Type[]
    private _active: string

    constructor() {
        this._types = [
            {
                _id: '34567',
                name: 'VIP',
                _services: [],
                places: 3,
            },
            {
                _id: '1234',
                name: 'basic',
                _services: [],
                places: 2,
            },
        ]
        this._active = ''
        makeAutoObservable(this)
    }

    @action
    setTypes(value: Type[]) {
        this._types = value
    }

    @action
    setActive(id: string) {
        this._active = id
    }

    @computed
    get types() {
        return this._types
    }

    @computed
    get active() {
        return this._active
    }
}
