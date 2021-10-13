import {makeAutoObservable} from 'mobx'

export default class RoomStore {

    private _rooms: Array<any>
    private _room: Object

    constructor() {
        this._rooms = []
        this._room = {}
        makeAutoObservable(this)
    }

    setRooms(value: Array<any>) {
        this._rooms = value
    }

    setRoom(value: Object) {
        this._room = value
    }

    get rooms() {
        return this._rooms
    }

    get room() {
        return this._room
    }
}
