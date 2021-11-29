import { action, computed, makeObservable, observable } from 'mobx'
import { RoomPopulated } from '../interfaces/populatedModels'

export default class RoomStore {
    @observable private _rooms: RoomPopulated[] = []
    @observable private _current: RoomPopulated = {} as RoomPopulated
    @observable private _pageAmount = 1
    @observable private _page = 1
    private readonly _limit = 9

    constructor() {
        makeObservable(this)
    }

    @action
    setRooms(value: RoomPopulated[]) {
        this._rooms = value
    }

    @action
    setCurrent(room: RoomPopulated) {
        this._current = room
    }

    @action
    setPage(value: number) {
        this._page = value
    }

    @action
    setPageAmount(roomAmount: number) {
        this._pageAmount = Math.ceil(roomAmount / this._limit)
    }

    @computed
    get rooms() {
        return this._rooms
    }

    @computed
    get current() {
        return this._current
    }

    @computed
    get pageAmount() {
        return this._pageAmount
    }

    @computed
    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}
