import {makeAutoObservable} from 'mobx'

export default class BuildingStore {

    private _buildings: Array<any>

    constructor() {
        this._buildings = []
        makeAutoObservable(this)
    }

    setBuildings(value: Array<any>) {
        this._buildings = value
    }

    get buildings() {
        return this._buildings
    }
}
