import {makeAutoObservable} from 'mobx'

export default class TypeStore {

    private _types: Array<any>

    constructor() {
        this._types = []
        makeAutoObservable(this)
    }

    setTypes(value: Array<any>) {
        this._types = value
    }

    get types() {
        return this._types
    }
}
