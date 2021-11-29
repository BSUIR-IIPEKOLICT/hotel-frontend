import { action, computed, makeObservable, observable } from 'mobx'
import { Building } from '../interfaces/models'

export default class BuildingStore {
    @observable private _buildings: Building[] = []
    @observable private _active: string = ''

    constructor() {
        makeObservable(this)
    }

    @action
    setBuildings(value: Building[]) {
        this._buildings = value
    }

    @action
    setActive(id: string) {
        this._active = id
    }

    @computed
    get buildings() {
        return this._buildings
    }

    @computed
    get active() {
        return this._active
    }
}
