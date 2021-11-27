import { action, computed, makeAutoObservable } from 'mobx'
import { Type } from '../interfaces/models'

export default class TypeStore {
    private _types: Type[] = []
    private _active: string = ''

    constructor() {
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
