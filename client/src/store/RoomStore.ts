import { action, computed, makeAutoObservable } from 'mobx'
import { RoomPopulated } from '../interfaces/populatedModels'

export default class RoomStore {
    private _rooms: RoomPopulated[] = []
    private _current: RoomPopulated = {} as RoomPopulated

    constructor() {
        makeAutoObservable(this)
    }

    @action
    setRooms(value: RoomPopulated[]) {
        this._rooms = value
    }

    @action
    setCurrent(room: RoomPopulated) {
        this._current = room
    }

    @computed
    get rooms() {
        return this._rooms
    }

    @computed
    get current() {
        return this._current
    }
}
