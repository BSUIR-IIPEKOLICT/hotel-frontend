import {action, computed, makeAutoObservable} from 'mobx'
import {Room} from '../interfaces/models'
import {RoomResponse} from '../interfaces/responses'

export default class RoomStore {

    private _rooms: RoomResponse[]
    private _current: Room

    constructor() {
        this._rooms = [
            {
                _id: '1',
                _building: {
                    _id: '123',
                    _rooms: [],
                    address: 'zalupa str. 14/88'
                },
                _type: {
                    _id: '34567',
                    name: 'VIP',
                    _services: [],
                    places: 3
                },
                _order: {
                    _id: '44545',
                    _basket: '43434',
                    _room: '4343',
                    _services: [],
                    date: '34343'
                },
                isFree: true,
                population: 4
            },
            {
                _id: '2',
                _building: {
                    _id: '123',
                    _rooms: [],
                    address: 'zalupa str. 14/88'
                },
                _type: {
                    _id: '34567',
                    name: 'VIP',
                    _services: [],
                    places: 3
                },
                _order: {
                    _id: '44545',
                    _basket: '43434',
                    _room: '4343',
                    _services: [],
                    date: '34343'
                },
                isFree: true,
                population: 4
            },
            {
                _id: '3',
                _building: {
                    _id: '123',
                    _rooms: [],
                    address: 'zalupa str. 14/88'
                },
                _type: {
                    _id: '34567',
                    name: 'VIP',
                    _services: [],
                    places: 3
                },
                _order: {
                    _id: '44545',
                    _basket: '43434',
                    _room: '4343',
                    _services: [],
                    date: '34343'
                },
                isFree: true,
                population: 4
            }
        ]
        this._current = {} as Room
        makeAutoObservable(this)
    }

    @action
    setRooms(value: RoomResponse[]) {
        this._rooms = value
    }

    @action
    setCurrent(room: Room) {
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
