import { action, computed, makeAutoObservable } from 'mobx'
import { RoomPopulated } from '../interfaces/populatedModels'

export default class RoomStore {
    private _rooms: RoomPopulated[]
    private _current: RoomPopulated

    constructor() {
        this._rooms = [
            {
                _id: '1',
                _building: {
                    _id: '123',
                    _rooms: [],
                    address: 'zalupa str. 14/88',
                },
                _type: {
                    _id: '34567',
                    name: 'VIP',
                    _services: [],
                    places: 3,
                },
                _order: '44545',
                isFree: true,
                population: 4,
            },
            {
                _id: '2',
                _building: {
                    _id: '123',
                    _rooms: [],
                    address: 'zalupa str. 14/88',
                },
                _type: {
                    _id: '34567',
                    name: 'VIP',
                    _services: [],
                    places: 3,
                },
                _order: '44545',
                isFree: true,
                population: 4,
            },
            {
                _id: '3',
                _building: {
                    _id: '123',
                    _rooms: [],
                    address: 'zalupa str. 14/88',
                },
                _type: {
                    _id: '34567',
                    name: 'VIP',
                    _services: [],
                    places: 3,
                },
                _order: '44545',
                isFree: true,
                population: 4,
            },
        ]
        this._current = {
            _id: '1',
            _building: {
                _id: '123',
                _rooms: [],
                address: 'zalupa str. 14/88',
            },
            _type: {
                _id: '34567',
                name: 'VIP',
                _services: ['s1', 's2', 's3'],
                places: 3,
            },
            _order: '44545',
            isFree: true,
            population: 4,
        }
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
