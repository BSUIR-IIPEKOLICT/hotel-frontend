import { action, computed, makeAutoObservable } from 'mobx'
import { Building } from '../interfaces/models'

export default class BuildingStore {
    private _buildings: Building[] = []
    private _active: string = ''

    constructor() {
        makeAutoObservable(this)
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
